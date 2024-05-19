"use client";
import { Product } from "@prisma/client";
import React, { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  BellAlertIcon,
  CreditCardIcon,
  InformationCircleIcon,
  MinusIcon,
  PlusIcon,
  ShoppingCartIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import ProductModal from "../Modals/ProductModal";
import ClipLoader from "react-spinners/ClipLoader";
import {
  UpdateQuantityItemInCart,
  addToButItNow,
  addToCartNewProduct,
  getSession,
} from "../ServerAction/ServerAction";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import AuthModal from "../Modals/AuthModal";

type ProductCardProps = {
  product: Product;
  CartItems?: CartItemType[];
  handleFlagChange: () => void;
};

interface CartItemType {
  cartId: number;
  productId: number;
  quantity: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  CartItems,
  handleFlagChange,
}) => {
  const { id, image, name, price, onSale, salePercent } = product;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [IsLoadingBuyItNow, setIsLoadingBuyItNow] = useState<boolean>(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState<boolean>(false);
  const cartItem = CartItems
    ? CartItems.find((item) => item.productId === product.id)
    : null;
  const [newValue, setNewValue] = useState<number>(
    cartItem?.quantity ? cartItem?.quantity : 1
  );
  const [quantityError, setQuantityError] = useState<boolean>(false);
  const router = useRouter();
  const [AuthModalIsOpen, setAuthModalIsOpen] = useState<boolean>(false);
  const [AuthQuestion, setAuthQuestion] = useState<boolean>(false);

  const handleAuthModal = () => {
    setAuthModalIsOpen(!AuthModalIsOpen);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleAddToCart = async (
    ProductID: number,
    productImage: string,
    ProductName: string
  ) => {
    if (await getSession()) {
      setIsLoading(true);
      await addToCartNewProduct(ProductID, 1);
      toast(
        <div className="flex flex-row justify-between items-center w-full">
          <div className="flex flex-col">
            <p className="text-sm font-medium text-naivyBlue dark:text-glowGreen">
              Added to the cart !
            </p>

            <p className="text-xs text-naivyBlue dark:text-glowGreen">
              {ProductName}
            </p>
          </div>
          <div>
            <img
              src={productImage}
              alt={ProductName}
              style={{ width: "50px", height: "auto" }}
            />
          </div>
        </div>,
        { duration: 1250 }
      );
      setIsLoading(false);
      router.refresh();
    } else {
      setIsLoading(true);
      const newCartItem = {
        productId: ProductID,
        quantity: 1,
        productImage,
        productName: ProductName,
      };
      const storedCartItems = localStorage.getItem("cartItems");
      let cartItems = storedCartItems ? JSON.parse(storedCartItems) : [];
      const existingItemIndex = cartItems.findIndex(
        (item: { productId: number }) => item.productId === ProductID
      );
      if (existingItemIndex > -1) {
        return;
      } else {
        cartItems.push(newCartItem);
        setNewValue(1);
      }
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      toast(
        <div className="flex flex-row justify-between items-center w-full">
          <div className="flex flex-col">
            <p className="text-sm font-medium text-naivyBlue dark:text-glowGreen">
              Added to the cart !
            </p>
            <p className="text-xs text-naivyBlue dark:text-glowGreen">
              {ProductName}
            </p>
          </div>
          <div>
            <img
              src={productImage}
              alt={ProductName}
              style={{ width: "50px", height: "auto" }}
            />
          </div>
        </div>,
        { duration: 1250 }
      );
      handleFlagChange();
      setIsLoading(false);
      router.refresh();
    }
  };

  const handleBuyItNow = async (ProductID: number) => {
    if (await getSession()) {
      setIsLoadingBuyItNow(true);
      await addToButItNow(ProductID);
      setIsLoadingBuyItNow(false);
      router.push("/paymentpage?buyitnow=1");
    } else {
      if (!AuthQuestion) {
        setAuthQuestion(true);
        handleAuthModal();
        return;
      } else {
        setIsLoadingBuyItNow(true);
        const buyItNowItem = {
          productId: ProductID,
          quantity: 1,
        };
        localStorage.setItem("buyItNowItem", JSON.stringify(buyItNowItem));
        setIsLoadingBuyItNow(false);
        router.push("/paymentpage?buyitnow=1");
      }
    }
  };

  const handleQuantityUpdate = (
    action: "increase" | "decrease" | ChangeEvent<HTMLInputElement>
  ) => {
    setQuantityError(false);
    let newQuantity = newValue;
    if (action === "increase") {
      if (newValue == product.quantity) {
        setQuantityError(true);
        return;
      }
      newQuantity = Math.min(newValue + 1, product.quantity);
    } else if (action === "decrease") {
      newQuantity = newValue - 1;
    } else if (action && typeof action !== "string") {
      const inputVal = Number(action.target.value);
      newQuantity = Math.min(product.quantity, inputVal);
    }
    setNewValue(newQuantity);
    UpdateFunction(newQuantity);
  };

  const UpdateFunction = async (newQuantity: number) => {
    if (await getSession()) {
      if (cartItem?.cartId) {
        setIsLoadingUpdate(true);
        await UpdateQuantityItemInCart(
          newQuantity,
          product.id,
          cartItem?.cartId
        );
        setIsLoadingUpdate(false);
        router.refresh();
      }
      return;
    } else {
      const storedCartItems = localStorage.getItem("cartItems");
      let cartItems = storedCartItems ? JSON.parse(storedCartItems) : [];
      const itemIndex = cartItems.findIndex(
        (item: CartItemType) => item.productId === product.id
      );

      if (itemIndex !== -1) {
        if (newQuantity <= 0) {
          cartItems.splice(itemIndex, 1);
        } else {
          cartItems[itemIndex].quantity = newQuantity;
        }
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        handleFlagChange();
        setIsLoadingUpdate(false);
        router.refresh();
      }
    }
  };

  const handleRestockAlert = async (
    productImage: string,
    ProductName: string
  ) => {
    toast(
      <div className="flex flex-row justify-between items-center w-full">
        <div className="flex flex-col">
          <p className="text-sm font-medium text-red-500 w-3/4">
            We will notify you when the product will be in stock
          </p>
          <div className="flex space-x-2">
            <p className="text-xs">{ProductName}</p>
            <BellAlertIcon className="ml-1 -3 w-3 sm:h-4 sm:w-4" />
          </div>
        </div>
        <div>
          <img
            src={productImage}
            alt={ProductName}
            style={{ width: "50px", height: "auto" }}
          />
        </div>
      </div>,
      { duration: 2250 }
    );
  };

  useEffect(() => {
    if (cartItem?.quantity) {
      setNewValue(cartItem?.quantity);
    }
  }, [cartItem?.quantity]);

  return (
    <>
      <div className="flex flex-col justify-between rounded-lg shadow-lg border w-32 sm:w-52 m-1 sm:m-2">
        <div className="relative w-[126px] h-[155px] sm:w-[206px] sm:h-[235px]">
          {image && (
            <>
              <Image
                src={image}
                fill
                alt={`${id}'s picture`}
                className="rounded-t-lg"
                style={{
                  objectFit: "fill",
                  filter: "brightness(100%)",
                  transition: "filter 0.3s ease",
                }}
              />
              <div
                className="absolute top-0 left-0 w-full h-full flex items-center justify-center rounded-t-lg opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-70 text-white text-center cursor-pointer"
                onClick={handleOpenModal}
              >
                <span className="text-sm underline underline-offset-1">
                  More Info
                </span>
                <span>
                  <InformationCircleIcon className="w-6 h-6 ml-1" />
                </span>
              </div>
            </>
          )}
          {onSale && (
            <div className="absolute top-0 text-sm rounded-tr-lg right-0 bg-naivyBlue dark:bg-glowGreen text-black p-1">
              Sale!
            </div>
          )}
        </div>
        <div className="px-1 sm:px-2 pt-1 sm:pt-4">
          <div className="text-center font-bold text-base sm:text-lg mb-2">
            {name}
          </div>
          <div className="flex flex-col sm:flex-row justify-center items-center">
            <p
              className={`text-naivyBlue dark:text-glowGreen text-sm ${
                onSale ? "line-through" : ""
              }`}
            >
              ${price.toFixed(2)}
            </p>
            {onSale && salePercent && (
              <p className="text-gray-700 dark:text-white text-sm sm:ml-2">
                ${((price * (100 - salePercent)) / 100).toFixed(2)}
              </p>
            )}
          </div>
        </div>
        {isLoadingUpdate ? (
          <div className="flex items-center justify-center pb-2 space-x-2">
            <p className="text-naivyBlue dark:text-glowGreen text-xxs">
              Updating ..
            </p>
            <ClipLoader
              color="#FFFFFF dark:#9ffd32"
              className="text-naivyBlue dark:text-glowGreen"
              size={20}
            />
          </div>
        ) : (
          <>
            <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-1 sm:space-y-0 justify-between py-2 px-1">
              {cartItem ? (
                <>
                  <div className="flex flex-col mx-auto">
                    <div className="flex space-x-1 justify-center">
                      <Button
                        variant="outline"
                        className="text-naivyBlue dark:text-glowGreen text-xxs sm:text-xs px-1 sm:p-1 border border-naivyBlue dark:border-glowGreen"
                      >
                        <span onClick={() => handleQuantityUpdate("decrease")}>
                          {cartItem.quantity == 1 ? (
                            <TrashIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                          ) : (
                            <MinusIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                          )}
                        </span>
                      </Button>
                      <Input
                        type="number"
                        min="1"
                        max={product.quantity}
                        value={cartItem.quantity}
                        step={1}
                        onChange={(e) => handleQuantityUpdate(e)}
                        className="text-naivyBlue dark:text-glowGreen text-xxs sm:text-xs px-4 sm:py-1 border border-naivyBlue dark:border-glowGreen"
                        placeholder={cartItem.quantity.toString()}
                      />

                      <Button
                        variant="outline"
                        className="text-naivyBlue dark:text-glowGreen text-xxs sm:text-xs px-1 sm:p-1 border border-naivyBlue dark:border-glowGreen"
                      >
                        <span onClick={() => handleQuantityUpdate("increase")}>
                          <PlusIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                        </span>
                      </Button>
                    </div>
                    {quantityError ? (
                      <p className="text-sm text-red-600">Limit of the stock</p>
                    ) : null}
                  </div>
                </>
              ) : (
                <>
                  {product.quantity > 0 ? (
                    <>
                      <Button
                        variant="outline"
                        className="text-naivyBlue dark:text-glowGreen text-xxs sm:text-xs p-1 border border-naivyBlue dark:border-glowGreen"
                        onClick={() => {
                          isLoading
                            ? null
                            : handleAddToCart(
                                product.id,
                                product.image ? product.image : "null",
                                product.name
                              );
                        }}
                      >
                        {isLoading ? (
                          <>
                            <p className="text-naivyBlue dark:text-glowGreen text-xxs">
                              Adding ..{" "}
                            </p>
                            <ClipLoader
                              color="#FFFFFF dark:#9ffd32"
                              className="text-naivyBlue dark:text-glowGreen"
                              size={20}
                            />
                          </>
                        ) : (
                          <>
                            Add to Cart
                            <span>
                              <ShoppingCartIcon className="ml-1 h-3 w-3 sm:h-4 sm:w-4" />
                            </span>
                          </>
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        className="text-xxs sm:text-xs p-1"
                        onClick={() => {
                          IsLoadingBuyItNow ? null : handleBuyItNow(product.id);
                        }}
                      >
                        {IsLoadingBuyItNow ? (
                          <>
                            <p className="text-naivyBlue dark:text-glowGreen text-xxs">
                              Adding ..{" "}
                            </p>
                            <ClipLoader
                              color="#FFFFFF dark:#9ffd32"
                              className="text-naivyBlue dark:text-glowGreen"
                              size={20}
                            />
                          </>
                        ) : (
                          <>
                            Buy it Now
                            <span>
                              <CreditCardIcon className="ml-1 -3 w-3 sm:h-4 sm:w-4" />
                            </span>
                          </>
                        )}
                      </Button>
                    </>
                  ) : (
                    <>
                      <div className="flex flex-col items-center mx-auto text-red-600">
                        <p className="capitalize text-sm">Out of stock</p>
                        <Button
                          variant="outline"
                          className="capitalize hover:text-red-800 dark:hover:text-red-400 text-xxs sm:text-xs p-1 border border-red-500"
                          onClick={() =>
                            handleRestockAlert(
                              product.image ? product.image : "null",
                              product.name
                            )
                          }
                        >
                          Restock alert
                          <span>
                            <BellAlertIcon className="ml-1 -3 w-3 sm:h-4 sm:w-4" />
                          </span>
                        </Button>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </>
        )}
      </div>
      {isModalOpen && (
        <ProductModal
          product={product}
          CartItems={CartItems}
          newValue={newValue}
          setNewValue={setNewValue}
          quantityError={quantityError}
          setQuantityError={setQuantityError}
          handleFlagChange={handleFlagChange}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      {AuthModalIsOpen && (
        <div className="absolute top-0 left-0 w-full h-full z-50">
          <AuthModal handleAuthModal={handleAuthModal} />
        </div>
      )}
    </>
  );
};

type ProductsListProps = {
  Products: Product[];
  CartItems?: CartItemType[];
  handleFlagChange: () => void;
};

const ProductsList: React.FC<ProductsListProps> = ({
  Products,
  CartItems,
  handleFlagChange,
}) => {
  return (
    <div className="flex flex-wrap justify-center px-1">
      {Products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          CartItems={CartItems}
          handleFlagChange={handleFlagChange}
        />
      ))}
    </div>
  );
};

export default ProductsList;

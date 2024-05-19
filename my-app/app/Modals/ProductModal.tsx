import { Product } from "@prisma/client";
import React, { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  BellAlertIcon,
  CreditCardIcon,
  MinusIcon,
  PlusIcon,
  ShoppingCartIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { getSession } from "next-auth/react";
import {
  UpdateQuantityItemInCart,
  addToButItNow,
  addToCartNewProduct,
} from "../ServerAction/ServerAction";
import { toast } from "sonner";
import ClipLoader from "react-spinners/ClipLoader";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";

interface CartItemType {
  cartId: number;
  productId: number;
  quantity: number;
}

interface ProductModalProps {
  product: Product;
  CartItems?: CartItemType[];
  newValue: number;
  setNewValue: React.Dispatch<React.SetStateAction<number>>;
  quantityError: boolean;
  setQuantityError: React.Dispatch<React.SetStateAction<boolean>>;
  handleFlagChange: () => void;
  onClose: () => void;
}

export default function ProductModal({
  product,
  CartItems,
  newValue,
  setNewValue,
  quantityError,
  setQuantityError,
  handleFlagChange,
  onClose,
}: ProductModalProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [IsLoadingBuyItNow, setIsLoadingBuyItNow] = useState<boolean>(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState<boolean>(false);
  const cartItem = CartItems
    ? CartItems.find((item) => item.productId === product.id)
    : null;
  const isInCart = cartItem !== undefined;
  const router = useRouter();

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
      setNewValue(1);
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
              Added to the cart (locally)!
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
      setIsLoadingBuyItNow(true);
      const buyItNowItem = {
        productId: ProductID,
        quantity: 1,
      };
      localStorage.setItem("buyItNowItem", JSON.stringify(buyItNowItem));
      setIsLoadingBuyItNow(false);
      router.push("/paymentpage?buyitnow=1");
    }
  };

  const handleQuantityUpdate = (
    action: "increase" | "decrease" | ChangeEvent<HTMLInputElement>
  ) => {
    setQuantityError(false);
    let newQuantity = cartItem ? cartItem.quantity : newValue;
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
    onClose();
  };

  useEffect(() => {
    if (cartItem?.quantity) {
      setNewValue(cartItem?.quantity);
    }
  }, [cartItem?.quantity]);

  return (
    <div
      className="fixed inset-0 z-50 bg-gray-600 dark:bg-slate-900 bg-opacity-80 dark:bg-opacity-80 w-full overflow-y-auto h-full w-full"
      id="my-modal"
    >
      <div className="relative top-20 mx-auto p-1 border shadow-lg h-4/5 md:h-[394px] w-4/5 sm:w-3/4 2xl:w-1/2 rounded-xl bg-white dark:bg-slate-950">
        <div className="absolute right-0 top-0 p-1">
          <XMarkIcon className="h-6 w-6" onClick={onClose} />
        </div>
        <div className="flex flex-col sm:flex-row w-auto">
          <div className="relative hidden md:block sm:w-96 sm:h-96 flex-shrink-0">
            {product.image && (
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="sm:rounded-tl-lg sm:rounded-bl-lg"
                style={{
                  objectFit: "fill",
                }}
              />
            )}
          </div>
          <div className="flex flex-grow flex-col mt-3 px-2">
            <div className="hidden md:block">
              <h2 className="text-lg font-medium capitalize text-naivyBlue dark:text-glowGreen">
                {product.name}, {product.manufacturer}
                {product.onSale && (
                  <span className="text-base mx-4 p-1 rounded bg-naivyBlue dark:bg-glowGreen text-white dark:text-black">
                    Sale!
                  </span>
                )}
              </h2>
              <div className="py-1 flex items-center">
                <p
                  className={`text-naivyBlue dark:text-glowGreen text-base ${
                    product.onSale ? "line-through" : ""
                  }`}
                >
                  ${product.price.toFixed(2)}
                </p>
                {product.onSale && product.salePercent && (
                  <p className="text-gray-700 dark:text-white text-lg sm:ml-2">
                    $
                    {(
                      (product.price * (100 - product.salePercent)) /
                      100
                    ).toFixed(2)}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-row items-center md:hidden pt-3 justify-between">
              <div className="flex flex-col md:hidden">
                <h2 className="text-lg font-medium capitalize text-naivyBlue dark:text-glowGreen">
                  {product.name}, {product.manufacturer}
                  {product.onSale && (
                    <span className="text-base mx-4 p-1 rounded bg-naivyBlue dark:bg-glowGreen text-white dark:text-black">
                      Sale!
                    </span>
                  )}
                </h2>
                <div className="py-1 flex items-center">
                  <p
                    className={`text-naivyBlue dark:text-glowGreen text-base ${
                      product.onSale ? "line-through" : ""
                    }`}
                  >
                    ${product.price.toFixed(2)}
                  </p>
                  {product.onSale && product.salePercent && (
                    <p className="text-gray-700 dark:text-white text-lg sm:ml-2">
                      $
                      {(
                        (product.price * (100 - product.salePercent)) /
                        100
                      ).toFixed(2)}
                    </p>
                  )}
                </div>
              </div>
              <div className="relative w-24 h-24 flex-shrink-0">
                {product.image && (
                  <Image
                    src={product.image}
                    alt={product.name}
                    className="rounded-lg"
                    fill
                    style={{
                      objectFit: "fill",
                    }}
                  />
                )}
              </div>
            </div>
            <div className="mt-1 text-sm ">
              <span className="text-sm text-naivyBlue dark:text-glowGreen">
                Description:
              </span>{" "}
              <ScrollArea className="h-40 border">
                <p className="text-xs pl-1 pr-2">{product.description}</p>
              </ScrollArea>
            </div>
            <div className="flex justify-between">
              <div className="mt-1 text-sm ">
                <span className="text-sm text-naivyBlue dark:text-glowGreen">
                  Color:
                </span>{" "}
                {product.color}
              </div>
              <div className="mt-1 text-sm text-right">
                <span className="text-sm text-naivyBlue dark:text-glowGreen">
                  Quantity:
                </span>{" "}
                {product.quantity}
              </div>
            </div>
            <div className="mt-1 text-sm ">
              <span className="text-sm text-naivyBlue dark:text-glowGreen">
                Size:
              </span>{" "}
              {product.size}
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
                <div className="flex justify-center space-x-4 py-1">
                  {isInCart && cartItem ? (
                    <>
                      <div className="flex flex-col mx-auto p-1">
                        <div className="flex space-x-1 justify-center">
                          <Button
                            variant="outline"
                            className="text-naivyBlue dark:text-glowGreen text-xxs sm:text-xs px-1 sm:p-1 border border-naivyBlue dark:border-glowGreen"
                          >
                            <span
                              onClick={() => handleQuantityUpdate("decrease")}
                            >
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
                            <span
                              onClick={() => handleQuantityUpdate("increase")}
                            >
                              <PlusIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                            </span>
                          </Button>
                        </div>
                        {quantityError ? (
                          <p className="text-sm text-red-600">
                            Limit of the stock
                          </p>
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
                              IsLoadingBuyItNow
                                ? null
                                : handleBuyItNow(product.id);
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
        </div>
      </div>
    </div>
  );
}

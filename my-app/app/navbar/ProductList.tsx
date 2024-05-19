"use client";
import { CartItem, Product } from "@prisma/client";
import React, { ChangeEvent, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  MinusIcon,
  PlusIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  UpdateQuantityItemInCart,
  getSession,
} from "../ServerAction/ServerAction";
import ClipLoader from "react-spinners/ClipLoader";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

type ProductListProps = {
  product: Product;
  CartItems: CartItem[];
  fetchCartItems: () => void;
};

const ProductList: React.FC<ProductListProps> = ({
  product,
  CartItems,
  fetchCartItems,
}) => {
  const cartItem = CartItems.find((item) => item.productId === product.id);
  const [quantityError, setQuantityError] = useState<boolean>(false);
  const [newValue, setNewValue] = useState<number>(
    cartItem?.quantity ? cartItem?.quantity : 1
  );
  const [isLoadingUpdate, setIsLoadingUpdate] = useState<boolean>(false);
  const router = useRouter();

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
        router.refresh();
        await fetchCartItems();
        setIsLoadingUpdate(false);
      }
      return;
    } else {
      const storedCartItems = localStorage.getItem("cartItems");
      let cartItems = storedCartItems ? JSON.parse(storedCartItems) : [];
      const itemIndex = cartItems.findIndex(
        (item: CartItem) => item.productId === product.id
      );

      if (itemIndex !== -1) {
        if (newQuantity <= 0) {
          cartItems.splice(itemIndex, 1);
        } else {
          cartItems[itemIndex].quantity = newQuantity;
        }
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        router.refresh();
        await fetchCartItems();
        setIsLoadingUpdate(false);
      }
    }
  };
  const actualPrice =
    product.onSale && product.salePercent
      ? (product.price * (100 - product.salePercent)) / 100
      : product.price;
  const totalPrice = actualPrice * (cartItem?.quantity ?? 0);

  return (
    <>
      <div key={product.id} className="flex flex-row items-center my-2">
        <XMarkIcon
          className="h-6 w-6 text-naivyBlue dark:text-glowGreen hover:cursor-pointer hover:scale-110"
          onClick={() => UpdateFunction(0)}
        />
        <div className="relative w-20 h-20 sm:w-24 sm:h-24">
          {product.image && (
            <>
              <Image
                src={product.image}
                fill
                alt={`${product.name}'s picture`}
                className="rounded-lg"
                style={{
                  objectFit: "fill",
                }}
              />
            </>
          )}
          {product.onSale && (
            <div className="absolute top-0 text-sm rounded-tr-lg right-0 bg-naivyBlue dark:bg-glowGreen text-black py-0 px-0.5">
              Sale!
            </div>
          )}
        </div>
        <div className="flex flex-col text-sm mx-1 w-1/3 sm:w-36">
          <div>{product.name}</div>
          <div className="text-sm text-naivyBlue dark:text-glowGreen">
            {totalPrice}$
          </div>
        </div>
        {isLoadingUpdate ? (
          <div className="absolute right-4">
            <ClipLoader
              color="#FFFFFF dark:#9ffd32"
              className="text-naivyBlue dark:text-glowGreen"
              size={24}
            />
          </div>
        ) : (
          <>
            {cartItem ? (
              <div className="flex flex-col mx-auto">
                <div className="flex justify-end">
                  <Button
                    variant="outline"
                    className="text-naivyBlue dark:text-glowGreen text-xxs px-1 rounded-l-lg rounded-r-none sm:p-1 border border-naivyBlue dark:border-glowGreen"
                  >
                    <div onClick={() => handleQuantityUpdate("decrease")}>
                      {cartItem.quantity == 1 ? (
                        <TrashIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                      ) : (
                        <MinusIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                      )}
                    </div>
                  </Button>
                  <Input
                    type="number"
                    min="1"
                    max={product.quantity}
                    value={newValue}
                    step={1}
                    onChange={(e) => handleQuantityUpdate(e)}
                    className="rounded-none text-naivyBlue dark:text-glowGreen text-xxs w-12 px-2 sm:py-1 border-t border-b border-naivyBlue dark:border-glowGreen"
                    placeholder={cartItem.quantity.toString()}
                  />

                  <Button
                    variant="outline"
                    className="text-naivyBlue dark:text-glowGreen text-xxs px-1 rounded-r-lg rounded-l-none sm:p-1 border border-naivyBlue dark:border-glowGreen"
                  >
                    <div onClick={() => handleQuantityUpdate("increase")}>
                      <PlusIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                    </div>
                  </Button>
                </div>
                {quantityError ? (
                  <p className="text-xxs text-red-600">Limit of the stock</p>
                ) : null}
              </div>
            ) : null}
          </>
        )}
      </div>
    </>
  );
};
export default ProductList;

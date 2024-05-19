import React, { useState, useEffect } from "react";
import {
  getAddress,
  getProductsDetails,
  getSession,
  getUserCart,
} from "../ServerAction/ServerAction";
import { CartItem, Product } from "@prisma/client";
import ProgressDemo from "./ProgressDemo";
import ProductList from "./ProductList";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import InsertAddress from "./InsertAddress";
import { useRouter } from "next/navigation";

type ShoppingCartDetailsProps = {
  handleAuthModal: () => void;
  toggleDropdown: () => void;
};

const ShoppingCartDetails = ({
  handleAuthModal,
  toggleDropdown,
}: ShoppingCartDetailsProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>();
  const [ProductDetails, setProductDetails] = useState<Product[]>();
  const [totalPrice, setTotalPrice] = useState<number>();
  const [FlagNoItems, setFlagNoItems] = useState<boolean>(false);
  const [FlagEditAddress, setFlagEditAddress] = useState<boolean>(false);
  const [AddressComponentOpen, setAddressComponentOpen] =
    useState<boolean>(false);
  const [AuthQuestion, setAuthQuestion] = useState<boolean>(false);
  const router = useRouter();

  const fetchCartItems = async () => {
    let items = await getUserCart();
    if (await getSession()) {
      if (items === null) {
        setFlagNoItems(true);
        return;
      } else {
        localStorage.removeItem("cartItems");
        setCartItems(items);
      }
    } else {
      const storedCartItems = localStorage.getItem("cartItems");
      items = storedCartItems ? JSON.parse(storedCartItems) : [];
      setCartItems(items);
    }
    if (items && items.length > 0) {
      const cartItemIds = items.map((item) => item.productId);
      const Details = await getProductsDetails(cartItemIds);
      setProductDetails(Details);

      const SumPrice = Details
        ? Details.reduce((acc, item) => {
            const cartItem =
              items && items.find((ci) => ci.productId === item.id);
            const actualPrice =
              item.onSale && item.salePercent
                ? (item.price * (100 - item.salePercent)) / 100
                : item.price;
            const itemTotal = actualPrice * (cartItem ? cartItem.quantity : 0);
            return acc + itemTotal;
          }, 0)
        : 0;
      setTotalPrice(SumPrice);
    } else {
      setFlagNoItems(true);
    }
  };

  const Checkout = async () => {
    let Address;
    if (await getSession()) {
      Address = await getAddress();
    } else {
      if (!AuthQuestion) {
        setAuthQuestion(true);
        handleAuthModal();
        return;
      } else {
        const storedAddress = localStorage.getItem("userAddress");
        if (storedAddress) {
          const parsedAddress = JSON.parse(storedAddress);
          Address =
            Object.keys(parsedAddress).length === 0 ? null : parsedAddress;
        }
      }
    }
    if (Address) {
      toggleDropdown();
      router.push("/paymentpage");
    } else {
      setFlagEditAddress(true);
      setAddressComponentOpen(true);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  if (!cartItems) {
    return (
      <>
        {FlagNoItems ? (
          <div className="mx-2 text-base">The Cart Is Empty ..</div>
        ) : (
          <div className="mx-2 text-base">Loading cart items...</div>
        )}{" "}
      </>
    );
  }

  return (
    <>
      {cartItems.length > 0 ? (
        <>
          {totalPrice && <ProgressDemo totalPrice={totalPrice} />}
          <>
            {ProductDetails && !AddressComponentOpen && (
              <ScrollArea className="h-[500px] md:h-[420px] w-full border-t pr-1 mb-1">
                <div className="flex flex-col justify-center px-1">
                  {ProductDetails.map((product) => (
                    <ProductList
                      key={product.id}
                      product={product}
                      CartItems={cartItems}
                      fetchCartItems={fetchCartItems}
                    />
                  ))}
                </div>
              </ScrollArea>
            )}
          </>
          {AddressComponentOpen && (
            <div className="flex flex-col h-5/6 items-center px-1 pb-8">
              <InsertAddress
                setAddressComponentOpen={setAddressComponentOpen}
                setFlagEditAddress={setFlagEditAddress}
              />
            </div>
          )}
          {!FlagEditAddress && (
            <div className="h-36 py-2 border bg-white dark:bg-slate-950 rounded-xl translate-y-[3%]">
              <div className="flex flex-col space-y-1 mx-8 my-2">
                <div className="flex justify-between mx-2">
                  <div className="text-sm">Sub-Total</div>
                  <div className="text-sm">{totalPrice}$</div>
                </div>
                <div className="flex justify-between mx-2">
                  <div className="text-sm">Shipping</div>
                  {totalPrice && totalPrice >= 250 ? (
                    <div className="text-sm">Free Shipping !</div>
                  ) : (
                    <div className="text-sm">{15}$</div>
                  )}
                </div>
                <div className="h-[0.5px] bg-black dark:bg-current" />
                <div className="flex justify-between mx-2">
                  <div className="text-base font-medium text-naivyBlue dark:text-glowGreen">
                    Total
                  </div>
                  {totalPrice && totalPrice >= 250 ? (
                    <div className="text-base font-medium text-naivyBlue dark:text-glowGreen">
                      {totalPrice}$
                    </div>
                  ) : (
                    <div className="text-base font-medium text-naivyBlue dark:text-glowGreen">
                      {totalPrice && totalPrice + 15}$
                    </div>
                  )}
                </div>
                <Button
                  variant="outline"
                  className="text-naivyBlue dark:text-glowGreen hover:text-naivyBlue hover:dark:text-glowGreen"
                  onClick={Checkout}
                >
                  Checkout
                </Button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="text-sm text-center">The Cart Is Empty ..</div>
      )}
    </>
  );
};

export default ShoppingCartDetails;

"use client";
import React, { useEffect, useState } from "react";
import TitleLevel from "./TitleLevel";
import { BuyItNow, CartItem, Order, Product } from "@prisma/client";
import {
  getAddress,
  getBuyItNow,
  getProductsDetails,
  getSingleProductsDetails,
  getUserCart,
} from "../ServerAction/ServerAction";
import { getSession } from "next-auth/react";
import YourOrder from "./YourOrder";
import PaymentDetails from "./PaymentDetails";
import ConfirmationPage from "./ConfirmationPage";
import { useSearchParams } from "next/navigation";
import InsertAddress from "./InsertAddress";
import ClipLoader from "react-spinners/ClipLoader";

type Address = {
  state: string;
  city: string;
  street: string;
  homeNumber: number;
  apartmentNumber: number;
};

export default function MainPaymentComponent() {
  const [cartItems, setCartItems] = useState<CartItem[]>();
  const [cartItemsBuyItNow, setcartItemsBuyItNow] = useState<BuyItNow>();
  const [currentLevel, setCurrentLevel] = useState<string>("OrderDetails");
  const [ConfirmationDetails, setConfirmationDetails] = useState<Order>();
  const [ProductsDetails, setProductsDetails] = useState<Product | Product[]>();
  const [Address, setAddress] = useState<Address>();
  const [FlagAddressAdded, setFlagAddressAdded] = useState<boolean>(false);
  const [totalPrice, setTotalPrice] = useState<number>();
  const [cardNumber, setCardNumber] = useState<string>("");
  const [Exp, setExp] = useState<string>("");
  const [Cvv, setCvv] = useState<string>("");
  const searchParams = useSearchParams();
  const FlagBuyItNow = searchParams ? searchParams.get("buyitnow") : null;
  const [isLoadingUpdate, setIsLoadingUpdate] = useState<boolean>(true);

  const fetchCartItems = async () => {
    let items: CartItem[] | undefined;
    if (await getSession()) {
      if (FlagBuyItNow) {
        let buyItNowItems = await getBuyItNow();
        if (buyItNowItems) {
          setcartItemsBuyItNow(buyItNowItems);
          const Details = await getSingleProductsDetails(
            buyItNowItems.productId
          );
          if (Details) {
            setProductsDetails(Details);
            const SumPrice =
              Details.onSale && Details.salePercent
                ? (Details.price * (100 - Details.salePercent)) / 100
                : Details.price;
            setTotalPrice(SumPrice);
          }
        }
      } else {
        items = await getUserCart();
        if (items) {
          localStorage.removeItem("cartItems");
          setCartItems(items);
        }
      }
    } else {
      if (FlagBuyItNow) {
        const storedBuyItNowItem = localStorage.getItem("buyItNowItem");
        let buyItNowItems = storedBuyItNowItem
          ? JSON.parse(storedBuyItNowItem)
          : [];
        setcartItemsBuyItNow(buyItNowItems);
        const Details = await getSingleProductsDetails(buyItNowItems.productId);
        if (Details) {
          setProductsDetails(Details);
          const SumPrice =
            Details.onSale && Details.salePercent
              ? (Details.price * (100 - Details.salePercent)) / 100
              : Details.price;
          setTotalPrice(SumPrice);
        }
      } else {
        const storedCartItems = localStorage.getItem("cartItems");
        items = storedCartItems ? JSON.parse(storedCartItems) : [];
        setCartItems(items);
      }
    }
    if (items && items.length > 0) {
      const cartItemIds = items.map((item) => item.productId);
      const Details = await getProductsDetails(cartItemIds);
      setProductsDetails(Details);
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
      console.log(SumPrice);
      setTotalPrice(SumPrice);
    }
  };

  const fetchAddress = async () => {
    setIsLoadingUpdate(true);
    if (await getSession()) {
      const AddressDate = await getAddress();
      if (AddressDate) {
        setAddress(AddressDate);
      }
    } else {
      const storedAddress = localStorage.getItem("userAddress");
      if (storedAddress) {
        const parsedAddress = JSON.parse(storedAddress);
        if (parsedAddress) {
          const addressWithNumbers = {
            ...parsedAddress,
            homeNumber: parseInt(parsedAddress.homeNumber, 10) || 0,
            apartmentNumber: parseInt(parsedAddress.apartmentNumber, 10) || 0,
          };
          setAddress(addressWithNumbers);
        }
      }
    }
    setIsLoadingUpdate(false);
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  useEffect(() => {
    fetchAddress();
  }, [FlagAddressAdded]);

  return (
    <div className="flex flex-col w-full border rounded-xl">
      <TitleLevel currentLevel={currentLevel} />
      {isLoadingUpdate ? (
        <div className="flex flex-col items-center justify-center py-16">
          <ClipLoader
            color="#FFFFFF dark:#9ffd32"
            className="text-naivyBlue dark:text-glowGreen"
            size={32}
          />
          <p className="text-center pt-4 text-base lg:text-lg">Loading ...</p>
        </div>
      ) : (
        <>
          {!Address && !FlagAddressAdded ? (
            <>
              <InsertAddress setFlagAddressAdded={setFlagAddressAdded} />
            </>
          ) : (
            <>
              {currentLevel === "OrderDetails" &&
                ProductsDetails &&
                totalPrice &&
                (cartItems || cartItemsBuyItNow) &&
                Address &&
                Address.state && (
                  <YourOrder
                    ProductsDetails={ProductsDetails}
                    totalPrice={totalPrice}
                    cartItems={cartItems ? cartItems : cartItemsBuyItNow}
                    FlagBuyItNow={FlagBuyItNow}
                    Address={Address}
                    setCurrentLevel={setCurrentLevel}
                  />
                )}
            </>
          )}
          {currentLevel === "PaymentDetails" &&
            totalPrice &&
            (cartItems || cartItemsBuyItNow) &&
            Address && (
              <PaymentDetails
                setCurrentLevel={setCurrentLevel}
                cardNumber={cardNumber}
                Cvv={Cvv}
                Exp={Exp}
                setCardNumber={setCardNumber}
                setCvv={setCvv}
                setExp={setExp}
                totalPrice={totalPrice}
                cartItems={cartItems ? cartItems : cartItemsBuyItNow}
                FlagBuyItNow={FlagBuyItNow}
                Address={Address}
                setConfirmationDetails={setConfirmationDetails}
              />
            )}
          {currentLevel === "Confirmation" && (
            <ConfirmationPage ConfirmationDetails={ConfirmationDetails} />
          )}
        </>
      )}
    </div>
  );
}

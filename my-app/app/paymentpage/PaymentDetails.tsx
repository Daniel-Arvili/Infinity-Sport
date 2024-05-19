"use client";
import React, { SetStateAction, useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import PayPalButton from "./PayPalButton";
import AddCard from "./AddCard";
import CardDetails from "./CardDetails";
import { BuyItNow, CartItem, Order } from "@prisma/client";
import ClipLoader from "react-spinners/ClipLoader";
import {
  createOrderAndClearBuyItNow,
  createOrderAndClearCart,
  createOrderForGuest,
  getExistCreditCards,
  getSession,
} from "../ServerAction/ServerAction";
import EncryptCard from "../Modals/EncryptCard";
import { EncryptAndUploadData } from "@/Crypto/Crypto";
import SavedCreditCards from "./SavedCreditCards";
import { useSearchParams } from "next/navigation";

type Address = {
  state: string;
  city: string;
  street: string;
  homeNumber: number;
  apartmentNumber: number;
};

type CreditCardInfo = {
  last4Digits: string;
  year: number;
  month: number;
};

type PaymentDetailsProps = {
  setCurrentLevel: React.Dispatch<SetStateAction<string>>;
  cardNumber: string;
  Cvv: string;
  Exp: string;
  setCardNumber: React.Dispatch<SetStateAction<string>>;
  setCvv: React.Dispatch<SetStateAction<string>>;
  setExp: React.Dispatch<SetStateAction<string>>;
  totalPrice: number;
  cartItems: CartItem[] | BuyItNow | undefined;
  FlagBuyItNow: string | null;
  Address: Address;
  setConfirmationDetails: React.Dispatch<SetStateAction<Order | undefined>>;
};

const PaymentDetails: React.FC<PaymentDetailsProps> = ({
  setCurrentLevel,
  cardNumber,
  Cvv,
  Exp,
  setCardNumber,
  setCvv,
  setExp,
  totalPrice,
  cartItems,
  FlagBuyItNow,
  Address,
  setConfirmationDetails,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [Session, setSession] = useState<boolean>(false);
  const [SaveCart, setSaveCart] = useState<boolean>(false);
  const [GuestName, setGuestName] = useState<string>("");
  const [openCryptoModal, setopenCryptoModal] = useState<boolean>(false);
  const [creditCards, setCreditCards] = useState<CreditCardInfo[]>([]);

  const fetchSession = async () => {
    if (await getSession()) {
      setSession(true);
      const existingCards = await getExistCreditCards();
      if (existingCards) {
        setCreditCards(existingCards);
      }
    } else {
      setSession(false);
    }
  };

  useEffect(() => {
    fetchSession();
  }, []);

  const handlePayment = async (PaymentMethod: string) => {
    setIsLoading(true);
    if (await getSession()) {
      if (SaveCart) {
        setopenCryptoModal(true);
        await EncryptAndUploadData(cardNumber, Cvv, Exp);
        setTimeout(() => {
          setopenCryptoModal(false);
        }, 2500);
      }
      try {
        if (FlagBuyItNow) {
          const NewOrder = await createOrderAndClearBuyItNow(
            totalPrice,
            PaymentMethod
          );
          setConfirmationDetails(NewOrder);
        } else {
          const NewOrder = await createOrderAndClearCart(
            totalPrice,
            PaymentMethod
          );
          setConfirmationDetails(NewOrder);
        }
      } catch (e) {
        console.error(e, "Failed to create order and clear cart");
        return;
      }
      setCurrentLevel("Confirmation");
    } else {
      try {
        if (cartItems) {
          const NewOrder = await createOrderForGuest(
            totalPrice,
            Address,
            cartItems,
            PaymentMethod,
            GuestName
          );
          setConfirmationDetails(NewOrder);
          if (FlagBuyItNow) {
            localStorage.removeItem("buyItNowItem");
            localStorage.removeItem("userAddress");
          } else {
            localStorage.removeItem("cartItems");
            localStorage.removeItem("userAddress");
          }
        }
      } catch (e) {
        console.error(e, "Failed to create order and clear cart");
        return;
      }
    }
    setCurrentLevel("Confirmation");
    setIsLoading(false);
  };

  return (
    <>
      <div className="flex justify-center mx-auto p-1 sm:p-4 w-full lg:w-3/4 border rounded-xl">
        <div className="text-xs sm:text-sm md:text-base w-full">
          {isLoading ? (
            <div className="flex flex-col justify-center items-center justify-center pb-2 space-x-2">
              <p className="text-naivyBlue dark:text-glowGreen text-xl sm:text-2xl pt-32">
                Processing ..
              </p>
              <ClipLoader
                color="#FFFFFF dark:#9ffd32"
                className="text-naivyBlue dark:text-glowGreen mb-32"
                size={50}
              />
            </div>
          ) : (
            <>
              <div className="flex flex-col">
                <div className="flex flex-col py-2 sm:py-0 sm:flex-row justify-between">
                  <div className="flex flex-col w-full sm:w-3/5 items-center justify-center mx-auto bg-naivySky dark:bg-slate-950 rounded-2xl">
                    <div className="flex w-4/5">
                      <AddCard cardNumber={cardNumber} Cvv={Cvv} Exp={Exp} />
                    </div>
                    <CardDetails
                      Session={Session}
                      SaveCart={SaveCart}
                      setSaveCart={setSaveCart}
                      GuestName={GuestName}
                      setGuestName={setGuestName}
                      cardNumber={cardNumber}
                      Cvv={Cvv}
                      Exp={Exp}
                      setCardNumber={setCardNumber}
                      setCvv={setCvv}
                      setExp={setExp}
                      setCurrentLevel={setCurrentLevel}
                      handlePayment={handlePayment}
                    />
                  </div>
                  <Separator
                    orientation="vertical"
                    className="h-auto mx-2 hidden sm:block"
                  />
                  <div className="flex flex-col mx-auto items-center w-2/5 space-y-4">
                    {creditCards && creditCards.length > 0 ? (
                      <SavedCreditCards
                        creditCards={creditCards}
                        handlePayment={handlePayment}
                      />
                    ) : null}
                    <PayPalButton
                      totalPrice={totalPrice}
                      handlePayment={handlePayment}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      {openCryptoModal ? <EncryptCard /> : null}
    </>
  );
};

export default PaymentDetails;

"use client";
import { BuyItNow, CartItem, Product } from "@prisma/client";
import React, { SetStateAction } from "react";
import ProductDetails from "./ProductDetails";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ArrowUturnLeftIcon,
  ClipboardDocumentCheckIcon,
  FlagIcon,
  GlobeAltIcon,
  HomeIcon,
  LifebuoyIcon,
  MapPinIcon,
  ShieldCheckIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { US_STATES_WITH_FLAGS } from "@/src/lib/usa";
import Image from "next/image";

type Address = {
  state: String;
  city: String;
  street: String;
  homeNumber: number;
  apartmentNumber: number;
};

type YourOrderProps = {
  ProductsDetails: Product | Product[];
  totalPrice: number;
  cartItems: CartItem[] | BuyItNow | undefined;
  FlagBuyItNow: string | null;
  Address: Address;
  setCurrentLevel: React.Dispatch<SetStateAction<string>>;
};

const YourOrder: React.FC<YourOrderProps> = ({
  ProductsDetails,
  totalPrice,
  cartItems,
  FlagBuyItNow,
  Address,
  setCurrentLevel,
}) => {
  const productsArray = Array.isArray(ProductsDetails)
    ? ProductsDetails
    : [ProductsDetails];
  const stateOption =
    Address &&
    US_STATES_WITH_FLAGS.find((option) => option.value === Address.state);
  return (
    <div className="flex justify-center mx-auto px-2 sm:px-4 py-1 sm:py-2 w-full lg:w-3/4">
      <div className="text-xs sm:text-sm md:text-base w-full sm:w-5/6">
        <div className="flex flex-col ">
          <div className="flex items-center text-sm sm:text-lg md:text-2xl font-medium text-naivyBlue dark:text-glowGreen">
            Shipping information
            <span>
              {" "}
              <MapPinIcon className="h-6 w-6 ml-2" />
            </span>
          </div>
          <div className="text-xs sm:text-sm md:text-base justify-start mt-2">
            <div className="flex items-center">
              <Image
                src={stateOption ? stateOption.flagUrl : ""}
                alt={stateOption ? stateOption.label : "State flag"}
                width={120}
                height={120}
                className="rounded-md scale-90 md:scale-100"
              />
              <div className="flex flex-col ml-2">
                <div className="flex items-center text-xs sm:text-sm md:text-base justify-start">
                  <strong className="mr-1">State:</strong>
                  {stateOption ? stateOption.label : Address.state}
                  <FlagIcon className="h-3 w-3 sm:h-4 sm:w-4 ml-2 text-naivyBlue dark:text-glowGreen" />
                </div>
                <div className="text-xs sm:text-sm md:text-base justify-start">
                  <strong>City: </strong>
                  {Address.city}, <strong>Street: </strong>
                  {Address.street}
                </div>
                <div className="text-xs sm:text-sm md:text-base justify-start">
                  <strong>Apartment number: </strong>
                  {Address.apartmentNumber}, <strong>Home Number: </strong>
                  {Address.homeNumber}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-center py-4">
          <div className="flex flex-col items-center md:mx-2 lg:mx-4">
            <GlobeAltIcon className="w-16 h-16 xl:w-20 xl:h-20 mt-2" />
            <div className="text-xs sm:text-sm md:text-base w-32 text-center">
              Free Worldwide Shipping
            </div>
          </div>
          <div className="flex flex-col items-center md:mx-2 lg:mx-4">
            <TruckIcon className="w-16 h-16 xl:w-20 xl:h-20 mt-2" />
            <div className="text-xs sm:text-sm md:text-base w-32 text-center">
              Easy 60-day Exchanges & Returns
            </div>
          </div>
          <div className="flex flex-col items-center md:mx-2 lg:mx-4">
            <LifebuoyIcon className="w-16 h-16 xl:w-20 xl:h-20 mt-2" />
            <div className="text-xs sm:text-sm md:text-base w-32 text-center">
              24/7 Customer Support
            </div>
          </div>
          <div className="flex flex-col items-center md:mx-2 lg:mx-4">
            <ShieldCheckIcon className="w-16 h-16 xl:w-20 xl:h-20 mt-2" />
            <div className="text-xs sm:text-sm md:text-base w-32 text-center">
              100% Secure Checkout
            </div>
          </div>
        </div>
        <Separator className="bg-black dark:bg-gray-500 my-4" />
        <div className="flex items-center text-sm sm:text-lg md:text-2xl font-medium text-naivyBlue dark:text-glowGreen mb-2">
          Order items
          <span>
            {" "}
            <ClipboardDocumentCheckIcon className="h-6 w-6 ml-2" />
          </span>
        </div>
        {productsArray.map((product) => {
          const itemsArray = Array.isArray(cartItems) ? cartItems : [cartItems];
          const cartItem = itemsArray.find((item) =>
            item ? item.productId === product.id : null
          );
          return (
            <div key={product.id}>
              <ProductDetails
                productId={product.id}
                product={product}
                quantity={cartItem ? cartItem.quantity : 0}
              />
            </div>
          );
        })}
        <Separator className="bg-black dark:bg-gray-500 my-4" />
        <div className="flex flex-col space-y-4 mt-2">
          <div className="flex justify-between">
            <div className="text-xs sm:text-sm md:text-base justify-start">
              Sub-Total
            </div>
            <div className="text-xs sm:text-sm md:text-base">${totalPrice}</div>
          </div>
          <div className="flex justify-between">
            <div className="text-xs sm:text-sm md:text-base">
              Shipping (Free on orders over $250)
            </div>
            {totalPrice && totalPrice >= 250 ? (
              <div className="text-xs sm:text-sm md:text-base">
                Free Shipping !
              </div>
            ) : (
              <div className="text-xs sm:text-sm md:text-base">${15}</div>
            )}
          </div>
          <div className="flex justify-between">
            <div className="text-sm sm:text-lg md:text-2xl font-medium text-naivyBlue dark:text-glowGreen">
              Total
            </div>
            {totalPrice && totalPrice >= 250 ? (
              <div className="text-sm sm:text-lg md:text-2xl font-medium text-naivyBlue dark:text-glowGreen">
                ${totalPrice}
              </div>
            ) : (
              <div className="text-sm sm:text-lg md:text-2xl font-medium text-naivyBlue dark:text-glowGreen">
                ${totalPrice && totalPrice + 15}
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-between py-8">
          <Button
            variant={"outline"}
            className="text-sm sm:text-lg md:text-xl hover:scale-105"
          >
            <Link href="/" className="flex items-center">
              <span>
                <ArrowUturnLeftIcon className="h-3 w-4 sm:h-4 sm:w-4 md:h-5 md:w-5 mr-1" />
              </span>
              Back to cart
            </Link>
          </Button>
          <Button
            variant={"outline"}
            className="text-sm sm:text-lg md:text-xl hover:scale-105 bg-naivyBlue hover:bg-naivyBlue/80 hover:text-white text-white dark:text-black dark:bg-glowGreen dark:hover:bg-glowGreen/70 dark:hover:text-black"
            onClick={() => setCurrentLevel("PaymentDetails")}
          >
            Continue
            <span>
              <ArrowRightIcon className="h-3 w-4 sm:h-4 sm:w-4 md:h-5 md:w-5 ml-1" />
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default YourOrder;

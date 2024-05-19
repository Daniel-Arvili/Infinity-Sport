"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import EncryptShield from "../paymentpage/CardLogos/EncryptShield.png";
import { LockClosedIcon } from "@heroicons/react/24/outline";

function EncryptCard() {
  const [dots, setDots] = useState(".");
  useEffect(() => {
    const updateDots = () => {
      setDots((prevDots) => {
        if (prevDots.length < 3) {
          return prevDots + ".";
        }
        return ".";
      });
    };
    const intervalId = setInterval(updateDots, 500);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div className="fixed inset-0 bg-gray-600 dark:bg-slate-950 bg-opacity-50 dark:bg-opacity-70">
        <div className="relative w-[95%] md:w-3/6 lg:w-2/6 my-32 mx-auto border shadow-lg rounded-md bg-white dark:bg-slate-950 z-50">
          <div className="flex flex-col px-2 sm:px-4">
            <div className="flex justify-center p-2">
              <div className="flex items-center text-lg leading-6 font-medium text-naivyBlue dark:text-glowGreen">
                Secure Transmission
                <span>
                  <LockClosedIcon className="h-4 w-4 ml-1" />
                </span>
              </div>
            </div>
            <div>
              <p className="text-xs sm:text-sm md:text-base m-2">
                Encrypting your credit card details using advanced security
                protocols. <br />
                We ensure that your sensitive information is converted into a
                secure code that protects against unauthorized access.
              </p>
            </div>
            <div className="flex justify-center animate-pulse">
              <Image
                src={EncryptShield}
                alt={"EncryptShield"}
                width={160}
                height={160}
                className="dark:grayscale"
              />
            </div>
            <div className="flex justify-center mt-1 mb-4 text-sm md:text-base">
              Loading{dots}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EncryptCard;

"use client";
import React, { useState } from "react";
import {
  ShoppingBagIcon,
  ShoppingCartIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import ShoppingCartDetails from "./ShoppingCartDetails";
import { Fade } from "react-awesome-reveal";
import AuthModal from "../Modals/AuthModal";

const ShoppingCartDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [AuthModalIsOpen, setAuthModalIsOpen] = useState<boolean>(false);

  const handleAuthModal = () => {
    setAuthModalIsOpen(!AuthModalIsOpen);
  };
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="relative">
        <ShoppingCartIcon
          className="h-5 w-5 m-1 cursor-pointer hover:animate-spin-once"
          onClick={toggleDropdown}
        />
      </div>
      {isOpen && (
        <Fade className="fixed z-40">
          <div
            className={`fixed top-0 right-0 sm:mt-[2.6rem] sm:mx-2 pt-1 w-full sm:w-96 h-full sm:h-auto border bg-white dark:bg-slate-950 shadow-xl rounded-lg transition-all ease-out ${
              isOpen
                ? "duration-300 opacity-100 translate-y-0"
                : "duration-300 opacity-0 translate-y-0 pointer-events-none"
            }`}
          >
            <div className="flex justify-between px-2">
              <div className="flex items-center text-base text-naivyBlue dark:text-glowGreen">
                Your Bag
                <span>
                  <ShoppingBagIcon className="h-4 w-4 mx-1" />
                </span>
              </div>
              <div
                className="text-naivyBlue dark:text-glowGreen cursor-pointer"
                onClick={toggleDropdown}
              >
                <XMarkIcon className="h-6 w-6" />
              </div>
            </div>
            <div>
              <ShoppingCartDetails
                handleAuthModal={handleAuthModal}
                toggleDropdown={toggleDropdown}
              />
            </div>
          </div>
        </Fade>
      )}
      {AuthModalIsOpen && (
        <div className="absolute top-0 left-0 w-full h-full z-50">
          <AuthModal handleAuthModal={handleAuthModal} />
        </div>
      )}
    </>
  );
};

export default ShoppingCartDropdown;

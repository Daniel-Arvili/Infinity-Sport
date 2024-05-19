"use client";
import React from "react";
import { InformationCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface PolicyModalProps {
  handlePolicyModal: () => void;
}

function PolicyModal({ handlePolicyModal }: PolicyModalProps) {
  return (
    <>
      <div className="fixed inset-0 bg-white dark:bg-slate-950 bg-opacity-50 dark:bg-opacity-70">
        <div className="relative w-[95%] md:w-3/6 lg:w-2/6 my-32 mx-auto border shadow-lg rounded-md bg-white dark:bg-slate-950 z-50">
          <div className="flex flex-col py-4 px-2 sm:px-4">
            <div className="flex justify-between">
              <div className="flex items-center text-lg leading-6 font-medium text-naivyBlue dark:text-glowGreen">
                Return or Exchange Policy
                <span>
                  <InformationCircleIcon className="h-7 w-7 ml-1" />
                </span>
              </div>
              <div className="z-10">
                <XMarkIcon
                  className="h-6 w-6 cursor-pointer text-naivyBlue dark:text-glowGreen"
                  onClick={handlePolicyModal}
                />
              </div>
            </div>

            <div>
              <p className="text-xs sm:text-sm md:text-base my-4">
                <strong>Thank you for shopping at Infinity Sport.</strong>
                <br />
                If you are notentirely satisfied with your purchase, we&apos;re
                here to help.
                <br />
                Youcan return or exchange your product for up to 30 days from
                the date you purchased it.
                <br />
                Products must be in the condition you received them and in the
                original box and/or packaging.
                <br />
                Returns or exchanges are not accepted for worn, used or damaged
                items, unless defective. Please provide a receipt or proof of
                purchase for any return or exchange requests.
                <br />
                Refunds will be processed to the original method of payment.
                <br />
                For exchanges, please note the item and size you wish to
                receive. If you have any questions or require assistance, please
                contact our customer support team.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PolicyModal;

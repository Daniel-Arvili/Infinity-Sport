import Link from "next/link";
import React from "react";
import UserTrigger from "./UserTrigger";
import MainPaymentComponent from "./MainPaymentComponent";

export default function page() {
  return (
    <main className="h-full">
      <div className="absolute inset-0 sm:p-4 bg-gray-100 dark:bg-slate-900 z-50">
        <div className="bg-white dark:bg-slate-950 sm:rounded-xl p-2">
          <div className="flex justify-between items-center">
            <div className="flex text-xs sm:text-sm md:text-base text-gray-500 space-x-1">
              <Link href="/" className="hover:scale-105">
                Home Page
              </Link>
              <p>/</p>
              <Link
                href={"/paymentpage"}
                className="hover:scale-105 text-gray-800 dark:text-gray-200 font-medium"
              >
                Payment Page
              </Link>
            </div>
            <div className="flex text-sm sm:text-base">
              <UserTrigger />
            </div>
          </div>
          <h1 className="text-xl sm:text-3xl font-medium">Payment</h1>
        </div>
        <div className="flex mt-4 bg-white dark:bg-slate-950 rounded-xl p-1 sm:p-2 md:p-4">
          <MainPaymentComponent />
        </div>
      </div>
    </main>
  );
}

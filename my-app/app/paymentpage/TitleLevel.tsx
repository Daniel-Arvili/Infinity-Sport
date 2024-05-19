import React from "react";

type TitleLevelProps = {
  currentLevel: string;
};

const TitleLevel = ({ currentLevel }: TitleLevelProps) => {
  return (
    <div className="flex justify-center mx-auto px-2 sm:px-4 py-2 sm:py-4 w-full lg:w-3/4">
      <div className="flex justify-between border-b border-gray-200 dark:border-gray-500 text-xs sm:text-sm md:text-base w-full sm:w-5/6">
        <div
          className={`pb-2 ${
            currentLevel === "OrderDetails"
              ? "border-b-2 border-black dark:border-white"
              : "text-gray-500"
          }`}
        >
          Order Details
        </div>
        <div
          className={`pb-2 ${
            currentLevel === "PaymentDetails"
              ? "border-b-2 border-black dark:border-white"
              : "text-gray-500"
          }`}
        >
          Payment Details
        </div>
        <div
          className={`pb-2 ${
            currentLevel === "Confirmation"
              ? "border-b-2 border-black dark:border-white"
              : "text-gray-500"
          }`}
        >
          Confirmation
        </div>
      </div>
    </div>
  );
};
export default TitleLevel;

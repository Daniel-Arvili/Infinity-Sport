import React, { SetStateAction } from "react";
import Image from "next/image";
import VisaLogo from "./CardLogos/visa.png";
import MasterCardLogo from "./CardLogos/mastercard.png";
import ChipLogo from "./CardLogos/chip.png";
import WifiLogo from "./CardLogos/wifi.png";

type AddCardProps = {
  cardNumber: string;
  Cvv: string;
  Exp: string;
};

const AddCard: React.FC<AddCardProps> = ({ cardNumber, Cvv, Exp }) => {
  const formatCardNumber = (number: string) => {
    if (number) {
      const cleanNumber = number.replace(/\D/g, "");
      const maskedSection =
        cleanNumber.length > 12
          ? "*".repeat(12) + cleanNumber.substring(12)
          : "*".repeat(cleanNumber.length);

      const formattedNumber = maskedSection.match(/.{1,4}/g)?.join(" ") || "";
      return formattedNumber;
    }
  };
  return (
    <div
      className={`p-3 w-[17rem] sm:w-96 h-50 sm:h-56 bg-[url('https://i.ibb.co/kqbyTdP/glass-Effect.png')] bg-left rounded-xl shadow-2xl shadow-gray-700 flex flex-col justify-between backdrop-blur-lg my-2 mx-auto`}
    >
      <div className="flex justify-between">
        <Image
          src={MasterCardLogo}
          alt="Master Card Logo"
          width={42}
          height={42}
          className="invert lg:scale-110"
        />
        <Image
          src={VisaLogo}
          alt="Visa Logo"
          width={50}
          height={50}
          className="scale-y-75 lg:scale-125 lg:mt-1 lg:mr-1"
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="text-lg font-medium text-white">
          {cardNumber && cardNumber.length > 0
            ? formatCardNumber(cardNumber)
            : "**** **** **** ****"}
        </div>
        <Image
          src={WifiLogo}
          alt="Wifi Logo"
          width={30}
          height={30}
          className="invert"
        />
      </div>

      <div className="text-white">
        <div className="flex justify-between items-center mt-4">
          <div className="space-x-4">
            {Exp ? <span>Exp: {Exp}</span> : <span>Exp: {" MM/YY"}</span>}
            {Cvv ? <span>CVV: {Cvv}</span> : <span>CVV: {" ***"}</span>}
          </div>
          <Image
            src={ChipLogo}
            alt="Chip Logo"
            width={40}
            height={40}
            className="invert"
          />
        </div>
      </div>
    </div>
  );
};

export default AddCard;

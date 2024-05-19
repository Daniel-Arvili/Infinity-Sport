import React from "react";
import VisaLogo from "./CardLogos/visa.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";

type CreditCardInfo = {
  last4Digits: string;
  year: number;
  month: number;
};

interface SavedCreditCardsProps {
  creditCards: CreditCardInfo[];
  handlePayment: (PaymentMethod: string) => void;
}

const SavedCreditCards: React.FC<SavedCreditCardsProps> = ({
  creditCards,
  handlePayment,
}) => {
  return (
    <div className="flex flex-col">
      <div className="text-center text-sm sm:text-base md:text-lg mt-12 mb-1 text-naivySky dark:text-glowGreen">
        Saved Cards for Quick Checkout
      </div>
      <div className="flex flex-wrap justify-center items-center">
        {creditCards.map((card, index) => (
          <div key={index} className="m-1">
            <Button
              variant={"outline"}
              className="flex flex-row items-center border border-naivyBlue dark:border-white py-8"
              onClick={() => handlePayment("Saved Credit Card")}
            >
              <Image
                src={VisaLogo}
                alt="VisaLogo"
                width={40}
                height={40}
                className="invert dark:invert-0 mx-1 sm:mr-2 lg:mr-4 sm:scale-125 lg:scale-150"
              />
              <div className="flex flex-col items-start text-black dark:text-white text-xxs sm:text-xs lg:text-sm mr-1">
                <div>4 Digits: {card.last4Digits}</div>
                <div>
                  Exp: {card.month}/{card.year}
                </div>
              </div>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default SavedCreditCards;

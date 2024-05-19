"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import VisaLogo from "@/app/paymentpage/CardLogos/visa.png";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ClipLoader from "react-spinners/ClipLoader";
import { DeleteExistCreditCard } from "../ServerAction/ServerAction";

type CreditCardInfo = {
  last4Digits: string;
  year: number;
  month: number;
};

interface CreditCardsProps {
  UserCreditCards: CreditCardInfo[];
}
const CreditCards: React.FC<CreditCardsProps> = ({ UserCreditCards }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [accordionKey, setAccordionKey] = useState(0);

  const handleDelete = async (Card: CreditCardInfo) => {
    setIsLoading(true);
    await DeleteExistCreditCard(Card);
    setAccordionKey((prevKey) => prevKey + 1);
    router.refresh();
    setIsLoading(false);
  };

  return (
    <>
      {isLoading ? (
        <div className="flex flex-col py-8 items-center w-full">
          <ClipLoader
            size={32}
            color="#FFFFFF dark:#9ffd32"
            className="text-naivyBlue dark:text-glowGreen"
          />
          <p className="text-lg mt-4 text-gray-600">Deleting Card ... </p>
        </div>
      ) : (
        <div className="w-full sm:w-4/5 mx-auto my-4 px-4">
          <Accordion
            type="single"
            collapsible
            className="w-full"
            key={accordionKey}
          >
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-naivyBlue dark:text-glowGreen">
                Click here to see payment methods
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-wrap justify-center">
                  {UserCreditCards.map((card, index) => (
                    <div key={index} className="m-1">
                      <Button
                        variant={"outline"}
                        className="flex flex-row items-center border py-8 cursor-auto"
                      >
                        <Image
                          src={VisaLogo}
                          alt="VisaLogo"
                          width={35}
                          height={35}
                          className="invert dark:invert-0 ml-1 mr-4 sm:scale-125 lg:scale-150"
                        />
                        <div className="flex flex-col items-start text-black dark:text-white text-xxs sm:text-xs lg:text-xs mr-2">
                          <div>4 Digits: {card.last4Digits}</div>
                          <div>
                            Exp: {card.month}/{card.year}
                          </div>
                        </div>
                        <Button
                          variant={"outline"}
                          className="ml-2 hover:bg-red-600 text-red-600 hover:text-white border border-red-500 px-2"
                          onClick={() => handleDelete(card)}
                        >
                          Delete
                        </Button>
                      </Button>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      )}
    </>
  );
};
export default CreditCards;

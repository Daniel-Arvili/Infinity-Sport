import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowRightIcon,
  ArrowUturnLeftIcon,
} from "@heroicons/react/24/outline";
import React, { SetStateAction, useState } from "react";
import InputMask from "react-input-mask";

type CardDetailsProps = {
  Session: boolean;
  SaveCart: boolean;
  setSaveCart: React.Dispatch<SetStateAction<boolean>>;
  GuestName: string;
  setGuestName: React.Dispatch<SetStateAction<string>>;
  cardNumber: string;
  Cvv: string;
  Exp: string;
  setCardNumber: React.Dispatch<SetStateAction<string>>;
  setCvv: React.Dispatch<SetStateAction<string>>;
  setExp: React.Dispatch<SetStateAction<string>>;
  setCurrentLevel: React.Dispatch<SetStateAction<string>>;
  handlePayment: (PaymentMethod: string) => void;
};

const CardDetails: React.FC<CardDetailsProps> = ({
  Session,
  SaveCart,
  setSaveCart,
  GuestName,
  setGuestName,
  cardNumber,
  Cvv,
  Exp,
  setCardNumber,
  setCvv,
  setExp,
  setCurrentLevel,
  handlePayment,
}) => {
  const [expDateError, setExpDateError] = useState<boolean>(false);
  const [CvvError, setCvvError] = useState<boolean>(false);
  const [cardNumberError, setcardNumberError] = useState<boolean>(false);
  const [cardNumberValid, setCardNumberValid] = useState<boolean>(false);
  const [cvvValid, setCvvValid] = useState<boolean>(false);
  const [expValid, setExpValid] = useState<boolean>(false);
  const [ErrorGuestName, setErrorGuestName] = useState<boolean>(false);

  const handleGuestName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGuestName(e.target.value);
    setErrorGuestName(false);
  };
  const checkFullNameInput = (test: string) => {
    const words = test.split(" ").filter((word) => word.length > 0);
    if (words.length === 2 && words.every((word) => word.length > 1)) {
      setGuestName(test);
      return true;
    } else {
      setGuestName(test);
      return false;
    }
  };
  const handleSaveCart = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSaveCart(e.target.checked);
  };

  const handleCardNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const onlyDigits = event.target.value.replace(/\D/g, "");
    setcardNumberError(false);
    setCardNumber(onlyDigits);
    setCardNumberValid(onlyDigits.length === 16);
  };

  const handleExpChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExpDateError(false);
    let input = event.target.value.replace(/\D/g, "");
    let month = input.substring(0, 2);
    let year = input.substring(2, 4);
    if (month.length === 2 && year.length === 0 && !Exp.includes("/")) {
      month += "/";
    } else if (month.length === 2 && year.length > 0) {
      month += "/";
    }

    const newValue = month + year;
    setExp(newValue);
    const inputMonth = parseInt(month.slice(0, 2), 10);
    const inputYear = parseInt(year, 10);
    if (newValue.length >= 2) {
      if (inputMonth < 1 || inputMonth > 12) {
        setExpDateError(true);
        setExpValid(false);
        return;
      }
    }
    if (newValue.length === 5) {
      const currentYear = new Date().getFullYear() % 100;
      const currentMonth = new Date().getMonth() + 1;
      const isValid = !(
        inputYear < currentYear ||
        (inputYear === currentYear && inputMonth < currentMonth)
      );
      setExpDateError(!isValid);
      setExpValid(isValid);
    }
  };

  const handleCvvChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value.replace(/\D/g, "");
    setCvvError(false);
    setCvv(input);
    setCvvValid(input.length === 3);
  };

  const handleContinue = () => {
    if (!cardNumberValid || !cardNumber) {
      setcardNumberError(true);
      return;
    }
    if (!expValid || !Exp) {
      setExpDateError(true);
      return;
    }
    if (!cvvValid) {
      setCvvError(true);
      return;
    }
    if (!Session && !checkFullNameInput(GuestName)) {
      setErrorGuestName(true);
      return;
    }
    if (cardNumberValid && cvvValid && expValid) {
      handlePayment("Credit card");
    } else {
      return;
    }
  };

  return (
    <div className="w-[95%] mx-4 bg-white dark:bg-slate-950 dark:border rounded-xl -mt-8 mb-4">
      <div className="flex flex-col px-4 pb-8 sm:px-8">
        <div className="text-sm sm:text-base md:text-lg mt-12 mb-1 text-naivySky dark:text-glowGreen">
          Card Number:
        </div>
        <div className="text-xxs sm:text-xs md:text-sm mb-1">
          Enter the 16-digit card number of your card
        </div>
        <InputMask
          mask="9999 9999 9999 9999"
          value={cardNumber}
          onChange={handleCardNumberChange}
          maskChar="*"
          alwaysShowMask={true}
          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-500 bg-white dark:bg-slate-950 bg-clip-padding border rounded transition ease-in-out m-0 focus:text-gray-500 focus:bg-white focus:border-black dark:focus:border-white focus:outline-none"
          placeholder="Enter card number"
        />
        {cardNumberError ? (
          <p className="text-sm text-red-600">Enter a valid card number</p>
        ) : null}
        <div className="flex flex-row justify-between items-center mt-2">
          <div className="text-sm sm:text-base md:text-lg text-naivySky dark:text-glowGreen">
            Expiration date
          </div>
          <Input
            className="w-20"
            type="text"
            inputMode="numeric"
            maxLength={5}
            value={Exp}
            onChange={handleExpChange}
            placeholder="MM/YY"
          />
        </div>
        {expDateError ? (
          <p className="text-sm text-red-600">Enter a valid expiration date</p>
        ) : null}
        <div className="flex flex-row justify-between items-center mt-2">
          <div className="text-sm sm:text-base md:text-lg text-naivySky dark:text-glowGreen">
            CVV
          </div>
          <Input
            className="w-20"
            type="text"
            inputMode="numeric"
            maxLength={3}
            value={Cvv}
            onChange={handleCvvChange}
            placeholder="CVV"
          />
        </div>
        {CvvError ? (
          <p className="text-sm text-red-600">Enter a valid CVV</p>
        ) : null}
        {Session ? (
          <div className="flex items-center space-x-2 mt-2">
            <input
              id="SaveCart"
              type="checkbox"
              name="SaveCart"
              checked={SaveCart}
              onChange={handleSaveCart}
              className="w-4 h-4"
            />
            <Label className="text-base text-naivyBlue dark:text-glowGreen">
              Save this card for future transactions
            </Label>
          </div>
        ) : (
          <div className="flex flex-col mt-2">
            <Label className="text-sm sm:text-base md:text-lg text-naivyBlue dark:text-glowGreen mb-1">
              Insert full name:
            </Label>
            <Input
              id="GuestName"
              type="text"
              name="GuestName"
              value={GuestName || ""}
              onChange={handleGuestName}
            />
            {ErrorGuestName ? (
              <p className="text-sm text-red-600">
                Insert currect name and last name
              </p>
            ) : null}
          </div>
        )}
        <div className="flex justify-between py-8">
          <Button
            variant={"outline"}
            className="text-sm sm:text-lg md:text-xl hover:scale-105"
            onClick={() => setCurrentLevel("OrderDetails")}
          >
            <span>
              <ArrowUturnLeftIcon className="h-3 w-4 sm:h-4 sm:w-4 md:h-5 md:w-5 mr-1" />
            </span>
            Back
          </Button>
          <Button
            variant={"outline"}
            className="text-sm sm:text-lg md:text-xl hover:scale-105 bg-naivyBlue hover:bg-naivyBlue/80 hover:text-white text-white dark:text-black dark:bg-glowGreen dark:hover:bg-glowGreen/70 dark:hover:text-black"
            onClick={() => handleContinue()}
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

export default CardDetails;

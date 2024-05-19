import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import StateSelect from "./StateSelect";
import { US_STATES_WITH_FLAGS } from "@/src/lib/usa";
import ClipLoader from "react-spinners/ClipLoader";
import { getSession, setAddress } from "../ServerAction/ServerAction";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";

interface AddressFormValues {
  city: string;
  street: string;
  homeNumber: string;
  apartmentNumber: string;
  state: string;
}

interface AddressFormErrors {
  city?: string;
  street?: string;
  homeNumber?: string;
  apartmentNumber?: string;
  state?: string;
}
type InsertAddressProps = {
  setAddressComponentOpen: (isOpen: boolean) => void;
  setFlagEditAddress: (FlagEditAddress: boolean) => void;
};
const InsertAddress: React.FC<InsertAddressProps> = ({
  setAddressComponentOpen,
  setFlagEditAddress,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [values, setValues] = useState<AddressFormValues>({
    city: "",
    street: "",
    homeNumber: "",
    apartmentNumber: "",
    state: "",
  });

  const [errors, setErrors] = useState<AddressFormErrors>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    if (errors && errors[name as keyof AddressFormErrors]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const validateForm = () => {
    const newErrors: AddressFormErrors = {};
    if (!values.city) newErrors.city = "City is required";
    if (!values.street) newErrors.street = "Street is required";
    if (!values.homeNumber) newErrors.homeNumber = "Home number is required";
    if (!values.apartmentNumber)
      newErrors.apartmentNumber = "Apartment number is required";
    if (!values.state) newErrors.state = "State is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      if (await getSession()) {
        await setAddress(values);
      } else {
        localStorage.setItem("userAddress", JSON.stringify(values));
      }
      setFlagEditAddress(false);
      setAddressComponentOpen(false);
    }
  };

  const handleBackToCart = () => {
    setFlagEditAddress(false);
    setAddressComponentOpen(false);
  };

  const handleStateChange = (newValue: string) => {
    setValues({ ...values, state: newValue });
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
          <p className="text-lg mt-4 text-gray-600">Adding Address ... </p>
        </div>
      ) : (
        <div className="flex flex-col py-2">
          <Button
            variant={"outline"}
            className="w-28 px-1 mx-2 text-naivySky dark:text-glowGreen hover:text-naivySky hover:dark:text-glowGreen"
            onClick={() => handleBackToCart()}
          >
            <div className="flex justify-center">
              <span>
                <ArrowUturnLeftIcon className="h-4 w-4 mr-1" />
              </span>
              Back to cart
            </div>
          </Button>
          <div className="text-center text-lg text-naivyBlue dark:text-glowGreen">
            Add Address
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col rounded w-4/5 mx-auto justify-center px-2 space-y-4"
          >
            <div className="flex flex-col sm:justify-between space-y-2">
              <div className="">
                <StateSelect
                  label="State"
                  options={US_STATES_WITH_FLAGS}
                  value={values.state || ""}
                  onChange={handleStateChange}
                />
                {errors && errors.state && (
                  <p className="text-xs lg:text-sm text-red-600">
                    {errors.state}
                  </p>
                )}
              </div>
              <div className="flex flex-col ">
                <Label
                  htmlFor="city"
                  className="text-xs lg:text-sm text-naivySky dark:text-glowGreen"
                >
                  City
                </Label>
                <Input
                  id="city"
                  type="text"
                  name="city"
                  value={values.city}
                  onChange={handleChange}
                />
                {errors && errors.city && (
                  <p className="text-xs lg:text-sm text-red-600">
                    {errors.city}
                  </p>
                )}
              </div>
              <div className="flex flex-col ">
                <Label
                  htmlFor="street"
                  className="text-xs lg:text-sm text-naivySky dark:text-glowGreen"
                >
                  Street
                </Label>
                <Input
                  id="street"
                  type="text"
                  name="street"
                  value={values.street}
                  onChange={handleChange}
                />
                {errors && errors.street && (
                  <p className="text-xs lg:text-sm text-red-600">
                    {errors.street}
                  </p>
                )}
              </div>
            </div>
            <div className="flex sm:flex-row sm:justify-between space-x-4">
              <div className="flex flex-col">
                <Label
                  htmlFor="homeNumber"
                  className="text-xs lg:text-sm text-naivySky dark:text-glowGreen"
                >
                  Home Number
                </Label>
                <Input
                  id="homeNumber"
                  type="number"
                  name="homeNumber"
                  value={values.homeNumber}
                  onChange={handleChange}
                  min="0"
                />
                {errors && errors.homeNumber && (
                  <p className="text-xs lg:text-sm text-red-600">
                    {errors.homeNumber}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <Label
                  htmlFor="apartmentNumber"
                  className="text-xs lg:text-sm whitespace-nowrap text-naivySky dark:text-glowGreen"
                >
                  Apartment Number
                </Label>
                <Input
                  id="apartmentNumber"
                  type="number"
                  name="apartmentNumber"
                  value={values.apartmentNumber}
                  onChange={handleChange}
                  min="0"
                />
                {errors && errors.apartmentNumber && (
                  <p className="text-xs lg:text-sm text-red-600">
                    {errors.apartmentNumber}
                  </p>
                )}
              </div>
            </div>
            <Button
              type="submit"
              variant={"outline"}
              className="self-center text-naivySky dark:text-glowGreen hover:text-naivySky hover:dark:text-glowGreen"
            >
              Confirm
            </Button>
          </form>
        </div>
      )}
    </>
  );
};

export default InsertAddress;

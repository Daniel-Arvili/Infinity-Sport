import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { US_STATES_WITH_FLAGS } from "@/src/lib/usa";
import ClipLoader from "react-spinners/ClipLoader";
import { UpdateAddress } from "../ServerAction/ServerAction";
import { XMarkIcon } from "@heroicons/react/24/outline";
import StateSelect from "../navbar/StateSelect";
import { useRouter } from "next/navigation";

type Address = {
  state: string;
  city: string;
  street: string;
  homeNumber: number;
  apartmentNumber: number;
};

interface AddressFormErrors {
  city?: string;
  street?: string;
  homeNumber?: string;
  apartmentNumber?: string;
  state?: string;
}
type InsertAddressProps = {
  UserAddress: Address;
  handleEditAddress: () => void;
};
const InsertAddress: React.FC<InsertAddressProps> = ({
  UserAddress,
  handleEditAddress,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [values, setValues] = useState<Address>({
    city: UserAddress.city,
    street: UserAddress.street,
    homeNumber: UserAddress.homeNumber,
    apartmentNumber: UserAddress.apartmentNumber,
    state: UserAddress.state,
  });
  const router = useRouter();

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
      await UpdateAddress(values);
      router.refresh();
      handleEditAddress();
    }
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
          <div className="flex justify-between pb-2 w-full sm:w-4/5 mx-auto">
            <div className="text-base sm:text-xl text-naivyBlue dark:text-glowGreen">
              Edit Address{" "}
            </div>
            <XMarkIcon
              className="h-6 w-6 cursor-pointer"
              onClick={() => handleEditAddress()}
            />
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col rounded w-full sm:w-4/5 mx-auto justify-center px-2 space-y-4"
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
                  <p className="text-sm text-red-600">{errors.state}</p>
                )}
              </div>
              <div className="flex flex-col ">
                <Label
                  htmlFor="city"
                  className="text-sm text-naivySky dark:text-glowGreen"
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
                  <p className="text-sm text-red-600">{errors.city}</p>
                )}
              </div>
              <div className="flex flex-col ">
                <Label
                  htmlFor="street"
                  className="text-sm text-naivySky dark:text-glowGreen"
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
                  <p className="text-sm text-red-600">{errors.street}</p>
                )}
              </div>
            </div>
            <div className="flex sm:flex-row sm:justify-between space-x-4">
              <div className="flex flex-col">
                <Label
                  htmlFor="homeNumber"
                  className="text-sm text-naivySky dark:text-glowGreen"
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
                  <p className="text-sm text-red-600">{errors.homeNumber}</p>
                )}
              </div>
              <div className="flex flex-col">
                <Label
                  htmlFor="apartmentNumber"
                  className="text-sm whitespace-nowrap text-naivySky dark:text-glowGreen"
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
                  <p className="text-sm text-red-600">
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

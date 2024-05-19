import React, { Dispatch, SetStateAction, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { US_STATES_WITH_FLAGS } from "@/src/lib/usa";
import ClipLoader from "react-spinners/ClipLoader";
import StateSelect from "../navbar/StateSelect";
import { useRouter } from "next/navigation";
import { getSession, setAddress } from "../ServerAction/ServerAction";

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
  setFlagAddressAdded: Dispatch<SetStateAction<boolean>>;
};
const InsertAddress: React.FC<InsertAddressProps> = ({
  setFlagAddressAdded,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [values, setValues] = useState<AddressFormValues>({
    city: "",
    street: "",
    homeNumber: "",
    apartmentNumber: "",
    state: "",
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
      if (await getSession()) {
        await setAddress(values);
      } else {
        localStorage.setItem("userAddress", JSON.stringify(values));
      }
      setIsLoading(false);
      setFlagAddressAdded(true);
    }
  };

  const handleStateChange = (newValue: string) => {
    setValues({ ...values, state: newValue });
  };

  return (
    <>
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-16">
          <ClipLoader
            color="#FFFFFF dark:#9ffd32"
            className="text-naivyBlue dark:text-glowGreen"
            size={32}
          />
          <p className="text-center pt-4 text-base lg:text-lg">Loading ...</p>
        </div>
      ) : (
        <div className="flex flex-col py-2 w-full lg:w-1/2 mx-auto">
          <div className="text-center text-base sm:text-xl text-naivyBlue dark:text-glowGreen">
            Edit Address{" "}
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

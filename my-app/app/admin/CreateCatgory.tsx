"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { CreateNewCatgory } from "../ServerAction/ServerAction";
import ClipLoader from "react-spinners/ClipLoader";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";

interface CreateCategoryProps {
  handleClickCategory: () => void;
}
const CreateCategory: React.FC<CreateCategoryProps> = ({
  handleClickCategory,
}) => {
  const [CatgoryName, setCatgoryName] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCatgoryName(e.target.value);
  };

  const createCatgoryFunction = async () => {
    setIsLoading(true);
    if (CatgoryName) {
      const craete = await CreateNewCatgory(CatgoryName);
      setIsLoading(false);
    }
  };
  return (
    <>
      {isLoading ? (
        <div className="flex flex-col justify-center items-center py-8">
          <ClipLoader size={32} color="#000000 dark:#FFFFFF" />
          <p className="text-lg mt-4 text-gray-600">Loading ...</p>
        </div>
      ) : (
        <>
          <div className="flex flex-col">
            <div className="flex items-center justify-start">
              <Button
                className="text-xs sm:text-sm"
                variant={"outline"}
                onClick={() => handleClickCategory()}
              >
                <span>
                  <ArrowUturnLeftIcon className="h-3 w-3 mr-2" />
                </span>
                Back
              </Button>
            </div>
            <h1 className="text-center"> Add Category</h1>
          </div>
          <div className="flex rounded w-full sm:w-3/5 mx-auto justify-center px-2 py-4">
            <div className="mb-4 space-y-2">
              <Label className="text-base">Catgory Name</Label>
              <Input
                id="name"
                type="text"
                value={CatgoryName}
                onChange={handleChange}
              />
              <div className="flex items-center justify-center pt-4">
                <Button variant={"outline"} onClick={createCatgoryFunction}>
                  Add Catgory
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default CreateCategory;

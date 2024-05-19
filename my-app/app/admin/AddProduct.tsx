"use client";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import {
  CreateNewProduct,
  GetAllcategories,
} from "../ServerAction/ServerAction";
import { ArrowUturnLeftIcon, CheckIcon } from "@heroicons/react/24/outline";
import { cn } from "@/src/lib/utils";
import { CaretSortIcon } from "@radix-ui/react-icons";
import ClipLoader from "react-spinners/ClipLoader";
import { Textarea } from "@/components/ui/textarea";

interface AddProductProps {
  handleClickProduct: () => void;
}
const AddProduct: React.FC<AddProductProps> = ({ handleClickProduct }) => {
  const [name, setName] = useState<string>();
  const [manufacturer, setManufacturer] = useState<string>();
  const [price, setPrice] = useState<number>();
  const [image, setImage] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [color, setColor] = useState<string>();
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [size, setSize] = useState<string>();
  const [quantity, setQuantity] = useState<number>();
  const [onSale, setOnSale] = useState<boolean>(false);
  const [salePercent, setSalePercent] = useState<number>();
  const [categories, setCategories] = useState<
    Array<{ id: number; name: string }>
  >([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [ErrorName, setErrorName] = useState<boolean>(false);
  const [ErrorManufacturer, setErrorManufacturer] = useState<boolean>(false);
  const [ErrorPrice, setErrorPrice] = useState<boolean>(false);
  const [ErrorImage, setErrorImage] = useState<boolean>(false);
  const [ErrorDescription, setErrorDescription] = useState<boolean>(false);
  const [ErrorColor, setErrorColor] = useState<boolean>(false);
  const [ErrorSize, setErrorSize] = useState<boolean>(false);
  const [ErrorQuantity, setErrorQuantity] = useState<boolean>(false);
  const [ErrorSalePercent, setErrorSalePercent] = useState<boolean>(false);
  const [ErrorCategory, setErrorCategory] = useState<boolean>(false);
  const [uploadSuccessful, setuploadSuccessful] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    switch (name) {
      case "name":
        setErrorName(false);
        setName(value);
        break;
      case "manufacturer":
        setErrorManufacturer(false);
        setManufacturer(value);
        break;
      case "price":
        setErrorPrice(false);
        setPrice(parseFloat(value));
        break;
      case "image":
        setErrorImage(false);
        setImage(value);
        break;
      case "color":
        setErrorColor(false);
        setColor(value);
        break;
      case "quantity":
        setErrorQuantity(false);
        setQuantity(parseInt(value, 10));
      case "onSale":
        setOnSale(checked);
        break;
      case "salePercent":
        setErrorSalePercent(false);
        setSalePercent(parseFloat(value));
        break;
      default:
        break;
    }
  };

  const handleChangeTextArea = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setErrorDescription(false);
    setDescription(event.target.value);
  };
  const handleChangeSizeTextArea = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setErrorSize(false);
    setSize(event.target.value);
  };

  function isValidUrl(urlString: string) {
    try {
      new URL(urlString);
      return true;
    } catch (e) {
      return false;
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (name == null || name === "") {
      setErrorName(true);
      setIsLoading(false);
      return;
    }
    if (manufacturer == null || manufacturer === "") {
      setErrorManufacturer(true);
      setIsLoading(false);
      return;
    }
    if (price == null || Number.isNaN(price)) {
      setErrorPrice(true);
      setIsLoading(false);
      return;
    }
    if (image == null || image === "") {
      setErrorImage(true);
      setIsLoading(false);
      return;
    }
    if (!isValidUrl(image)) {
      setErrorImage(true);
      setIsLoading(false);
      return;
    }
    if (size == null || size === "") {
      setErrorSize(true);
      setIsLoading(false);
      return;
    }
    if (color == null || color === "") {
      setErrorColor(true);
      setIsLoading(false);
      return;
    }
    if (quantity == null || Number.isNaN(quantity)) {
      setErrorQuantity(true);
      setIsLoading(false);
      return;
    }
    if (categoryId == null) {
      setErrorCategory(true);
      setIsLoading(false);
      return;
    }
    if (
      (onSale && salePercent == null) ||
      (onSale && Number.isNaN(salePercent))
    ) {
      setErrorSalePercent(true);
      setIsLoading(false);
      return;
    }
    if (description == null || description === "") {
      setErrorDescription(true);
      setIsLoading(false);
      return;
    }
    await CreateNewProduct(
      name,
      manufacturer,
      price,
      image,
      description,
      color,
      categoryId,
      size,
      quantity,
      onSale,
      salePercent ? salePercent : 0
    );
    setuploadSuccessful(true);
    setIsLoading(false);
  };

  useEffect(() => {
    const FetchAllCategories = async () => {
      const data = await GetAllcategories();
      data && setCategories(data);
    };
    FetchAllCategories();
  }, [value]);

  return (
    <>
      {isLoading ? (
        <div className="flex flex-col justify-center items-center py-8">
          <ClipLoader size={32} color="#000000 dark:#FFFFFF" />
          <p className="text-lg mt-4 text-gray-600">Loading ...</p>
        </div>
      ) : (
        <>
          {!uploadSuccessful ? (
            <>
              <div className="flex flex-col">
                <div className="flex items-center justify-start">
                  <Button
                    className="text-xs sm:text-sm"
                    variant={"outline"}
                    onClick={() => handleClickProduct()}
                  >
                    <span>
                      <ArrowUturnLeftIcon className="h-3 w-3 mr-2" />
                    </span>
                    Back
                  </Button>
                </div>
                <h1 className="text-center"> Add Product</h1>
              </div>
              <form
                onSubmit={handleSubmit}
                className="flex rounded w-full sm:w-3/5 mx-auto justify-center px-2"
              >
                <div className="flex flex-col mb-4 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:space-x-2">
                    <div className="flex flex-col">
                      <Label className="text-base">Name</Label>
                      <Input
                        id="name"
                        type="text"
                        name="name"
                        value={name}
                        onChange={handleChange}
                      />
                      {ErrorName ? (
                        <p className="text-sm text-red-600">
                          Insert currect name
                        </p>
                      ) : null}
                    </div>
                    <div className="flex flex-col">
                      <Label className="text-base">Manufacturer</Label>
                      <Input
                        id="manufacturer"
                        type="text"
                        name="manufacturer"
                        value={manufacturer}
                        onChange={handleChange}
                      />
                      {ErrorManufacturer ? (
                        <p className="text-sm text-red-600">
                          Insert currect Manufacturer
                        </p>
                      ) : null}
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:space-x-2">
                    <div className="flex flex-col">
                      <Label className="text-base">Price</Label>
                      <Input
                        id="price"
                        type="number"
                        name="price"
                        min={0}
                        value={price}
                        onChange={handleChange}
                      />
                      {ErrorPrice ? (
                        <p className="text-sm text-red-600">
                          Insert currect price
                        </p>
                      ) : null}
                    </div>
                    <div className="flex flex-col">
                      <Label className="text-base">Image Url</Label>
                      <Input
                        id="image"
                        type="text"
                        name="image"
                        value={image}
                        onChange={handleChange}
                      />
                      {ErrorImage ? (
                        <p className="text-sm text-red-600">
                          Insert currect image URL
                        </p>
                      ) : null}
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <Label className="text-base">Size</Label>
                    <Textarea
                      id="size"
                      name="size"
                      value={size}
                      onChange={handleChangeSizeTextArea}
                    />
                    {ErrorSize ? (
                      <p className="text-sm text-red-600">
                        Insert currect size
                      </p>
                    ) : null}
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:space-x-2">
                    <div className="flex flex-col">
                      <Label className="text-base">Color</Label>
                      <Input
                        id="color"
                        type="text"
                        name="color"
                        value={color}
                        onChange={handleChange}
                      />
                      {ErrorColor ? (
                        <p className="text-sm text-red-600">
                          Insert currect color
                        </p>
                      ) : null}
                    </div>
                    <div className="flex flex-col">
                      <Label className="text-base">Quantity</Label>
                      <Input
                        id="quantity"
                        type="number"
                        name="quantity"
                        min={0}
                        value={quantity}
                        onChange={handleChange}
                      />
                      {ErrorQuantity ? (
                        <p className="text-sm text-red-600">
                          Insert currect quantity
                        </p>
                      ) : null}
                    </div>
                  </div>
                  <Label className="text-base">category </Label>
                  {categories ? (
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className="w-[200px] justify-between"
                        >
                          {value ? value : "Select category..."}
                          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search category..."
                            className="h-9"
                          />
                          <CommandEmpty>No category found.</CommandEmpty>
                          <CommandGroup>
                            {categories.map((category) => (
                              <CommandItem
                                key={category.id}
                                value={category.name}
                                onSelect={(currentValue) => {
                                  setValue(
                                    currentValue === value ? "" : currentValue
                                  );
                                  setErrorCategory(false);
                                  setCategoryId(category.id);
                                  setOpen(false);
                                }}
                              >
                                {category.name}
                                <CheckIcon
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    value === category.name
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  ) : null}
                  {ErrorCategory ? (
                    <p className="text-sm text-red-600">Choose catgrory</p>
                  ) : null}
                  <div className="flex items-center space-x-2">
                    <input
                      id="onSale"
                      type="checkbox"
                      name="onSale"
                      checked={onSale || false}
                      onChange={handleChange}
                      className="w-4 h-4"
                    />
                    <Label className="text-base">On Sale ?</Label>
                  </div>
                  {onSale && (
                    <>
                      <Label className="text-base mt-4">Sale Percent</Label>
                      <Input
                        id="salePercent"
                        type="number"
                        name="salePercent"
                        min={0}
                        max={100}
                        value={salePercent}
                        onChange={handleChange}
                        className="mt-1"
                      />
                      {ErrorSalePercent ? (
                        <p className="text-sm text-red-600">
                          Insert currect sale percent
                        </p>
                      ) : null}
                    </>
                  )}
                  <Label className="text-base">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={description}
                    onChange={handleChangeTextArea}
                  />
                  {ErrorDescription ? (
                    <p className="text-sm text-red-600">
                      Insert currect description
                    </p>
                  ) : null}
                  <div className="flex items-center justify-center pt-4">
                    <Button variant={"outline"} type="submit">
                      Add Product
                    </Button>
                  </div>
                </div>
              </form>
            </>
          ) : (
            <div className="flex flex-row items-center">
              <p className="text-lg font-bold px-4 text-center">
                Upload Was Successful !
              </p>
              <CheckIcon className="h-4 w-4 mx-2" />
            </div>
          )}
        </>
      )}
    </>
  );
};
export default AddProduct;

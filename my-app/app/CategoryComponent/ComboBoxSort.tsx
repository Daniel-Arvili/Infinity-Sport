"use client";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { cn } from "@/src/lib/utils";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Product } from "@prisma/client";

const SortBy = [
  { value: "Default" },
  { value: "Most Popular" },
  { value: "Cheap To Expensive" },
  { value: "Expensive To Cheap" },
];

type ComboBoxSortProps = {
  sortedProducts: Product[];
  setSortedProducts: React.Dispatch<React.SetStateAction<Product[]>>;
};

export default function ComboBoxSort({
  sortedProducts,
  setSortedProducts,
}: ComboBoxSortProps) {
  const [sortDefault, setSortDefault] = useState<Product[]>(sortedProducts);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const handleSortChange = async (option: string) => {
    setValue(option);
    setOpen(false);

    let sortedProductsCopy = [...sortedProducts];

    switch (option) {
      case "Most Popular":
        sortedProductsCopy.sort((a, b) => {
          const SoldA = a.soldCount;
          const SoldB = b.soldCount;
          return SoldB - SoldA;
        });
        break;
      case "Cheap To Expensive":
        sortedProductsCopy.sort((a, b) => {
          const priceA = a.onSale
            ? (a.price * (100 - (a.salePercent || 0))) / 100
            : a.price;
          const priceB = b.onSale
            ? (b.price * (100 - (b.salePercent || 0))) / 100
            : b.price;
          return priceA - priceB;
        });
        break;
      case "Expensive To Cheap":
        sortedProductsCopy.sort((a, b) => {
          const priceA = a.onSale
            ? (a.price * (100 - (a.salePercent || 0))) / 100
            : a.price;
          const priceB = b.onSale
            ? (b.price * (100 - (b.salePercent || 0))) / 100
            : b.price;
          return priceB - priceA;
        });
        break;
      default:
        sortedProductsCopy = sortDefault;
        break;
    }
    setSortedProducts(sortedProductsCopy);
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="py-1 text-base">
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[180px] justify-between text-sm font-normal"
        >
          {value ? value : "Sort By..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[180px] p-0 text-base">
        <Command>
          <CommandGroup>
            {SortBy.map((SortOption) => (
              <CommandItem
                key={SortOption.value}
                value={SortOption.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  handleSortChange(SortOption.value);
                  setOpen(false);
                }}
              >
                {SortOption.value}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    value === SortOption.value ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "@heroicons/react/24/outline";
import { cn } from "@/src/lib/utils";
import { CaretSortIcon } from "@radix-ui/react-icons";

const NumbersPerPage = [
  { value: 12 },
  { value: 24 },
  { value: 30 },
  { value: 45 },
];

type NumberPerPageProps = {
  productPerPage: number;
  setProductPerPage: React.Dispatch<React.SetStateAction<number>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

export default function NumberPerPage({
  productPerPage,
  setProductPerPage,
  setCurrentPage,
}: NumberPerPageProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<number>(productPerPage);

  const handleSortChange = (option: number) => {
    setValue(option);
    setProductPerPage(option);
    setCurrentPage(1);
    setOpen(false);
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
          {value} Per Page
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[180px] p-0 text-base">
        {NumbersPerPage.map((option) => (
          <button
            key={option.value}
            className={cn(
              "block w-full text-left px-4 py-2 text-sm hover:bg-gray-100",
              value === option.value ? "font-semibold" : "font-normal"
            )}
            onClick={() => handleSortChange(option.value)}
          >
            {option.value}
            <CheckIcon
              className={cn(
                "ml-auto h-4 w-4",
                value === option.value ? "opacity-100" : "opacity-0"
              )}
            />
          </button>
        ))}
      </PopoverContent>
    </Popover>
  );
}

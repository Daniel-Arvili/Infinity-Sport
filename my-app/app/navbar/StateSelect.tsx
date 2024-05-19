import React, { useState, FC } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { StateOption } from "@/src/lib/usa";
import { Button } from "@/components/ui/button";

interface StateSelectProps {
  label: string;
  options: StateOption[];
  value: string;
  onChange: (newValue: string) => void;
}

const StateSelect: FC<StateSelectProps> = ({
  label,
  options,
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <label className="text-xs lg:text-sm text-naivySky dark:text-glowGreen">
        {label}
      </label>
      <Button
        type="button"
        className="flex justify-between items-center w-full px-4 py-2 text-black dark:text-white bg-white hover:bg-gray-100 dark:hover:bg-gray-900 dark:bg-slate-950 border rounded-md shadow-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="flex items-center">
          {value ? (
            <>
              <img
                src={options.find((option) => option.value === value)?.flagUrl}
                alt={options.find((option) => option.value === value)?.label}
                className="w-4 h-4 mr-2"
              />
              {options.find((option) => option.value === value)?.label}
            </>
          ) : (
            "Select a state"
          )}
        </span>

        <ChevronDownIcon className="w-5 h-5" />
      </Button>
      {isOpen && (
        <div className="absolute z-10 w-full bg-white dark:bg-slate-950 border rounded-md mt-1 max-h-60 overflow-auto scrollbar scrollbar-thumb-naivySky dark:scrollbar-thumb-glowGreen scrollbar-track-white dark:scrollbar-track-slate-950">
          {options.map((option) => (
            <div
              key={option.value}
              className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-900 cursor-pointer"
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              <img
                src={option.flagUrl}
                alt={option.label}
                className="w-4 h-4 mr-2"
              />
              <span>{option.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StateSelect;

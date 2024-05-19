import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useTheme } from "next-themes";

type FilterByComponentProps = {
  allColors: string[];
  selectedColors: string[];
  handleColorChange: (color: string) => void;
  onSale: boolean;
  handleOnSaleChange: () => void;
  tempMinPrice: number;
  tempMaxPrice: number;
  handleSliderChange: (values: number | number[]) => void;
  minPrice: number;
  MinPrice: number;
  MaxPrice: number;
  maxPrice: number;
};

const FilterByComponent: React.FC<FilterByComponentProps> = ({
  allColors,
  selectedColors,
  handleColorChange,
  onSale,
  handleOnSaleChange,
  tempMinPrice,
  tempMaxPrice,
  handleSliderChange,
  MinPrice,
  minPrice,
  MaxPrice,
  maxPrice,
}) => {
  const { theme } = useTheme();
  return (
    <>
      <h2 className="mt-4 mx-2 w-52 text-naivySky dark:text-glowGreen font-medium">
        {" "}
        Filter By:
      </h2>
      <Accordion type="single" collapsible className="px-1 mx-1">
        <AccordionItem value="item-2">
          <AccordionTrigger>Colors :</AccordionTrigger>
          <AccordionContent>
            {allColors.map((color) => (
              <div key={color} className="flex items-center">
                <input
                  id={`Select${color.replace(/\s/g, "")}`}
                  type="checkbox"
                  name={`Select${color.replace(/\s/g, "")}`}
                  checked={selectedColors.includes(color)}
                  onChange={() => handleColorChange(color)}
                  className="w-3 h-3 m-1"
                />
                <Label className="text-sm capitalize">{color}</Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="flex my-2">
        <div className="flex flex-col w-full m-1 mx-2">
          <label className="text-sm">On Sale:</label>
          <div className="flex items-center w-full px-2">
            <input
              id="SelectOnSale"
              type="checkbox"
              name="SelectOnSale"
              checked={onSale}
              onChange={handleOnSaleChange}
              className="w-3 h-3 m-1"
            />
            <Label className="text-sm">Sale</Label>
          </div>
        </div>
      </div>
      <div className="flex border-t shadow-2xl shadow-gray-400 dark:shadow-slate-800 my-2">
        <div className="flex flex-col w-full m-1 mx-2">
          <label className="text-sm">Price Range:</label>
          <div className="flex items-center w-full px-1">
            <span className="mr-2 text-base">${tempMinPrice}</span>
            <Slider
              range={true}
              min={MinPrice}
              max={MaxPrice}
              defaultValue={[minPrice, maxPrice]}
              onChange={handleSliderChange}
              className="w-full"
              trackStyle={[
                {
                  backgroundColor: theme === "dark" ? "#9ffd32" : "#7395AE",
                },
              ]}
              handleStyle={[
                {
                  backgroundColor: theme === "dark" ? "#9ffd32" : "#7395AE",
                  borderColor: theme === "dark" ? "#9ffd32" : "#7395AE",
                },
                {
                  backgroundColor: theme === "dark" ? "#9ffd32" : "#7395AE",
                  borderColor: theme === "dark" ? "#9ffd32" : "#7395AE",
                },
              ]}
            />
            <span className="ml-2 text-base">${tempMaxPrice}</span>
          </div>
        </div>
      </div>
    </>
  );
};
export default FilterByComponent;

"use client";
import React, { useEffect, useState } from "react";
import { Product } from "@prisma/client";
import "rc-slider/assets/index.css";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import FilterByComponent from "./FilterByComponent";

interface Category {
  id: string;
  name: string;
  value: number;
}

type FilterComponentProps = {
  sortedProducts: Product[];
  setSortedProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  categories: Category[];
};

export default function FilterComponent({
  sortedProducts,
  setSortedProducts,
  categories,
}: FilterComponentProps) {
  const [sortDefault, setSortDefault] = useState<Product[]>(sortedProducts);
  const minPrice = Math.min(...sortedProducts.map((product) => product.price));
  const maxPrice = Math.max(...sortedProducts.map((product) => product.price));
  const [MinPrice, setMinPrice] = useState<number>(minPrice);
  const [MaxPrice, setMaxPrice] = useState<number>(maxPrice);
  const [tempMinPrice, setTempMinPrice] = useState<number>(minPrice);
  const [tempMaxPrice, setTempMaxPrice] = useState<number>(maxPrice);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [allColors, setAllColors] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [onSale, setOnSale] = useState<boolean>(false);
  const [ismobileMenuOpen, setSsmobileMenuOpen] = useState(false);
  useEffect(() => {
    filterProducts();
  }, [selectedCategories, selectedColors, tempMinPrice, tempMaxPrice, onSale]);

  const filterProducts = () => {
    let filteredProducts = [...sortDefault];
    if (selectedCategories.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        selectedCategories.includes(product.categoryId)
      );
    }
    if (selectedColors.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        selectedColors.some(
          (color) =>
            product.color && product.color.toLowerCase().includes(color)
        )
      );
    }
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.price >= tempMinPrice && product.price <= tempMaxPrice
    );
    if (onSale) {
      filteredProducts = filteredProducts.filter((product) => product.onSale);
    }
    setSortedProducts(filteredProducts);
  };

  const handleCategoriesChange = (categoryId: number, flag: boolean) => {
    setSelectedCategories((prevCategories) =>
      flag
        ? [...prevCategories, categoryId]
        : prevCategories.filter((id) => id !== categoryId)
    );
  };

  const handleColorChange = (color: string) => {
    setSelectedColors((prevColors) =>
      prevColors.includes(color)
        ? prevColors.filter((c) => c !== color)
        : [...prevColors, color]
    );
  };

  const handleSliderChange = (values: number | number[]) => {
    if (typeof values === "number") {
      setTempMinPrice(values);
      setTempMaxPrice(values);
    } else {
      setTempMinPrice(values[0]);
      setTempMaxPrice(values[1]);
    }
  };

  const handleOnSaleChange = () => {
    setOnSale(!onSale);
  };

  const extractColor = (description: string): string[] => {
    const colors = [
      "red",
      "blue",
      "green",
      "yellow",
      "orange",
      "purple",
      "black",
      "white",
      "gray",
      "pink",
      "silver",
    ];
    const foundColors: string[] = [];
    const lowercaseDescription = description.toLowerCase();
    for (const color of colors) {
      if (lowercaseDescription.includes(color)) {
        foundColors.push(color);
      }
    }
    return foundColors;
  };

  const extractColorsFromProducts = (products: Product[]): string[] => {
    const colors: string[] = [];
    for (const product of products) {
      if (product.color) {
        const productColors = extractColor(product.color);
        for (const color of productColors) {
          if (!colors.includes(color)) {
            colors.push(color);
          }
        }
      }
    }
    return colors;
  };

  useEffect(() => {
    const extractedColors = extractColorsFromProducts(sortDefault);
    setAllColors(extractedColors);
  }, [sortedProducts]);

  return (
    <>
      <div className="flex md:hidden">
        <div
          onClick={() => setSsmobileMenuOpen(!ismobileMenuOpen)}
          className="md:hidden mr-2 -mt-9"
        >
          {ismobileMenuOpen ? (
            <XMarkIcon className="fixed top-0 left-0 h-7 w-7 z-50" />
          ) : (
            <Button variant="outline">filter </Button>
          )}
        </div>
      </div>
      <div
        className={`fixed top-0 left-0 w-full h-full bg-white dark:bg-slate-950 py-8 z-40 block sm:hidden transition-transform ${
          ismobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <FilterByComponent
          categories={categories}
          allColors={allColors}
          selectedColors={selectedColors}
          handleColorChange={handleColorChange}
          selectedCategories={selectedCategories}
          handleCategoriesChange={handleCategoriesChange}
          onSale={onSale}
          handleOnSaleChange={handleOnSaleChange}
          tempMinPrice={tempMinPrice}
          tempMaxPrice={tempMaxPrice}
          handleSliderChange={handleSliderChange}
          MinPrice={MinPrice}
          minPrice={minPrice}
          MaxPrice={MaxPrice}
          maxPrice={maxPrice}
        />
      </div>
      <div className="flex border shadow-xl dark:shadow-slate-800 w-auto rounded my-2 hidden md:block">
        <FilterByComponent
          categories={categories}
          allColors={allColors}
          selectedColors={selectedColors}
          handleColorChange={handleColorChange}
          selectedCategories={selectedCategories}
          handleCategoriesChange={handleCategoriesChange}
          onSale={onSale}
          handleOnSaleChange={handleOnSaleChange}
          tempMinPrice={tempMinPrice}
          tempMaxPrice={tempMaxPrice}
          handleSliderChange={handleSliderChange}
          MinPrice={MinPrice}
          minPrice={minPrice}
          MaxPrice={MaxPrice}
          maxPrice={maxPrice}
        />
      </div>
    </>
  );
}

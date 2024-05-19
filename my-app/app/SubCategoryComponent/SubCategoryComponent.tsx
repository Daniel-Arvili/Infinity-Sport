"use client";
import React, { useEffect, useState } from "react";
import FilterComponent from "./FilterComponent";
import ProductsList from "./ProductsList";
import Link from "next/link";
import { Product } from "@prisma/client";
import ComboBoxSort from "./ComboBoxSort";

interface CartItemType {
  cartId: number;
  productId: number;
  quantity: number;
}

interface SubCategoryComponentProps {
  Products: Product[];
  PageName: string;
  MainPageName: string;
  PageUrl: string;
  MainPageUrl: string;
  CartItems?: CartItemType[];
}

export default function SubCategoryComponent({
  Products,
  PageName,
  MainPageName,
  PageUrl,
  MainPageUrl,
  CartItems,
}: SubCategoryComponentProps) {
  const [sortedProducts, setSortedProducts] = useState<Product[]>(Products);
  const [localCartItems, setLocalCartItems] = useState<CartItemType[]>([]);

  const handleFlagChange = () => {
    if (!CartItems) {
      const storedCartItems = localStorage.getItem("cartItems");
      if (storedCartItems) {
        setLocalCartItems(JSON.parse(storedCartItems));
      } else {
        localStorage.setItem("cartItems", JSON.stringify(localCartItems));
      }
    }
  };

  useEffect(() => {
    handleFlagChange();
  }, [CartItems, Products]);

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between">
        <div className="p-2 flex text-xs lg:text-base text-gray-500 space-x-1">
          <Link href="/" className="hover:scale-105">
            Home Page
          </Link>
          <p>/</p>
          <Link href={MainPageUrl} className="hover:scale-105">
            {MainPageName}
          </Link>
          <p>/</p>
          <Link
            href={PageUrl}
            className="hover:scale-105 text-gray-800 dark:text-gray-200 font-medium"
          >
            {PageName}
          </Link>
        </div>
        <div className="flex justify-end">
          <ComboBoxSort
            sortedProducts={sortedProducts}
            setSortedProducts={setSortedProducts}
          />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row w-full">
        <FilterComponent
          sortedProducts={sortedProducts}
          setSortedProducts={setSortedProducts}
        />
        <div className="flex flex-grow mx-auto">
          {sortedProducts ? (
            <ProductsList
              Products={sortedProducts}
              CartItems={CartItems || localCartItems}
              handleFlagChange={handleFlagChange}
            />
          ) : (
            <div className="text-base text-center">
              There are currently no products in the selected category
            </div>
          )}
        </div>
      </div>
    </>
  );
}

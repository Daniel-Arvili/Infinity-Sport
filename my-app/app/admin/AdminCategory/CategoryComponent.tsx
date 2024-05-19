"use client";
import React, { useState } from "react";
import FilterComponent from "../../CategoryComponent/FilterComponent";
import ProductsList from "./ProductsList";
import Link from "next/link";
import { Product } from "@prisma/client";
import ComboBoxSort from "../../CategoryComponent/ComboBoxSort";

interface Category {
  id: string;
  name: string;
  value: number;
}

interface CategoryComponentProps {
  Products: Product[];
  PageName: string;
  PageUrl: string;
  categories: Category[];
}

export default function CategoryComponent({
  Products,
  PageName,
  PageUrl,
  categories,
}: CategoryComponentProps) {
  const [sortedProducts, setSortedProducts] = useState<Product[]>(Products);
  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between">
        <div className="p-2 flex text-sm sm:text-base text-gray-500 space-x-1">
          <Link href="/" className="hover:scale-105">
            Home Page
          </Link>
          <p>/</p>
          <Link
            href={`/admin${PageUrl}`}
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
          categories={categories}
          sortedProducts={sortedProducts}
          setSortedProducts={setSortedProducts}
        />
        <div className="flex flex-grow">
          {sortedProducts ? (
            <ProductsList Products={sortedProducts} />
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

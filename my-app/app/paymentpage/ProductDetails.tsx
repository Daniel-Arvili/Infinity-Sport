"use client";
import { Product } from "@prisma/client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

type ProductDetailsProps = {
  productId: number;
  quantity: number;
  product: Product;
};

const ProductDetails: React.FC<ProductDetailsProps> = ({
  productId,
  product,
  quantity,
}) => {
  const [allColors, setAllColors] = useState<string[]>([]);
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

  const extractColorsFromProducts = (product: Product): string[] => {
    const colors: string[] = [];
    if (product.color) {
      const productColors = extractColor(product.color);
      for (const color of productColors) {
        if (!colors.includes(color)) {
          colors.push(color);
        }
      }
    }
    return colors;
  };

  useEffect(() => {
    const extractedColors = extractColorsFromProducts(product);
    setAllColors(extractedColors);
  }, [product]);

  return (
    <>
      <div key={productId} className="flex justify-between items-center">
        <div className="flex flex-row items-center my-2">
          <div className="relative w-20 h-20 sm:w-32 sm:h-32">
            {product.image && (
              <>
                <Image
                  src={product.image}
                  fill
                  alt={`${product.name}'s picture`}
                  className="rounded-lg"
                  style={{
                    objectFit: "fill",
                  }}
                />
              </>
            )}
            {product.onSale && (
              <div className="absolute top-0 text-sm rounded-tr-lg right-0 bg-naivyBlue dark:bg-glowGreen text-black py-0 px-0.5">
                Sale!
              </div>
            )}
          </div>
          <div className="flex flex-col text-sm sm:text-lg md:text-xl mx-1">
            <div>{product.name}</div>
            <div className="text-xs sm:text-sm md:text-base text-naivyBlue dark:text-glowGreen">
              {product.manufacturer}
            </div>
            <div className="flex flex-row space-x-2">
              {allColors.map((color, index) => (
                <div key={index} className="p-0.5 rounded-full border bg-white">
                  <div
                    style={{ backgroundColor: color }}
                    className="p-1 rounded-full w-4 h-4"
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex flex-col justify-center items-end">
            <div className="flex items-center text-xs sm:text-sm md:text-base">
              <p
                className={` ${
                  product.onSale
                    ? "line-through text-gray-400 dark:text-gray-700"
                    : "text-naivyBlue dark:text-glowGreen text-sm sm:text-lg md:text-xl sm:ml-2"
                }`}
              >
                ${product.price.toFixed(2)}
              </p>
              {product.onSale && <p className="ml-2">Sale!</p>}
            </div>
            {product.onSale && product.salePercent && (
              <p className="text-naivyBlue dark:text-glowGreen text-sm sm:text-lg md:text-xl sm:ml-2">
                $
                {((product.price * (100 - product.salePercent)) / 100).toFixed(
                  2
                )}
              </p>
            )}
            <p className="ml-2">Qty: {quantity}</p>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductDetails;

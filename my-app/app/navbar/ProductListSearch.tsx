"use client";
import { Product } from "@prisma/client";
import React from "react";
import Image from "next/image";

type ProductListSearchProps = {
  product: Product;
};

const ProductListSearch: React.FC<ProductListSearchProps> = ({ product }) => {
  return (
    <>
      <div key={product.id} className="flex justify-between items-center">
        <div className="flex flex-row items-center my-2">
          <div className="relative w-12 h-12">
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
              <div className="absolute -top-1 text-xxs -right-1 bg-naivySky dark:bg-glowGreen text-black">
                Sale!
              </div>
            )}
          </div>
          <div className="flex flex-col text-xs mx-2 w-1/3 sm:w-36">
            <div>{product.name}</div>
            <div>{product.manufacturer}</div>
          </div>
        </div>
        <div className="flex flex-col text-xs justify-center items-center">
          {product.quantity == 0 ? (
            <p className="text-red-600">Out of Stock</p>
          ) : (
            <>
              <p
                className={`text-naivyBlue dark:text-glowGreen ${
                  product.onSale ? "line-through" : ""
                }`}
              >
                ${product.price.toFixed(2)}
              </p>
              {product.onSale && product.salePercent && (
                <p className="text-gray-700 dark:text-white">
                  $
                  {(
                    (product.price * (100 - product.salePercent)) /
                    100
                  ).toFixed(2)}
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default ProductListSearch;

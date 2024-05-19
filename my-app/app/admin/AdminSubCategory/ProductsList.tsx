"use client";
import { Product } from "@prisma/client";
import React, { ChangeEvent, useState } from "react";
import Image from "next/image";
import { PencilSquareIcon, TruckIcon } from "@heroicons/react/24/outline";
import ProductEditModal from "../../Modals/ProductEditModal";
import { UpdateProductQuantity } from "@/app/ServerAction/ServerAction";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ProductCardProps = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { id, image, name, price, onSale, salePercent } = product;
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [OrderingStock, setOrderingStock] = useState(false);
  const [newValue, setNewValue] = useState<number>(0);
  const [isOrderedID, setIsOrderedID] = useState<number[]>([]);

  const handleAdminOpenModal = () => {
    setIsAdminModalOpen(true);
  };

  const handleQuantityUpdate = (e: ChangeEvent<HTMLInputElement>) => {
    setNewValue(Number(e.target.value));
  };

  const handleUpdateQuantity = () => {
    setOrderingStock(true);
  };

  const handleOrderingStock = async (ProductID: number) => {
    if (newValue == 0) {
      return;
    }
    await UpdateProductQuantity(ProductID, newValue);
    setIsOrderedID((prevIDs) => [...prevIDs, ProductID]);
  };

  return (
    <>
      <div className="flex flex-col rounded-lg shadow-lg border w-32 sm:w-52 m-1 sm:m-2">
        <div className="relative w-[126px] h-[155px] sm:w-[206px] sm:h-[235px]">
          {image && (
            <>
              <Image
                src={image}
                fill
                alt={`${id}'s picture`}
                className="rounded-t-lg"
                style={{
                  objectFit: "fill",
                  filter: "brightness(100%)",
                  transition: "filter 0.3s ease",
                }}
              />
              <div
                className="absolute top-0 left-0 w-full h-full flex items-center justify-center rounded-t-lg opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-70 text-white text-center cursor-pointer"
                onClick={() => handleAdminOpenModal()}
              >
                <span className="text-sm underline underline-offset-1">
                  Edit
                </span>
                <span>
                  <PencilSquareIcon className="w-6 h-6 ml-1" />
                </span>
              </div>
            </>
          )}
          {onSale && (
            <div className="absolute top-0 text-sm rounded-tr-lg right-0 bg-naivyBlue dark:bg-glowGreen text-black p-1">
              Sale!
            </div>
          )}
        </div>
        <div className="px-1 sm:px-2 pt-1 sm:pt-4 pb-2">
          <div className="text-center font-bold text-base sm:text-lg mb-2">
            {name}
          </div>
          <div className="flex flex-col sm:flex-row justify-center items-center">
            <p
              className={`text-naivyBlue dark:text-glowGreen text-sm ${
                onSale ? "line-through" : ""
              }`}
            >
              ${price.toFixed(2)}
            </p>
            {onSale && salePercent && (
              <p className="text-gray-700 dark:text-white text-sm sm:ml-2">
                ${((price * (100 - salePercent)) / 100).toFixed(2)}
              </p>
            )}
          </div>
        </div>
        {isOrderedID.includes(product.id) ? (
          <div className="flex flex-col items-center mx-auto mb-1 text-green-600">
            <p className="capitalize text-sm">Ordered!</p>
          </div>
        ) : product.quantity == 0 ? (
          <div className="flex flex-col items-center mx-auto mb-1 text-red-600">
            <p className="capitalize text-sm">Out of stock</p>
            {!OrderingStock ? (
              <Button
                variant="outline"
                className="capitalize hover:text-red-800 dark:hover:text-red-400 text-xxs sm:text-xs p-1 border border-red-500"
                onClick={() => handleUpdateQuantity()}
              >
                Update Quantity
                <span>
                  <TruckIcon className="ml-1 -3 w-3 sm:h-4 sm:w-4" />
                </span>
              </Button>
            ) : (
              <div className="flex justify-between px-0.5 sm:px-2 space-x-1 sm:space-x-2">
                <Button
                  variant="outline"
                  className="capitalize hover:text-red-800 dark:hover:text-red-400 text-xxs sm:text-xs p-1 border border-red-500"
                  onClick={() => handleOrderingStock(product.id)}
                >
                  Order
                  <span>
                    <TruckIcon className="ml-1 w-3 sm:h-4 sm:w-4" />
                  </span>
                </Button>
                <Input
                  type="number"
                  min="1"
                  value={newValue}
                  step={1}
                  onChange={(e) => handleQuantityUpdate(e)}
                  className="text-red-600 text-xxs sm:text-xs px-2 sm:px-4 sm:py-1 border border-red-500 w-12 sm:w-16"
                  placeholder={"Choose Quantity"}
                />
              </div>
            )}
          </div>
        ) : null}
      </div>
      {isAdminModalOpen && (
        <ProductEditModal
          product={product}
          onClose={() => setIsAdminModalOpen(false)}
        />
      )}
    </>
  );
};

type ProductsListProps = {
  Products: Product[];
};

const ProductsList: React.FC<ProductsListProps> = ({ Products }) => {
  return (
    <div className="flex flex-wrap justify-center px-1">
      {Products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductsList;

"use client";
import { CartItem, Product } from "@prisma/client";
import React, { useEffect, useRef, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import ProductsList from "@/app/CategoryComponent/ProductsList";
import ComboBoxSort from "@/app/CategoryComponent/ComboBoxSort";
import NumberPerPage from "./NumberPerPage";
import { Separator } from "@/components/ui/separator";

type PaginationProps = {
  AllProducts: Product[];
  CartItems: CartItem[] | undefined;
};

const PaginationPage: React.FC<PaginationProps> = ({
  AllProducts,
  CartItems,
}) => {
  const [sortedProducts, setSortedProducts] = useState<Product[]>(AllProducts);
  const [localCartItems, setLocalCartItems] = useState<CartItem[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productPerPage, setProductPerPage] = useState<number>(12);
  const lastProductIndex = currentPage * productPerPage;
  const firstProductIndex = lastProductIndex - productPerPage;
  const currentProducts = sortedProducts.slice(
    firstProductIndex,
    lastProductIndex
  );
  const topOfComponentRef = useRef<HTMLDivElement>(null);

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
  }, [CartItems, AllProducts]);

  const ScrollUp = () => {
    if (topOfComponentRef.current) {
      topOfComponentRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <>
      <div
        className="flex flex-col justify-center w-full"
        ref={topOfComponentRef}
      >
        <div className="mb-8">
          <Separator className="dark:bg-gray-500" />
        </div>
        <div className="flex justify-between">
          <NumberPerPage
            productPerPage={productPerPage}
            setProductPerPage={setProductPerPage}
            setCurrentPage={setCurrentPage}
          />
          <ComboBoxSort
            sortedProducts={sortedProducts}
            setSortedProducts={setSortedProducts}
          />
        </div>

        <ProductsList
          Products={currentProducts}
          CartItems={CartItems || localCartItems}
          handleFlagChange={handleFlagChange}
        />
        <div className="my-8">
          <Pages
            totalProducts={sortedProducts.length}
            productPerPage={productPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            ScrollUp={ScrollUp}
          />
        </div>
      </div>
    </>
  );
};

export default PaginationPage;

function Pages({
  totalProducts,
  productPerPage,
  currentPage,
  setCurrentPage,
  ScrollUp,
}: {
  totalProducts: any;
  productPerPage: any;
  currentPage: any;
  setCurrentPage: any;
  ScrollUp: () => void;
}) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalProducts / productPerPage); i++) {
    pageNumbers.push(i);
  }

  const maxPageNum = 5;
  const pageNumLimit = Math.floor(maxPageNum / 2);
  let activePages = pageNumbers.slice(
    Math.max(0, currentPage - 1 - pageNumLimit),
    Math.min(currentPage - 1 + pageNumLimit + 1, pageNumbers.length)
  );

  const handleNextPage = () => {
    if (currentPage < pageNumbers.length) {
      setCurrentPage(currentPage + 1);
      ScrollUp();
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      ScrollUp();
    }
  };

  const renderPages = () => {
    const renderedPages = activePages.map((page, idx) => (
      <PaginationItem
        key={idx}
        className={
          currentPage === page
            ? "border border-naivySky dark:border-glowGreen rounded-md"
            : ""
        }
      >
        <PaginationLink onClick={() => setCurrentPage(page)}>
          {page}
        </PaginationLink>
      </PaginationItem>
    ));

    if (activePages[0] > 1) {
      renderedPages.unshift(
        <PaginationEllipsis
          key="ellipsis-start"
          onClick={() => setCurrentPage(activePages[0] - 1)}
        />
      );
    }
    if (activePages[activePages.length - 1] < pageNumbers.length) {
      renderedPages.push(
        <PaginationEllipsis
          key="ellipsis-end"
          onClick={() =>
            setCurrentPage(activePages[activePages.length - 1] + 1)
          }
        />
      );
    }
    return renderedPages;
  };

  return (
    <div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={handlePrevPage} />
          </PaginationItem>
          {renderPages()}
          <PaginationItem>
            <PaginationNext onClick={handleNextPage} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

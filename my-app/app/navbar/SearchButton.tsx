"use client";
import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LinkIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { CartItem, Category, Product } from "@prisma/client";
import {
  GetAllcategories,
  getAllProducts,
  getSession,
  getUserCart,
} from "../ServerAction/ServerAction";
import SearchProductModal from "../Modals/SearchProductModal";
import ProductListSearch from "./ProductListSearch";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";

const SearchButton = () => {
  const [Flag, setFlag] = useState<boolean>(false);
  const categoriesIDs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  const [searchTerm, setSearchTerm] = useState("");
  const [AllProducts, setAllProducts] = useState<Product[]>();
  const [AllCategories, setAllCategories] = useState<Category[]>();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [SelectedProduct, setSelectedProduct] = useState<Product>();
  const [CartItems, setCartItems] = useState<CartItem[]>();
  const [dropdownKey, setDropdownKey] = useState(0);

  const handleCloseDropdown = () => {
    setDropdownKey((prevKey) => prevKey + 1);
  };

  const handleChangeFlag = () => {
    setFlag(!Flag);
  };
  const fetchCartItems = async () => {
    let items = await getUserCart();
    if (await getSession()) {
      if (items === null) {
        return;
      } else {
        localStorage.removeItem("cartItems");
        setCartItems(items);
      }
    } else {
      const storedCartItems = localStorage.getItem("cartItems");
      items = storedCartItems ? JSON.parse(storedCartItems) : [];
      setCartItems(items);
    }
  };

  const handleSelect = (Choosen: Product) => {
    setSelectedProduct(Choosen);
    handleModal();
  };

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSearchChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    let filteredProducts = [];
    let categoryIds = new Set();

    if (searchTerm && AllProducts) {
      filteredProducts = AllProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (product.manufacturer &&
            product.manufacturer
              .toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
          (product.description &&
            product.description
              .toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
          (product.color &&
            product.color.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    } else {
      filteredProducts = AllProducts ? [...AllProducts] : [];
    }
    filteredProducts.forEach((product) => {
      if (product.categoryId) {
        categoryIds.add(product.categoryId);
      }
    });

    const filteredCategories = AllCategories
      ? AllCategories.filter((category) => categoryIds.has(category.id))
      : [];
    setFilteredProducts(filteredProducts);
    setFilteredCategories(filteredCategories);
  };

  const handleDropdownChange = (open: boolean) => {
    if (open) {
      setSearchTerm("");
    }
  };

  const getProductsData = async () => {
    const Products = await getAllProducts(categoriesIDs);
    setAllProducts(Products);
    setFilteredProducts(Products ? Products : []);
  };

  const getCategoriesData = async () => {
    const Categories = await GetAllcategories();
    setAllCategories(Categories);
  };

  useEffect(() => {
    handleSearch();
  }, [searchTerm, AllProducts]);

  useEffect(() => {
    getProductsData();
    fetchCartItems();
    getCategoriesData();
  }, [Flag]);

  return (
    <>
      {isModalOpen && SelectedProduct ? (
        <SearchProductModal
          product={SelectedProduct}
          CartItems={CartItems}
          setCartItems={setCartItems}
          handleChangeFlag={handleChangeFlag}
          onClose={handleModal}
        />
      ) : (
        <DropdownMenu key={dropdownKey} onOpenChange={handleDropdownChange}>
          <DropdownMenuTrigger asChild>
            <MagnifyingGlassIcon className="h-5 w-5 m-1 cursor-pointer hover:animate-spin-once" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-96 mt-1 max-h-full overflow-y-auto">
            <DropdownMenuLabel>
              <div className="flex flex-row justify-start items-center py-1 relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Search"
                  className="border-b border-slate-400 text-xs sm:text-base w-full bg-inherit"
                />
                <MagnifyingGlassIcon className="h-5 w-5 ml-2" />
              </div>
            </DropdownMenuLabel>
            {searchTerm ? (
              <ScrollArea className="h-screen sm:h-96 w-full">
                {filteredCategories.length != AllCategories?.length ? (
                  <>
                    <div className="flex justify-between items-center mx-2">
                      <p className="text-base text-gray-400 dark:text-gray-500">
                        Suggestions
                      </p>
                      <LinkIcon className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                    </div>
                    <DropdownMenuLabel>
                      {filteredCategories.slice(0, 3).map((category) => (
                        <div
                          key={category.id}
                          className="cursor-pointer my-0.5 py-0.5 w-full"
                        >
                          <Link
                            href={`/${
                              category.id >= 1 && category.id <= 5
                                ? "homefitnessequipment/"
                                : category.id >= 6 && category.id <= 10
                                ? "dumbbells&bars/"
                                : category.id >= 11 && category.id <= 13
                                ? "stand&facilities/"
                                : ""
                            }${category.name
                              .replace(/\s+/g, "")
                              .toLowerCase()}`}
                            className="bg-naivySky/60 dark:bg-glowGreen/70 hover:bg-naivySky/90 hover:dark:bg-glowGreen/50 px-2 py-0.5 rounded-lg"
                            onClick={() => handleCloseDropdown()}
                          >
                            {category.name}
                          </Link>
                        </div>
                      ))}
                    </DropdownMenuLabel>
                    <div className="mt-1">
                      <Separator className="dark:bg-gray-500" />
                    </div>
                  </>
                ) : null}
                <DropdownMenuLabel>
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="cursor-pointer hover:bg-gray-100 hover:dark:bg-gray-900"
                      onClick={() => handleSelect(product)}
                    >
                      <ProductListSearch key={product.id} product={product} />
                      <div className="my-1">
                        <Separator className="dark:bg-gray-500" />
                      </div>
                    </div>
                  ))}
                </DropdownMenuLabel>
              </ScrollArea>
            ) : null}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
};
export default SearchButton;

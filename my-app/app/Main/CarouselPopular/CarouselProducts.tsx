"use client";
import { CartItem, Product } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { FireIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import SearchProductModal from "@/app/Modals/SearchProductModal";
import { getSession, getUserCart } from "@/app/ServerAction/ServerAction";

type CarouselProps = {
  BestProducts: Product[];
};

const CarouselProducts: React.FC<CarouselProps> = ({ BestProducts }) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [SelectedProduct, setSelectedProduct] = useState<Product>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [CartItems, setCartItems] = useState<CartItem[]>();
  const [Flag, setFlag] = useState<boolean>(false);

  useEffect(() => {
    if (api) {
      setCount(api.scrollSnapList().length);
      setCurrent(api.selectedScrollSnap());
      api.on("select", () => {
        setCurrent(api.selectedScrollSnap());
      });
    }
    fetchCartItems();
  }, [api]);

  useEffect(() => {
    fetchCartItems();
  }, [Flag]);

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

  return (
    <>
      {isModalOpen && SelectedProduct && (
        <SearchProductModal
          product={SelectedProduct}
          CartItems={CartItems}
          setCartItems={setCartItems}
          handleChangeFlag={handleChangeFlag}
          onClose={handleModal}
        />
      )}
      <Fade delay={1900} triggerOnce>
        <div className="flex flex-col space-y-2">
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 3000,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent>
              {BestProducts.map((item, index) => (
                <CarouselItem
                  key={index}
                  className="mx-auto px-2 md:basis-1/2 xl:basis-1/3"
                >
                  <div className="relative p-1 px-2 rounded-xl group">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={`Slide ${index + 1}`}
                        className="border border-naivyBlue dark:border-current rounded-xl w-full h-[20rem] sm:h-[30rem] object-cover cursor-pointer group-hover:brightness-75"
                      />
                    )}
                    <span className="absolute right-2 top-1 bg-orange-500 text-white text-sm sm:text-lg px-2 py-1 rounded-tr-xl">
                      <div className="flex items-center">
                        Popular
                        <FireIcon className="h-5 w-5 ml-1" />
                      </div>
                    </span>
                    <div
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100"
                      onClick={() => handleSelect(item)}
                    >
                      <span className="text-white text-center text-sm sm:text-lg underline underline-offset-1 flex items-center">
                        More Info
                        <InformationCircleIcon className="w-6 h-6 ml-1" />
                      </span>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          <div className="py-2 text-center text-xs sm:text-sm lg:text-base text-muted-foreground">
            Image {current + 1} out of {count}
          </div>
        </div>
      </Fade>
    </>
  );
};

export default CarouselProducts;

"use client";
import { Order } from "@prisma/client";
import React, { useEffect, useState } from "react";
import CheckmarkCircle from "./CheckmarkAnimation";
import { Zoom, Slide } from "react-awesome-reveal";
import Image from "next/image";
import Stars from "@/Logos/Stars.png";
import TruckDriving from "@/app/Gif/TruckDriving.gif";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import PolicyModal from "../Modals/PolicyModal";

type ConfirmationPageProps = {
  ConfirmationDetails: Order | null | undefined;
};

const ConfirmationPage: React.FC<ConfirmationPageProps> = ({
  ConfirmationDetails,
}) => {
  const [FinishAnimation, setFinishAnimation] = useState<boolean>(false);
  const [OrderShowsUp, setOrderShowsUp] = useState<boolean>(false);
  const [PolicyModalOpen, setPolicyModalOpen] = useState<boolean>(false);

  const handlePolicyModal = () => {
    setPolicyModalOpen(!PolicyModalOpen);
  };
  const now: Date = new Date();
  now.setDate(now.getDate() + 3);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate: string = now.toLocaleDateString("en-US", options);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOrderShowsUp(true);
    }, 6500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="flex justify-center mx-auto p-1 sm:p-4 w-full lg:w-3/4 border rounded-xl">
        <div className="text-xs sm:text-sm md:text-base w-full py-8">
          {FinishAnimation ? (
            <>
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center space-x-2">
                  <Zoom delay={4}>
                    <Image
                      src={Stars}
                      alt="Stars"
                      width={30}
                      height={30}
                      className="-mt-2 animate-ping sm:scale-125"
                    />
                    <div className="text-xl sm:text-2xl md:text-3xl mt-8 sm:mt-16">
                      Your order is confirmed
                    </div>
                    <Image
                      src={Stars}
                      alt="Stars"
                      width={30}
                      height={30}
                      className="-mt-2 animate-ping sm:scale-125"
                    />
                  </Zoom>
                </div>
                <Slide>
                  <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-16 sm:space-x-8">
                    <div className="hidden sm:block">
                      <Image
                        src={TruckDriving}
                        alt="Truck"
                        width={350}
                        height={350}
                        className="-scale-x-100 dark:invert"
                      />
                    </div>
                    <div className="block sm:hidden">
                      <Image
                        src={TruckDriving}
                        alt="Truck"
                        width={280}
                        height={280}
                        className="-scale-x-100 dark:invert"
                      />
                    </div>
                    {OrderShowsUp && ConfirmationDetails ? (
                      <Zoom>
                        <div className="flex flex-col text-xxs sm:text-xs md:text-base space-y-2 mt-4 sm:mt-8 mx-1">
                          <p>
                            Thank you for your purchase! Here are your order
                            details:{" "}
                          </p>
                          <p>
                            <span className="text-naivyBlue dark:text-glowGreen">
                              Order Number:{" "}
                            </span>
                            {ConfirmationDetails.id} <br />
                            <span className="text-naivyBlue dark:text-glowGreen">
                              Total Price:{" "}
                            </span>
                            ${ConfirmationDetails?.totalPrice} <br />
                            <span className="text-naivyBlue dark:text-glowGreen">
                              Payment Method:{" "}
                            </span>
                            {ConfirmationDetails?.paymentMethod}
                            <br />
                            <span className="text-naivyBlue dark:text-glowGreen">
                              Order Date:{" "}
                            </span>
                            {ConfirmationDetails?.createdAt.toUTCString()}
                            <br />
                            <span className="text-naivyBlue dark:text-glowGreen">
                              Status:{" "}
                            </span>
                            {ConfirmationDetails?.status}
                            <br />
                            <span className="text-naivyBlue dark:text-glowGreen">
                              Shipping Method:{" "}
                            </span>
                            Standart Delivery
                            <br />
                            <span className="text-naivyBlue dark:text-glowGreen">
                              Deliverd on or before:{" "}
                            </span>
                            {formattedDate}
                            <br />
                            <span className="text-naivyBlue dark:text-glowGreen">
                              Return or Exchange Policy:{" "}
                            </span>
                            <button
                              className="text-blue-700 dark:text-green-200 underline focus:outline-none focus:ring-2 focus:ring-blue-500"
                              onClick={handlePolicyModal}
                            >
                              Click here
                            </button>
                            <br />
                          </p>
                        </div>
                      </Zoom>
                    ) : null}
                  </div>
                </Slide>
                <div className="my-4">
                  <Button variant={"outline"} className="md:text-lg">
                    <Link href="/" className="hover:scale-105">
                      Continue Shopping
                    </Link>
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex justify-center my-16">
              <CheckmarkCircle setFinishAnimation={setFinishAnimation} />
            </div>
          )}
        </div>
      </div>
      {PolicyModalOpen ? (
        <PolicyModal handlePolicyModal={handlePolicyModal} />
      ) : null}
    </>
  );
};

export default ConfirmationPage;

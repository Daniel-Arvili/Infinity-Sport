import { Address, Order } from "@prisma/client";
import React from "react";
import Image from "next/image";
import {
  ChatBubbleBottomCenterTextIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

type Client = {
  name: string | null;
  email: string;
  image: string | null;
  createdAt: Date;
  address: Address | null;
  orders: Order[];
};

interface UserDetailsModalProps {
  client: Client;
  onClose: () => void;
}

export default function UserDetailsModal({
  client,
  onClose,
}: UserDetailsModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 bg-gray-600 dark:bg-slate-900 bg-opacity-80 dark:bg-opacity-80 w-full overflow-y-auto h-full w-full"
      id="my-modal"
    >
      <div className="relative top-20 mx-auto p-1 border shadow-lg w-4/5 sm:w-3/4 2xl:w-1/2 rounded-xl bg-white dark:bg-slate-950">
        <div className="absolute right-0 top-0 p-1">
          <XMarkIcon className="h-6 w-6 cursor-pointer" onClick={onClose} />
        </div>
        <div className="flex flex-col justify-center pt-4">
          <div className="flex flex-col items-center pb-2 space-y-1">
            <div className="flex-shrink-0 px-1 sm:px-2">
              {client.image && (
                <Image
                  src={client.image}
                  height={100}
                  width={100}
                  alt={`${client.name}'s picture`}
                  className="rounded-full"
                  blurDataURL={`/img/${client.name}'s picture.png`}
                />
              )}
            </div>
            <div className="flex justify-center w-18 text-lg md:text-xl font-medium">
              {client.name}
            </div>
            <div className="flex justify-center w-18 text-sm md:text-base">
              {client.createdAt.toLocaleString()}
            </div>
          </div>
          <div className="flex flex-col items-center py-2 space-y-2">
            <Label className="text-sm sm:text-base text-naivyBlue dark:text-glowGreen">
              Number Of Orderds: {client.orders.length}
            </Label>
            <Label className="text-sm sm:text-base text-naivyBlue dark:text-glowGreen">
              Address:
            </Label>
            <div className="flex justify-center items-center w-full sm:w-3/4 mx-auto">
              <div className="flex justify-between border p-3 rounded-lg w-full">
                <div className="flex flex-col space-y-1">
                  <Label className="text-xs sm:text-base">
                    State: {client.address?.state}
                  </Label>
                  <Label className="text-xs sm:text-base">
                    city: {client.address?.city}
                  </Label>
                  <Label className="text-xs sm:text-base">
                    Street: {client.address?.street}
                  </Label>
                </div>
                <div className="flex flex-col space-y-1">
                  <Label className="text-xs sm:text-base ">
                    Home Number: {client.address?.homeNumber}
                  </Label>
                  <Label className="text-xs sm:text-base">
                    Apartment Number: {client.address?.apartmentNumber}
                  </Label>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center py-2 pb-8">
            <Button
              variant={"outline"}
              className="text-lg sm:text-xl"
              onClick={() => {
                window.location.href = `mailto:${client.email}`;
              }}
            >
              <div className="flex flex-row">
                Contact
                <span>
                  <ChatBubbleBottomCenterTextIcon className="h-6 w-6 ml-2" />
                </span>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

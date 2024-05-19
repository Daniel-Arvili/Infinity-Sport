"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { getAllClients } from "../ServerAction/ServerAction";
import ClipLoader from "react-spinners/ClipLoader";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import { Address, Order } from "@prisma/client";
import Image from "next/image";
import UserDetailsModal from "../Modals/UserDetailsModal";

interface AllUsersProps {
  handleClickUsers: () => void;
}

type Client = {
  name: string | null;
  email: string;
  image: string | null;
  createdAt: Date;
  address: Address | null;
  orders: Order[];
};

const AllUsers: React.FC<AllUsersProps> = ({ handleClickUsers }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userModalOpen, setuserModalOpen] = useState<boolean>(true);
  const [Clients, setClients] = useState<Client[]>();
  const [selectedClient, setSelectedClient] = useState<Client | null>();

  const handleOpen = (client: Client) => {
    setSelectedClient(client);
    setuserModalOpen(true);
  };

  const onClose = () => {
    setSelectedClient(null);
    setuserModalOpen(false);
  };

  useEffect(() => {
    const fetchAllUsers = async () => {
      const users = await getAllClients();
      if (users) {
        console.log(users);
        setClients(users);
        setIsLoading(false);
      }
    };
    fetchAllUsers();
  }, []);
  return (
    <>
      {isLoading ? (
        <div className="flex flex-col justify-center items-center py-8">
          <ClipLoader size={32} color="#000000 dark:#FFFFFF" />
          <p className="text-lg mt-4 text-gray-600">Loading ...</p>
        </div>
      ) : (
        <>
          <div className="flex flex-col">
            <div className="flex items-center justify-start">
              <Button
                className="text-xs sm:text-sm"
                variant={"outline"}
                onClick={() => handleClickUsers()}
              >
                <span>
                  <ArrowUturnLeftIcon className="h-3 w-3 mr-2" />
                </span>
                Back
              </Button>
            </div>
            <h1 className="text-center"> All Users</h1>
          </div>
          <div className="flex flex-col rounded w-full mx-auto px-2 h-screen">
            <div className="flex flex-wrap w-full justify-center">
              {Clients?.map((client) => (
                <div
                  key={client.email}
                  className="p-2 hover:cursor-pointer"
                  onClick={() => handleOpen(client)}
                >
                  <div className="flex flex-col items-center hover:scale-105">
                    <div className="flex-shrink-0 px-1 sm:px-2">
                      {client.image && (
                        <Image
                          src={client.image}
                          height={80}
                          width={80}
                          alt={`${client.name}'s picture`}
                          className="rounded-full"
                          blurDataURL={`/img/${client.name}'s picture.png`}
                        />
                      )}
                    </div>
                    <div className="flex justify-center w-18 text-sm md:text-base">
                      {client.name}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {userModalOpen && selectedClient && (
            <UserDetailsModal onClose={onClose} client={selectedClient} />
          )}
        </>
      )}
    </>
  );
};
export default AllUsers;

"use client";
import {
  ChartPieIcon,
  PlusCircleIcon,
  TagIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";
import AddProduct from "./AddProduct";
import CreateCatgory from "./CreateCatgory";
import AllUsers from "./AllUsers";

const AdminMenu = () => {
  const [MenuComponent, setMenuComponent] = useState<boolean>(true);
  const [DashboardComponent, setDashboardComponent] = useState<boolean>(false);
  const [AddProductComponent, setAddProductComponent] =
    useState<boolean>(false);
  const [AddCategoryComponent, setAddCategoryComponent] =
    useState<boolean>(false);
  const [AllUsersComponent, setAllUsersComponent] = useState<boolean>(false);

  const handleClickDashboard = () => {
    setMenuComponent(!MenuComponent);
    setDashboardComponent(!DashboardComponent);
  };
  const handleClickProduct = () => {
    setMenuComponent(!MenuComponent);
    setAddProductComponent(!AddProductComponent);
  };
  const handleClickCategory = () => {
    setMenuComponent(!MenuComponent);
    setAddCategoryComponent(!AddCategoryComponent);
  };
  const handleClickUsers = () => {
    setMenuComponent(!MenuComponent);
    setAllUsersComponent(!AllUsersComponent);
  };

  return (
    <div className="flex flex-col w-full sm:w-3/4 md:w-3/5 shadow-xl dark:shadow-lg dark:shadow-gray-700 p-2 sm:p-4 rounded-lg">
      {MenuComponent ? (
        <>
          <div className="text-base sm:text-2xl w-32 sm:w-96 mb-4">Menu</div>
          <div className="flex flex-col sm:flex-row items-center sm:space-x-4 sm:space-y-0 space-y-4">
            <div
              className="flex items-center text-sm sm:text-base justify-center py-4 p-2 border border-current rounded-lg w-3/5 sm:w-full cursor-pointer"
              onClick={() => handleClickDashboard()}
            >
              Admin Dashbord
              <span>
                <ChartPieIcon className="w-4 h-4 sm:w-6 sm:h-6 mx-2" />
              </span>
            </div>
            <div
              className="flex items-center text-sm sm:text-base justify-center py-4 p-2 border border-current rounded-lg w-3/5 sm:w-full cursor-pointer"
              onClick={() => handleClickProduct()}
            >
              Add Product
              <span>
                <PlusCircleIcon className="w-4 h-4 sm:w-6 sm:h-6 mx-2" />
              </span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center sm:space-x-4 space-y-4 sm:space-y-0 my-4">
            <div
              className="flex items-center text-sm sm:text-base justify-center py-4 p-2 border border-current rounded-lg w-3/5 sm:w-full cursor-pointer"
              onClick={() => handleClickCategory()}
            >
              Add Category
              <span>
                <TagIcon className="w-4 h-4 sm:w-6 sm:h-6 mx-2" />
              </span>
            </div>
            <div
              className="flex items-center text-sm sm:text-base justify-center py-4 p-2 border border-current rounded-lg w-3/5 sm:w-full cursor-pointer"
              onClick={() => handleClickUsers()}
            >
              All Users
              <span>
                <UserGroupIcon className="w-4 h-4 sm:w-6 sm:h-6 mx-2" />
              </span>
            </div>
          </div>
        </>
      ) : null}
      {AddProductComponent && (
        <AddProduct handleClickProduct={handleClickProduct} />
      )}
      {AddCategoryComponent && (
        <CreateCatgory handleClickCategory={handleClickCategory} />
      )}
      {AllUsersComponent && <AllUsers handleClickUsers={handleClickUsers} />}
    </div>
  );
};

export default AdminMenu;

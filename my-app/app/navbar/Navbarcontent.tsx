"use client";
import React, { useState } from "react";
import NavigationComponent from "./NavigationComponent";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
import Bars3Icon from "@heroicons/react/24/outline/Bars3Icon";
import NavigationAccordion from "./NavigationAccordion";
import LogoChoose from "./LogoChoose";

interface NavbarcontentProps {
  Rule: string;
}

const Navbarcontent: React.FC<NavbarcontentProps> = ({ Rule }) => {
  const [imdobileMenuOpen, setImdobileMenuOpen] = useState(false);
  let url;
  if (Rule === "admin") {
    url = "/admin/";
  } else {
    url = "/";
  }
  return (
    <>
      <div className="flex items-center">
        <button
          onClick={() => setImdobileMenuOpen(!imdobileMenuOpen)}
          className="md:hidden mr-2 z-40"
        >
          {imdobileMenuOpen ? (
            <XMarkIcon className="h-7 w-7" />
          ) : (
            <Bars3Icon className="h-7 w-7" />
          )}
        </button>
        <div className="hidden md:flex flex-row items-center space-x-1">
          <LogoChoose />
          <NavigationComponent url={url} />
        </div>
      </div>
      <div
        className={`absolute top-0 left-0 w-full h-full bg-white dark:bg-slate-950 p-8 z-20 md:hidden transition-transform ${
          imdobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col justify-center">
          <div
            className="mx-auto pb-2"
            onClick={() => setImdobileMenuOpen(false)}
          >
            <LogoChoose />
          </div>{" "}
          <NavigationAccordion
            setImdobileMenuOpen={setImdobileMenuOpen}
            url={url}
          />
        </div>
      </div>
    </>
  );
};

export default Navbarcontent;

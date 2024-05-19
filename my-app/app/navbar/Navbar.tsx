import React from "react";
import SigninButton from "./SignInButton";
import SearchButton from "./SearchButton";
import Navbarcontent from "./Navbarcontent";
import { getRule } from "../ServerAction/ServerAction";
import ShoppingCartDropdown from "./ShoppingCartDropdown";

const NavBar = async () => {
  const Rule = await getRule();
  return (
    <header className="flex px-2">
      <div className="flex justify-between items-center w-full">
        <Navbarcontent Rule={Rule} />
        <div className="flex flex-row items-center">
          <SearchButton />
          {Rule === "admin" ? null : <ShoppingCartDropdown />}
          <SigninButton />
        </div>
      </div>
    </header>
  );
};

export default NavBar;

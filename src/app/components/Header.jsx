import Image from "next/image";
import React from "react";
import Hamburger from "./menu/Hamburger";

const Header = () => {
  return (
    <header className="px-4 h-[90px] bg-[#0a0a0a] flex w-full justify-between items-center top-0 left-0 fixed z-[1]">
      <Image src="/logoPNG.png" width={60} height={60} alt="Logo" />
      <Hamburger />
    </header>
  );
};

export default Header;

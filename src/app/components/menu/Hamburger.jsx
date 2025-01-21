"use client";

import Link from "next/link";
import React, { useState } from "react";

const Hamburger = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button className={`flex flex-col justify-between w-10 h-8 cursor-pointer z-50 space-y-2`} onClick={toggleMenu}>
        <div
          className={`h-1 w-full bg-white transition-all duration-300 ${isOpen ? "transform rotate-45 translate-y-3.5" : ""}`}
        ></div>
        <div className={`h-1 w-full bg-white transition-all duration-300 ${isOpen ? "opacity-0" : ""}`}></div>
        <div
          className={`h-1 w-full bg-white transition-all duration-300 ${isOpen ? "transform -rotate-45 -translate-y-3.5" : ""}`}
        ></div>
      </button>

      <ul
        className={`flex flex-col mt-7 fixed transparent top-[62px] right-0 w-48 menu-height text-white transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <li className="py-4 cursor-pointer transition-all pink-hover">
          <Link className="p-4" href="#">
            Compre agora
          </Link>
        </li>
        <li className="py-4 cursor-pointer transition-all pink-hover">
          <Link className="p-4" href="#begin">
            Início
          </Link>
        </li>
        <li className="py-4 cursor-pointer transition-all pink-hover">
          <Link className="p-4" href="#benefits">
            Benefícios
          </Link>
        </li>
        <li className="py-4 cursor-pointer transition-all pink-hover">
          <Link className="p-4" href="#course">
            O que vou aprender?
          </Link>
        </li>
        <li className="py-4 cursor-pointer transition-all pink-hover">
          <Link className="p-4" href="#modules">
            Módulos
          </Link>
        </li>
        <li className="py-4 cursor-pointer transition-all pink-hover">
          <Link className="p-4" href="#faq">
            Perguntas frequentes
          </Link>
        </li>
        <li className="py-4 cursor-pointer transition-all pink-hover">
          <Link className="p-4" href="#contact">
            Contato
          </Link>
        </li>
        <li className="py-4 cursor-pointer transition-all pink-hover">
          <Link className="p-4" href="/dashboard">
            Acessar aulas
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Hamburger;

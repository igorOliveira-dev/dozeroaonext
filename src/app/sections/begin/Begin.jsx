import React from "react";
import S from "./begin.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const Begin = () => {
  return (
    <div className={S.screen} id="begin">
      <div className={S.text}>
        <h1 className={` gradient-text ${S.title}`}>DO ZERO AO NEXT.JS</h1>
        <p className={S.paragraph}>Aprenda dos conceitos básicos da programação até os conceitos avançados de Next.js</p>
      </div>
      <Link href="#">
        <button className={`transition-all ${S.glowBtn}`}>COMPRE AGORA</button>
      </Link>
      <Link href="#benefits" className={S.goToBenefits}>
        Veja os benefícios do curso <FontAwesomeIcon icon={faChevronDown} className="h-6" />
      </Link>
    </div>
  );
};

export default Begin;

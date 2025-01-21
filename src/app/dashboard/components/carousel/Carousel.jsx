"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import S from "./carousel.module.css";
import Link from "next/link";

const Carousel = ({ data }) => {
  const [translate, setTranslate] = useState(37.5);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    if (screenWidth < 620) {
      setTranslate(43.75);
    } else {
      setTranslate(37.5);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handlePrev = () => {
    if (screenWidth < 620) {
      if (translate < 43.75) {
        setTranslate(translate + 12.5);
      } else {
        setTranslate(-43.75);
      }
    } else {
      if (translate < 37.5) {
        setTranslate(translate + 12.5);
      } else {
        setTranslate(-37.5);
      }
    }
    console.log(translate);
  };

  const handleNext = () => {
    if (screenWidth < 620) {
      if (translate > -43.75) {
        setTranslate(translate - 12.5);
      } else {
        setTranslate(43.75);
      }
    } else {
      if (translate > -37.5) {
        setTranslate(translate - 12.5);
      } else {
        setTranslate(37.5);
      }
    }
    console.log(translate);
  };

  return (
    <div className={S.container}>
      <button onClick={handlePrev} className={S.navButton}>
        <FaChevronLeft />
      </button>

      <div className={S.carousel}>
        <div className={S.carouselItemsContainer} style={{ transform: `translateX(${translate}%)` }}>
          {data.map((item, index) => (
            <Link href={item.link} key={index} className={S.carouselItem}>
              <h2>{item.module}</h2>
              <Image className={S.moduleImg} src={item.image} alt={item.alt} width={200} height={300} />
              <h2>{item.title}</h2>
            </Link>
          ))}
        </div>
      </div>

      <button onClick={handleNext} className={S.navButton}>
        <FaChevronRight />
      </button>
    </div>
  );
};

export default Carousel;

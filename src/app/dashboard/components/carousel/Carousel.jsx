"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import S from "./carousel.module.css";
import Link from "next/link";

const Carousel = ({ data, watchedVideos }) => {
  const [translate, setTranslate] = useState(37.5);
  const [screenWidth, setScreenWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1024);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    if (window.innerWidth < 620) {
      setTranslate(43.75);
    } else {
      setTranslate(37.5);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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
  };

  // Função que conta quantos vídeos deste módulo foram assistidos
  const getWatchedCount = (videoRange) => {
    if (!watchedVideos || watchedVideos.length === 0) return 0;
    return watchedVideos.filter((videoId) => {
      const num = parseInt(videoId.replace("video", ""), 10);
      return num >= videoRange.min && num <= videoRange.max;
    }).length;
  };

  return (
    <div className={S.container}>
      <button onClick={handlePrev} className={S.navButton}>
        <FaChevronLeft />
      </button>

      <div className={S.carousel}>
        <div className={S.carouselItemsContainer} style={{ transform: `translateX(${translate}%)` }}>
          {data.map((item, index) => {
            const watchedCount = getWatchedCount(item.videoRange);
            const percentage = Math.round((watchedCount / item.totalVideos) * 100);
            return (
              <Link href={item.link} key={index} className={S.carouselItem}>
                <div className={S.progressBox}>
                  <div className={S.progressContainer}>
                    <div className={S.progressBar} style={{ width: `${percentage}%` }}></div>
                  </div>
                  <p>{percentage}%</p>
                </div>
                <h2>{item.module}</h2>
                <Image className={S.moduleImg} src={item.image} alt={item.alt} width={200} height={300} />
                <h2>{item.title}</h2>
              </Link>
            );
          })}
        </div>
      </div>

      <button onClick={handleNext} className={S.navButton}>
        <FaChevronRight />
      </button>
    </div>
  );
};

export default Carousel;

"use client";

import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import S from "./course.module.css";

const Course = () => {
  const items = [
    {
      id: 1,
      title: "HTML e CSS",
      description: "Aprenda a criar a estrutura e o estilo básico de páginas web, incluindo layouts responsivos e design moderno.",
    },
    {
      id: 2,
      title: "JavaScript",
      description: "Domine os fundamentos do JavaScript, desde variáveis até manipulação do DOM e criação de interatividade.",
    },
    {
      id: 3,
      title: "React.js",
      description: "Entenda os conceitos de componentes, estados e propriedades para construir interfaces dinâmicas e modernas.",
    },
    {
      id: 4,
      title: "Next.js Avançado",
      description: "Aprenda a usar Next.js para criar aplicações web rápidas, otimizadas para SEO e com renderização eficiente.",
    },
    {
      id: 5,
      title: "Integração com APIs",
      description: "Saiba como conectar sua aplicação a APIs externas para buscar e exibir dados dinamicamente.",
    },
    {
      id: 6,
      title: "IA com ChatGPT",
      description:
        "Descubra como integrar modelos de linguagem como o ChatGPT em suas aplicações para criar experiências inteligentes.",
    },
    {
      id: 7,
      title: "Deploy e Otimização",
      description:
        "Aprenda a colocar seu projeto no ar usando ferramentas modernas como Vercel e otimizar o desempenho para máxima eficiência.",
    },
    {
      id: 8,
      title: "Projetos Reais",
      description: "Para cada ponto importante aprendido, iremos construir um projeto real para consolidar o conhecimento.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? items.length - 1 : prevIndex - 1));
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === items.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <section className={S.screen} id="course">
      <h1 className={S.title}>O que vou aprender no curso?</h1>
      <div className={S.container}>
        <button className={S.carouselBtn} onClick={handlePrevClick}>
          <FaArrowLeft />
        </button>
        <div className={S.carousel}>
          <div
            className={S.carouselInner}
            style={{
              transform: `translateX(-${currentIndex * 320}px)`,
            }}
          >
            {items.map((item) => (
              <div key={item.id} className={S.card}>
                <h2>{item.title}</h2>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
        <button className={S.carouselBtn} onClick={handleNextClick}>
          <FaArrowRight />
        </button>
      </div>
    </section>
  );
};

export default Course;

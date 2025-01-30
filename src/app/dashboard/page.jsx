"use client";

import React from "react";
import S from "./dashboard.module.css";
import Carousel from "./components/carousel/Carousel";
import useUser from "./hooks/useUser";
import Loading from "../components/Loading";

const carouselData = [
  {
    image: "/module1.webp",
    alt: "Módulo 1: HTML e CSS",
    module: "MÓDULO 1",
    title: "HTML e CSS",
    link: "dashboard/modules/module1",
  },
  {
    image: "/module2.webp",
    alt: "Módulo 2: JavaScript",
    module: "MÓDULO 2",
    title: "JavaScript",
    link: "dashboard/modules/module2",
  },
  {
    image: "/module3.webp",
    alt: "Módulo 3: React.js",
    module: "MÓDULO 3",
    title: "React.js",
    link: "dashboard/modules/module3",
  },
  {
    image: "/module4.webp",
    alt: "Módulo 4: Next.js",
    module: "MÓDULO 4",
    title: "Next.js",
    link: "dashboard/modules/module4",
  },
  {
    image: "/module5.webp",
    alt: "Módulo 5: Integração com APIs",
    module: "MÓDULO 5",
    title: "Integração de APIs",
    link: "dashboard/modules/module5",
  },
  {
    image: "/module6.webp",
    alt: "Módulo 6: IA com ChatGPT",
    module: "MÓDULO 6",
    title: "IA com ChatGPT",
    link: "dashboard/modules/module6",
  },
  {
    image: "/module7.webp",
    alt: "Módulo 7: Deploy e otimização",
    module: "MÓDULO 7",
    title: "Deploy/Otimização",
    link: "dashboard/modules/module7",
  },
  {
    image: "/module8.webp",
    alt: "Módulo 8: Projetos reais",
    module: "MÓDULO 8",
    title: "Projetos reais",
    link: "dashboard/modules/module8",
  },
];

const Dashboard = () => {
  const { user, loading } = useUser();

  if (loading) {
    return <Loading />;
  }

  const firstName = user?.name?.split(" ")[0] || "Aluno";

  return (
    <div>
      <h2 className={S.subtitle}>Bem-vindo ao seu curso, {firstName}!</h2>
      <h1 className={` gradient-text ${S.title}`}>Do Zero ao Next</h1>
      <Carousel data={carouselData} />
    </div>
  );
};

export default Dashboard;

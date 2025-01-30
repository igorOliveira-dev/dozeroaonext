import React from "react";
import S from "./modules.module.css";
import Link from "next/link";

const courseModules = [
  {
    title: "HTML e CSS",
    lessons: [
      "Introdução ao HTML",
      "Tags essenciais e estrutura básica",
      "Introdução ao CSS",
      "Estilizando layouts básicos",
      "Layout responsivo com Flexbox e Grid",
      "Projeto: Landing Page",
    ],
  },
  {
    title: "JavaScript",
    lessons: [
      "Introdução ao JavaScript",
      "Variáveis, tipos e operadores",
      "Estruturas de controle",
      "Funções e eventos",
      "Manipulação do DOM",
      "Projeto: Calculadora interativa",
    ],
  },
  {
    title: "React.js",
    lessons: [
      "Introdução ao React",
      "Componentes e Props",
      "Hooks essenciais (useState, useEffect)",
      "Gerenciamento de listas e formulários",
      "Projeto: To-Do List com React",
    ],
  },
  {
    title: "Next.js Avançado",
    lessons: [
      "Introdução ao Next.js",
      "Rotas dinâmicas e estáticas",
      "SSR e SSG",
      "API Routes no Next.js",
      "Projeto: Blog com Next.js",
    ],
  },
  {
    title: "Integração com APIs",
    lessons: [
      "O que são APIs?",
      "Consumo de APIs com fetch e axios",
      "Integração com APIs REST e GraphQL",
      "API do Firebase e suas funções",
      "Projeto: Dashboard de dados dinâmicos",
    ],
  },
  {
    title: "IA com ChatGPT",
    lessons: [
      "Introdução ao ChatGPT",
      "Configuração da API OpenAI",
      "Criando interações dinâmicas com IA",
      "Projeto: Assistente virtual com ChatGPT",
    ],
  },
  {
    title: "Deploy e Otimização",
    lessons: [
      "Versionamento com Git e Github",
      "Otimização de performance no Next",
      "Práticas de SEO com Next",
      "Fazendo o deploy de um projeto",
    ],
  },
  {
    title: "Projetos Reais",
    lessons: [
      "Planejamento e estruturação de projetos",
      "Construção de um E-commerce básico",
      "Desenvolvimento de um Chat em tempo real",
      "Portifólio profissional",
    ],
  },
];

const Modules = () => {
  return (
    <div className={S.screen} id="modules">
      <h1 className={S.title}>Módulos do curso</h1>
      <p className={S.paragraph}>
        O curso conta com <strong>39 aulas principais</strong>, e{" "}
        <strong>estamos lançando novos conteúdos regularmente</strong>. Atualmente, já chegamos ao <strong>módulo 2</strong>,
        e você pode aproveitar o preço promocional de <strong>R$250,00</strong> por ainda não estar completo. Assim que o
        curso estiver completo, o valor aumentará, então não perca tempo!{" "}
        <strong>Aulas novas são lançadas todas as segundas, quartas e sextas</strong>. Aproveite agora para garantir o curso
        com o melhor preço!{" "}
        <Link href="#" className="blueLink">
          Compre já!
        </Link>
      </p>

      <div className={S.modulesBox}>
        {courseModules.map((module, index) => (
          <div key={index} className={S.module}>
            <h2 className={S.moduleTitle}>{module.title}</h2>
            <ul className={S.lessonList}>
              {module.lessons.map((lesson, lessonIndex) => (
                <li key={lessonIndex} className={S.lesson}>
                  {lesson}
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className={S.module}>
          <h2 className={S.moduleTitle}>Aulas bônus</h2>
          <p>Algumas aulas bônus serão lançadas para dar informações adicionais e ajudar a entender melhor o conteúdo!</p>
        </div>
      </div>
    </div>
  );
};

export default Modules;

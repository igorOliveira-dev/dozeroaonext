import React from "react";
import S from "./benefits.module.css";

const Benefits = () => {
  return (
    <div className={S.screen} id="benefits">
      <h1 className={S.title}>Beneficios</h1>
      <ul className={S.benefitsBox}>
        <li>Acesso vitalício</li>
        <li>Didática excelente</li>
        <li>Material de apoio</li>
        <li>Conhecimentos sólidos de programação</li>
        <li>Módulos bem definidos</li>
        <li>Construção de projetos reais</li>
        <li>Garantia de 7 dias</li>
        <li>Comunidade exclusiva no discord</li>
        <li>Atualizações no curso sempre que necessário</li>
        <li>Primeira e segunda aula 100% grátis</li>
      </ul>
    </div>
  );
};

export default Benefits;

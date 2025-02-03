import React from "react";
import S from "./faq.module.css";

const faqData = [
  {
    question: 'O que é o curso "Do zero ao Next.js"?',
    answer:
      "É um curso que ensina desde os fundamentos da programação até conceitos avançados em Next.js, no final do curso você vai saber criar sites com Next.js, integrando com APIs e usando o poder da IA.",
  },
  {
    question: "Qual é o preço do curso?",
    answer: "O curso atualmente está com um preço promocional de lançamento de R$300,00",
  },
  {
    question: "Quanto tempo dura o curso?",
    answer:
      "O curso terá 39 aulas com duração de 15 à 20 minutos (vídeos de projetos podem durar uma hora ou mais), o curso ainda não tem todas as aulas lançadas mas todas as segundas, quartas e sextas são postadas novas aulas",
  },
  {
    question: "Quais são as garantias oferecidas?",
    answer: "Garantimos 7 dias para reembolso total caso você não fique satisfeito.",
  },
  {
    question: "O curso oferece suporte ao aluno?",
    answer:
      "Sim, você terá acesso a uma comunidade exclusiva no Discord, onde poderá tirar dúvidas e interagir com outros alunos, além de conversar com o seu tutor.",
  },
  {
    question: "Preciso de conhecimento prévio para fazer o curso?",
    answer: "Não, o curso começa totalmente do zero e ideal para iniciantes.",
  },
  {
    question: "Como posso acessar o conteúdo do curso?",
    answer:
      "Todo o conteúdo estará disponível em uma plataforma online, protegida com autenticação aos assinantes do curso. Quando você finalizar a compra você receberá por email o link da plataforma e as suas credenciais de acesso.",
  },
  {
    question: "Quantas aulas o curso possui?",
    answer: "O curso possui 39 aulas divididas em módulos bem definidos.",
  },
  {
    question: "Posso acessar as aulas pelo celular?",
    answer: "Sim, o curso é responsivo e pode ser acessado de qualquer dispositivo com internet.",
  },
  {
    question: "O que acontece se eu tiver problemas técnicos durante o curso?",
    answer:
      "Oferecemos suporte técnico para resolver qualquer problema que você encontrar na plataforma, basta nos enviar um e-mail.",
  },
];

const Faq = () => {
  return (
    <div className={S.screen} id="faq">
      <h1 className={S.title}>Perguntas frequentes</h1>
      <div className={S.questionsContainer}>
        {faqData.map((item, index) => (
          <details key={index} className={S.questionItem}>
            <summary className={S.question}>{item.question}</summary>
            <p className={S.answer}>{item.answer}</p>
          </details>
        ))}
      </div>
    </div>
  );
};

export default Faq;

import React from "react";
import S from "./obrigado.module.css";
import Link from "next/link";

const page = () => {
  return (
    <div className={S.screen}>
      <div className={S.box}>
        <h1 className={` gradient-text ${S.title}`}>Do Zero ao Next</h1>
        <h2 className={S.subtitle}>Parabéns pela compra! 🎉</h2>
        <p className={S.paragraph}>
          Estamos muito felizes por ter você nessa jornada conosco. Verifique o seu e-mail para acessar o curso e começar a
          aprender agora mesmo!
        </p>
        <p className={S.paragraph}>
          Caso não encontre nosso e-mail, verifique sua caixa de spam ou entre em contato conosco pelo link:{" "}
          <Link href="/#contact" className="blueLink">
            Entre em contato
          </Link>
        </p>
      </div>
    </div>
  );
};

export default page;

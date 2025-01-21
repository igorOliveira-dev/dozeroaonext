"use client";

import { useState } from "react";
import S from "./contact.module.css";
import emailjs from "@emailjs/browser";
import Link from "next/link";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [succesMessage, setSuccesMessage] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccesMessage("");
    setLoading(true);
    if (name === "" || email === "" || message === "") {
      setLoading(false);
      setErrorMessage("Preencha todos os campos, por favor");
      return;
    }

    const templateParams = {
      from_name: name,
      message: message,
      email: email,
    };

    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PRIVATE_KEY_ID
      )
      .then(
        (response) => {
          console.log("EMAIL ENVIADO", response.status, response.text);
          setName("");
          setMessage("");
          setEmail("");
          setLoading(false);
          setSuccesMessage("Email enviado com sucesso!");
        },
        (err) => {
          console.log("ERRO: ", err);
          setLoading(false);
          alert("algum erro aconteceu, entre em contato com o suporte por dozeroaonext@gmail.com");
        }
      );
  };

  return (
    <div className={S.screen} id="contact">
      <h1 className={S.title}>Contato para dúvidas</h1>

      <form className={S.form} onSubmit={sendEmail}>
        <h2 className="mb-2 text-gray-400 text-center">Envie um email rapidamente!</h2>
        <input className={S.input} type="text" placeholder="Digite seu nome" onChange={(e) => setName(e.target.value)} value={name} />

        <input
          className={S.input}
          type="text"
          placeholder="Digite seu email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <textarea
          className={S.textarea}
          placeholder="Digite sua mensagem..."
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />

        <input className={S.button} type="submit" value={loading ? "carregando..." : "Enviar"} />

        {succesMessage ? <p className={S.succesMessage}>{succesMessage}</p> : ""}
        {errorMessage ? <p className={S.errorMessage}>{errorMessage}</p> : ""}
      </form>
      <div className={S.paragrapgh}>
        <p>
          Você também pode entrar em contato enviando um email diretamente para:{" "}
          <Link href="mailto:dozeroaonext@gmail.com" className="blueLink">
            dozeroaonext@gmail.com
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Contact;

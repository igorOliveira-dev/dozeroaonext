"use client";
import useUser from "./hooks/useUser";
import Loading from "../components/Loading";
import { useState } from "react";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import S from "./dashboard.module.css";

export default function RootLayout({ children }) {
  const { user, loading, needsName, updateUser } = useUser(); // Certifique-se de que updateUser está disponível no hook
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSaveName = async () => {
    if (!user?.uid) {
      setError("Erro ao identificar o usuário. Tente novamente.");
      return;
    }

    if (name.length < 6) {
      setError("O nome deve ter pelo menos 6 caracteres.");
      return;
    }

    setSaving(true);
    setError("");

    try {
      const userDoc = doc(db, "users", user.uid);
      await setDoc(userDoc, { name }, { merge: true });

      // Atualiza o estado global do usuário
      updateUser({ name });
    } catch (err) {
      console.error("Erro ao salvar o nome:", err);
      setError("Erro ao salvar o nome. Por favor, tente novamente.");
    } finally {
      setSaving(false);
    }
  };

  if (loading || needsName) {
    return needsName ? (
      <div className={S.nameInputBox}>
        <h1>Por favor, insira seu nome antes de acessar o curso. Esse nome será usado no seu certificado de conclusão.</h1>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Seu nome" />
        <button onClick={handleSaveName} disabled={saving || !name}>
          {saving ? "Salvando..." : "Salvar"}
        </button>
        {error && <p className={S.error}>{error}</p>}
      </div>
    ) : (
      <Loading />
    );
  }

  return <div>{children}</div>;
}

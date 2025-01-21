"use client";
import useUser from "./hooks/useUser";
import Loading from "../components/Loading";
import { useState } from "react";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import S from "./dashboard.module.css";

export default function RootLayout({ children }) {
  const { user, loading, needsName } = useUser();
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSaveName = async () => {
    if (!user?.uid) return;

    if (name.length < 6) {
      setError("O nome deve ter pelo menos 6 caracteres.");
      return;
    }

    setSaving(true);
    try {
      const userDoc = doc(db, "users", user.uid);
      await setDoc(userDoc, { name }, { merge: true });
      window.location.reload();
    } catch {
      setSaving(false);
    }
  };

  if (loading || needsName) {
    return needsName ? (
      <div className={S.nameInputBox}>
        <h1>Por favor, insira seu nome antes de acessar o curso, esse nome será usado no seu certificado de conclusão.</h1>
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

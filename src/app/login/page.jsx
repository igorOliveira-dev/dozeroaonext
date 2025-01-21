"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href = "/dashboard";
    } catch (err) {
      setError("Sua senha está errada ou você não comprou o curso com esse email");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-[#fdfdfd15] p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block">
              E-mail
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mt-1 border border-[#ffffff30] rounded-lg bg-[#ffffff10]"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block">
              Senha
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mt-1 border border-[#ffffff30] rounded-lg bg-[#ffffff10]"
              required
            />
          </div>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <button
            type="submit"
            className="w-full py-2 bg-[#EF00DA] transition-all duration-400 text-white rounded-lg hover:bg-[#EF00DBDD]"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

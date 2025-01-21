"use client";
import { useState, useEffect } from "react";
import { auth, db } from "../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const useUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [needsName, setNeedsName] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        try {
          const userDocRef = doc(db, "users", authUser.uid);
          const userSnapshot = await getDoc(userDocRef);

          if (userSnapshot.exists()) {
            const userData = userSnapshot.data();
            setUser({ ...authUser, ...userData });
            setNeedsName(!userData.name);
          } else {
            await setDoc(userDocRef, {
              email: authUser.email,
              createdAt: new Date().toISOString(),
            });
            setNeedsName(true);
          }
        } catch (error) {
          console.error("Erro ao buscar ou criar usuário:", error);
        }
      } else {
        setUser(null);
        window.location.href = "/login";
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const updateUser = (newUserData) => {
    setUser((prev) => ({ ...prev, ...newUserData }));
    if (newUserData.name) {
      setNeedsName(false);
    }
  };

  return { user, loading, needsName, updateUser };
};

export default useUser;

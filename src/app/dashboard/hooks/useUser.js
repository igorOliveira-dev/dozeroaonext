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
      } else {
        setUser(null);
        window.location.href = "/login";
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, loading, needsName };
};

export default useUser;

"use client";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const useWatchedVideos = (userUid) => {
  const [watchedVideos, setWatchedVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userUid) return;
    const fetchWatchedVideos = async () => {
      try {
        const colRef = collection(db, "users", userUid, "watchedVideos");
        const snapshot = await getDocs(colRef);
        const videos = snapshot.docs.map((doc) => doc.id).filter((id) => id.startsWith("video"));
        setWatchedVideos(videos);
      } catch (error) {
        console.error("Erro ao buscar vídeos assistidos:", error);
      }
      setLoading(false);
    };

    fetchWatchedVideos();
  }, [userUid]);

  return { watchedVideos, loading };
};

export default useWatchedVideos;

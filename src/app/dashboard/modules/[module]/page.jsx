"use client";

import { useState, useEffect, useRef } from "react";
import { db } from "../../../firebase";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import { useParams } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import S from "./modules.module.css";
import Link from "next/link";
import Image from "next/image";
import useUser from "../../hooks/useUser";

export default function ModulePage() {
  const { module } = useParams();
  const { user } = useUser();
  const [videos, setVideos] = useState([]);
  const [watchedVideos, setWatchedVideos] = useState({});
  const [moduleName, setModuleName] = useState("");
  const [selectedVideoUrl, setSelectedVideoUrl] = useState("");
  const [selectedVideoInfo, setSelectedVideoInfo] = useState({ title: "", description: "", id: "" });
  const videoRef = useRef(null);
  const progressReported = useRef({});

  useEffect(() => {
    if (!module || !user) return;

    const fetchModuleData = async () => {
      try {
        const moduleRef = collection(db, "modules", module, "videos");
        const querySnapshot = await getDocs(moduleRef);
        const videosList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setVideos(videosList);

        const moduleDocRef = collection(db, "modules");
        const moduleSnapshot = await getDocs(moduleDocRef);
        const moduleData = moduleSnapshot.docs.find((doc) => doc.id === module);
        if (moduleData) {
          setModuleName(moduleData.data().name || "Módulo Desconhecido");
        }

        // Buscar vídeos assistidos
        const watchedRef = collection(db, "users", user.uid, "watchedVideos");
        const watchedSnapshot = await getDocs(watchedRef);
        const watchedData = {};
        watchedSnapshot.forEach((doc) => {
          watchedData[doc.id] = true;
        });
        setWatchedVideos(watchedData);
      } catch (error) {
        console.error("Erro ao buscar dados do módulo:", error);
      }
    };

    fetchModuleData();
  }, [module, user]);

  const handleVideoSelect = async (publicId) => {
    try {
      const response = await fetch("/api/generate-signed-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ publicId }),
      });

      const data = await response.json();
      if (response.ok) {
        setSelectedVideoUrl(data.url);
        const selectedVideo = videos.find((video) => video.link === publicId);
        if (selectedVideo) {
          setSelectedVideoInfo({
            title: selectedVideo.title,
            description: selectedVideo.description,
            id: selectedVideo.id,
          });
        }
      } else {
        console.error("Erro ao gerar URL assinada:", data.error || "Erro desconhecido");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  const handleTimeUpdate = () => {
    const videoElement = videoRef.current;
    if (videoElement) {
      const progress = (videoElement.currentTime / videoElement.duration) * 100;
      if (
        progress >= 90 &&
        selectedVideoInfo.id &&
        !watchedVideos[selectedVideoInfo.id] &&
        !progressReported.current[selectedVideoInfo.id]
      ) {
        progressReported.current[selectedVideoInfo.id] = true;

        // Marcar vídeo como assistido no banco de dados
        const watchedRef = doc(db, "users", user.uid, "watchedVideos", selectedVideoInfo.id);
        setDoc(watchedRef, { watchedAt: new Date().toISOString() })
          .then(() => {
            setWatchedVideos((prev) => ({ ...prev, [selectedVideoInfo.id]: true }));
          })
          .catch((error) => {
            console.error("Erro ao marcar vídeo como assistido:", error);
          });
      }
    }
  };

  return (
    <div className={S.screen}>
      <header className={S.header}>
        <Link className={S.returnArrow} href="/dashboard">
          <FaArrowLeft />
        </Link>
        <h1>{moduleName}</h1>
      </header>

      <div className={S.videoContainer}>
        <div>
          {selectedVideoUrl ? (
            <div>
              <video ref={videoRef} src={selectedVideoUrl} controls onTimeUpdate={handleTimeUpdate} />
              <h2 className={S.activeVideoTitle}>{selectedVideoInfo.title}</h2>
              <p className={S.activeVideoDesc}>{selectedVideoInfo.description}</p>
            </div>
          ) : (
            <p className={S.noVideoParagraph}>Selecione um vídeo do seu curso!</p>
          )}
        </div>

        <div className={S.videoLinks}>
          {videos.map((video) => (
            <div key={video.id}>
              <div onClick={() => handleVideoSelect(video.link)} className={S.videoItem}>
                <Image src={video.image} alt={video.title} height={64} width={100} />
                <div className={S.videoInfos}>
                  <h2 className={S.videoTitle}>
                    {video.title} {watchedVideos[video.id] && <span className="text-[#00b400]">(assistido)</span>}
                  </h2>
                  <p className={S.videoTime}>{video.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

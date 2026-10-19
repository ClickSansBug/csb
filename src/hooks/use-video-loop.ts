"use client";

import { type RefObject, useEffect } from "react";

// Silent autoplay in a loop, paused off screen (design: csb-behaviors.js › Vidéos en boucle).
// Plays under reduced motion too (clarifications.md › prefers-reduced-motion).
export function useVideoLoop(ref: RefObject<HTMLVideoElement | null>) {
  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.loop = true;
    const tryPlay = () => {
      video.play().catch(() => {});
    };
    tryPlay();
    video.addEventListener("loadeddata", tryPlay);
    video.addEventListener("canplay", tryPlay);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) tryPlay();
        else video.pause();
      },
      { threshold: 0.05 },
    );
    observer.observe(video);

    return () => {
      observer.disconnect();
      video.removeEventListener("loadeddata", tryPlay);
      video.removeEventListener("canplay", tryPlay);
    };
  }, [ref]);
}

"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/utils/cn";

// Port of "Vidéos en boucle" (csb-behaviors.js): silent autoplay, loop, paused off screen.
// It keeps playing when motion is reduced (clarifications.md › prefers-reduced-motion).
const VISIBLE_THRESHOLD = 0.05;

type LoopVideoProps = {
  src: string;
  poster: string;
  label: string;
  className?: string;
};

export function LoopVideo({ src, poster, label, className }: LoopVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;
    const play = () => {
      video.play().catch(() => undefined);
    };
    play();
    video.addEventListener("loadeddata", play);
    video.addEventListener("canplay", play);
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) play();
        else video.pause();
      },
      { threshold: VISIBLE_THRESHOLD },
    );
    observer.observe(video);
    return () => {
      observer.disconnect();
      video.removeEventListener("loadeddata", play);
      video.removeEventListener("canplay", play);
    };
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      aria-label={label}
      className={cn(
        "block size-full bg-paper object-cover dark:brightness-90",
        className,
      )}
    />
  );
}

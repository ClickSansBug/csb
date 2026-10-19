"use client";

import { useRef } from "react";

import { useTilt } from "@/hooks/use-tilt";
import { useTypewriter } from "@/hooks/use-typewriter";
import { useVideoLoop } from "@/hooks/use-video-loop";

type PreviewMockupProps = {
  address: string;
  video: { src: string; poster: string; label: string };
  tags: { neutral: string; green: string };
};

// Browser mock-up of the home hero: typed address, looping video, tilt with the pointer.
export function PreviewMockup({ address, video, tags }: PreviewMockupProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const addressRef = useRef<HTMLSpanElement>(null);
  useTypewriter(addressRef);
  useTilt(frameRef);
  useVideoLoop(videoRef);

  return (
    <div
      ref={frameRef}
      className="tilt relative overflow-hidden rounded-lg border border-ink/10 bg-card shadow-mockup"
    >
      <div className="flex items-center gap-2 border-b border-ink/8 px-4 py-3.25">
        <span aria-hidden="true" className="size-2.25 rounded-full bg-ink/14" />
        <span aria-hidden="true" className="size-2.25 rounded-full bg-ink/14" />
        <span aria-hidden="true" className="size-2.25 rounded-full bg-ink/14" />
        <div className="ml-2 flex flex-1 items-center rounded-sm bg-ink/4.5 px-2.75 py-1.25 font-mono text-11-5 text-ink/55">
          <span ref={addressRef}>{address}</span>
          <span
            aria-hidden="true"
            className="ml-0.5 h-3 w-px animate-caret bg-brand motion-reduce:animate-none"
          />
        </div>
      </div>
      <div className="relative aspect-video overflow-hidden border-b border-ink/8 bg-paper">
        <video
          ref={videoRef}
          src={video.src}
          poster={video.poster}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-label={video.label}
          className="block size-full bg-paper object-cover dark:brightness-90"
        />
      </div>
      <div className="px-7 pt-5 pb-6">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-pill bg-ink/5 px-2.5 py-1.5 font-mono text-10-5 tracking-p70 text-ink/60">
            {tags.neutral}
          </span>
          <span className="rounded-pill bg-g94 px-2.5 py-1.5 font-mono text-10-5 tracking-p70 text-g42">
            {tags.green}
          </span>
        </div>
      </div>
    </div>
  );
}

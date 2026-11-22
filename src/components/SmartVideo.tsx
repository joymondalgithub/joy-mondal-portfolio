'use client';

import React, { useRef, useState, useCallback, useEffect, memo } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2 } from 'lucide-react';

interface SmartVideoProps {
  src: string;
  poster?: string;
  className?: string;
  videoClassName?: string;
  loop?: boolean;
  muted?: boolean;
  title?: string;
  onExpand?: () => void;
}

const SmartVideo = memo(function SmartVideo({
  src,
  poster,
  className = '',
  videoClassName = '',
  loop = true,
  muted: defaultMuted = true,
  title,
  onExpand,
}: SmartVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(defaultMuted);

  // Strictly enforce initial paused state, preload="none", muted, and playsInline
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.preload = 'none';
    video.muted = isMuted;
    video.defaultMuted = true;
    video.playsInline = true;

    if (!video.paused) {
      video.pause();
    }
  }, [isMuted]);

  // Play ONLY on hover (onMouseEnter / onPointerEnter)
  const handleHoverEnter = useCallback(
    (e: React.MouseEvent | React.PointerEvent) => {
      // Prevent touch scroll gestures on mobile/tablet from triggering hover play
      if ('pointerType' in e && e.pointerType === 'touch') {
        return;
      }
      if (videoRef.current) {
        videoRef.current.muted = isMuted;
      }
      videoRef.current?.play().catch(() => {});
    },
    [isMuted]
  );

  // Pause on leave (onMouseLeave / onPointerLeave)
  const handleHoverLeave = useCallback(
    (e: React.MouseEvent | React.PointerEvent) => {
      if ('pointerType' in e && e.pointerType === 'touch') {
        return;
      }
      videoRef.current?.pause();
      if (videoRef.current) {
        try {
          videoRef.current.currentTime = 0;
        } catch {
          // Ignore unbuffered seek exceptions
        }
      }
    },
    []
  );

  // Tap/click support for touch devices and manual toggle
  const handleToggle = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.muted = isMuted;
      videoRef.current?.play().catch(() => {});
    } else {
      videoRef.current?.pause();
    }
  }, [isMuted]);

  const toggleMute = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      const video = videoRef.current;
      if (!video) return;
      const nextMuted = !isMuted;
      video.muted = nextMuted;
      video.volume = nextMuted ? 0 : 1;
      setIsMuted(nextMuted);
    },
    [isMuted]
  );

  return (
    <div
      className={`relative group overflow-hidden select-none bg-white cursor-pointer ${className}`}
      onMouseEnter={handleHoverEnter}
      onPointerEnter={handleHoverEnter}
      onMouseLeave={handleHoverLeave}
      onPointerLeave={handleHoverLeave}
      onClick={handleToggle}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster || undefined}
        loop={loop}
        muted={isMuted}
        playsInline
        preload="none"
        disablePictureInPicture
        disableRemotePlayback
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        className={`w-full h-full object-contain block bg-white transition-opacity duration-300 ${videoClassName}`}
      />

      {/* Top Expand Pill Button (Optional) */}
      {onExpand && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onExpand();
          }}
          className="absolute top-2.5 right-2.5 z-20 w-7 h-7 rounded-full bg-[#1C130D]/90 border border-[#C99D55]/30 text-[#E5C585] hover:bg-[#C99D55] hover:text-[#221710] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-md"
          title="Inspect video in full vertical view"
          aria-label="Inspect video in full vertical view"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>
      )}

      {/* Subtle "Hover to preview" badge on desktop / "Tap to play" on mobile */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/25 pointer-events-none transition-opacity duration-200">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1C130D]/92 border border-[#C99D55]/40 text-[#E5C585] shadow-lg">
            <Play className="w-3 h-3 fill-current ml-0.5 text-[#C99D55]" />
            <span className="text-[10px] sm:text-[10.5px] font-mono tracking-wide font-medium hidden sm:inline text-[#F6F2EA]">
              Hover to preview
            </span>
            <span className="text-[10px] sm:text-[10.5px] font-mono tracking-wide font-medium sm:hidden text-[#F6F2EA]">
              Tap to play
            </span>
          </div>
        </div>
      )}

      {/* Bottom Controls Bar (Visible during hover or play) */}
      <div
        className={`absolute inset-x-0 bottom-0 p-2 sm:p-2.5 bg-gradient-to-t from-[#150E09]/95 via-[#150E09]/60 to-transparent flex items-center justify-between transition-opacity duration-200 ${
          isPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`}
      >
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleToggle();
            }}
            className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#C99D55] text-[#221710] flex items-center justify-center hover:bg-[#E5C585] transition-colors shadow-md shrink-0 cursor-pointer"
            title={isPlaying ? 'Pause' : 'Play'}
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
          >
            {isPlaying ? (
              <Pause className="w-3 h-3 fill-current" />
            ) : (
              <Play className="w-3 h-3 fill-current ml-0.5" />
            )}
          </button>

          <button
            type="button"
            onClick={toggleMute}
            className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#2B1E15]/90 border border-[#C99D55]/30 text-[#E5C585] flex items-center justify-center hover:bg-[#36261B] transition-colors shrink-0 cursor-pointer"
            title={isMuted ? 'Unmute' : 'Mute'}
            aria-label={isMuted ? 'Unmute video' : 'Mute video'}
          >
            {isMuted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
          </button>

          {title && (
            <span className="text-[10px] font-mono text-[#F6F2EA]/90 hidden sm:inline-block ml-1 truncate max-w-[120px] lg:max-w-[150px]">
              {title}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[8.5px] font-mono font-medium tracking-wide bg-[#2B1E15]/90 text-[#C99D55] border border-[#C99D55]/25">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isPlaying ? 'bg-[#81C784] animate-pulse' : 'bg-[#C99D55]'
              }`}
            />
            {isPlaying ? 'PLAYING' : 'READY'}
          </span>
        </div>
      </div>
    </div>
  );
});

export default SmartVideo;

import { useState, useRef, useCallback, useEffect } from "react";
import { RECITERS } from "@/constants/reciters";
import { padSurahNumber } from "@/lib/utils";

export interface PlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  loading: boolean;
  reciterId: number;
  surahNumber: number | null;
  speed: number;
  volume: number;
  loop: boolean;
}

export function useAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [state, setState] = useState<PlayerState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    loading: false,
    reciterId: 0,
    surahNumber: null,
    speed: 1,
    volume: 0.9,
    loop: false,
  });

  // Init audio
  useEffect(() => {
    const audio = new Audio();
    audio.preload = "none";
    audioRef.current = audio;

    const onTimeUpdate = () =>
      setState((s) => ({ ...s, currentTime: audio.currentTime, duration: audio.duration || 0 }));
    const onEnded = () => setState((s) => ({ ...s, isPlaying: false }));
    const onLoadStart = () => setState((s) => ({ ...s, loading: true }));
    const onCanPlay = () => setState((s) => ({ ...s, loading: false }));

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("loadstart", onLoadStart);
    audio.addEventListener("canplay", onCanPlay);

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("loadstart", onLoadStart);
      audio.removeEventListener("canplay", onCanPlay);
    };
  }, []);

  const loadSurah = useCallback((surahNumber: number, reciterId: number, autoPlay = false) => {
    const audio = audioRef.current;
    if (!audio) return;
    const reciter = RECITERS[reciterId] || RECITERS[0];
    const url = `${reciter.baseUrl}${padSurahNumber(surahNumber)}.mp3`;
    audio.src = url;
    audio.load();
    setState((s) => ({ ...s, surahNumber, reciterId, currentTime: 0, duration: 0 }));
    if (autoPlay) {
      audio.play().then(() => setState((s) => ({ ...s, isPlaying: true }))).catch(() => {});
    }
  }, []);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !audio.src) return;
    if (state.isPlaying) {
      audio.pause();
      setState((s) => ({ ...s, isPlaying: false }));
    } else {
      audio.play().then(() => setState((s) => ({ ...s, isPlaying: true }))).catch(() => {});
    }
  }, [state.isPlaying]);

  const seekTo = useCallback((fraction: number) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    audio.currentTime = fraction * audio.duration;
  }, []);

  const setSpeed = useCallback((speed: number) => {
    const audio = audioRef.current;
    if (audio) audio.playbackRate = speed;
    setState((s) => ({ ...s, speed }));
  }, []);

  const setVolume = useCallback((volume: number) => {
    const audio = audioRef.current;
    if (audio) audio.volume = volume;
    setState((s) => ({ ...s, volume }));
  }, []);

  const toggleLoop = useCallback(() => {
    const audio = audioRef.current;
    const next = !state.loop;
    if (audio) audio.loop = next;
    setState((s) => ({ ...s, loop: next }));
  }, [state.loop]);

  const stop = useCallback(() => {
    const audio = audioRef.current;
    if (audio) { audio.pause(); audio.currentTime = 0; }
    setState((s) => ({ ...s, isPlaying: false, currentTime: 0 }));
  }, []);

  return { state, loadSurah, togglePlay, seekTo, setSpeed, setVolume, toggleLoop, stop };
}

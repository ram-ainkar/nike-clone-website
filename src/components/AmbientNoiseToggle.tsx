'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export default function AmbientNoiseToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const noiseBufferRef = useRef<AudioBuffer | null>(null);
  const audioSourceRef = useRef<AudioBufferSourceNode | null>(null);

  useEffect(() => {
    // Create ambient noise (white noise for subtle atmosphere)
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    audioContextRef.current = audioContext;
    const bufferSize = 2 * audioContext.sampleRate;
    const noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
    noiseBufferRef.current = noiseBuffer;
    const output = noiseBuffer.getChannelData(0);

    let lastOut = 0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      output[i] = (lastOut + (0.02 * white)) / 1.02;
      lastOut = output[i];
      output[i] *= 3.5;
    }

    return () => {
      if (audioSourceRef.current) {
        audioSourceRef.current.stop();
        audioSourceRef.current.disconnect();
      }
      audioContext.close();
    };
  }, []);

  const toggleNoise = async () => {
    if (!audioContextRef.current || !noiseBufferRef.current) return;

    const audioContext = audioContextRef.current;
    const noiseBuffer = noiseBufferRef.current;

    if (isPlaying) {
      // Stop playing
      if (audioSourceRef.current) {
        audioSourceRef.current.stop();
        audioSourceRef.current.disconnect();
        audioSourceRef.current = null;
      }
      setIsPlaying(false);
    } else {
      // Start playing
      if (audioContext.state === 'suspended') {
        await audioContext.resume();
      }

      const source = audioContext.createBufferSource();
      source.buffer = noiseBuffer;
      source.loop = true;
      source.connect(audioContext.destination);
      source.start();
      audioSourceRef.current = source;
      setIsPlaying(true);
    }
  };

  return (
    <motion.button
      onClick={toggleNoise}
      className="fixed bottom-8 left-8 z-500 flex items-center gap-2 px-4 py-2 bg-transparent border border-foreground/20 rounded-full hover:border-foreground/40 transition-colors clickable"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.5 }}
    >
      <motion.svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={isPlaying ? { scale: [1, 1.2, 1] } : { scale: 1 }}
        transition={{ duration: 0.5, repeat: isPlaying ? Infinity : 0 }}
      >
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" y1="19" x2="12" y2="23" />
        <line x1="8" y1="23" x2="16" y2="23" />
      </motion.svg>
      <span className="text-sm uppercase tracking-wider">
        {isPlaying ? 'Sound On' : 'Sound Off'}
      </span>
    </motion.button>
  );
}

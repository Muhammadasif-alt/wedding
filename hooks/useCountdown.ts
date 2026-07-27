"use client";

import { useEffect, useState } from "react";

export type Countdown = { d: number; h: string; m: string; s: string; ticked: boolean };

const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);

// Target date data/invitation.ts mein set hoti hai
export function useCountdown(targetIso: string): Countdown {
  const [now, setNow] = useState(() => Date.now());
  const [ticked, setTicked] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setNow(Date.now());
      setTicked(true);
      const t = setTimeout(() => setTicked(false), 180);
      return () => clearTimeout(t);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  let diff = new Date(targetIso).getTime() - now;
  if (diff < 0) diff = 0;

  return {
    d: Math.floor(diff / 86400000),
    h: pad(Math.floor((diff % 86400000) / 3600000)),
    m: pad(Math.floor((diff % 3600000) / 60000)),
    s: pad(Math.floor((diff % 60000) / 1000)),
    ticked,
  };
}

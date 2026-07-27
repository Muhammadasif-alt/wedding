"use client";

import { useEffect, useState } from "react";

// Batata hai ke di gayi image file waqai maujood hai ya nahi.
// Isse section sirf tab background waala layout leta hai jab image sach mein load ho —
// file na ho tou section apne purane saade cream look pe rehta hai, khaali nahi lagta.
export function useImageReady(src: string) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!src) {
      setReady(false);
      return;
    }
    const img = new window.Image();
    let alive = true;
    img.onload = () => alive && setReady(true);
    img.onerror = () => alive && setReady(false);
    img.src = src;
    return () => {
      alive = false;
    };
  }, [src]);

  return ready;
}

"use client";

import { RefObject, useCallback, useEffect } from "react";

// Scroll pe .rv elements ko ek ek kar ke reveal karta hai
export function useReveal(scrollRef: RefObject<HTMLElement | null>, active: boolean) {
  const check = useCallback(() => {
    const root = scrollRef.current;
    if (!root) return;
    const vh = root.clientHeight;
    root.querySelectorAll<HTMLElement>(".rv").forEach((el) => {
      if (el.getBoundingClientRect().top < vh * 0.92) el.classList.add("in");
    });
  }, [scrollRef]);

  const reset = useCallback(() => {
    const root = scrollRef.current;
    if (!root) return;
    root.querySelectorAll<HTMLElement>(".rv").forEach((el) => el.classList.remove("in"));
  }, [scrollRef]);

  useEffect(() => {
    const root = scrollRef.current;
    if (!root || !active) return;
    check();
    root.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      root.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [active, check, scrollRef]);

  return { check, reset };
}

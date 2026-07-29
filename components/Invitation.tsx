"use client";

// Main controller — envelope aur card ke darmiyan switching yahan hoti hai.
// Awaaz bhi yahin rehti hai (card ke bahar) taake card ke layout ko chhue hi na.

import { useEffect, useRef, useState } from "react";
import Envelope from "./Envelope";
import Card from "./Card";
import { invitation } from "@/data/invitation";
import { useReveal } from "@/hooks/useReveal";

export default function Invitation() {
  const [opened, setOpened] = useState(false); // envelope khula ya nahi
  const [showCard, setShowCard] = useState(false); // card visible hai ya nahi
  // "soundWanted" = user ki marzi. Awaaz asal mein chalti hai ya nahi, woh iske
  // aur hero screen par hone — dono par mabni hai.
  const [soundWanted, setSoundWanted] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const fadeRef = useRef(0);

  const { check, reset } = useReveal(cardRef, showCard);
  const audioSrc = invitation.hero.audio;

  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // awaaz ko dheere dheere charhana/utarna — achanak katne se bura lagta hai
  const fade = (to: number, then?: () => void) => {
    const a = audioRef.current;
    if (!a) return;
    cancelAnimationFrame(fadeRef.current);
    const from = a.volume;
    const t0 = performance.now();
    const step = (now: number) => {
      const p = Math.min((now - t0) / 420, 1);
      a.volume = Math.max(0, Math.min(1, from + (to - from) * p));
      if (p < 1) fadeRef.current = requestAnimationFrame(step);
      else then?.();
    };
    fadeRef.current = requestAnimationFrame(step);
  };

  // Awaaz sirf hero section tak — neeche scroll karte hi narmi se band,
  // wapas upar aane par phir chalu.
  useEffect(() => {
    const a = audioRef.current;
    const root = cardRef.current;
    const hero = root?.querySelector<HTMLElement>(".hero");
    if (!a || !root || !hero || !showCard) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (soundWanted) {
            a.play().then(() => fade(1)).catch(() => {});
          }
        } else {
          fade(0, () => a.pause());
        }
      },
      // hero 4 screen lamba hai, is liye threshold bohat kam — awaaz tab jaye
      // jab hero waqai screen se nikal jaye, pehle nahi
      { root, threshold: 0.02 },
    );
    io.observe(hero);
    return () => {
      io.disconnect();
      cancelAnimationFrame(fadeRef.current);
    };
  }, [showCard, soundWanted]);

  const handleOpen = () => {
    // Awaaz yahin, seal ke tap par, chalani zaroori hai — browser sirf seedhe
    // user gesture par sound ki ijazat deta hai. 550ms baad timeout ke andar
    // karte tou gesture ka silsila toot jata aur awaaz block ho jati.
    const a = audioRef.current;
    if (a) {
      a.muted = false;
      a.volume = 0;
      a.play()
        .then(() => {
          setSoundWanted(true);
          fade(1);
        })
        .catch(() => setSoundWanted(false));
    }

    setOpened(true);
    // envelope pehle aaram se paas aata hai, phir ghulna shuru karta hai — theek ussi
    // waqt card apni jagah settle hota hai, is liye beech mein koi khaali screen nahi aati
    setTimeout(() => {
      setShowCard(true);
      if (cardRef.current) cardRef.current.scrollTop = 0;
      requestAnimationFrame(check);
    }, reduced ? 20 : 550);
  };

  const handleClose = () => {
    const a = audioRef.current;
    if (a) {
      cancelAnimationFrame(fadeRef.current);
      a.pause();
      a.currentTime = 0;
    }
    setSoundWanted(false);

    setOpened(false); // envelope pehle upar aa kar card ko dhaanp leta hai
    setTimeout(() => {
      setShowCard(false);
      if (cardRef.current) cardRef.current.scrollTop = 0;
      reset(); // taake dobara kholne pe animations phir chalein
    }, reduced ? 30 : 850);
  };

  const toggleSound = () => {
    const a = audioRef.current;
    if (!a) return;
    if (soundWanted) {
      setSoundWanted(false);
      fade(0, () => a.pause());
    } else {
      setSoundWanted(true);
      a.muted = false;
      a.play().then(() => fade(1)).catch(() => {});
    }
  };

  return (
    <div className="stage">
      <div className="phone">
        <Envelope opened={opened} onOpen={handleOpen} />
        <Card ref={cardRef} show={showCard} onClose={handleClose} />

        {/* video ki awaaz alag file mein — scrub mein video "seek" hoti hai,
            chalti nahi, aur seek se awaaz nahi aati */}
        {audioSrc && (
          <>
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <audio ref={audioRef} src={audioSrc} loop preload="auto" />
            <button
              className={`sound-toggle${soundWanted ? " on" : ""}${opened ? " show" : ""}`}
              onClick={toggleSound}
              aria-label={soundWanted ? "Turn sound off" : "Turn sound on"}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 9.5h3.2L12 5.4v13.2L7.2 14.5H4z" />
                {soundWanted ? (
                  <>
                    <path d="M15.4 9.2a4 4 0 0 1 0 5.6" fill="none" strokeWidth="1.7" strokeLinecap="round" />
                    <path d="M17.8 6.8a7.4 7.4 0 0 1 0 10.4" fill="none" strokeWidth="1.7" strokeLinecap="round" />
                  </>
                ) : (
                  <path d="M15.6 9.6l4.8 4.8M20.4 9.6l-4.8 4.8" fill="none" strokeWidth="1.7" strokeLinecap="round" />
                )}
              </svg>
            </button>
          </>
        )}
      </div>
    </div>
  );
}

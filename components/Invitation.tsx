"use client";

// Main controller — envelope aur card ke darmiyan switching yahan hoti hai.
// Awaaz bhi yahin rehti hai (card ke bahar) taake card ke layout ko chhue hi na.

import { useRef, useState } from "react";
import Envelope from "./Envelope";
import Card from "./Card";
import { invitation } from "@/data/invitation";
import { useReveal } from "@/hooks/useReveal";

export default function Invitation() {
  const [opened, setOpened] = useState(false); // envelope khula ya nahi
  const [showCard, setShowCard] = useState(false); // card visible hai ya nahi
  const [soundOn, setSoundOn] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { check, reset } = useReveal(cardRef, showCard);

  const audioSrc = invitation.hero.audio;

  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const handleOpen = () => {
    // Awaaz yahin, seal ke tap par, chalani zaroori hai — browser sirf seedhe
    // user gesture par sound ki ijazat deta hai. 550ms baad timeout ke andar
    // karte tou gesture ka silsila toot jata aur awaaz block ho jati.
    const a = audioRef.current;
    if (a) {
      a.muted = false;
      a.play().then(() => setSoundOn(true)).catch(() => setSoundOn(false));
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
      a.pause();
      a.currentTime = 0;
      setSoundOn(false);
    }

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
    if (a.paused || a.muted) {
      a.muted = false;
      a.play().then(() => setSoundOn(true)).catch(() => {});
    } else {
      a.pause();
      setSoundOn(false);
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
              className={`sound-toggle${soundOn ? " on" : ""}${opened ? " show" : ""}`}
              onClick={toggleSound}
              aria-label={soundOn ? "Turn sound off" : "Turn sound on"}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 9.5h3.2L12 5.4v13.2L7.2 14.5H4z" />
                {soundOn ? (
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

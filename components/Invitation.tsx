"use client";

// Main controller — envelope aur card ke darmiyan switching yahan hoti hai

import { useRef, useState } from "react";
import Envelope from "./Envelope";
import Card from "./Card";
import { useReveal } from "@/hooks/useReveal";

export default function Invitation() {
  const [opened, setOpened] = useState(false); // envelope khula ya nahi
  const [showCard, setShowCard] = useState(false); // card visible hai ya nahi
  const cardRef = useRef<HTMLDivElement>(null);
  const { check, reset } = useReveal(cardRef, showCard);

  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const handleOpen = () => {
    // Awaaz yahin, seal ke tap par, chalani zaroori hai — browser sirf seedhe
    // user gesture par sound ki ijazat deta hai. 550ms baad timeout ke andar
    // karte tou gesture ka silsila toot jata aur awaaz block ho jati.
    const v = document.querySelector<HTMLVideoElement>("video[data-hero]");
    if (v) {
      v.muted = false;
      v.play().catch(() => {
        // browser ne mana kar diya — kam se kam video tou chale
        v.muted = true;
        v.play().catch(() => {});
      });
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
    setOpened(false); // envelope pehle upar aa kar card ko dhaanp leta hai
    setTimeout(() => {
      setShowCard(false);
      if (cardRef.current) cardRef.current.scrollTop = 0;
      reset(); // taake dobara kholne pe animations phir chalein
    }, reduced ? 30 : 850);
  };

  return (
    <div className="stage">
      <div className="phone">
        <Envelope opened={opened} onOpen={handleOpen} />
        <Card ref={cardRef} show={showCard} onClose={handleClose} />
      </div>
    </div>
  );
}

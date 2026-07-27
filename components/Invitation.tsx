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
    setOpened(true);
    // envelope fade hone ke sath hi card bhi aa jata hai — beech mein koi screen nahi
    setTimeout(() => {
      setShowCard(true);
      if (cardRef.current) cardRef.current.scrollTop = 0;
      requestAnimationFrame(check);
    }, reduced ? 20 : 60);
  };

  const handleClose = () => {
    setOpened(false); // envelope pehle upar aa kar card ko dhaanp leta hai
    setTimeout(() => {
      setShowCard(false);
      if (cardRef.current) cardRef.current.scrollTop = 0;
      reset(); // taake dobara kholne pe animations phir chalein
    }, reduced ? 30 : 650);
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

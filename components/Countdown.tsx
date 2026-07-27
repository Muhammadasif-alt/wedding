"use client";

import { invitation } from "@/data/invitation";
import { useCountdown } from "@/hooks/useCountdown";
import { useImageReady } from "@/hooks/useImageReady";

export default function Countdown() {
  const { d, h, m, s, ticked } = useCountdown(invitation.countdownTarget);
  const { countdown } = invitation;
  // background sirf tab lagta hai jab file waqai maujood ho
  const hasBg = useImageReady(countdown.bg);

  return (
    <section className={`sec countdown${hasBg ? " on-photo" : ""}`}>
      {/* background image — data/invitation.ts ke countdown.bg se aati hai */}
      {hasBg && (
        <div className="sec-bg" style={{ backgroundImage: `url("${countdown.bg}")` }}>
          <div className="sec-veil" style={{ "--veil": countdown.veil } as React.CSSProperties} />
        </div>
      )}

      <h2 className="script-title rv">{countdown.title}</h2>
      <div className="sec-sub rv" style={{ "--d": ".1s" } as React.CSSProperties}>
        {countdown.sub}
      </div>
      <div className="count-frame rv" style={{ "--d": ".2s" } as React.CSSProperties}>
        <div className="count-grid">
          <div className="count-cell"><b suppressHydrationWarning>{d}</b><i>Days</i></div>
          <div className="count-cell"><b suppressHydrationWarning>{h}</b><i>Hours</i></div>
          <div className="count-cell"><b suppressHydrationWarning>{m}</b><i>Mins</i></div>
          <div className="count-cell"><b suppressHydrationWarning className={ticked ? "bump" : ""}>{s}</b><i>Secs</i></div>
        </div>
      </div>
    </section>
  );
}

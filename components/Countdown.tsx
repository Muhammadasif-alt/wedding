"use client";

import { invitation } from "@/data/invitation";
import { useCountdown } from "@/hooks/useCountdown";

export default function Countdown() {
  const { d, h, m, s, ticked } = useCountdown(invitation.countdownTarget);

  return (
    <section className="sec">
      <h2 className="script-title rv">Countdown</h2>
      <div className="sec-sub rv" style={{ "--d": ".1s" } as React.CSSProperties}>
        We can&apos;t wait for this moment
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

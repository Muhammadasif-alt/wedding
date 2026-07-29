"use client";

// Poora invitation card — hero, countdown, events, venue, RSVP

import { forwardRef, useEffect, useRef } from "react";
import { invitation } from "@/data/invitation";
import { Bloom } from "./Florals";
import { useImageReady } from "@/hooks/useImageReady";
import Countdown from "./Countdown";
import RsvpForm from "./RsvpForm";

type Props = {
  show: boolean;
  onClose: () => void;
};

// chhota gold dil — hero ke dividers mein
function HeartMark() {
  return (
    <svg className="heart-mark" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 21C12 21 3 14.6 3 8.9 3 5.9 5.3 4 7.7 4 9.5 4 11 5 12 6.4 13 5 14.5 4 16.3 4 18.7 4 21 5.9 21 8.9 21 14.6 12 21 12 21Z" />
    </svg>
  );
}

const Card = forwardRef<HTMLDivElement, Props>(function Card({ show, onClose }, ref) {
  const { couple, weddingDate, hero, celebration, events, venue, rsvp } = invitation;
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const heroStickRef = useRef<HTMLDivElement>(null);
  const venueRef = useRef<HTMLElement>(null);
  const venueVideoRef = useRef<HTMLVideoElement>(null);

  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  // reduce-motion wale logon ke liye scrub band — unhein normal loop video milti hai
  const scrubbing =
    invitation.hero.scrub && invitation.hero.media?.type === "video" && !reducedMotion;
  // background sirf tab lagta hai jab file waqai maujood ho
  const hasCelebrationBg = useImageReady(invitation.celebration.bg);
  const hasRsvpBg = useImageReady(invitation.rsvp.bg);

  // card dikhte hi hero ki video chalao (kuch mobile browsers khud start nahi karte).
  // scrub mode mein video khud nahi chalti — scroll usay aage barhata hai.
  useEffect(() => {
    const v = videoRef.current;
    if (!v || scrubbing) return;
    if (show) v.play().catch(() => {});
    else v.pause();
  }, [show, scrubbing]);

  // ---- SCROLL SCRUB ----
  // scroll ki position se video ka frame nikalta hai. Seedha currentTime set karne se
  // jhatke lagte hain, is liye har frame thora thora target ki taraf sarakta hai.
  useEffect(() => {
    if (!scrubbing || !show) return;
    const v = videoRef.current;
    const track = heroRef.current;
    const stick = heroStickRef.current;
    const scroller = track?.closest<HTMLElement>("#cardScene");
    if (!v || !track || !stick || !scroller) return;

    let target = 0;
    let current = 0;
    let raf = 0;
    let seeking = false;

    const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);

    const measure = () => {
      const span = track.offsetHeight - scroller.clientHeight;
      const p = span > 0 ? clamp01((scroller.scrollTop - track.offsetTop) / span) : 0;

      // text aakhri hisse mein aa kar thehar jata hai
      stick.style.setProperty("--reveal", String(clamp01((p - 0.58) / 0.3)));

      if (v.duration) target = p * v.duration;
    };

    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!v.duration) return;
      current += (target - current) * 0.14;
      if (Math.abs(target - current) < 0.005) current = target;
      // pichli seek poori hone se pehle nayi mat bhejo, warna video atakti hai
      if (!seeking && Math.abs(v.currentTime - current) > 0.01) {
        seeking = true;
        v.currentTime = current;
      }
    };

    const onSeeked = () => {
      seeking = false;
    };

    v.pause();
    v.addEventListener("seeked", onSeeked);
    scroller.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    // foran chala do taake --reveal set ho jaye — warna video load na hone par
    // hero ka text hamesha ke liye chhupa reh jata hai
    measure();
    v.addEventListener("loadedmetadata", measure);
    raf = requestAnimationFrame(tick);

    // iOS par kuch devices seeking se pehle ek play/pause maangte hain
    const unlock = () => {
      const p = v.play();
      if (p) p.then(() => v.pause()).catch(() => {});
      window.removeEventListener("touchstart", unlock);
    };
    window.addEventListener("touchstart", unlock, { passive: true, once: true });

    return () => {
      cancelAnimationFrame(raf);
      v.removeEventListener("seeked", onSeeked);
      v.removeEventListener("loadedmetadata", measure);
      scroller.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
      window.removeEventListener("touchstart", unlock);
    };
  }, [scrubbing, show]);

  // venue ki video sirf tab chalti hai jab wo section screen pe aata hai —
  // warna neeche padi 4MB ki video mobile data khaati rehti
  useEffect(() => {
    const section = venueRef.current;
    const v = venueVideoRef.current;
    if (!section || !v) return;

    if (!show) {
      v.pause();
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.15 },
    );
    io.observe(section);
    return () => io.disconnect();
  }, [show]);


  return (
    <div ref={ref} id="cardScene" className={show ? "show" : ""} aria-label="Wedding invitation card">

      {/* ---------- HERO (background video + upar text) ----------
          scrub mode: section lamba hota hai, andar wali screen sticky reh kar
          scroll ke sath video aage barhati hai */}
      <section
        ref={heroRef}
        className={`sec hero${hero.media ? " on-media" : ""}${scrubbing ? " scrub" : ""}`}
        style={scrubbing ? { height: `${hero.scrubScreens * 100}%` } : undefined}
      >
      <div
        ref={heroStickRef}
        className="hero-stick"
        style={scrubbing ? { height: `${100 / hero.scrubScreens}%` } : undefined}
      >
        {/* background video / photo */}
        {hero.media && (
          <div className="hero-bg">
            {hero.media.type === "video" ? (
              <video
                ref={videoRef}
                src={hero.media.src}
                poster={hero.poster || undefined}
                autoPlay={!scrubbing}
                muted
                loop={!scrubbing}
                playsInline
                preload="auto"
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={hero.media.src} alt={couple.shortNames} />
            )}
            <div className="video-veil" style={{ "--veil": hero.veil } as React.CSSProperties} />
          </div>
        )}

        <div className="hero-frame" />
        {!hero.media && (
          <>
            <Bloom className="corner-bloom a" />
            <Bloom className="corner-bloom b" />
            <Bloom className="corner-bloom c" />
            <Bloom className="corner-bloom d" />
          </>
        )}

        <div className="hero-inner">
          <HeartMark />

          <p className="hero-welcome rv" style={{ "--d": ".05s" } as React.CSSProperties}>
            {hero.welcome}
          </p>

          {/* ---- dulha ---- */}
          <div className="person rv" style={{ "--d": ".2s" } as React.CSSProperties}>
            <div className="rule">
              <HeartMark />
            </div>
            <h1 className="names">{couple.groom}</h1>
            {couple.groomParents && <div className="person-meta">{couple.groomParents}</div>}
            {couple.groomTitle && <div className="person-meta">{couple.groomTitle}</div>}
          </div>

          <div className="amp rv" style={{ "--d": ".38s" } as React.CSSProperties}>&amp;</div>

          {/* ---- dulhan ---- */}
          <div className="person rv" style={{ "--d": ".5s" } as React.CSSProperties}>
            <h2 className="names">{couple.bride}</h2>
            {couple.brideParents && <div className="person-meta">{couple.brideParents}</div>}
            {couple.brideTitle && <div className="person-meta">{couple.brideTitle}</div>}
            <div className="rule">
              <HeartMark />
            </div>
          </div>

          <div className="hero-date rv" style={{ "--d": ".68s" } as React.CSSProperties}>{weddingDate}</div>
          <p className="hero-sub rv" style={{ "--d": ".78s" } as React.CSSProperties}>{hero.footer}</p>
        </div>

      </div>
      </section>

      {/* ---------- COUNTDOWN ---------- */}
      <Countdown />

      {/* ---------- EVENTS ---------- */}
      <section className={`sec${hasCelebrationBg ? " on-photo" : ""}`}>
        {hasCelebrationBg && (
          <div className="sec-bg" style={{ backgroundImage: `url("${celebration.bg}")` }}>
            <div className="sec-veil" style={{ "--veil": celebration.veil } as React.CSSProperties} />
          </div>
        )}
        <h2 className="script-title rv">{celebration.title}</h2>
        <div className="sec-sub rv" style={{ "--d": ".1s" } as React.CSSProperties}>{celebration.sub}</div>

        {events.map((ev, i) => (
          <div key={ev.name} className="event rv" style={{ "--d": `${0.15 + i * 0.13}s` } as React.CSSProperties}>
            <div className="ev-name">{ev.name}</div>
            <div className="ev-divider" />
            <div className="ev-date">{ev.date}</div>
            <div className="ev-meta">
              {ev.time}
              <br />
              {ev.venue}
            </div>
          </div>
        ))}
      </section>

      {/* ---------- VENUE ---------- */}
      <section ref={venueRef} className={`sec${venue.video ? " on-video" : ""}`}>
        {/* background video — sirf tab chalti hai jab section screen pe aata hai */}
        {venue.video && (
          <div className="sec-video">
            <video ref={venueVideoRef} src={venue.video} muted loop playsInline preload="metadata" />
            <div className="video-veil" style={{ "--veil": venue.veil } as React.CSSProperties} />
          </div>
        )}

        <h2 className="script-title rv">Venue</h2>
        <div className="sec-sub rv" style={{ "--d": ".1s" } as React.CSSProperties}>Where we say qubool hai</div>
        <div className="venue-name rv" style={{ "--d": ".25s" } as React.CSSProperties}>{venue.name}</div>
        <div className="venue-addr rv" style={{ "--d": ".32s" } as React.CSSProperties}>
          {venue.address.map((line) => (
            <span key={line}>
              {line}
              <br />
            </span>
          ))}
        </div>

        <a className="btn rv" style={{ "--d": ".42s" } as React.CSSProperties} href={venue.mapsUrl} target="_blank" rel="noopener noreferrer">
          Open in Maps
        </a>
      </section>

      {/* ---------- RSVP ---------- */}
      <section className={`sec${hasRsvpBg ? " on-photo" : ""}`}>
        {hasRsvpBg && (
          <div className="sec-bg" style={{ backgroundImage: `url("${rsvp.bg}")` }}>
            {/* .both — RSVP ka text neeche tak jata hai, is liye neeche bhi parda chahiye */}
            <div className="sec-veil both" style={{ "--veil": rsvp.veil } as React.CSSProperties} />
          </div>
        )}
        <h2 className="script-title rv">RSVP</h2>
        <div className="sec-sub rv" style={{ "--d": ".1s" } as React.CSSProperties}>Kindly confirm your presence</div>
        <p className="rsvp-note rv" style={{ "--d": ".18s" } as React.CSSProperties}>{rsvp.note}</p>

        <RsvpForm />

        {/* aakhri hissa — pehle yahan ek khaali sa "close" button tha,
            ab ek proper closing note hai aur band karne ka option chhota rakha hai */}
        <div className="farewell rv" style={{ "--d": ".38s" } as React.CSSProperties}>
          <div className="rule">
            <HeartMark />
          </div>
          <p className="farewell-line">With love and prayers,</p>
          <div className="farewell-names">{couple.shortNames}</div>
          <button className="close-link" onClick={onClose}>
            Close invitation
          </button>
        </div>
      </section>
    </div>
  );
});

export default Card;

"use client";

// Poora invitation card — hero, countdown, events, gallery, venue, RSVP

import { forwardRef, useEffect, useRef, useState } from "react";
import { invitation } from "@/data/invitation";
import { Bloom, MomentArt, VenueIllustration } from "./Florals";
import Countdown from "./Countdown";

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
  const { couple, weddingDate, hero, celebration, events, moments, gallery, venue, rsvp } = invitation;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mapLive, setMapLive] = useState(false); // map tap karne ke baad hi drag hota hai

  // card dikhte hi video chalao (kuch mobile browsers khud start nahi karte)
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (show) v.play().catch(() => {});
    else v.pause();
  }, [show]);

  const waLink = `https://wa.me/${rsvp.whatsappNumber}?text=${encodeURIComponent(rsvp.whatsappMessage)}`;
  // "Wajhi & Mubda" -> "W & M" (gallery illustration ke beech mein)
  const monogram = couple.shortNames.replace(/[^A-Z&]/g, "").split("&").join(" & ");

  return (
    <div ref={ref} id="cardScene" className={show ? "show" : ""} aria-label="Wedding invitation card">

      {/* ---------- HERO (background video + upar text) ---------- */}
      <section className={`sec hero${hero.media ? " on-media" : ""}`}>
        {/* background video / photo */}
        {hero.media && (
          <div className="hero-bg">
            {hero.media.type === "video" ? (
              <video
                ref={videoRef}
                src={hero.media.src}
                poster={hero.poster || undefined}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={hero.media.src} alt={couple.shortNames} />
            )}
            <div className="hero-veil" style={{ "--veil": hero.veil } as React.CSSProperties} />
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

        <div className="scroll-cue">
          Scroll
          <div className="mouse" />
        </div>
      </section>

      {/* ---------- COUNTDOWN ---------- */}
      <Countdown />

      {/* ---------- EVENTS ---------- */}
      <section className={`sec${celebration.bg ? " on-photo" : ""}`}>
        {celebration.bg && (
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

      {/* ---------- GALLERY ---------- */}
      {gallery.length > 0 && (
        <section className={`sec${moments.bg ? " on-photo" : ""}`}>
          {moments.bg && (
            <div className="sec-bg" style={{ backgroundImage: `url("${moments.bg}")` }}>
              <div className="sec-veil" style={{ "--veil": moments.veil } as React.CSSProperties} />
            </div>
          )}
          <h2 className="script-title rv">{moments.title}</h2>
          <div className="sec-sub rv" style={{ "--d": ".1s" } as React.CSSProperties}>{moments.sub}</div>

          {gallery.map((g, i) => (
            <div key={i} className="polaroid rv" style={{ "--d": `${0.15 + i * 0.13}s` } as React.CSSProperties}>
              <div className="frame">
                {g.src === "" ? (
                  <MomentArt i={i} initials={monogram} />
                ) : g.type === "video" ? (
                  <video src={g.src} autoPlay muted loop playsInline />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={g.src} alt={g.caption} />
                )}
              </div>
              <div className="cap">{g.caption}</div>
            </div>
          ))}
        </section>
      )}

      {/* ---------- VENUE ---------- */}
      <section className="sec">
        <h2 className="script-title rv">Venue</h2>
        <div className="sec-sub rv" style={{ "--d": ".1s" } as React.CSSProperties}>Where we say qubool hai</div>
        <div className="venue-art rv" style={{ "--d": ".15s" } as React.CSSProperties}>
          {venue.photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={venue.photo} alt={venue.name} />
          ) : (
            <VenueIllustration />
          )}
        </div>
        <div className="venue-name rv" style={{ "--d": ".25s" } as React.CSSProperties}>{venue.name}</div>
        <div className="venue-addr rv" style={{ "--d": ".32s" } as React.CSSProperties}>
          {venue.address.map((line) => (
            <span key={line}>
              {line}
              <br />
            </span>
          ))}
        </div>

        {/* live map — pehle tap tak locked rehta hai warna scroll karte waqt map pakar leta hai */}
        {venue.mapEmbed && (
          <div className={`venue-map rv${mapLive ? " live" : ""}`} style={{ "--d": ".38s" } as React.CSSProperties}>
            <iframe
              src={venue.mapEmbed}
              title={`Map of ${venue.name}`}
              loading="lazy"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
            {!mapLive && (
              <button className="map-unlock" onClick={() => setMapLive(true)}>
                Tap to move the map
              </button>
            )}
          </div>
        )}

        <a className="btn rv" style={{ "--d": ".46s" } as React.CSSProperties} href={venue.mapsUrl} target="_blank" rel="noopener noreferrer">
          Open in Maps
        </a>
      </section>

      {/* ---------- RSVP ---------- */}
      <section className="sec">
        <h2 className="script-title rv">RSVP</h2>
        <div className="sec-sub rv" style={{ "--d": ".1s" } as React.CSSProperties}>Kindly confirm your presence</div>
        <p className="rsvp-note rv" style={{ "--d": ".18s" } as React.CSSProperties}>{rsvp.note}</p>
        <a className="btn rv" style={{ "--d": ".28s" } as React.CSSProperties} href={waLink} target="_blank" rel="noopener noreferrer">
          Confirm on WhatsApp
        </a>

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

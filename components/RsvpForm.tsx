"use client";

// RSVP form — mehmaan naam aur tafseel bharta hai, aur "Send" dabate hi
// yeh sab kuch WhatsApp message bana kar aapke number par khol deta hai.
// Iske liye kisi server ya database ki zaroorat nahi — site static hi rehti hai.

import { useState } from "react";
import { invitation } from "@/data/invitation";

export default function RsvpForm() {
  const { rsvp, couple } = invitation;

  const [name, setName] = useState("");
  const [guests, setGuests] = useState("1");
  const [attending, setAttending] = useState<"yes" | "no">("yes");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError(true);
      return;
    }
    setError(false);

    const lines = [
      `Assalam o Alaikum! RSVP for ${couple.shortNames}'s wedding.`,
      `Name: ${name.trim()}`,
      `Attending: ${attending === "yes" ? "Yes, In sha Allah" : "Sorry, cannot make it"}`,
    ];
    if (attending === "yes") lines.push(`Guests: ${guests}`);
    if (message.trim()) lines.push(`Message: ${message.trim()}`);

    const url = `https://wa.me/${rsvp.whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setSent(true);
  };

  if (sent) {
    return (
      <div className="rsvp-done rv in">
        <p className="rsvp-done-line">Thank you, {name.trim().split(" ")[0]}.</p>
        <p className="rsvp-done-sub">
          WhatsApp khul gaya hai — bas message bhej dijiye aur hum aapka intezar karenge.
        </p>
        <button className="close-link" onClick={() => setSent(false)}>
          Send another response
        </button>
      </div>
    );
  }

  return (
    <form className="rsvp-form rv" style={{ "--d": ".22s" } as React.CSSProperties} onSubmit={submit} noValidate>
      <label className="field">
        <span>Your name</span>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (error) setError(false);
          }}
          placeholder="Full name"
          autoComplete="name"
          aria-invalid={error}
        />
      </label>
      {error && <p className="field-error">Apna naam likh dijiye</p>}

      <fieldset className="field choice">
        <legend>Will you join us?</legend>
        <div className="choice-row">
          <button
            type="button"
            className={attending === "yes" ? "chip on" : "chip"}
            onClick={() => setAttending("yes")}
          >
            Yes, In sha Allah
          </button>
          <button
            type="button"
            className={attending === "no" ? "chip on" : "chip"}
            onClick={() => setAttending("no")}
          >
            Regretfully no
          </button>
        </div>
      </fieldset>

      {attending === "yes" && (
        <label className="field">
          <span>How many of you?</span>
          <select value={guests} onChange={(e) => setGuests(e.target.value)}>
            {["1", "2", "3", "4", "5", "6 or more"].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>
      )}

      <label className="field">
        <span>A note for us (optional)</span>
        <textarea
          rows={2}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Duaein, wishes ya koi baat…"
        />
      </label>

      <button className="btn" type="submit">
        Send on WhatsApp
      </button>
    </form>
  );
}

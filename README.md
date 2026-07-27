# Wajhi & Mubdha — Wedding Invitation (Next.js)

Mobile-responsive digital wedding invitation. Envelope wax seal pe tap se khulta hai,
card rise karta hai, andar events, countdown, gallery, venue aur RSVP hai.

## Chalane ka tareeqa

```bash
npm install
npm run dev
```

Phir browser mein http://localhost:3000 kholo.

## Content edit karna — SIRF EK FILE

Sab kuch `data/invitation.ts` mein hai:

- Names, monogram, wedding date
- Countdown target date/time
- Teeno events (Mehndi, Baraat, Walima) ki dates, timings, venues
- Gallery photos/videos
- Venue name, address, Google Maps link
- WhatsApp RSVP number aur message

Code ki kisi aur file ko haath lagane ki zaroorat nahi.

## Photos / Videos lagana

1. Apni files `public/photos/` aur `public/videos/` mein rakho
2. `data/invitation.ts` mein path likho, maslan:

```ts
heroMedia: { type: "image", src: "/photos/couple.jpg" },

gallery: [
  { type: "image", src: "/photos/1.jpg", caption: "The beginning" },
  { type: "video", src: "/videos/clip.mp4", caption: "Our little film" },
],

venue: { ..., photo: "/photos/venue.jpg" },
```

Tips: photos 800px width tak compress karo (tinypng.com), video 5-8 second, 2-3 MB max.

## Colors change karna

`app/globals.css` ke top pe `:root` mein sari colors named variables hain
(lavender, gold, plum, cream). Wahan hex values badal do, poori site update ho jayegi.

## File structure

```
data/invitation.ts        <- SARA CONTENT YAHAN (bas yehi edit karo)
app/globals.css           <- colors + styles
app/layout.tsx            <- fonts + page title
components/Invitation.tsx <- envelope/card switching logic
components/Envelope.tsx   <- envelope + seal + petals
components/Card.tsx       <- card ke sab sections
components/Countdown.tsx  <- live countdown
components/Florals.tsx    <- decorative SVGs
hooks/useCountdown.ts     <- countdown logic
hooks/useReveal.ts        <- scroll reveal logic
public/photos/            <- apni photos yahan
public/videos/            <- apni videos yahan
```

## Deploy (free)

Sab se asaan: [vercel.com](https://vercel.com) pe GitHub repo connect karo,
ya `npx vercel` chala do. Link milte hi WhatsApp pe share kar do.

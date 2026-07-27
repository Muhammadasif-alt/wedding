// ============================================================
//  SARI EDITABLE CHEEZEIN YAHAN HAIN — sirf yeh file change karo
// ============================================================

export const invitation = {
  couple: {
    groom: "Wajih ur Rehman",
    // Dulha ki 2 chhoti lines (khali "" chhodo tou line dikhegi hi nahi)
    groomParents: "Son of Mr. & Mrs. Rehman",
    groomTitle: "Software Engineer",

    bride: "Meher Zadi Mubda",
    // Dulhan ki 2 chhoti lines
    brideParents: "Daughter of Mr. & Mrs. Mubda",
    brideTitle: "",

    shortNames: "Wajhi & Mubda", // chhota naam (photo alt text waghera ke liye)
  },

  // Main wedding date (hero + countdown iss se chalta hai)
  weddingDate: "10 · 10 · 2026",
  countdownTarget: "2026-10-10T13:00:00+05:00",

  // ---------- HERO (pehli screen jo envelope khulne ke baad aati hai) ----------
  hero: {
    // Background video/photo — file public/videos ya public/photos mein rakho.
    // Video:  { type: "video", src: "/videos/hero.mp4" }
    // Photo:  { type: "image", src: "/photos/couple.jpg" }
    // Kuch nahi (sirf cream background): null
    media: { type: "video", src: "/videos/hero.mp4" } as null | {
      type: "image" | "video";
      src: string;
    },
    // Video load hone tak jo photo dikhe (optional) — "" tou kuch nahi
    poster: "",
    // Video ke upar kitna dark parda ho — 0 (bilkul saaf) se 1 (bohat dark)
    veil: 0.62,
    // Video ke upar likha jane wala text
    welcome: "We are honored to welcome you to the wedding ceremony of",
    footer: "Together with their families",
  },

  events: [
    {
      name: "Walima",
      date: "Saturday, 10 October 2026",
      time: "1:00 PM onwards",
      venue: "Encore by Zafar Group, Pine Avenue, Lahore",
    },
  ],

  // Gallery — jitni chahiye utni entries. Photos public/photos mein rakho.
  // Video item: { type: "video", src: "/videos/clip.mp4", caption: "Our little film" }
  gallery: [
    { type: "image", src: "", caption: "The beginning" },
    { type: "image", src: "", caption: "Forever starts here" },
    { type: "video", src: "", caption: "Our little film" },
  ] as { type: "image" | "video"; src: string; caption: string }[],

  venue: {
    name: "Encore by Zafar Group",
    address: ["Pine Avenue", "Lahore, Pakistan"],
    mapsUrl: "https://maps.google.com/?q=Encore+by+Zafar+Group+Pine+Avenue+Lahore",
    // Venue ki asli photo lagani ho tou: "/photos/venue.jpg" — warna "" (illustration dikhegi)
    photo: "/photos/venue.jpg",
  },

  rsvp: {
    note: "Your presence will make our special day complete. Please let us know by 1 October 2026.",
    whatsappNumber: "923000000000", // apna number, country code ke sath, bina + ke
    whatsappMessage:
      "Assalam o Alaikum! I would love to attend the wedding of Wajhi & Mubdha.",
  },
};

export type Invitation = typeof invitation;

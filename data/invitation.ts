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
  weddingDate: "16 · 12 · 2026",
  countdownTarget: "2026-12-16T20:00:00+05:00",

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
      name: "Mehndi",
      date: "Monday, 08 Octabor 2026",
      time: "7:00 PM onwards",
      venue: "Residence — Valencia Town, Lahore",
    },
    {
      name: "Baraat",
      date: "Wednesday, 09 Octbar 2026",
      time: "8:00 PM onwards",
      venue: "Grand Palace Marquee, Lahore",
    },
    {
      name: "Walima",
      date: "Friday, 10 Octbar 2026",
      time: "8:00 PM onwards",
      venue: "Royal Swiss Banquet Hall, Lahore",
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
    name: "Grand Palace Marquee",
    address: ["Main Boulevard, Valencia Town", "Lahore, Pakistan"],
    mapsUrl: "https://maps.google.com/?q=Grand+Palace+Marquee+Lahore",
    // Venue ki asli photo lagani ho tou: "/photos/venue.jpg" — warna "" (illustration dikhegi)
    photo: "",
  },

  rsvp: {
    note: "Your presence will make our special day complete. Please let us know by 1 December 2026.",
    whatsappNumber: "923000000000", // apna number, country code ke sath, bina + ke
    whatsappMessage:
      "Assalam o Alaikum! I would love to attend the wedding of Wajhi & Mubdha.",
  },
};

export type Invitation = typeof invitation;

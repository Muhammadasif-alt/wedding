// ============================================================
//  SARI EDITABLE CHEEZEIN YAHAN HAIN — sirf yeh file change karo
// ============================================================

export const invitation = {
  couple: {
    groom: "Wajih ur Rehman",
    // Dulha ki 2 chhoti lines (khali "" chhodo tou line dikhegi hi nahi)
    groomParents: "Son of Mr. & Mrs. Inam ur Rehman",
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

  // ---------- COUNTDOWN ----------
  countdown: {
    // Background image — file public/photos mein rakho, phir yahan path likho.
    // Koi background nahi chahiye tou "" kar do (saada cream background rahega)
    bg: "/photos/countdown.jpg",
    // Image ke upar kitna cream parda ho taake text saaf parha jaye — 0 se 1
    veil: 0.55,
    title: "Countdown",
    sub: "We can't wait for this moment",
  },

  // ---------- OUR CELEBRATION (event card) ----------
  celebration: {
    bg: "/photos/celebration.jpg", // background image; "" = saada cream
    veil: 0.4,
    title: "Our Celebration",
    sub: "We would love to have you with us",
  },

  events: [
    {
      name: "Walima",
      date: "Saturday, 10 October 2026",
      time: "1:00 PM onwards",
      venue: "Encore by Zafar Group, Pine Avenue, Lahore",
    },
  ],

  // ---------- OUR MOMENTS (gallery) ----------
  moments: {
    bg: "/photos/moments.jpg", // background image; "" = saada cream
    veil: 0.62,
    title: "Our Moments",
    sub: "A few memories along the way",
  },

  // Gallery — jitni chahiye utni entries. Photos public/photos mein rakho.
  // src khali chhoro tou uski jagah ek decorative illustration lag jati hai.
  // Video item: { type: "video", src: "/videos/clip.mp4", caption: "Our little film" }
  gallery: [
    { type: "image", src: "", caption: "The beginning" },
    { type: "image", src: "", caption: "Forever starts here" },
    { type: "image", src: "", caption: "And always" },
  ] as { type: "image" | "video"; src: string; caption: string }[],

  venue: {
    name: "Encore by Zafar Group",
    address: ["Pine Avenue", "Lahore, Pakistan"],
    // "Open in Maps" button iss link pe jata hai
    mapsUrl: "https://maps.app.goo.gl/XDnwhuE41h9eGwH27",
    // Card ke andar chalta hua map — Google Maps pe Share > Embed a map se "src" copy karo
    // Map nahi chahiye tou "" kar do
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3405.642197461954!2d74.24493577560662!3d31.39642797427097!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391901c14cae7263%3A0x5920deda7ff8b8eb!2sEncore%20by%20Zafar%20Group!5e0!3m2!1sen!2sus!4v1785144150352!5m2!1sen!2sus",
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

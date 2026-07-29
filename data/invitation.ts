// ============================================================
//  SARI EDITABLE CHEEZEIN YAHAN HAIN — sirf yeh file change karo
// ============================================================

export const invitation = {
  couple: {
    groom: "Wajih ur Rehman",
    // Dulha ki 2 chhoti lines (khali "" chhodo tou line dikhegi hi nahi)
    groomParents: "Son of Mr. & Mrs. Inam ur Rehman",
    groomTitle: "CEO, Idea Digital",

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
    media: { type: "video", src: "/videos/hero-scrub.mp4" } as null | {
      type: "image" | "video";
      src: string;
    },

    // SCRUB — true karo tou video scroll ke sath aage barhti hai (khud nahi chalti),
    // aur text aakhir mein aa kar thehar jata hai. false = normal loop video.
    scrub: true,
    // Hero kitni screen jitna lamba ho — poori video isi lambai mein chalti hai.
    // Zyada number = video dheere chalegi (zyada scroll lagega).
    scrubScreens: 4.5,

    // Nayi video daalni ho tou pehle usay scrub ke liye taiyar kar lena, warna
    // scroll pe atak atak kar chalegi (har 4 frame pe keyframe chahiye):
    //   ffmpeg -i meri-video.mp4 -an -vf "scale=1280:-2" -c:v libx264 \
    //          -crf 26 -g 4 -preset slow -movflags +faststart hero-scrub.mp4

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

  venue: {
    name: "Encore by Zafar Group",
    address: ["Pine Avenue", "Lahore, Pakistan"],
    // "Open in Maps" button iss link pe jata hai
    mapsUrl: "https://maps.app.goo.gl/XDnwhuE41h9eGwH27",
    // Venue section ke peeche chalne wali video. "" kar do tou saada cream background.
    // File ka naam bilkul waisa hi likhna jaisa public/videos mein hai (capital V bhi)
    video: "/videos/Venue.mp4",
    // Video kitni dark ho taake upar ka text saaf parha jaye — 0 se 1
    veil: 0.62,
  },

  rsvp: {
    bg: "/photos/rsvp.jpg", // background image; "" = saada cream
    veil: 0.58,
    note: "Your presence will make our special day complete. Please let us know by 1 October 2026.",

    // !!! ZAROORI !!! Yeh abhi nakli number hai — apna asli WhatsApp number daalo,
    // country code ke sath aur bina + ke. Warna form ka jawab kisi ko nahi pahunchega.
    whatsappNumber: "923000000000",
  },
};

export type Invitation = typeof invitation;

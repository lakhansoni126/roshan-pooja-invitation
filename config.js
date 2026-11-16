/* ============================================================
   INVITATION CONFIG  —  edit everything here, nothing else.
   Save the file and refresh index.html to see your changes.
   Use "\n" inside a string to force a new line.
   Filled from "ROSHAN ❤️ POOJA WEDDING CARD.pdf" (translated from Hindi).
   ============================================================ */
window.INVITE = {

  /* Browser tab title */
  pageTitle: "Roshan & Pooja - Wedding Invitation",

  /* ---------- HERO (over the intro video) ---------- */
  hero: {
    message: "Shubh Vivah",
    groom: {
      name: "Roshan",
      subtext: "Son of Smt. Nathi Devi\n& Late Shri Dhudaram Ji Sewaliya\nAspura"
    },
    bride: {
      name: "Pooja",
      subtext: "Daughter of Smt. Maya Devi\n& Shri Prema Ram Ji Sablania\nIV Grade, Govt. of Rajasthan · Itawa Bhopji"
    },
    /* seconds into the video when the names fade in */
    revealAt: 7.2,
    scrollLabel: "Scroll"
  },

  /* ---------- WELCOME MESSAGE ---------- */
  welcome: {
    text: "|| Namo Buddhay · Shri Ganeshay Namah ||\nTwo hearts, one bond, a companionship of seven lifetimes.\nWith the boundless grace of Shri Bajrang Bali Maharaj, on the auspicious occasion of Vikram Samvat 2083, Margashirsha Krishna Saptami, Monday, 30 November 2026, we cordially invite you and your family to bless the bride and groom ❤"
  },

  /* ---------- MAIN EVENT DATE / TIME ---------- */
  event: {
    title: "Roshan & Pooja's Wedding (Panigrahan Sanskar)",   // used for calendar entries
    date: "2026-11-30",                  // YYYY-MM-DD
    time: "15:15",                       // 24h HH:MM — Baraat departs 3:15 PM; the wedding follows as per the muhurat
    durationHours: 6,                    // length of the calendar entry
    /* text shown inside the scratch heart */
    dateLabel: "November 30, 2026",
    dayLabel: "Monday",
    timeLabel: "As per Shubh Lagna (Muhurat)"
  },

  /* ---------- SECTION HEADINGS ---------- */
  headings: {
    scratch: "Scratch to Reveal",
    scratchLabel: "Scratch here",                                  // small badge shown on the heart
    scratchHint: "Rub the heart with your finger",               // caption under the heart
    scratchInvited: "You're Invited!",
    saveTheDate: "Save the Date",
    countdown: "Counting Down to Forever",
    timeline: "Wedding Day Program",
    venue: "Reception & Venue",
    dressCode: "Dress Code",
    preEvents: "Mangalik Karyakram",
    transportation: "Baraat",
    accommodation: "Accommodation",
    gifts: "Baal Manuhar",
    rsvp: "RSVP"
  },

  /* ---------- PHOTO SLIDESHOW ---------- */
  slideshow: {
    enabled: true,
    intervalSeconds: 4,
    aspectRatio: "2 / 3",   // shape of the photo box (width / height); leave "" to fit the tallest photo automatically
    images: [
      "assets/photo-1.jpg",
      "assets/photo-2.jpg",
      "assets/photo-3.jpg"
    ]
  },

  /* ---------- WEDDING DAY PROGRAM ---------- */
  timeline: {
    enabled: true,
    days: [
      {
        date: "Monday, Nov 30, 2026",
        items: [
          { time: "3:15 PM", title: "Nikasi (Baraat Departure)", desc: "The Baraat departs from our residence in Aspura for Itawa Bhopji" },
          { time: "Muhurat", title: "Panigrahan Sanskar (Wedding Ceremony)", desc: "As per the auspicious Shubh Lagna · Itawa Bhopji" }
        ]
      }
    ]
  },

  /* ---------- VENUE ---------- */
  venue: {
    enabled: true,
    name: "Sewaliya Residence (Reception & Invited Venue)",
    address: "Ward No. 9, Aspura, via Ajeetgarh, Tehsil Shrimadhopur, District Sikar, Rajasthan",
    /* leave mapEmbedUrl empty to auto-build a Google map from name + address */
    mapEmbedUrl: "https://maps.google.com/maps?q=Aspura%2C%20Ajeetgarh%2C%20Sikar%2C%20Rajasthan&t=m&z=13&output=embed"
  },

  /* ---------- DRESS CODE (hidden; set enabled:true and add groups to show it) ---------- */
  dressCode: {
    enabled: false,
    icon: "shirt",   // icon shown above the heading: users, shirt, gift, heart, hotel, car, party-popper, mail
    groups: [
      /* { title: "Ladies", text: "Traditional wear" } */
    ]
  },

  /* ---------- PRE-WEDDING RITUALS (Mangalik Karyakram) ---------- */
  preEvents: {
    enabled: true,
    days: [
      {
        date: "Wednesday, Nov 25, 2026",
        items: [
          { time: "9:15 AM",  title: "Peela Chawal",           desc: "" },
          { time: "11:15 AM", title: "Lagan Tika",             desc: "" },
          { time: "2:15 PM",  title: "Bhaat",                  desc: "" },
          { time: "5:15 PM",  title: "Savamani / Pritibhoj",   desc: "Reception feast · Ward No. 9, Aspura" },
          { time: "6:15 PM",  title: "Ring Ceremony",          desc: "" }
        ]
      },
      {
        date: "Thursday, Nov 26, 2026",
        items: [
          { time: "11:15 AM", title: "Baan Saankadi", desc: "" }
        ]
      },
      {
        date: "Sunday, Nov 29, 2026",
        items: [
          { time: "10:15 AM", title: "Haldi – Mehndi",  desc: "" },
          { time: "1:15 PM",  title: "Mahila Sangeet",  desc: "Ladies' Sangeet" },
          { time: "4:15 PM",  title: "Chaak",           desc: "" }
        ]
      }
    ]
  },

  /* ---------- SIMPLE TEXT SECTIONS (set enabled:false to hide) ---------- */
  transportation: {
    enabled: true,
    icon: "car",
    text: "The Baraat (wedding procession) will depart from our residence at 3:15 PM on Monday, 30 November 2026 for Itawa Bhopji.\n\nNote: Ladies are also cordially invited through this card."
  },
  accommodation: {
    enabled: false,
    icon: "hotel",
    text: ""
  },
  gifts: {
    enabled: true,
    icon: "heart",
    text: "With love settled in our hearts and a longing for joy, we lay our eyes along the path and await your arrival.\n\n— Shagun, Srishti, Ayra (Anaya), Kanika, Ruchika, Vaibhav, Praveen, Prem"
  },

  /* ---------- RSVP ---------- */
  rsvp: {
    enabled: true,
    nameLabel: "Your Name",
    namePlaceholder: "Your full name",
    attendingLabel: "Will you be attending?",
    selectPlaceholder: "Select...",
    optionYes: "Yes, I'll be there!",
    optionNo: "Sorry, I can't make it",
    messageLabel: "Your Message",
    messagePlaceholder: "Write your wishes...",
    buttonLabel: "Send Message",
    /* Where replies go. Fill ONE of these (or none):
       whatsapp: "919928495123"  -> opens WhatsApp with the reply pre-filled
       email:    "you@mail.com"  -> opens the guest's mail app               */
    whatsapp: "919928495123",
    email: "",
    thankYou: "Thank you! Your response has been noted."
  },

  /* ---------- CLOSING ---------- */
  closing: {
    text: "A celebration of the sacred bond of marriage",
    signature: "Roshan & Pooja"
  },
  footer: {
    names: "Roshan & Pooja",
    creditText: "Yogendra Sewaliya · Suresh Kumar Sewaliya\nMob. 9928495123, 9928464757",
    creditLink: "",        // leave empty to hide the link
    creditUrl: ""
  },

  /* ---------- MEDIA ---------- */
  media: {
    introVideo: "assets/intro.mp4",   // "Tap to open" video (portrait)
    poster: "assets/poster.jpg",      // still image shown instantly while the video loads
    music: "assets/music.mp3",        // background music, loops
    musicOn: true,                    // play music when the invitation is opened
    welcomeBackground: "assets/welcome-bg.jpg",
    generalBackground: "assets/general-bg.jpg",
    endBackground: "assets/end-bg.jpg"
  }
};

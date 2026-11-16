/* ============================================================
   BRIDE'S SIDE INVITATION CONFIG  (served at /bride)
   Edit everything here, nothing else. Save and refresh to see changes.
   Use "\n" inside a string to force a new line.
   Filled from the Sablaniya family card (CamScanner PDF, translated from Hindi).
   Shared files (styles, script, photos, music) live one folder up, hence "../assets/".
   ============================================================ */
window.INVITE = {

  /* Browser tab title */
  pageTitle: "Pooja & Roshan - Wedding Invitation",

  /* ---------- HERO (over the intro video) ---------- */
  hero: {
    message: "Shubh Vivah",
    brideFirst: true,   // show the bride's name above the groom's
    bride: {
      name: "Pooja",
      subtext: "Daughter of Smt. Maya Devi\n& Shri Prema Ram Ji Sablaniya\nItawa Bhopji"
    },
    groom: {
      name: "Roshan",
      subtext: "Son of Smt. Nathi Devi\n& Late Shri Dhura Ram Ji Sevaliya\nAspura, Shrimadhopur"
    },
    /* seconds into the video when the names fade in */
    revealAt: 7.2,
    scrollLabel: "Scroll"
  },

  /* ---------- WELCOME MESSAGE ---------- */
  welcome: {
    text: "|| Shri Ganeshay Namah ||\nOm Vakratunda Mahakaya Suryakoti Samaprabha, Nirvighnam Kuru Me Dev Sarvakaryeshu Sarvada ||\nWith the infinite grace of the Almighty, Smt. Maya Devi & Shri Prema Ram Ji Sablaniya cordially invite you and your family to bless the bride and groom on the auspicious occasion of the sacred wedding (Mangal Parinay Sutra Bandhan) of their daughter Pooja with Roshan, on Monday, 30 November 2026 ❤"
  },

  /* ---------- MAIN EVENT DATE / TIME ---------- */
  event: {
    title: "Pooja & Roshan's Wedding (Panigrahan Sanskar)",   // used for calendar entries
    date: "2026-11-30",                  // YYYY-MM-DD
    time: "16:15",                       // 24h HH:MM — Pritibhoj starts 4:15 PM; the wedding follows as per the muhurat
    durationHours: 8,                    // length of the calendar entry
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
    venue: "Venue",
    dressCode: "With Best Compliments From",
    preEvents: "Vaivahik Karyakram",
    transportation: "Swagat Baraat",
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
      "../assets/photo-1.jpg",
      "../assets/photo-2.jpg"
    ]
  },

  /* ---------- WEDDING DAY PROGRAM ---------- */
  timeline: {
    enabled: true,
    days: [
      {
        date: "Monday, Nov 30, 2026",
        items: [
          { time: "4:15 PM", title: "Pritibhoj (Reception Feast)", desc: "From 4:15 PM until your arrival · Sablaniya Krishi Farm, Itawa Bhopji" },
          { time: "6:15 PM", title: "Swagat Baraat (Welcoming the Baraat)", desc: "Sablaniya Krishi Farm, Itawa Bhopji" },
          { time: "Muhurat", title: "Panigrahan Sanskar (Wedding Ceremony)", desc: "As per the auspicious Shubh Lagna" }
        ]
      }
    ]
  },

  /* ---------- VENUE ---------- */
  venue: {
    enabled: true,
    name: "Sablaniya Krishi Farm (Residence)",
    address: "Itawa Bhopji, Tehsil Chomu, District Jaipur, Rajasthan",
    /* leave mapEmbedUrl empty to auto-build a Google map from name + address */
    mapEmbedUrl: "https://maps.google.com/maps?q=Itawa%20Bhopji%2C%20Chomu%2C%20Jaipur%2C%20Rajasthan&t=m&z=13&output=embed"
  },

  /* ---------- FAMILY GROUPS (from the card; hidden — set enabled:true to show them) ---------- */
  dressCode: {
    enabled: false,
    icon: "users",   // icon shown above the heading: users, shirt, gift, heart, hotel, car, party-popper, mail
    groups: [
      { title: "Bride's Family",                            text: "Pooja, daughter of Smt. Maya Devi & Shri Prema Ram Ji Sablaniya\nGranddaughter of Late Smt. Patasi Devi & Late Shri Mangu Ram Ji Sablaniya\nResident of Itawa Bhopji" },
      { title: "Groom's Family",                            text: "Roshan, son of Smt. Nathi Devi & Late Shri Dhura Ram Ji Sevaliya\nGrandson of Late Smt. Gothi Devi & Late Shri Manglaram Ji Sevaliya\nResident of Aspura, Shrimadhopur" },
      { title: "Invited By",                                text: "Chhaju Lal, Shravan, Prema Ram Sablaniya\nItawa Bhopji, Tehsil Chomu, District Jaipur (Rajasthan)\nMob. 9602975788, 9694105788, 9928387445" },
      { title: "Uttarakankshi (Eagerly Awaiting You)",      text: "Kajodmal, Chhitarmal, Lalchand, Jagdish Sablaniya\nResident of Itawa Bhopji, Tehsil Chomu, Jaipur" },
      { title: "Nanihal Paksh (Maternal Family)",           text: "Late Chhitarmal Ji (Nanaji), Late Malchand Ji (Mamaji)\nAmit Ji, Sumit Ji, Kanishk, Kuldeep\nResident of Chomu" },
      { title: "Jawai Paksh (Sons-in-law)",                 text: "Asha – Pawan Ji\nLaxmi – Suresh Ji\nParvati – Anil Ji" },
      { title: "Swagatkarta (Your Hosts)",                  text: "Mukesh, Subhash, Ashok, Rajesh, Kailash, Krishna" },
      { title: "Bua Ji – Fufa Paksh (Paternal Aunts & Uncles)", text: "Manbhari Devi – Banshi Ji\nSarju Devi – Bhairulal Ji\nBhagwani Devi – Rampal Ji" },
      { title: "Darshanabhilashi (Awaiting Your Presence)", text: "Manoj, Rahul, Krishna, Pushpendra, Harsh, Garvit & the entire Sablaniya family" }
    ]
  },

  /* ---------- PRE-WEDDING RITUALS (Vaivahik Karyakram) ---------- */
  preEvents: {
    enabled: true,
    days: [
      {
        date: "Wednesday, Nov 25, 2026",
        items: [
          { time: "9:15 AM",  title: "Lagan Tika", desc: "" }
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
          { time: "1:15 PM",  title: "Chaak – Bhaat",   desc: "" },
          { time: "7:15 PM",  title: "Mahila Sangeet",  desc: "Ladies' Sangeet" }
        ]
      }
    ]
  },

  /* ---------- SIMPLE TEXT SECTIONS (set enabled:false to hide) ---------- */
  transportation: {
    enabled: true,
    icon: "party-popper",
    text: "We will welcome the Baraat at 6:15 PM on Monday, 30 November 2026 at Sablaniya Krishi Farm, Itawa Bhopji. The Pritibhoj (reception feast) is served from 4:15 PM until your arrival.\n\nNote: Ladies are also cordially invited through this card."
  },
  accommodation: {
    enabled: false,
    icon: "hotel",
    text: ""
  },
  gifts: {
    enabled: true,
    icon: "heart",
    text: "Haldi and sandalwood, the sacred bond of relationships — we warmly welcome you to the wedding of our Bua ji and Mausi ji.\n\n— Bhavika, Divya, Gauravpreet, Khushpreet, Arpit, Naksh, Daksh, Naman"
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
       whatsapp: "919602975788"  -> opens WhatsApp with the reply pre-filled
       email:    "you@mail.com"  -> opens the guest's mail app               */
    whatsapp: "919602975788",
    email: "",
    thankYou: "Thank you! Your response has been noted."
  },

  /* ---------- CLOSING ---------- */
  closing: {
    text: "A celebration of the sacred bond of marriage",
    signature: "Pooja & Roshan"
  },
  footer: {
    names: "Pooja & Roshan",
    creditText: "Chhaju Lal · Shravan · Prema Ram Sablaniya\nMob. 9602975788, 9694105788, 9928387445",
    creditLink: "",        // leave empty to hide the link
    creditUrl: ""
  },

  /* ---------- MEDIA ---------- */
  media: {
    introVideo: "../assets/intro.mp4",   // "Tap to open" video (portrait) — replace with the bride's video, e.g. "../assets/intro-bride.mp4"
    poster: "../assets/poster.jpg",      // still image shown instantly while the video loads
    music: "../assets/music.mp3",        // background music, loops
    musicOn: true,                       // play music when the invitation is opened
    welcomeBackground: "../assets/welcome-bg.jpg",
    generalBackground: "../assets/general-bg.jpg",
    endBackground: "../assets/end-bg.jpg"
  }
};

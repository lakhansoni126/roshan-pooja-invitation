/* ============================================================
   BRIDE'S SIDE INVITATION  (served at /bride)  —  edit everything here.
   Design: envelope intro → Ganesh hero → scratch cards → countdown →
           photo stack → venue → festivities → RSVP → footer.
   Shared files (photos, music, fonts) live one folder up, hence "../assets/".
   Use "\n" inside a string to force a new line.
   Filled from the Sablaniya family card (translated from Hindi).
   ============================================================ */
window.INVITE = {

  pageTitle: "Pooja & Roshan - Wedding Invitation",

  /* ---------- INTRO (tap to reveal) ---------- */
  intro: {
    cover: "../assets/poster.jpg",      // still image shown before the tap (first frame of the video)
    video: "../assets/intro.mp4",       // portrait video that plays after the tap; replace with the new envelope video
    flashSecondsBeforeEnd: 1            // white flash starts this many seconds before the video ends
  },

  /* ---------- HERO (Ganesh card) ---------- */
  hero: {
    ganeshImage: "../assets/bride-ganesh.png",
    shloka: "॥ श्री गणेशाय नमः ॥\nवक्रतुण्ड महाकाय सूर्यकोटि समप्रभ\nनिर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥",
    introText: "With the blessings of Shri Ganesh and our beloved families, we joyfully invite you to celebrate the union of",
    bride: "Pooja",
    groom: "Roshan",
    brideFirst: true,
    parents: "Daughter of Smt. Maya Devi & Shri Prema Ram Ji Sablaniya\nSon of Smt. Nathi Devi & Late Shri Dhura Ram Ji Sevaliya",
    scrollLabel: "Scroll to see magic"
  },

  /* ---------- SAVE THE DATE (scratch cards) ---------- */
  saveTheDate: {
    label: "The Date",
    title: "Save the Date",
    desc: "Scratch below to reveal our wedding date",
    cards: [
      { label: "MONTH", value: "NOV" },
      { label: "DAY",   value: "30" },
      { label: "YEAR",  value: "2026" }
    ]
  },

  /* ---------- COUNTDOWN ---------- */
  countdown: {
    quote: "A lifetime of togetherness begins with one sacred step",
    script: "The Wedding",
    dateText: "30 · 11 · 2026",
    target: "2026-11-30T16:15:00"       // wedding day, Pritibhoj starts 4:15 PM
  },

  /* ---------- OUR STORY (stacked polaroids) ---------- */
  story: {
    label: "Our Story",
    title: "Forever Us",
    photos: [
      { src: "../assets/photo-1.jpg", caption: "Written in the stars" },
      { src: "../assets/photo-2.jpg", caption: "Forever Us" }
    ]
  },

  /* ---------- VENUE ---------- */
  venue: {
    label: "Where",
    title: "The Venue",
    name: "Sablaniya Krishi Farm\n(Residence)",
    address: "Itawa Bhopji, Tehsil Chomu,\nDistrict Jaipur, Rajasthan",
    mapEmbedUrl: "https://maps.google.com/maps?q=Itawa%20Bhopji%2C%20Chomu%2C%20Jaipur%2C%20Rajasthan&t=m&z=13&output=embed",
    mapsUrl: "https://maps.google.com/?q=Itawa+Bhopji+Chomu+Jaipur",
    buttonLabel: "View on Maps"
  },

  /* ---------- FESTIVITIES (one card per ritual) ----------
     image: optional photo behind the card title (leave "" for the plain cream card)
     dark: true = light text with a glow (use over photos), false = maroon text
     dresscode: optional { colors: [...], names: "...", note: "..." }               */
  events: {
    label: "The Celebrations Unfold",
    title: "Festivities",
    venue: "Sablaniya Krishi Farm · Itawa Bhopji",
    mapQuery: "Itawa Bhopji Chomu Jaipur",
    items: [
      { title: "Lagan Tika",        day: "Wednesday", num: "25", monthYear: "Nov 2026", time: "9:15 AM",  image: "", dark: false,
        tagline: "The auspicious beginning of our wedding celebrations." },
      { title: "Baan Saankadi",     day: "Thursday",  num: "26", monthYear: "Nov 2026", time: "11:15 AM", image: "", dark: false,
        tagline: "Blessings, rituals and the warmth of family." },
      { title: "Chaak – Bhaat",     day: "Sunday",    num: "29", monthYear: "Nov 2026", time: "1:15 PM",  image: "", dark: false,
        tagline: "Traditions carried forward with love." },
      { title: "Mahila Sangeet",    day: "Sunday",    num: "29", monthYear: "Nov 2026", time: "7:15 PM",  image: "../assets/photo-2.jpg", dark: true,
        tagline: "An evening of music, dance and endless celebration.",
        dresscode: { colors: ["rgb(138, 79, 76)", "rgb(212, 175, 55)", "rgb(245, 236, 212)"], names: "Maroon · Gold · Cream", note: "Traditional Indian" } },
      { title: "Pritibhoj",         day: "Monday",    num: "30", monthYear: "Nov 2026", time: "4:15 PM",  image: "", dark: false,
        tagline: "A feast for our loved ones, from 4:15 PM until your arrival." },
      { title: "Swagat Baraat",     day: "Monday",    num: "30", monthYear: "Nov 2026", time: "6:15 PM",  image: "", dark: false,
        tagline: "We welcome the groom's procession with open hearts." },
      { title: "Panigrahan Sanskar", day: "Monday",   num: "30", monthYear: "Nov 2026", time: "Shubh Lagna", image: "../assets/photo-1.jpg", dark: true,
        tagline: "The sacred vows to begin our forever.",
        dresscode: { colors: ["rgb(138, 32, 48)", "rgb(212, 175, 55)", "rgb(242, 234, 225)"], names: "Maroon · Gold · Ivory", note: "Traditional Indian — sarees, lehengas, sherwanis" } }
    ]
  },

  /* ---------- RSVP (the reply opens WhatsApp with everything pre-filled) ---------- */
  rsvp: {
    label: "Join the Celebration",
    title: "RSVP",
    intro: "Kindly let us know if you can make it — your presence will make this celebration whole.",
    whatsapp: "919602975788",           // number that receives the replies (with country code)
    events: [
      { name: "Lagan Tika",         date: "NOV 25 · 9:15 AM" },
      { name: "Baan Saankadi",      date: "NOV 26 · 11:15 AM" },
      { name: "Chaak – Bhaat",      date: "NOV 29 · 1:15 PM" },
      { name: "Mahila Sangeet",     date: "NOV 29 · 7:15 PM" },
      { name: "Pritibhoj",          date: "NOV 30 · 4:15 PM" },
      { name: "Swagat Baraat",      date: "NOV 30 · 6:15 PM" },
      { name: "Panigrahan Sanskar", date: "NOV 30 · SHUBH LAGNA" }
    ],
    thankYouTitle: "Thank You!",
    thankYouText: "Your RSVP has been beautifully received. We can't wait to celebrate with you!"
  },

  /* ---------- FOOTER ---------- */
  footer: {
    message: "Haldi and sandalwood, the sacred bond of relationships — we warmly welcome you to the wedding of our Bua ji and Mausi ji.\n\n— Bhavika, Divya, Gauravpreet, Khushpreet, Arpit, Naksh, Daksh, Naman",
    regardsLabel: "Warm regards,",
    regards: "Chhaju Lal, Shravan & Prema Ram Sablaniya and family\nItawa Bhopji · Mob. 9602975788, 9694105788, 9928387445",
    names: "Pooja & Roshan",
    credit: "WITH LOVE, THE SABLANIYA FAMILY"
  },

  /* ---------- MEDIA ---------- */
  media: {
    music: "../assets/music.mp3",
    musicOn: true                       // start the music on the first tap
  }
};

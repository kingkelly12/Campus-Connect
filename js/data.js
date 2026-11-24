// ==========================================================
// data.js - all the SAMPLE data for Campus Connect.
// Everything here is fictional. Phone numbers are fake (2547000000xx).
// Every other script reads these two arrays; none of them change it.
// ==========================================================

// Sample businesses. "verified: false" means the seller is still pending.
const businesses = [
  {
    id: 1,
    name: "Mama Njeri's Chapati Corner",
    category: "Food",
    campus: "JKUAT",
    description: "Hot chapati, beans and ndengu delivered to the hostels between 6pm and 10pm. Student-friendly prices and a free soda on orders above KES 500.",
    priceRange: "KES 50 - 250",
    phone: "254700000001",
    verified: true
  },
  {
    id: 2,
    name: "Campus Kicks Thrift",
    category: "Thrift",
    campus: "University of Nairobi",
    description: "Hand-picked second-hand sneakers, jackets and jeans in good condition. New stock every Monday, and you can try before you pay.",
    priceRange: "KES 300 - 2,500",
    phone: "254700000002",
    verified: true
  },
  {
    id: 3,
    name: "Glow by Amani",
    category: "Beauty",
    campus: "Kenyatta University",
    description: "Braids, twists and natural hair styling done in your room. Book a day early so there is time to bring all the supplies.",
    priceRange: "KES 500 - 2,000",
    phone: "254700000003",
    verified: true
  },
  {
    id: 4,
    name: "QuickPrint Hub",
    category: "Printing",
    campus: "JKUAT",
    description: "Printing, photocopying, lamination and spiral binding. Send your file on WhatsApp and collect it ten minutes later near the main gate.",
    priceRange: "KES 5 - 800",
    phone: "254700000004",
    verified: true
  },
  {
    id: 5,
    name: "MathsMadeEasy Tutors",
    category: "Tutoring",
    campus: "University of Nairobi",
    description: "Calculus, statistics and physics revision by 4th-year students. Small groups of up to five, with past papers and clear step-by-step notes.",
    priceRange: "KES 200 - 500 per session",
    phone: "254700000005",
    verified: true
  },
  {
    id: 6,
    name: "Fix-It Phone Care",
    category: "Tech",
    campus: "Kenyatta University",
    description: "Screen replacements, battery swaps and software fixes while you wait. Every repair comes with a 30-day promise.",
    priceRange: "KES 300 - 4,000",
    phone: "254700000006",
    verified: true
  },
  {
    id: 7,
    name: "Kinyozi Fresh Cuts",
    category: "Beauty",
    campus: "JKUAT",
    description: "Fades, shape-ups and beard trims. We come to your hostel, or you can walk in at our stall behind the cafeteria.",
    priceRange: "KES 100 - 300",
    phone: "254700000007",
    verified: false
  },
  {
    id: 8,
    name: "Zuri Threads",
    category: "Fashion",
    campus: "University of Nairobi",
    description: "Custom ankara tops, tote bags and graduation outfits stitched by a fashion student. Send a picture of the style you like.",
    priceRange: "KES 800 - 3,500",
    phone: "254700000008",
    verified: true
  },
  {
    id: 9,
    name: "Pilau Fridays",
    category: "Food",
    campus: "Kenyatta University",
    description: "Pilau and kachumbari lunch packs, every Friday only. Order before 10am and pick up at the library steps at 1pm.",
    priceRange: "KES 120 - 200",
    phone: "254700000009",
    verified: true
  },
  {
    id: 10,
    name: "CodeBuddy Web Help",
    category: "Tech",
    campus: "JKUAT",
    description: "Help building portfolio websites and understanding your programming assignments. We explain the code so that you can explain it too.",
    priceRange: "KES 500 - 3,000",
    phone: "254700000010",
    verified: true
  },
  {
    id: 11,
    name: "Vintage Vibes Closet",
    category: "Thrift",
    campus: "Kenyatta University",
    description: "Vintage dresses, denim jackets and bags for date nights and themed parties. Everything is washed and ironed before you get it.",
    priceRange: "KES 250 - 1,800",
    phone: "254700000011",
    verified: true
  },
  {
    id: 12,
    name: "Essay Edge Proofreading",
    category: "Tutoring",
    campus: "University of Nairobi",
    description: "Proofreading, formatting and referencing help for reports and projects. You keep your own ideas; we fix the grammar and layout.",
    priceRange: "KES 150 - 600",
    phone: "254700000012",
    verified: false
  }
];

// Sample events. They are listed from the earliest date to the latest,
// so the pages can show them in date order without any sorting code.
// Dates are written as YYYY-MM-DD.
const events = [
  {
    id: 1,
    title: "Freshers' Bash 2026",
    category: "Party",
    campus: "JKUAT",
    date: "2026-12-05",
    venue: "JKUAT Main Hall",
    description: "A night of music, dancing and games to welcome the new students. Doors open at 7pm, and the DJ plays until midnight.",
    ticketTypes: [
      { name: "Regular", price: 300 },
      { name: "VIP", price: 800 }
    ],
    organiser: "JKUAT Entertainment Club"
  },
  {
    id: 2,
    title: "Career Skills Summit",
    category: "Academic",
    campus: "University of Nairobi",
    date: "2026-12-12",
    venue: "Taifa Hall, University of Nairobi",
    description: "Learn how to write a CV, shine in interviews and use LinkedIn. Speakers include young professionals who graduated only a few years ago.",
    ticketTypes: [
      { name: "Student", price: 200 },
      { name: "Graduate", price: 500 }
    ],
    organiser: "UoN Business Society"
  },
  {
    id: 3,
    title: "Inter-Campus 5-a-side Football Cup",
    category: "Sports",
    campus: "Kenyatta University",
    date: "2027-01-16",
    venue: "Kenyatta University Sports Ground",
    description: "Eight campus teams, one trophy. Come and cheer for your campus. There will be snacks and drinks on sale next to the pitch.",
    ticketTypes: [
      { name: "Spectator", price: 100 },
      { name: "Supporter pack", price: 350 }
    ],
    organiser: "KU Sports Committee"
  },
  {
    id: 4,
    title: "Tech Club Hackathon Night",
    category: "Club",
    campus: "JKUAT",
    date: "2027-01-23",
    venue: "JKUAT Computer Lab 3",
    description: "Build a small project in 8 hours with your team. Beginners are welcome. Mentors will be around to help, and pizza is included.",
    ticketTypes: [
      { name: "Participant", price: 250 },
      { name: "Observer", price: 100 }
    ],
    organiser: "JKUAT Tech Club"
  },
  {
    id: 5,
    title: "Acoustic Sunset Open Mic",
    category: "Party",
    campus: "Kenyatta University",
    date: "2027-02-06",
    venue: "KU Amphitheatre",
    description: "Poets, singers and comedians share the stage as the sun goes down. Sign up at the door if you want a 5-minute slot.",
    ticketTypes: [
      { name: "General", price: 200 },
      { name: "Front row", price: 400 }
    ],
    organiser: "KU Drama and Music Society"
  },
  {
    id: 6,
    title: "Research Poster Day",
    category: "Academic",
    campus: "University of Nairobi",
    date: "2027-02-20",
    venue: "UoN Science Complex Atrium",
    description: "Final-year students show their research projects on posters. Walk around, ask questions and vote for the People's Choice award.",
    ticketTypes: [
      { name: "Attendee", price: 100 },
      { name: "Presenter", price: 300 }
    ],
    organiser: "UoN Science Students' Association"
  }
];

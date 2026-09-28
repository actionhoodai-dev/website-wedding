/**
 * ============================================
 * WEDDING CONFIGURATION
 * ============================================
 * All wedding details are centralized here.
 * Edit this file to update any wedding information.
 */

export const WEDDING_CONFIG = {
  // ─── Couple Details ───────────────────────────
  couple: {
    groom: {
      name: 'Rajha Mukhilan',
      displayName: 'RAJHA MUKHILAN',
    },
    bride: {
      name: 'Swetha',
      displayName: 'SWETHA',
    },
    portrait: '/couple/portrait.jpg',
  },

  // ─── Blessing / Deity ─────────────────────────
  blessing: {
    deity: 'Lord Murugan',
    deityDisplayName: 'LORD MURUGAN',
    blessingText: 'WITH THE BLESSINGS OF',
    image: '/murugan.png',
  },

  // ─── Wedding Ceremony ─────────────────────────
  ceremony: {
    title: 'THE WEDDING',
    subtitle: 'Muhurtham',
    dateNumber: '11',
    monthYear: 'NOVEMBER 2026',
    day: 'WEDNESDAY',
    date: '11 NOVEMBER 2026',
    dateISO: '2026-11-11T09:00:00+05:30',
    time: '09:00 AM – 10:00 AM',
    venue: {
      name: 'MEENAKSHI AMMAN TEMPLE',
      city: 'MADURAI',
      address: 'Meenakshi Amman Temple, Madurai, Tamil Nadu',
      mapUrl: 'https://maps.google.com/?q=Meenakshi+Amman+Temple+Madurai',
    },
    bgImage: '/gallery/photo-2.jpg',
  },

  // ─── Reception Events ─────────────────────────
  receptionOne: {
    id: 'reception-1',
    title: 'THE RECEPTION',
    dateNumber: '12',
    monthYear: 'NOVEMBER 2026',
    day: 'THURSDAY',
    date: '12 NOVEMBER 2026',
    dateISO: '2026-11-12T18:00:00+05:30',
    time: '06:00 PM – 10:00 PM',
    venue: {
      name: 'BHARATHI MAHAL',
      address: 'KAMARAJ NAGAR',
      city: 'GOBICHETTIPALAYAM',
      mapUrl: 'https://maps.google.com/?q=Bharathi+Mahal+Gobichettipalayam',
    },
    bgImage: '/gallery/photo-4.jpg',
  },

  receptionTwo: {
    id: 'reception-2',
    title: 'THE RECEPTION',
    dateNumber: '13',
    monthYear: 'NOVEMBER 2026',
    day: 'FRIDAY',
    date: '13 NOVEMBER 2026',
    dateISO: '2026-11-13T18:00:00+05:30',
    time: '06:00 PM – 09:00 PM',
    venue: {
      name: 'SRI MAHAL',
      address: 'TRICHY ROAD FLYOVER',
      city: 'NAMAKKAL',
      mapUrl: 'https://maps.google.com/?q=Sri+Mahal+Namakkal',
    },
    bgImage: '/gallery/photo-5.jpg',
  },

  // ─── RSVP ─────────────────────────────────────
  rsvp: {
    heading: 'YOUR PRESENCE IS OUR BLESSING',
    subheading: 'We would be honoured by your gracious presence',
    ctaText: 'SEND MY BLESSINGS',
    fields: ['name', 'email', 'attending', 'message'],
  },

  // ─── Love Story Timeline ──────────────────────
  timeline: [
    {
      year: '2022',
      title: 'FIRST MEETING IN MISSISSAUGA',
      subtitle: 'Where Destiny Intertwined',
      location: 'Mississauga, Canada',
      description:
        'Thousands of miles away from home amidst Canadian winters, serendipity brought Rajha Mukhilan and Swetha together. What started as quiet conversations blossomed into an eternal bond of soulmates.',
      bgImage: '/gallery/photo-1.jpg',
    },
    {
      year: '2023',
      title: 'FOUR YEARS OF DEVOTION',
      subtitle: 'A Rhythm of Two Hearts',
      location: 'Canada & Beyond',
      description:
        'Through four years of shared aspirations, enduring trust, and deep conversations, their companionship grew deeper with every passing day, building an unshakeable foundation for life.',
      bgImage: '/gallery/photo-3.jpg',
    },
    {
      year: '2024',
      title: 'BRIDGING CONTINENTS & DISTANCE',
      subtitle: 'From Canada to Tamil Nadu',
      location: 'Across Oceans',
      description:
        'Across 12,000 kilometers and multiple time zones, their love proved that distance is only geographical. Their hearts remained united, anchored in Tamil traditions and shared hopes.',
      bgImage: '/gallery/photo-4.jpg',
    },
    {
      year: '2025',
      title: 'THE BLESSING OF FAMILIES',
      subtitle: 'Two Lineages Unite with Joy',
      location: 'Tamil Nadu, India',
      description:
        'With the blessings of parents, elders, and the grace of the Almighty, two loving families came together in celebration, joyfully arranging their sacred marriage.',
      bgImage: '/gallery/photo-5.jpg',
    },
    {
      year: '2026',
      title: 'THE SACRED THIRUMAANGALYAM',
      subtitle: 'United for Eternity',
      location: 'Meenakshi Amman Temple, Madurai',
      description:
        'Before the divine presence of Lord Murugan and Goddess Meenakshi in Madurai, Rajha Mukhilan and Swetha take the holy seven steps, beginning their sacred journey as husband and wife.',
      bgImage: '/gallery/photo-2.jpg',
    },
  ],

  // ─── Navigation ───────────────────────────────
  navigation: [
    { id: 'invitation', label: 'THE INVITATION' },
    { id: 'date-reveal', label: 'DATE REVEAL' },
    { id: 'couple', label: 'THE COUPLE' },
    { id: 'wedding', label: 'THE WEDDING' },
    { id: 'reception-1', label: 'RECEPTION I' },
    { id: 'reception-2', label: 'RECEPTION II' },
    { id: 'timeline', label: 'OUR JOURNEY' },
    { id: 'rsvp', label: 'RSVP' },
  ],

  // ─── Meta / SEO ───────────────────────────────
  meta: {
    title: 'Rajha Mukhilan & Swetha — Wedding Invitation',
    description:
      'You are cordially invited to celebrate the union of Rajha Mukhilan and Swetha. With the blessings of Lord Murugan.',
    ogImage: '/couple/portrait.jpg',
  },
} as const;

export type WeddingConfig = typeof WEDDING_CONFIG;

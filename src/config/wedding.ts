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
      name: 'Rajha Mukilan',
      displayName: 'RAJHA MUKILAN',
    },
    bride: {
      name: 'Swetha',
      displayName: 'SWETHA',
    },
    portrait: '/couple/temple-view.jpg',
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
      address: 'Madurai, Tamil Nadu',
      mapUrl: 'https://maps.google.com/?q=Meenakshi+Amman+Temple+Madurai',
    },
    bgImage: '/meenakshi-thirukalyanam.jpg',
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
    bgImage: '/gallery/reception-namakkal.jpg',
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
      title: 'The First Hello',
      description: 'Where a simple meeting marked the beginning of something beautiful.',
    },
    {
      year: '2023',
      title: 'Little Moments, Big Memories',
      description:
        'Between studies and dreams of the future, we found joy in the little moments, creating memories that brought us closer.',
    },
    {
      year: '2024',
      title: 'Building Our Dreams',
      description:
        'As our careers began, so did a beautiful chapter of growing and standing by each other.',
    },
    {
      year: '2025',
      title: 'Love Finds Its Way',
      description:
        "Our bond blossomed into forever, with our families' blessings and a promise to walk life together.",
    },
    {
      year: '2026',
      title: 'Our Forever Begins',
      description:
        'From friends to fiancés, now stepping into a lifetime of love, laughter, and togetherness',
    },
  ],

  // ─── Canada to India Journey ─────────────────
  journey: {
    origin: {
      city: 'Mississauga',
      region: 'Ontario, Canada',
      subtitle: 'Where Destiny Intertwined',
      description: 'Amidst cool Canadian horizons and peaceful snow-kissed evenings, serendipity brought two Tamil hearts together.',
    },
    destination: {
      city: 'Madurai',
      region: 'Tamil Nadu, India',
      subtitle: 'Meenakshi Amman Temple',
      description: 'The eternal cultural capital where heritage, sacred fire, and divine blessings unite their souls.',
    },
    distanceKm: '12,500 KM',
    flightHours: '18 Hours Across Oceans',
    yearsTogether: 'Four Years of Devotion',
  },

  // ─── Navigation ───────────────────────────────
  navigation: [
    { id: 'invitation', label: 'THE INVITATION' },
    { id: 'story', label: 'OUR STORY' },
    { id: 'wedding', label: 'THE WEDDING' },
    { id: 'reception-1', label: 'RECEPTION I' },
    { id: 'reception-2', label: 'RECEPTION II' },
  ],

  // ─── Meta / SEO ───────────────────────────────
  meta: {
    title: 'Rajha Mukilan & Swetha — South Indian Wedding Invitation',
    description:
      'You are cordially invited to celebrate the union of Rajha Mukilan and Swetha. With the blessings of Lord Murugan.',
    ogImage: '/og-image.jpg',
  },
} as const;

export type WeddingConfig = typeof WEDDING_CONFIG;

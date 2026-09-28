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
  },

  // ─── RSVP ─────────────────────────────────────
  rsvp: {
    heading: 'YOUR PRESENCE IS OUR BLESSING',
    subheading: 'We would be honoured by your gracious presence',
    ctaText: 'SEND MY BLESSINGS',
    fields: ['name', 'email', 'attending', 'guests', 'message'],
  },

  // ─── Gallery Images ───────
  gallery: [
    { id: 1, src: '/gallery/photo-1.jpg', alt: 'Rajha Mukhilan & Swetha', layout: 'portrait' as const },
    { id: 2, src: '/gallery/photo-2.jpg', alt: 'Traditional Muhurtham Ceremony', layout: 'landscape' as const },
    { id: 3, src: '/gallery/photo-3.jpg', alt: 'Maalai Maatral Garland Exchange', layout: 'portrait' as const },
    { id: 4, src: '/gallery/photo-4.jpg', alt: 'Grand Wedding Reception', layout: 'landscape' as const },
    { id: 5, src: '/gallery/photo-5.jpg', alt: 'Sacred Temple Blessings', layout: 'portrait' as const },
    { id: 6, src: '/gallery/photo-6.jpg', alt: 'Joyous Moments', layout: 'landscape' as const },
  ],

  // ─── Story ────────────────────────────────────
  story: {
    yearsKnown: 'FOUR YEARS',
    connection: 'MISSISSAUGA, CANADA',
    narrative: [
      { label: 'TWO PEOPLE', detail: '' },
      { label: 'FOUR YEARS', detail: '' },
      { label: 'ONE JOURNEY', detail: '' },
      { label: 'ACROSS DISTANCE', detail: 'Mississauga, Canada → Tamil Nadu, India' },
      { label: 'ONE SACRED BEGINNING', detail: '' },
    ],
  },

  // ─── Navigation ───────────────────────────────
  navigation: [
    { id: 'invitation', label: 'THE INVITATION' },
    { id: 'couple', label: 'THE COUPLE' },
    { id: 'wedding', label: 'THE WEDDING' },
    { id: 'reception-1', label: 'RECEPTION I' },
    { id: 'reception-2', label: 'RECEPTION II' },
    { id: 'story', label: 'OUR STORY' },
    { id: 'memories', label: 'MEMORIES' },
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

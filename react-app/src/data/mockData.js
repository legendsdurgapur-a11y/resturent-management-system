// Initial tables across different dining sections
export const INITIAL_TABLES = [
  {
    id: 'T-01',
    name: 'Table 1',
    capacity: 2,
    shape: 'round',
    section: 'Indoor Dining',
    status: 'Occupied',
    currentGuest: 'Alexander Smith',
    seatedAt: '18:15',
    minSpend: 0
  },
  {
    id: 'T-02',
    name: 'Table 2',
    capacity: 4,
    shape: 'rectangle',
    section: 'Indoor Dining',
    status: 'Available',
    currentGuest: null,
    seatedAt: null,
    minSpend: 0
  },
  {
    id: 'T-03',
    name: 'Table 3',
    capacity: 4,
    shape: 'rectangle',
    section: 'Indoor Dining',
    status: 'Reserved',
    currentGuest: 'Sophia Martinez',
    seatedAt: null,
    minSpend: 0
  },
  {
    id: 'T-04',
    name: 'Table 4',
    capacity: 6,
    shape: 'rectangle',
    section: 'Indoor Dining',
    status: 'Available',
    currentGuest: null,
    seatedAt: null,
    minSpend: 0
  },
  {
    id: 'T-05',
    name: 'Table 5',
    capacity: 2,
    shape: 'round',
    section: 'Indoor Dining',
    status: 'Occupied',
    currentGuest: 'Liam & Olivia Johnson',
    seatedAt: '18:40',
    minSpend: 0
  },
  {
    id: 'T-06',
    name: 'Table 6 (Grand)',
    capacity: 8,
    shape: 'rectangle',
    section: 'Indoor Dining',
    status: 'Available',
    currentGuest: null,
    seatedAt: null,
    minSpend: 0
  },
  {
    id: 'P-01',
    name: 'Patio 1',
    capacity: 2,
    shape: 'round',
    section: 'Garden Patio',
    status: 'Available',
    currentGuest: null,
    seatedAt: null,
    minSpend: 0
  },
  {
    id: 'P-02',
    name: 'Patio 2',
    capacity: 4,
    shape: 'rectangle',
    section: 'Garden Patio',
    status: 'Reserved',
    currentGuest: 'David Miller',
    seatedAt: null,
    minSpend: 0
  },
  {
    id: 'P-03',
    name: 'Patio 3',
    capacity: 4,
    shape: 'rectangle',
    section: 'Garden Patio',
    status: 'Available',
    currentGuest: null,
    seatedAt: null,
    minSpend: 0
  },
  {
    id: 'P-04',
    name: 'Patio 4',
    capacity: 6,
    shape: 'rectangle',
    section: 'Garden Patio',
    status: 'Occupied',
    currentGuest: 'Tech Team Dinner',
    seatedAt: '18:00',
    minSpend: 0
  },
  {
    id: 'B-01',
    name: 'Bar High-Top 1',
    capacity: 2,
    shape: 'round',
    section: 'Bar Lounge',
    status: 'Available',
    currentGuest: null,
    seatedAt: null,
    minSpend: 0
  },
  {
    id: 'B-02',
    name: 'Bar High-Top 2',
    capacity: 2,
    shape: 'round',
    section: 'Bar Lounge',
    status: 'Occupied',
    currentGuest: 'Chloe Bennett',
    seatedAt: '18:30',
    minSpend: 0
  },
  {
    id: 'B-03',
    name: 'Bar High-Top 3',
    capacity: 2,
    shape: 'round',
    section: 'Bar Lounge',
    status: 'Available',
    currentGuest: null,
    seatedAt: null,
    minSpend: 0
  },
  {
    id: 'V-01',
    name: 'VIP Alcove',
    capacity: 6,
    shape: 'rectangle',
    section: 'VIP Booths',
    status: 'Reserved',
    currentGuest: 'Vikram Sengupta',
    seatedAt: null,
    minSpend: 150
  },
  {
    id: 'V-02',
    name: 'VIP Solarium',
    capacity: 8,
    shape: 'rectangle',
    section: 'VIP Booths',
    status: 'Available',
    currentGuest: null,
    seatedAt: null,
    minSpend: 200
  },
  {
    id: 'V-03',
    name: 'VIP Cellar',
    capacity: 6,
    shape: 'rectangle',
    section: 'VIP Booths',
    status: 'Available',
    currentGuest: null,
    seatedAt: null,
    minSpend: 150
  }
];

export const SECTIONS = [
  'All Sections',
  'Indoor Dining',
  'Garden Patio',
  'Bar Lounge',
  'VIP Booths'
];

export const TIME_SLOTS = [
  '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM',
  '02:00 PM', '06:00 PM', '06:30 PM', '07:00 PM',
  '07:30 PM', '08:00 PM', '08:30 PM', '09:00 PM'
];

export const INITIAL_RESERVATIONS = [
  {
    id: 'RES-101',
    guestName: 'Alexander Smith',
    phone: '+1 555-0192',
    email: 'alex.smith@example.com',
    partySize: 2,
    date: '2026-10-30',
    timeSlot: '06:00 PM',
    tableId: 'T-01',
    section: 'Indoor Dining',
    status: 'Seated',
    notes: 'Window seat requested, celebrating anniversary'
  },
  {
    id: 'RES-102',
    guestName: 'Sophia Martinez',
    phone: '+1 555-0248',
    email: 's.martinez@example.com',
    partySize: 4,
    date: '2026-10-30',
    timeSlot: '07:00 PM',
    tableId: 'T-03',
    section: 'Indoor Dining',
    status: 'Confirmed',
    notes: 'One child in high chair'
  },
  {
    id: 'RES-103',
    guestName: 'David Miller',
    phone: '+1 555-0317',
    email: 'dmiller@example.com',
    partySize: 3,
    date: '2026-10-30',
    timeSlot: '07:30 PM',
    tableId: 'P-02',
    section: 'Garden Patio',
    status: 'Confirmed',
    notes: 'Outdoor heating lamp preferred'
  },
  {
    id: 'RES-104',
    guestName: 'Tech Team Dinner',
    phone: '+1 555-0455',
    email: 'contact@nexusdigital.org',
    partySize: 6,
    date: '2026-10-30',
    timeSlot: '06:00 PM',
    tableId: 'P-04',
    section: 'Garden Patio',
    status: 'Seated',
    notes: 'Separate corporate bills requested'
  },
  {
    id: 'RES-105',
    guestName: 'Liam & Olivia Johnson',
    phone: '+1 555-0589',
    email: 'olivia.j@example.com',
    partySize: 2,
    date: '2026-10-30',
    timeSlot: '06:30 PM',
    tableId: 'T-05',
    section: 'Indoor Dining',
    status: 'Seated',
    notes: 'Nut allergy noted'
  },
  {
    id: 'RES-106',
    guestName: 'Vikram Sengupta',
    phone: '+1 555-0672',
    email: 'vikram.sen@example.com',
    partySize: 5,
    date: '2026-10-30',
    timeSlot: '08:00 PM',
    tableId: 'V-01',
    section: 'VIP Booths',
    status: 'Confirmed',
    notes: 'Sommelier wine pairing menu'
  },
  {
    id: 'RES-107',
    guestName: 'Chloe Bennett',
    phone: '+1 555-0731',
    email: 'chloe.b@example.com',
    partySize: 2,
    date: '2026-10-30',
    timeSlot: '06:30 PM',
    tableId: 'B-02',
    section: 'Bar Lounge',
    status: 'Seated',
    notes: 'Quick pre-theater dining'
  },
  {
    id: 'RES-108',
    guestName: 'Marcus Wright',
    phone: '+1 555-0814',
    email: 'mwright@example.com',
    partySize: 4,
    date: '2026-10-31',
    timeSlot: '07:00 PM',
    tableId: 'T-04',
    section: 'Indoor Dining',
    status: 'Confirmed',
    notes: 'Birthday celebration'
  }
];

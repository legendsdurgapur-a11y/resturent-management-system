export type ReservationStatus = 'Confirmed' | 'Seated' | 'Completed' | 'Cancelled';

export interface Reservation {
  id: string;
  guestName: string;
  phone: string;
  email: string;
  partySize: number;
  date: string;
  timeSlot: string;
  tableId: string;
  section: string;
  status: ReservationStatus;
  notes?: string;
}

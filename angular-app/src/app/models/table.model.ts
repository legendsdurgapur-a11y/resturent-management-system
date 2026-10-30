export type TableStatus = 'Available' | 'Reserved' | 'Occupied';
export type TableShape = 'round' | 'rectangle';

export interface Table {
  id: string;
  name: string;
  capacity: number;
  shape: TableShape;
  section: string;
  status: TableStatus;
  currentGuest: string | null;
  seatedAt: string | null;
  minSpend?: number;
}

import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Table, TableStatus } from '../models/table.model';
import { Reservation } from '../models/reservation.model';

export const API_BASE = 'http://localhost:3001/api';

@Injectable({ providedIn: 'root' })
export class RestaurantService {
  private http = inject(HttpClient);

  // ── Reactive Signal State ──────────────────────────────────────────────────
  private tablesSignal       = signal<Table[]>([]);
  private reservationsSignal = signal<Reservation[]>([]);

  readonly loading = signal<boolean>(false);
  readonly error   = signal<string | null>(null);

  readonly tables       = this.tablesSignal.asReadonly();
  readonly reservations = this.reservationsSignal.asReadonly();

  // ── Computed / Derived Signals (Array operations) ──────────────────────────
  readonly availableTables = computed(() =>
    this.tablesSignal().filter(t => t.status === 'Available')
  );
  readonly occupiedTables = computed(() =>
    this.tablesSignal().filter(t => t.status === 'Occupied')
  );
  readonly reservedTables = computed(() =>
    this.tablesSignal().filter(t => t.status === 'Reserved')
  );
  readonly totalCapacity = computed(() =>
    this.tablesSignal().reduce((sum, t) => sum + t.capacity, 0)
  );
  readonly seatedGuestsCount = computed(() =>
    this.tablesSignal()
      .filter(t => t.status === 'Occupied')
      .reduce((sum, t) => sum + t.capacity, 0)
  );
  readonly activeReservationsCount = computed(() =>
    this.reservationsSignal().filter(r => r.status === 'Confirmed').length
  );

  // ── Bootstrap: Load both resources on service init ─────────────────────────
  constructor() {
    this.loadTables();
    this.loadReservations();
  }

  loadTables(): void {
    this.loading.set(true);
    this.http.get<Table[]>(`${API_BASE}/tables`).subscribe({
      next: data => {
        this.tablesSignal.set(data);
        this.error.set(null);
        this.loading.set(false);
      },
      error: err => {
        this.error.set('Could not load tables from the server. Is the backend running on port 3001?');
        this.loading.set(false);
        console.error('[RestaurantService] loadTables error:', err);
      }
    });
  }

  loadReservations(): void {
    this.http.get<Reservation[]>(`${API_BASE}/reservations`).subscribe({
      next: data => this.reservationsSignal.set(data),
      error: err => console.error('[RestaurantService] loadReservations error:', err)
    });
  }

  // ── Table Actions ──────────────────────────────────────────────────────────
  updateTableStatus(
    tableId: string,
    status: TableStatus,
    guest: string | null = null,
    seatedAt: string | null = null
  ): void {
    this.http
      .put<Table>(`${API_BASE}/tables/${tableId}/status`, { status, currentGuest: guest, seatedAt })
      .subscribe({
        next: updatedTable => {
          this.tablesSignal.update(list =>
            list.map(t => (t.id === updatedTable.id ? updatedTable : t))
          );
        },
        error: err => console.error('[RestaurantService] updateTableStatus error:', err)
      });
  }

  // ── Reservation Actions ────────────────────────────────────────────────────
  addReservation(newRes: Omit<Reservation, 'id'> & { id?: string }): void {
    this.http
      .post<{ reservation: Reservation; table: Table }>(`${API_BASE}/reservations`, newRes)
      .subscribe({
        next: ({ reservation, table }) => {
          this.reservationsSignal.update(list => [reservation, ...list]);
          this.tablesSignal.update(list =>
            list.map(t => (t.id === table.id ? table : t))
          );
        },
        error: err => console.error('[RestaurantService] addReservation error:', err)
      });
  }

  seatReservation(reservationId: string, tableId: string, guestName: string): void {
    this.http
      .patch<{ reservation: Reservation; table: Table }>(
        `${API_BASE}/reservations/${reservationId}/seat`,
        { tableId, guestName }
      )
      .subscribe({
        next: ({ reservation, table }) => {
          this.reservationsSignal.update(list =>
            list.map(r => (r.id === reservation.id ? reservation : r))
          );
          if (table) {
            this.tablesSignal.update(list =>
              list.map(t => (t.id === table.id ? table : t))
            );
          }
        },
        error: err => console.error('[RestaurantService] seatReservation error:', err)
      });
  }

  cancelReservation(reservationId: string, tableId: string): void {
    this.http
      .patch<{ reservation: Reservation; table: Table }>(
        `${API_BASE}/reservations/${reservationId}/cancel`,
        { tableId }
      )
      .subscribe({
        next: ({ reservation, table }) => {
          this.reservationsSignal.update(list =>
            list.map(r => (r.id === reservation.id ? reservation : r))
          );
          if (table) {
            this.tablesSignal.update(list =>
              list.map(t => (t.id === table.id ? table : t))
            );
          }
        },
        error: err => console.error('[RestaurantService] cancelReservation error:', err)
      });
  }

  completeReservation(reservationId: string, tableId: string): void {
    this.http
      .patch<{ reservation: Reservation; table: Table }>(
        `${API_BASE}/reservations/${reservationId}/complete`,
        { tableId }
      )
      .subscribe({
        next: ({ reservation, table }) => {
          this.reservationsSignal.update(list =>
            list.map(r => (r.id === reservation.id ? reservation : r))
          );
          if (table) {
            this.tablesSignal.update(list =>
              list.map(t => (t.id === table.id ? table : t))
            );
          }
        },
        error: err => console.error('[RestaurantService] completeReservation error:', err)
      });
  }

  resetData(): void {
    this.http.post(`${API_BASE}/reset`, {}).subscribe({
      next: () => {
        this.loadTables();
        this.loadReservations();
      },
      error: err => console.error('[RestaurantService] reset error:', err)
    });
  }
}

import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule }         from '@angular/forms';
import { RouterLink }          from '@angular/router';
import { RestaurantService }   from '../../services/restaurant.service';

@Component({
  selector: 'app-reservation-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent {
  private service = inject(RestaurantService);

  readonly reservations = this.service.reservations;
  readonly tables       = this.service.tables;
  readonly loading      = this.service.loading;
  readonly error        = this.service.error;

  searchQuery    = signal<string>('');
  selectedStatus = signal<string>('All');
  statusTabs     = ['All', 'Confirmed', 'Seated', 'Completed', 'Cancelled'];

  // Array.filter() + Array.includes() inside Angular computed signal
  filteredReservations = computed(() => {
    const q  = this.searchQuery().toLowerCase();
    const st = this.selectedStatus();
    return this.reservations().filter(res => {
      const matchSearch = res.guestName.toLowerCase().includes(q) || res.phone.includes(q);
      const matchStatus = st === 'All' || res.status === st;
      return matchSearch && matchStatus;
    });
  });

  // Array.find() — look up table name by id
  getTableName(tableId: string): string {
    const table = this.tables().find(t => t.id === tableId);
    return table ? table.name : tableId;
  }

  onSeat(resId: string, tableId: string, name: string): void {
    this.service.seatReservation(resId, tableId, name);
  }

  onCancel(resId: string, tableId: string): void {
    this.service.cancelReservation(resId, tableId);
  }

  onComplete(resId: string, tableId: string): void {
    this.service.completeReservation(resId, tableId);
  }
}

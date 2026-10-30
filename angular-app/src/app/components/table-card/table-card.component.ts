import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Table, TableStatus } from '../../models/table.model';

@Component({
  selector: 'app-table-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table-card.component.html',
  styleUrls: ['./table-card.component.css']
})
export class TableCardComponent {
  @Input({ required: true }) table!: Table;
  @Output() statusChange = new EventEmitter<{ id: string; status: TableStatus; guest?: string | null }>();

  getSectionImage(section: string): string {
    switch (section) {
      case 'Indoor Dining':
        return 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=500&q=80';
      case 'Garden Patio':
        return 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=500&q=80';
      case 'Bar Lounge':
        return 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=500&q=80';
      case 'VIP Booths':
        return 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=500&q=80';
      default:
        return 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=500&q=80';
    }
  }

  onSeatParty(): void {
    this.statusChange.emit({ id: this.table.id, status: 'Occupied', guest: this.table.currentGuest });
  }

  onVacate(): void {
    this.statusChange.emit({ id: this.table.id, status: 'Available', guest: null });
  }

  onQuickSeatWalkIn(): void {
    const guestName = prompt('Enter walk-in guest name:');
    if (guestName && guestName.trim()) {
      this.statusChange.emit({ id: this.table.id, status: 'Occupied', guest: guestName.trim() });
    }
  }
}

import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule }        from '@angular/common';
import { RestaurantService }   from '../../services/restaurant.service';
import { TableCardComponent }  from '../table-card/table-card.component';
import { TableStatus }         from '../../models/table.model';

interface SectionShowcase {
  name: string;
  image: string;
  tagline: string;
  badge: string;
}

@Component({
  selector: 'app-floor-plan',
  standalone: true,
  imports: [CommonModule, TableCardComponent],
  templateUrl: './floor-plan.component.html',
  styleUrls: ['./floor-plan.component.css']
})
export class FloorPlanComponent {
  private service = inject(RestaurantService);

  readonly tables            = this.service.tables;
  readonly availableTables   = this.service.availableTables;
  readonly occupiedTables    = this.service.occupiedTables;
  readonly reservedTables    = this.service.reservedTables;
  readonly totalCapacity     = this.service.totalCapacity;
  readonly seatedGuestsCount = this.service.seatedGuestsCount;
  readonly loading           = this.service.loading;
  readonly error             = this.service.error;

  selectedSection = signal<string>('All');
  selectedStatus  = signal<string>('All');

  sections = ['All', 'Indoor Dining', 'Garden Patio', 'Bar Lounge', 'VIP Booths'];
  statuses = ['All', 'Available', 'Reserved', 'Occupied'];

  sectionShowcase: SectionShowcase[] = [
    {
      name: 'Indoor Dining',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80',
      tagline: 'Warm & elegant main dining hall',
      badge: '6 Tables'
    },
    {
      name: 'Garden Patio',
      image: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=600&q=80',
      tagline: 'Al fresco dining with ambient fairy lights',
      badge: '4 Tables'
    },
    {
      name: 'Bar Lounge',
      image: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=600&q=80',
      tagline: 'Artisan cocktails & high-top counter',
      badge: '2 Tables'
    },
    {
      name: 'VIP Booths',
      image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=600&q=80',
      tagline: 'Private leather booths with wine cellar view',
      badge: '2 Tables'
    }
  ];

  filteredTables = computed(() => {
    return this.tables().filter(t => {
      const matchSection = this.selectedSection() === 'All' || t.section === this.selectedSection();
      const matchStatus  = this.selectedStatus()  === 'All' || t.status  === this.selectedStatus();
      return matchSection && matchStatus;
    });
  });

  onSelectSection(sectionName: string): void {
    if (this.selectedSection() === sectionName) {
      this.selectedSection.set('All');
    } else {
      this.selectedSection.set(sectionName);
    }
  }

  onStatusChange(event: { id: string; status: TableStatus; guest?: string | null }): void {
    this.service.updateTableStatus(event.id, event.status, event.guest ?? null);
  }

  onReset(): void {
    if (confirm('Reset all tables and reservations to default demo data?')) {
      this.service.resetData();
    }
  }
}

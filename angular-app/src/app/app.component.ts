import { Component, inject } from '@angular/core';
import { CommonModule }           from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { RestaurantService }      from './services/restaurant.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private service = inject(RestaurantService);

  readonly availableTables          = this.service.availableTables;
  readonly activeReservationsCount  = this.service.activeReservationsCount;
  readonly currentYear              = new Date().getFullYear();
}

import { Routes } from '@angular/router';
import { FloorPlanComponent } from './components/floor-plan/floor-plan.component';
import { ReservationListComponent } from './components/reservation-list/reservation-list.component';
import { ReservationFormComponent } from './components/reservation-form/reservation-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'tables', pathMatch: 'full' },
  { path: 'tables', component: FloorPlanComponent, title: 'Tables - BistroFlow' },
  { path: 'reservations', component: ReservationListComponent, title: 'Reservations - BistroFlow' },
  { path: 'book', component: ReservationFormComponent, title: 'Book - BistroFlow' },
  { path: '**', redirectTo: 'tables' }
];

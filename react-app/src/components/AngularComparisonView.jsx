import React, { useState } from 'react';
import { LayersIcon, CodeIcon, FileTextIcon } from './Icons';
import './AngularComparisonView.css';

export default function AngularComparisonView() {
  const [activeSnippet, setActiveSnippet] = useState('component');

  return (
    <div className="angular-view-root">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">React vs Angular Implementation Architecture</h1>
          <p className="page-subtitle">
            Direct comparison of component paradigms, state management, array rendering, and routing
          </p>
        </div>
      </div>

      {/* Side-by-Side Matrix Table */}
      <div className="comparison-matrix-card">
        <table className="matrix-table">
          <thead>
            <tr>
              <th style={{ width: '22%' }}>System Feature</th>
              <th style={{ width: '39%' }}>
                <span className="tech-tag-react">React JS (Our Primary App)</span>
              </th>
              <th style={{ width: '39%' }}>
                <span className="tech-tag-angular">Angular 17+ (Angular Version)</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Project Creation</strong></td>
              <td>create-react-app or Vite with JavaScript / JSX</td>
              <td>Angular CLI (ng new restaurant-app) with TypeScript</td>
            </tr>
            <tr>
              <td><strong>Components</strong></td>
              <td>Reusable Functional Components returning JSX</td>
              <td>TypeScript classes with @Component decorator and separate HTML template</td>
            </tr>
            <tr>
              <td><strong>Array Operations (map)</strong></td>
              <td>JavaScript Array.map() inside JSX expressions: {`{tables.map(t => <TableCard ... />)}`}</td>
              <td>Built-in structural directive *ngFor or modern @for block: {`@for (t of tables; track t.id)`}</td>
            </tr>
            <tr>
              <td><strong>Filtering Dynamic Data</strong></td>
              <td>JavaScript Array.filter() inside useMemo or inline function handlers</td>
              <td>Custom Angular Pipes or computed Signals (e.g. computed(() =&gt; tables().filter(...)))</td>
            </tr>
            <tr>
              <td><strong>State Management</strong></td>
              <td>React Hooks: useState, useEffect, useMemo, useCallback</td>
              <td>Angular Signals (signal(), computed(), effect()) or RxJS BehaviorSubject Services</td>
            </tr>
            <tr>
              <td><strong>Styling Techniques</strong></td>
              <td>CSS Modules (*.module.css), inline style objects, global CSS variables</td>
              <td>Component scoped styles (styleUrls: ['./table.component.css']), [ngClass], [ngStyle]</td>
            </tr>
            <tr>
              <td><strong>View Routing</strong></td>
              <td>react-router-dom with BrowserRouter, Routes, Route, and NavLink</td>
              <td>@angular/router with RouterModule, router-outlet, and routerLink</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Code Snippet Tabs */}
      <div style={{ backgroundColor: '#ffffff', border: '1px solid var(--color-border)', borderRadius: '12px', padding: '24px', boxShadow: 'var(--shadow-sm)' }}>
        <h2 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '14px', color: 'var(--color-brand-primary)' }}>
          Angular Implementation Code Files
        </h2>

        <div className="code-tabs-header">
          <button
            type="button"
            className={`code-tab-btn ${activeSnippet === 'component' ? 'code-tab-btn-active' : ''}`}
            onClick={() => setActiveSnippet('component')}
          >
            table-card.component.ts &amp; .html
          </button>
          <button
            type="button"
            className={`code-tab-btn ${activeSnippet === 'service' ? 'code-tab-btn-active' : ''}`}
            onClick={() => setActiveSnippet('service')}
          >
            restaurant.service.ts (State)
          </button>
          <button
            type="button"
            className={`code-tab-btn ${activeSnippet === 'routing' ? 'code-tab-btn-active' : ''}`}
            onClick={() => setActiveSnippet('routing')}
          >
            app.routes.ts (Routing)
          </button>
          <button
            type="button"
            className={`code-tab-btn ${activeSnippet === 'form' ? 'code-tab-btn-active' : ''}`}
            onClick={() => setActiveSnippet('form')}
          >
            reservation-form.component.ts (Reactive Forms)
          </button>
        </div>

        {/* Tab Content 1: Table Card Component */}
        {activeSnippet === 'component' && (
          <div>
            <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '8px' }}>
              table-card.component.ts (TypeScript Component with @Input and @Output)
            </h3>
            <pre className="code-pre">{`import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Table } from '../../models/table.model';

@Component({
  selector: 'app-table-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table-card.component.html',
  styleUrls: ['./table-card.component.css']
})
export class TableCardComponent {
  @Input({ required: true }) table!: Table;
  @Output() statusChanged = new EventEmitter<{ id: string; status: string }>();

  vacateTable(): void {
    this.statusChanged.emit({ id: this.table.id, status: 'Available' });
  }

  seatReservation(): void {
    this.statusChanged.emit({ id: this.table.id, status: 'Occupied' });
  }
}`}</pre>

            <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-muted)', margin: '16px 0 8px' }}>
              table-card.component.html (Angular Template with *ngIf / @if and [ngClass])
            </h3>
            <pre className="code-pre">{`<div class="table-card" [ngClass]="table.status.toLowerCase()">
  <div class="card-header">
    <span class="table-name">{{ table.name }}</span>
    <span class="badge" [ngClass]="'badge-' + table.status.toLowerCase()">{{ table.status }}</span>
  </div>

  <div class="capacity-info">
    <span>Seats: {{ table.capacity }}</span>
    <span>Section: {{ table.section }}</span>
  </div>

  <!-- Conditional Rendering using modern Angular @if -->
  @if (table.status === 'Occupied') {
    <p class="guest-info">Seated: {{ table.currentGuest }}</p>
    <button class="btn btn-secondary" (click)="vacateTable()">Vacate</button>
  } @else if (table.status === 'Reserved') {
    <p class="guest-info">Reserved: {{ table.currentGuest }}</p>
    <button class="btn btn-primary" (click)="seatReservation()">Seat Party</button>
  } @else {
    <p class="status-ready">Available for seating</p>
  }
</div>`}</pre>
          </div>
        )}

        {/* Tab Content 2: State Service */}
        {activeSnippet === 'service' && (
          <div>
            <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '8px' }}>
              restaurant.service.ts (Angular Signals &amp; RxJS State Management)
            </h3>
            <pre className="code-pre">{`import { Injectable, signal, computed } from '@angular/core';
import { Table } from '../models/table.model';
import { Reservation } from '../models/reservation.model';
import { INITIAL_TABLES, INITIAL_RESERVATIONS } from '../data/initial-data';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  // Angular Signal State
  private tablesSignal = signal<Table[]>(INITIAL_TABLES);
  private reservationsSignal = signal<Reservation[]>(INITIAL_RESERVATIONS);

  // Read-only public signals
  readonly tables = this.tablesSignal.asReadonly();
  readonly reservations = this.reservationsSignal.asReadonly();

  // Computed signals (equivalent to React useMemo + array.filter / array.reduce)
  readonly availableTables = computed(() =>
    this.tablesSignal().filter(t => t.status === 'Available')
  );

  readonly totalCapacity = computed(() =>
    this.tablesSignal().reduce((acc, t) => acc + t.capacity, 0)
  );

  updateTableStatus(tableId: string, status: 'Available' | 'Reserved' | 'Occupied'): void {
    this.tablesSignal.update(tables =>
      tables.map(t => (t.id === tableId ? { ...t, status } : t))
    );
  }

  addReservation(reservation: Reservation): void {
    this.reservationsSignal.update(list => [reservation, ...list]);
    this.updateTableStatus(reservation.tableId, 'Reserved');
  }
}`}</pre>
          </div>
        )}

        {/* Tab Content 3: Routing */}
        {activeSnippet === 'routing' && (
          <div>
            <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '8px' }}>
              app.routes.ts (Angular RouterModule Configuration)
            </h3>
            <pre className="code-pre">{`import { Routes } from '@angular/router';
import { FloorPlanComponent } from './components/floor-plan/floor-plan.component';
import { ReservationListComponent } from './components/reservation-list/reservation-list.component';
import { ReservationFormComponent } from './components/reservation-form/reservation-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'tables', pathMatch: 'full' },
  { path: 'tables', component: FloorPlanComponent, title: 'Floor Plan - BistroFlow' },
  { path: 'reservations', component: ReservationListComponent, title: 'Reservations - BistroFlow' },
  { path: 'book', component: ReservationFormComponent, title: 'Book Table - BistroFlow' },
  { path: '**', redirectTo: 'tables' }
];`}</pre>
          </div>
        )}

        {/* Tab Content 4: Reactive Form */}
        {activeSnippet === 'form' && (
          <div>
            <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '8px' }}>
              reservation-form.component.ts (Angular Reactive Forms with Validators)
            </h3>
            <pre className="code-pre">{`import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RestaurantService } from '../../services/restaurant.service';

@Component({
  selector: 'app-reservation-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './reservation-form.component.html'
})
export class ReservationFormComponent {
  private fb = inject(FormBuilder);
  private service = inject(RestaurantService);
  private router = inject(Router);

  reservationForm: FormGroup = this.fb.group({
    guestName: ['', [Validators.required, Validators.minLength(2)]],
    phone: ['', [Validators.required]],
    email: ['', [Validators.email]],
    partySize: [2, [Validators.required, Validators.min(1)]],
    date: [new Date().toISOString().split('T')[0], Validators.required],
    timeSlot: ['07:00 PM', Validators.required],
    tableId: ['', Validators.required]
  });

  submitBooking(): void {
    if (this.reservationForm.invalid) return;
    this.service.addReservation(this.reservationForm.value);
    this.router.navigate(['/tables']);
  }
}`}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

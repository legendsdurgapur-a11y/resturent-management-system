import { Component, inject, computed, signal } from '@angular/core';
import { CommonModule }            from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink }      from '@angular/router';
import { RestaurantService }       from '../../services/restaurant.service';

@Component({
  selector: 'app-reservation-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent {
  private fb      = inject(FormBuilder);
  private service = inject(RestaurantService);
  private router  = inject(Router);

  successMessage = signal<string>('');
  submitting     = signal<boolean>(false);

  bookingForm: FormGroup = this.fb.group({
    guestName:  ['', [Validators.required, Validators.minLength(2)]],
    phone:      ['', [Validators.required]],
    email:      ['', [Validators.email]],
    partySize:  [2,  [Validators.required, Validators.min(1), Validators.max(12)]],
    date:       [new Date().toISOString().split('T')[0], [Validators.required]],
    timeSlot:   ['07:00 PM', [Validators.required]],
    section:    ['Indoor Dining', [Validators.required]],
    tableId:    ['', [Validators.required]],
    notes:      ['']
  });

  sections  = ['Indoor Dining', 'Garden Patio', 'Bar Lounge', 'VIP Booths'];
  timeSlots = ['06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM', '08:00 PM', '08:30 PM', '09:00 PM', '09:30 PM'];

  // Array.filter() — live available tables matching party size + section
  availableTables = computed(() => {
    const partySize = Number(this.bookingForm.get('partySize')?.value) || 1;
    const section   = this.bookingForm.get('section')?.value || '';
    return this.service.tables().filter(t =>
      t.status === 'Available' &&
      t.section === section &&
      t.capacity >= partySize
    );
  });

  onSubmit(): void {
    if (this.bookingForm.invalid) {
      this.bookingForm.markAllAsTouched();
      return;
    }

    this.submitting.set(true);
    const val = this.bookingForm.value;

    this.service.addReservation({
      guestName: val.guestName.trim(),
      phone:     val.phone.trim(),
      email:     val.email?.trim() || 'guest@example.com',
      partySize: Number(val.partySize),
      date:      val.date,
      timeSlot:  val.timeSlot,
      section:   val.section,
      tableId:   val.tableId,
      status:    'Confirmed',
      notes:     val.notes?.trim() || ''
    });

    this.successMessage.set(`Reservation confirmed for ${val.guestName}!`);
    this.submitting.set(false);

    setTimeout(() => this.router.navigate(['/tables']), 1400);
  }
}

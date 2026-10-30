# Restaurant Reservation & Table Management (Angular Version)

This directory contains the complete Angular (v17+) implementation of the BistroFlow Restaurant Reservation and Table Management System, matching all requirements specified in the project syllabus.

## Key Angular Features Demonstrated

1. **Standalone Components**: Modular architecture using `@Component({ standalone: true })`.
2. **Reactive State with Angular Signals**: High-performance reactivity using `signal()` and `computed()` in `RestaurantService`.
3. **Template Directives & Array Operations**:
   - Modern `@for` loop (equivalent to React `.map()`) with `@empty` fallbacks.
   - Modern `@if` / `@else` condition blocks.
   - Dynamic class binding with `[ngClass]` and style binding.
4. **Reactive Forms**: Form validation using `FormGroup`, `FormControl`, and `Validators` for table booking.
5. **Client-Side Routing**: Configured using `@angular/router` with `provideRouter(routes)` and `RouterOutlet`.
6. **Component Scoped Styling**: Scoped styles using Angular view encapsulation in `*.component.css`.

## How to Run

1. Open your terminal in this directory:
   ```bash
   cd c:\TRIDIB\restaurant-system\angular-app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Angular development server:
   ```bash
   npm start
   # or: ng serve
   ```
4. Navigate to `http://localhost:4200` in your web browser.

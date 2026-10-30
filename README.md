# BistroFlow: Restaurant Reservation & Table Management System

A production-grade, modular Restaurant Reservation and Table Management System built with React JS and companion Angular architecture.

---

## 1. Project Overview & Architecture

BistroFlow provides restaurant hosts, maitre d's, and managers with an interactive dining room floor plan and reservation ledger.

### Key Objectives Implemented:
1. **Project Setup**: Structured according to standard Create-React-App and modern component patterns with zero runtime errors.
2. **JSX and HTML-to-JSX Conversion**: Detailed architectural guide, conversion rules, and an interactive live HTML-to-JSX conversion lab.
3. **Reusable Functional Components**: `TableCard`, `FloorPlan`, `ReservationList`, `ReservationForm`, `StatsOverview`, `TableModal`, and `Navbar`.
4. **State Management with Hooks**: `useState` for mutable lists and filters, `useEffect` for persistence and side effects, `useMemo` for derived capacity calculations, and `useCallback` for memoized action dispatchers.
5. **JavaScript Array Operations**: Extensive integration of `.map()`, `.filter()`, `.reduce()`, and `.find()` for rendering and manipulating operational restaurant data.
6. **Client-Side Routing**: Complete multi-view routing using `react-router-dom` (Floor Plan, Reservations Ledger, Booking Form, HTML-to-JSX Lab, Angular Comparison, and Legal Pages).
7. **Multiple Styling Techniques**: CSS Modules (`TableCard.module.css`, `FloorPlan.module.css`), Dynamic Scoped Inline Styles, Global CSS Variables/Tokens (`index.css`), and Responsive Flexbox/Grid.
8. **Angular Implementation ("using angular too")**: A complete companion Angular 17+ implementation located in `angular-app/` with Angular Signals, Reactive Forms, `@for` / `@if` template directives, and view-scoped CSS.

---

## 2. Directory Structure

```
c:\TRIDIB\restaurant-system\
├── react-app\                          # React Application
│   ├── public\
│   │   └── favicon.svg                 # Vector favicon
│   ├── src\
│   │   ├── components\
│   │   │   ├── AngularComparisonView.css
│   │   │   ├── AngularComparisonView.jsx
│   │   │   ├── FloorPlan.jsx           # Interactive dining floor plan
│   │   │   ├── FloorPlan.module.css    # CSS Module scoped styles
│   │   │   ├── HtmlToJsxLab.css
│   │   │   ├── HtmlToJsxLab.jsx        # Interactive HTML-to-JSX lab
│   │   │   ├── Icons.jsx               # Vector SVG icons (no emojis)
│   │   │   ├── Navbar.css
│   │   │   ├── Navbar.jsx              # Navigation header
│   │   │   ├── PrivacyPolicy.jsx       # Dedicated legal page
│   │   │   ├── ReservationForm.css
│   │   │   ├── ReservationForm.jsx     # Booking form with validations
│   │   │   ├── ReservationList.css
│   │   │   ├── ReservationList.jsx     # Searchable ledger
│   │   │   ├── StatsOverview.css
│   │   │   ├── StatsOverview.jsx       # Operational metrics (.reduce, .filter)
│   │   │   ├── TableCard.jsx           # Modular dining table component
│   │   │   ├── TableCard.module.css    # CSS Module scoped styles
│   │   │   ├── TableModal.jsx          # Table detail and seating modal
│   │   │   └── TermsOfService.jsx      # Dedicated legal page
│   │   ├── data\
│   │   │   └── mockData.js             # Initial dining tables and reservations
│   │   ├── App.jsx                     # Root application state and routes
│   │   ├── index.css                   # Grounded hospitality design tokens
│   │   └── main.jsx                    # Application entry point with HashRouter
│   ├── index.html                      # HTML5 template
│   ├── package.json                    # Dependencies and scripts
│   └── vite.config.js                  # Fast bundler config
├── angular-app\                        # Complete Angular 17+ Application
│   ├── src\
│   │   ├── app\
│   │   │   ├── components\
│   │   │   │   ├── floor-plan\         # Angular floor plan component
│   │   │   │   ├── reservation-form\   # Angular Reactive Forms
│   │   │   │   ├── reservation-list\   # Angular data table with @for
│   │   │   │   └── table-card\         # Angular scoped table card
│   │   │   ├── models\                 # TypeScript interfaces
│   │   │   ├── services\               # Angular Signals state service
│   │   │   ├── app.component.ts
│   │   │   └── app.routes.ts           # Angular RouterModule routes
│   │   ├── index.html
│   │   ├── main.ts
│   │   └── styles.css
│   ├── angular.json
│   ├── package.json
│   └── tsconfig.json
├── preview-production.bat              # Quick preview of compiled build
├── start-react-dev.bat                 # One-click dev server launcher
└── README.md
```

---

## 3. HTML to JSX Conversion Highlights

JSX is a syntax extension for JavaScript that looks like HTML but adheres to JavaScript conventions:

| Traditional HTML Attribute | React JSX Equivalent | Reason |
| :--- | :--- | :--- |
| `class="table-card"` | `className="table-card"` | `class` is a reserved JavaScript keyword |
| `for="guest-name"` | `htmlFor="guest-name"` | `for` is reserved for JavaScript loops |
| `<input type="text">` | `<input type="text" />` | All void elements in JSX must self-close |
| `style="background: #0f172a;"` | `style={{ backgroundColor: '#0f172a' }}` | Inline styles must be JavaScript objects |
| `onclick="vacateTable()"` | `onClick={vacateTable}` | Event handlers use camelCase and function refs |
| `<!-- Comment -->` | `{/* Comment */}` | Comments are written as JavaScript comments inside `{}` |

---

## 4. State Management with React Hooks

- **`useState`**:
  - `tables`: Array of table objects with status (`Available`, `Reserved`, `Occupied`).
  - `reservations`: Ledger of confirmed, seated, completed, and cancelled bookings.
  - `selectedSection` and `statusFilter`: Current UI filtering parameters.
- **`useEffect`**:
  - Automatically synchronizes table and reservation records with `localStorage` so state persists across page refreshes.
  - Re-evaluates matching available tables when guest party size or section changes in `ReservationForm`.
- **`useMemo`**:
  - Dynamically computes operational statistics (`totalCapacity`, `currentlySeatedGuests`, `occupancyPercentage`).
  - Filters table cards and reservation rows without recalculating on unrelated renders.
- **`useCallback`**:
  - Memoizes table status transitions (`handleUpdateTableStatus`, `handleSeatReservation`, `handleCancelReservation`).

---

## 5. JavaScript Array Operations

### Array.map()
- Dynamically renders table cards:
  ```jsx
  {filteredTables.map((table) => (
    <TableCard key={table.id} table={table} onStatusChange={onUpdateTableStatus} />
  ))}
  ```
- Renders reservation table rows, time slot selectors, and dining zone tabs.

### Array.filter()
- Filters tables by section and live availability:
  ```javascript
  const availableMatchingTables = tables.filter((table) => {
    return table.section === section && table.capacity >= partySize && table.status === 'Available';
  });
  ```
- Searches reservations by guest name, phone, or email.

### Array.reduce()
- Calculates total restaurant guest capacity and seated occupancy:
  ```javascript
  const totalCapacity = tables.reduce((acc, table) => acc + table.capacity, 0);
  const currentlySeated = tables
    .filter((table) => table.status === 'Occupied')
    .reduce((acc, table) => acc + table.capacity, 0);
  ```

### Array.find()
- Looks up dining table details given a reservation `tableId`:
  ```javascript
  const assignedTable = tables.find((t) => t.id === reservation.tableId);
  ```

---

## 6. Multiple Styling Techniques Demonstrated

1. **CSS Modules**:
   - `TableCard.module.css` and `FloorPlan.module.css`.
   - Generates uniquely scoped CSS class names to prevent style leakage between components.
2. **Dynamic Inline Styles**:
   - Dynamic background color and border styles computed at runtime based on table state (`Available`, `Reserved`, `Occupied`).
3. **Global Design Tokens & CSS Variables**:
   - Defined in `index.css` for palette control, typography, elevation, and accessibility.
   - Grounded hospitality theme with deep slate (`#0f172a`), warm amber (`#d97706`), and emerald green (`#059669`).
4. **Responsive CSS Grid & Flexbox**:
   - Multi-column floor plan that scales gracefully from mobile screens (<640px) to multi-column desktop displays (>1024px).

---

## 7. Angular Implementation Comparison ("using angular too")

| Architectural Layer | React Implementation | Angular Implementation |
| :--- | :--- | :--- |
| **Component Model** | Functional Components returning JSX | TypeScript `@Component` with HTML template |
| **Template Iteration** | `array.map()` inside JSX `{}` | `@for (table of tables; track table.id)` |
| **Conditional Logic** | Ternary operator or `&&` guard | `@if (table.status === 'Occupied')` |
| **State Management** | React Hooks (`useState`, `useMemo`) | Angular Signals (`signal()`, `computed()`) |
| **Form Handling** | Controlled component with `useState` | Reactive Forms with `FormGroup` and `Validators` |
| **Routing** | `react-router-dom` with `<Routes>` | `@angular/router` with `provideRouter(routes)` |
| **Style Encapsulation**| CSS Modules (`*.module.css`) | View Encapsulation (`styleUrls: [...]`) |

---

## 8. Running the Application

### Option A: Quick Double-Click Launcher (Windows)
Double-click `start-react-dev.bat` inside `c:\TRIDIB\restaurant-system` to start the development server on `http://localhost:3000`.

### Option B: Terminal Command
```powershell
$env:PATH = "C:\Photo gallery(REACT)\.nodejs;$env:PATH"
$env:NODE_OPTIONS = "--require C:\TRIDIB\patch-realpath.cjs"
cd "C:\TRIDIB\restaurant-system\react-app"
npm run dev
```

### Option C: Preview Pre-Compiled Production Build
Double-click `preview-production.bat` to launch the compiled distribution on `http://localhost:4173`.

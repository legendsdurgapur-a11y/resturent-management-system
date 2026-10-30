import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import FloorPlan from './components/FloorPlan';
import ReservationList from './components/ReservationList';
import ReservationForm from './components/ReservationForm';
import HtmlToJsxLab from './components/HtmlToJsxLab';
import AngularComparisonView from './components/AngularComparisonView';
import TableModal from './components/TableModal';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import { INITIAL_TABLES, INITIAL_RESERVATIONS } from './data/mockData';

const STORAGE_KEY_TABLES = 'bistroflow_tables_v1';
const STORAGE_KEY_RESERVATIONS = 'bistroflow_reservations_v1';

export default function App() {
  // State management with React Hooks: tables and reservations
  const [tables, setTables] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_TABLES);
      return saved ? JSON.parse(saved) : INITIAL_TABLES;
    } catch (e) {
      return INITIAL_TABLES;
    }
  });

  const [reservations, setReservations] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_RESERVATIONS);
      return saved ? JSON.parse(saved) : INITIAL_RESERVATIONS;
    } catch (e) {
      return INITIAL_RESERVATIONS;
    }
  });

  const [selectedTable, setSelectedTable] = useState(null);

  // Persistence effect with useEffect
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_TABLES, JSON.stringify(tables));
    } catch (e) {
      console.warn('LocalStorage save failed for tables', e);
    }
  }, [tables]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_RESERVATIONS, JSON.stringify(reservations));
    } catch (e) {
      console.warn('LocalStorage save failed for reservations', e);
    }
  }, [reservations]);

  // Derived counts using Array.filter() and useMemo
  const activeReservationCount = useMemo(() => {
    return reservations.filter((r) => r.status === 'Confirmed').length;
  }, [reservations]);

  const availableTableCount = useMemo(() => {
    return tables.filter((t) => t.status === 'Available').length;
  }, [tables]);

  // Handler: Update table status directly
  const handleUpdateTableStatus = useCallback((tableId, newStatus, currentGuest = null, seatedAt = null) => {
    setTables((prevTables) =>
      prevTables.map((t) => {
        if (t.id === tableId) {
          return {
            ...t,
            status: newStatus,
            currentGuest: newStatus === 'Available' ? null : currentGuest || t.currentGuest,
            seatedAt: newStatus === 'Occupied' ? (seatedAt || 'Just now') : (newStatus === 'Available' ? null : t.seatedAt)
          };
        }
        return t;
      })
    );
  }, []);

  // Handler: Add a new reservation
  const handleAddReservation = useCallback((newReservation) => {
    setReservations((prev) => [newReservation, ...prev]);

    // Update assigned table to Reserved
    setTables((prevTables) =>
      prevTables.map((t) => {
        if (t.id === newReservation.tableId) {
          return {
            ...t,
            status: 'Reserved',
            currentGuest: newReservation.guestName
          };
        }
        return t;
      })
    );
  }, []);

  // Handler: Seat a reservation
  const handleSeatReservation = useCallback((reservationId, tableId, guestName) => {
    // 1. Mark reservation as Seated
    setReservations((prev) =>
      prev.map((r) => (r.id === reservationId ? { ...r, status: 'Seated' } : r))
    );

    // 2. Mark table as Occupied
    if (tableId) {
      setTables((prev) =>
        prev.map((t) =>
          t.id === tableId
            ? { ...t, status: 'Occupied', currentGuest: guestName, seatedAt: 'Just now' }
            : t
        )
      );
    }
  }, []);

  // Handler: Cancel reservation
  const handleCancelReservation = useCallback((reservationId, tableId) => {
    setReservations((prev) =>
      prev.map((r) => (r.id === reservationId ? { ...r, status: 'Cancelled' } : r))
    );

    // Free table back to Available if it was tied to this booking
    if (tableId) {
      setTables((prev) =>
        prev.map((t) =>
          t.id === tableId ? { ...t, status: 'Available', currentGuest: null, seatedAt: null } : t
        )
      );
    }
  }, []);

  // Handler: Complete a seated reservation
  const handleCompleteReservation = useCallback((reservationId, tableId) => {
    setReservations((prev) =>
      prev.map((r) => (r.id === reservationId ? { ...r, status: 'Completed' } : r))
    );

    // Vacate table
    if (tableId) {
      setTables((prev) =>
        prev.map((t) =>
          t.id === tableId ? { ...t, status: 'Available', currentGuest: null, seatedAt: null } : t
        )
      );
    }
  }, []);

  // Quick seat walk-in modal trigger
  const handleQuickSeat = useCallback((table) => {
    setSelectedTable(table);
  }, []);

  // Reset to initial mock state
  const handleResetData = useCallback(() => {
    setTables(INITIAL_TABLES);
    setReservations(INITIAL_RESERVATIONS);
    try {
      localStorage.removeItem(STORAGE_KEY_TABLES);
      localStorage.removeItem(STORAGE_KEY_RESERVATIONS);
    } catch (e) {
      // ignore
    }
  }, []);

  return (
    <div className="app-container">
      {/* Top Navigation */}
      <Navbar
        activeReservationCount={activeReservationCount}
        availableTableCount={availableTableCount}
      />

      {/* Main Routed Content */}
      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={
              <FloorPlan
                tables={tables}
                reservations={reservations}
                onUpdateTableStatus={handleUpdateTableStatus}
                onSelectTable={(table) => setSelectedTable(table)}
                onQuickSeat={handleQuickSeat}
                onResetData={handleResetData}
              />
            }
          />
          <Route
            path="/tables"
            element={
              <FloorPlan
                tables={tables}
                reservations={reservations}
                onUpdateTableStatus={handleUpdateTableStatus}
                onSelectTable={(table) => setSelectedTable(table)}
                onQuickSeat={handleQuickSeat}
                onResetData={handleResetData}
              />
            }
          />
          <Route
            path="/reservations"
            element={
              <ReservationList
                reservations={reservations}
                tables={tables}
                onSeatReservation={handleSeatReservation}
                onCancelReservation={handleCancelReservation}
                onCompleteReservation={handleCompleteReservation}
              />
            }
          />
          <Route
            path="/new-reservation"
            element={
              <ReservationForm
                tables={tables}
                onAddReservation={handleAddReservation}
              />
            }
          />
          <Route path="/html-to-jsx" element={<HtmlToJsxLab />} />
          <Route path="/angular-version" element={<AngularComparisonView />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
        </Routes>
      </main>

      {/* Table Detail / Action Modal */}
      {selectedTable && (
        <TableModal
          table={selectedTable}
          onClose={() => setSelectedTable(null)}
          onUpdateStatus={handleUpdateTableStatus}
        />
      )}

      {/* Footer with Mandatory Legal Pages */}
      <footer className="app-footer">
        <div className="footer-inner">
          <div>
            &copy; {new Date().getFullYear()} BistroFlow Hospitality Operations. All rights reserved.
          </div>
          <div className="footer-links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/html-to-jsx">HTML-to-JSX Guide</Link>
            <Link to="/angular-version">Angular Version</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

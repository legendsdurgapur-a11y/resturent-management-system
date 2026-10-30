import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { TIME_SLOTS, SECTIONS } from '../data/mockData';
import { CalendarIcon, UsersIcon, ClockIcon, CheckIcon, AlertCircleIcon } from './Icons';
import './ReservationForm.css';

/**
 * Reusable Functional Component: ReservationForm
 * Demonstrates:
 * 1. Controlled components and state hooks (useState, useEffect, useMemo)
 * 2. Array methods (filter, map) to dynamically populate sections, time slots, and tables
 * 3. Validation and dynamic table availability matching
 */
export default function ReservationForm({ tables, onAddReservation }) {
  const navigate = useNavigate();

  // Controlled form state
  const [guestName, setGuestName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [partySize, setPartySize] = useState(2);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [timeSlot, setTimeSlot] = useState('07:00 PM');
  const [section, setSection] = useState('Indoor Dining');
  const [selectedTableId, setSelectedTableId] = useState('');
  const [notes, setNotes] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Dining sections filtered to exclude 'All Sections' option
  const validSections = useMemo(() => {
    return SECTIONS.filter((sec) => sec !== 'All Sections');
  }, []);

  // Filter available tables matching selected section and capacity using Array.filter()
  const availableMatchingTables = useMemo(() => {
    return tables.filter((table) => {
      const matchesSection = table.section === section;
      const hasCapacity = table.capacity >= Number(partySize);
      const isAvailable = table.status === 'Available';
      return matchesSection && hasCapacity && isAvailable;
    });
  }, [tables, section, partySize]);

  // Automatically pre-select first suitable available table
  useEffect(() => {
    if (availableMatchingTables.length > 0) {
      setSelectedTableId(availableMatchingTables[0].id);
    } else {
      setSelectedTableId('');
    }
  }, [availableMatchingTables]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Form validation
    if (!guestName.trim()) {
      setErrorMessage('Please enter the primary guest name.');
      return;
    }
    if (!phone.trim()) {
      setErrorMessage('Please provide a valid contact phone number.');
      return;
    }
    if (!selectedTableId) {
      setErrorMessage(
        'No available table found for this party size and section. Please choose a different section or adjust guests.'
      );
      return;
    }

    const newReservation = {
      id: `RES-${Date.now().toString().slice(-4)}`,
      guestName: guestName.trim(),
      phone: phone.trim(),
      email: email.trim() || 'guest@example.com',
      partySize: Number(partySize),
      date,
      timeSlot,
      section,
      tableId: selectedTableId,
      status: 'Confirmed',
      notes: notes.trim()
    };

    onAddReservation(newReservation);
    setSuccessMessage(`Reservation confirmed for ${newReservation.guestName} at Table ${selectedTableId}!`);

    // Redirect to floorplan view after short delay
    setTimeout(() => {
      navigate('/');
    }, 1200);
  };

  return (
    <div className="reservation-form-view">
      <div className="page-header" style={{ maxWidth: '760px', margin: '0 auto 24px' }}>
        <div>
          <h1 className="page-title">Book a New Reservation</h1>
          <p className="page-subtitle">
            Capture guest details and auto-assign the best available table
          </p>
        </div>
      </div>

      <div className="form-card">
        {errorMessage && (
          <div className="alert-box alert-error" role="alert">
            <AlertCircleIcon size={18} />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="alert-box alert-success" role="alert">
            <CheckIcon size={18} />
            <span>{successMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            {/* Guest Name */}
            <div className="form-group">
              <label htmlFor="guestName" className="form-label">
                Primary Guest Name *
              </label>
              <input
                id="guestName"
                type="text"
                className="form-control"
                placeholder="e.g. Evelyn Reed"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                required
              />
            </div>

            {/* Phone Number */}
            <div className="form-group">
              <label htmlFor="phone" className="form-label">
                Contact Phone Number *
              </label>
              <input
                id="phone"
                type="tel"
                className="form-control"
                placeholder="e.g. +1 555-0144"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            {/* Email Address */}
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                className="form-control"
                placeholder="e.g. evelyn@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Party Size */}
            <div className="form-group">
              <label htmlFor="partySize" className="form-label">
                Party Size (Guests) *
              </label>
              <select
                id="partySize"
                className="form-control"
                value={partySize}
                onChange={(e) => setPartySize(Number(e.target.value))}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Guest' : 'Guests'}
                  </option>
                ))}
              </select>
            </div>

            {/* Reservation Date */}
            <div className="form-group">
              <label htmlFor="date" className="form-label">
                Reservation Date *
              </label>
              <input
                id="date"
                type="date"
                className="form-control"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            {/* Dining Section Selection */}
            <div className="form-group">
              <label htmlFor="section" className="form-label">
                Preferred Dining Section *
              </label>
              <select
                id="section"
                className="form-control"
                value={section}
                onChange={(e) => setSection(e.target.value)}
              >
                {validSections.map((sec) => (
                  <option key={sec} value={sec}>
                    {sec}
                  </option>
                ))}
              </select>
            </div>

            {/* Time Slot Selection (Full Width) */}
            <div className="form-group form-group-full">
              <label className="form-label">Select Seating Time Slot</label>
              <div className="time-slot-grid">
                {TIME_SLOTS.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    className={`time-slot-pill ${timeSlot === slot ? 'time-slot-pill-active' : ''}`}
                    onClick={() => setTimeSlot(slot)}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Assigned Table Dropdown */}
            <div className="form-group form-group-full">
              <label htmlFor="tableSelect" className="form-label">
                Assigned Dining Table *
              </label>
              <select
                id="tableSelect"
                className="form-control"
                value={selectedTableId}
                onChange={(e) => setSelectedTableId(e.target.value)}
                disabled={availableMatchingTables.length === 0}
              >
                {availableMatchingTables.length > 0 ? (
                  availableMatchingTables.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name} (Capacity: {t.capacity} seats, Shape: {t.shape})
                    </option>
                  ))
                ) : (
                  <option value="">No available tables match {partySize} guests in {section}</option>
                )}
              </select>
              <div className="available-tables-hint">
                {availableMatchingTables.length > 0
                  ? `${availableMatchingTables.length} tables currently available in ${section} for ${partySize}+ guests.`
                  : 'Notice: All tables in this section for this party size are currently booked or occupied. Try selecting a different dining section.'}
              </div>
            </div>

            {/* Special Requests / Notes */}
            <div className="form-group form-group-full">
              <label htmlFor="notes" className="form-label">
                Dietary Preferences &amp; Special Requests
              </label>
              <textarea
                id="notes"
                className="form-control"
                rows="3"
                placeholder="e.g. Dietary allergies, birthday cake service, quiet corner table request"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate('/')}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!selectedTableId}
            >
              <CheckIcon size={16} />
              <span>Confirm Reservation</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

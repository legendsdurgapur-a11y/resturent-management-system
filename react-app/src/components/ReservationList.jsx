import React, { useState, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { SearchIcon, PlusIcon, CalendarIcon, ClockIcon, UsersIcon, CheckIcon, XIcon } from './Icons';
import './ReservationList.css';

/**
 * ReservationList Component:
 * Comprehensive reservation ledger demonstrating:
 * 1. JavaScript array methods (filter, map, find)
 * 2. React state hooks for search and filtering
 * 3. Status transition actions (Seat, Cancel, Complete)
 */
export default function ReservationList({
  reservations,
  tables,
  onSeatReservation,
  onCancelReservation,
  onCompleteReservation
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Integration of JavaScript Array Operations: Array.filter()
  const filteredReservations = useMemo(() => {
    return reservations.filter((res) => {
      // Search matching customer name, phone, or email
      const matchesSearch =
        res.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        res.phone.includes(searchTerm) ||
        res.email.toLowerCase().includes(searchTerm.toLowerCase());

      // Filter by status tab
      const matchesStatus =
        statusFilter === 'All' || res.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [reservations, searchTerm, statusFilter]);

  const filterTabs = ['All', 'Confirmed', 'Seated', 'Completed', 'Cancelled'];

  // Helper to retrieve table name using Array.find()
  const getTableName = (tableId) => {
    const found = tables.find((t) => t.id === tableId);
    return found ? found.name : tableId || 'Unassigned';
  };

  return (
    <div className="reservations-root">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Reservations Ledger</h1>
          <p className="page-subtitle">
            Manage incoming bookings, guest arrivals, and table assignments
          </p>
        </div>
        <div>
          <NavLink to="/new-reservation" className="btn btn-primary">
            <PlusIcon size={16} />
            <span>Create Reservation</span>
          </NavLink>
        </div>
      </div>

      {/* Search and Status Filters */}
      <div className="search-filter-card">
        <div className="search-input-box">
          <SearchIcon size={16} className="text-muted" />
          <input
            type="text"
            className="search-input"
            placeholder="Search by guest name, phone, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Status Pills rendered with Array.map() */}
        <div className="filter-pills" role="tablist">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              type="button"
              className={`pill-btn ${statusFilter === tab ? 'pill-btn-active' : ''}`}
              onClick={() => setStatusFilter(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Dynamic Data Table rendered with Array.map() */}
      <div className="table-container">
        <table className="res-table">
          <thead>
            <tr>
              <th>ID &amp; Guest</th>
              <th>Date &amp; Time</th>
              <th>Party Size</th>
              <th>Assigned Table</th>
              <th>Dining Section</th>
              <th>Status</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredReservations.length > 0 ? (
              filteredReservations.map((res) => {
                let badgeClass = 'badge badge-available';
                if (res.status === 'Confirmed') badgeClass = 'badge badge-reserved';
                if (res.status === 'Seated') badgeClass = 'badge badge-occupied';
                if (res.status === 'Cancelled') badgeClass = 'badge badge-cancelled';

                return (
                  <tr key={res.id}>
                    <td>
                      <div className="guest-name-cell">{res.guestName}</div>
                      <div className="guest-contact-sub">
                        {res.phone} &bull; {res.email}
                      </div>
                    </td>
                    <td>
                      <div>{res.date}</div>
                      <div className="guest-contact-sub">{res.timeSlot}</div>
                    </td>
                    <td>
                      <span style={{ fontWeight: 600 }}>{res.partySize} Guests</span>
                    </td>
                    <td>
                      <span className="table-tag">{getTableName(res.tableId)}</span>
                    </td>
                    <td>{res.section}</td>
                    <td>
                      <span className={badgeClass}>{res.status}</span>
                    </td>
                    <td style={{ maxWidth: '200px' }}>
                      <span className="guest-contact-sub">{res.notes || 'None'}</span>
                    </td>
                    <td>
                      <div className="action-btn-group">
                        {res.status === 'Confirmed' && (
                          <>
                            <button
                              type="button"
                              className="btn btn-primary btn-sm"
                              onClick={() => onSeatReservation(res.id, res.tableId, res.guestName)}
                              title="Seat this party at the table"
                            >
                              Seat
                            </button>
                            <button
                              type="button"
                              className="btn btn-danger btn-sm"
                              onClick={() => onCancelReservation(res.id, res.tableId)}
                              title="Cancel reservation"
                            >
                              Cancel
                            </button>
                          </>
                        )}

                        {res.status === 'Seated' && (
                          <button
                            type="button"
                            className="btn btn-secondary btn-sm"
                            onClick={() => onCompleteReservation(res.id, res.tableId)}
                            title="Complete dining and free up table"
                          >
                            Complete
                          </button>
                        )}

                        {(res.status === 'Completed' || res.status === 'Cancelled') && (
                          <span className="guest-contact-sub">Archived</span>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center', padding: '36px', color: '#64748b' }}>
                  No reservations match the search criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

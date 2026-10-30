import React from 'react';
import { TableIcon, UsersIcon, CalendarIcon, ClockIcon } from './Icons';
import './StatsOverview.css';

export default function StatsOverview({ tables, reservations }) {
  // Demonstration of JavaScript Array Operations: filter and reduce
  const totalTables = tables.length;
  
  // Array filter to segment tables by status
  const availableTables = tables.filter((table) => table.status === 'Available').length;
  const reservedTables = tables.filter((table) => table.status === 'Reserved').length;
  const occupiedTables = tables.filter((table) => table.status === 'Occupied').length;

  // Array reduce to calculate total restaurant guest capacity
  const totalCapacity = tables.reduce((acc, table) => acc + table.capacity, 0);

  // Array reduce to calculate currently seated guest capacity
  const currentlySeatedGuests = tables
    .filter((table) => table.status === 'Occupied')
    .reduce((acc, table) => acc + table.capacity, 0);

  // Array reduce on reservations for confirmed party size
  const upcomingGuests = reservations
    .filter((res) => res.status === 'Confirmed')
    .reduce((acc, res) => acc + res.partySize, 0);

  // Occupancy rate calculation
  const occupancyPercentage = totalTables > 0 
    ? Math.round((occupiedTables / totalTables) * 100) 
    : 0;

  return (
    <section className="stats-grid" aria-label="Restaurant Operational Metrics">
      {/* Total Tables Card */}
      <div className="stat-card">
        <div className="stat-icon-wrapper icon-tables">
          <TableIcon size={20} />
        </div>
        <div className="stat-content">
          <span className="stat-label">Total Tables</span>
          <div className="stat-value-row">
            <span className="stat-value">{totalTables}</span>
            <span className="stat-subtext">Cap: {totalCapacity} guests</span>
          </div>
        </div>
      </div>

      {/* Available Tables Card */}
      <div className="stat-card">
        <div className="stat-icon-wrapper icon-available">
          <ClockIcon size={20} />
        </div>
        <div className="stat-content">
          <span className="stat-label">Available Tables</span>
          <div className="stat-value-row">
            <span className="stat-value text-available">{availableTables}</span>
            <span className="stat-subtext">Ready to seat</span>
          </div>
        </div>
      </div>

      {/* Occupied / Seated Card */}
      <div className="stat-card">
        <div className="stat-icon-wrapper icon-occupied">
          <UsersIcon size={20} />
        </div>
        <div className="stat-content">
          <span className="stat-label">Occupied Tables</span>
          <div className="stat-value-row">
            <span className="stat-value text-occupied">{occupiedTables}</span>
            <span className="stat-subtext">{currentlySeatedGuests} seated ({occupancyPercentage}%)</span>
          </div>
        </div>
      </div>

      {/* Active Reservations Card */}
      <div className="stat-card">
        <div className="stat-icon-wrapper icon-reserved">
          <CalendarIcon size={20} />
        </div>
        <div className="stat-content">
          <span className="stat-label">Active Bookings</span>
          <div className="stat-value-row">
            <span className="stat-value text-reserved">{reservedTables}</span>
            <span className="stat-subtext">{upcomingGuests} incoming guests</span>
          </div>
        </div>
      </div>
    </section>
  );
}

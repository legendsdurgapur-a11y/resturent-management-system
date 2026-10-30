import React, { useState } from 'react';
import { XIcon, UsersIcon, ClockIcon, CheckIcon } from './Icons';

export default function TableModal({
  table,
  onClose,
  onUpdateStatus
}) {
  const [walkInName, setWalkInName] = useState('');
  const [walkInGuests, setWalkInGuests] = useState(2);

  if (!table) return null;

  const handleSeatWalkIn = (e) => {
    e.preventDefault();
    if (!walkInName.trim()) return;
    onUpdateStatus(table.id, 'Occupied', `${walkInName.trim()} (${walkInGuests}p)`, 'Just now');
    onClose();
  };

  const handleVacate = () => {
    onUpdateStatus(table.id, 'Available', null, null);
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        zIndex: 50
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          width: '100%',
          maxWidth: '480px',
          padding: '24px',
          boxShadow: '0 20px 25px -5px rgba(15, 23, 42, 0.1)',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-brand-primary)' }}>
              {table.name} Details
            </h3>
            <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
              {table.section} &bull; Capacity: {table.capacity} guests
            </span>
          </div>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={onClose}
            style={{ padding: '4px 8px' }}
          >
            <XIcon size={16} />
          </button>
        </div>

        {/* Current State Info */}
        <div style={{ padding: '14px', backgroundColor: 'var(--color-bg-subtle)', borderRadius: '8px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>Current Status:</span>
            <span className={`badge ${
              table.status === 'Available' ? 'badge-available' :
              table.status === 'Reserved' ? 'badge-reserved' : 'badge-occupied'
            }`}>
              {table.status}
            </span>
          </div>
          {table.currentGuest && (
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>Guest / Party:</span>
              <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{table.currentGuest}</span>
            </div>
          )}
          {table.seatedAt && (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>Seated Time:</span>
              <span style={{ fontSize: '0.875rem' }}>{table.seatedAt}</span>
            </div>
          )}
        </div>

        {/* Actions depending on status */}
        {table.status === 'Available' && (
          <form onSubmit={handleSeatWalkIn}>
            <h4 style={{ fontSize: '0.9375rem', fontWeight: 600, marginBottom: '10px' }}>
              Seat Immediate Walk-in Guest
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
              <input
                type="text"
                className="form-control"
                placeholder="Guest name (e.g. Liam Foster)"
                value={walkInName}
                onChange={(e) => setWalkInName(e.target.value)}
                required
              />
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <label style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', whiteSpace: 'nowrap' }}>
                  Party Size:
                </label>
                <select
                  className="form-control"
                  value={walkInGuests}
                  onChange={(e) => setWalkInGuests(Number(e.target.value))}
                >
                  {Array.from({ length: table.capacity }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                  ))}
                </select>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Close
              </button>
              <button type="submit" className="btn btn-primary">
                Seat Party Now
              </button>
            </div>
          </form>
        )}

        {table.status === 'Occupied' && (
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
            <button type="button" className="btn btn-danger" onClick={handleVacate}>
              Vacate &amp; Mark Available
            </button>
          </div>
        )}

        {table.status === 'Reserved' && (
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleVacate}
            >
              Clear Reservation
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                onUpdateStatus(table.id, 'Occupied', table.currentGuest, 'Just now');
                onClose();
              }}
            >
              Seat Reserved Guest
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

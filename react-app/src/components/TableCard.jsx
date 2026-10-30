import React from 'react';
import styles from './TableCard.module.css';
import { UsersIcon, CheckIcon, XIcon, ClockIcon } from './Icons';

/**
 * Reusable Functional Component: TableCard
 * Demonstrates:
 * 1. CSS Modules for scoped component styling
 * 2. Dynamic inline styles for status-driven visuals
 * 3. Conditional rendering based on table state
 */
export default function TableCard({
  table,
  onStatusChange,
  onSelectTable,
  onQuickSeat
}) {
  const { id, name, capacity, shape, section, status, currentGuest, seatedAt } = table;

  // Determine CSS Module class dynamically
  let statusClass = styles.statusAvailable;
  let badgeClass = 'badge badge-available';
  let visualBg = '#ecfdf5';
  let visualBorder = '#059669';

  if (status === 'Reserved') {
    statusClass = styles.statusReserved;
    badgeClass = 'badge badge-reserved';
    visualBg = '#fffbeb';
    visualBorder = '#d97706';
  } else if (status === 'Occupied') {
    statusClass = styles.statusOccupied;
    badgeClass = 'badge badge-occupied';
    visualBg = '#eff6ff';
    visualBorder = '#1e40af';
  }

  // Dynamic inline style object: Technique 2 of Styling
  const tableVisualInlineStyle = {
    backgroundColor: visualBg,
    borderColor: visualBorder,
    color: visualBorder
  };

  return (
    <article className={`${styles.tableCard} ${statusClass}`}>
      {/* Card Header */}
      <div className={styles.cardHeader}>
        <div>
          <span className={styles.tableName}>{name}</span>
          <span className={styles.sectionBadge}>{section}</span>
        </div>
        <span className={badgeClass}>{status}</span>
      </div>

      {/* Visual Table Geometry */}
      <div className={styles.visualRepresentation}>
        <div
          className={shape === 'round' ? styles.roundTable : styles.rectTable}
          style={tableVisualInlineStyle}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <UsersIcon size={14} />
            <span>{capacity} Seats</span>
          </div>
        </div>
      </div>

      {/* Guest Status / Context Area */}
      <div className={styles.guestInfoBox}>
        {status === 'Occupied' ? (
          <div>
            <div className={styles.guestName}>{currentGuest || 'Seated Guest'}</div>
            <div className={styles.guestDetail}>
              <ClockIcon size={12} className="inline-icon" /> Seated at {seatedAt || 'Recently'}
            </div>
          </div>
        ) : status === 'Reserved' ? (
          <div>
            <div className={styles.guestName}>{currentGuest || 'Reserved Guest'}</div>
            <div className={styles.guestDetail}>Awaiting arrival</div>
          </div>
        ) : (
          <div>
            <div className={styles.guestName} style={{ color: '#059669' }}>
              Ready for Seating
            </div>
            <div className={styles.guestDetail}>Max capacity: {capacity} guests</div>
          </div>
        )}
      </div>

      {/* Card Actions: Quick Status Changes */}
      <div className={styles.cardActions}>
        {status === 'Available' && (
          <button
            type="button"
            className={`${styles.actionBtn} ${styles.actionBtnPrimary}`}
            onClick={() => onQuickSeat(table)}
          >
            Seat Walk-In
          </button>
        )}

        {status === 'Reserved' && (
          <>
            <button
              type="button"
              className={`${styles.actionBtn} ${styles.actionBtnPrimary}`}
              onClick={() => onStatusChange(id, 'Occupied', currentGuest, 'Just now')}
            >
              Seat Party
            </button>
            <button
              type="button"
              className={`${styles.actionBtn} ${styles.actionBtnVacate}`}
              onClick={() => onStatusChange(id, 'Available', null, null)}
              title="Cancel / Free Table"
            >
              Clear
            </button>
          </>
        )}

        {status === 'Occupied' && (
          <button
            type="button"
            className={`${styles.actionBtn} ${styles.actionBtnVacate}`}
            onClick={() => onStatusChange(id, 'Available', null, null)}
          >
            Vacate Table
          </button>
        )}

        <button
          type="button"
          className={styles.actionBtn}
          onClick={() => onSelectTable(table)}
          title="View Table Details"
        >
          Details
        </button>
      </div>
    </article>
  );
}

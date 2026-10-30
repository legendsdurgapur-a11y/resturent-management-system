import React, { useState, useMemo } from 'react';
import TableCard from './TableCard';
import StatsOverview from './StatsOverview';
import styles from './FloorPlan.module.css';
import { SECTIONS } from '../data/mockData';
import { RefreshIcon } from './Icons';

/**
 * FloorPlan Component:
 * Core interactive view managing dining rooms, availability filters,
 * and quick table updates.
 */
export default function FloorPlan({
  tables,
  reservations,
  onUpdateTableStatus,
  onSelectTable,
  onQuickSeat,
  onResetData
}) {
  // State management with React Hooks
  const [selectedSection, setSelectedSection] = useState('All Sections');
  const [statusFilter, setStatusFilter] = useState('All');

  // Integration of JavaScript Array Operations: Array.filter() with useMemo
  const filteredTables = useMemo(() => {
    return tables.filter((table) => {
      // 1. Filter by section
      const matchesSection =
        selectedSection === 'All Sections' || table.section === selectedSection;

      // 2. Filter by status
      const matchesStatus =
        statusFilter === 'All' || table.status === statusFilter;

      return matchesSection && matchesStatus;
    });
  }, [tables, selectedSection, statusFilter]);

  const statusOptions = ['All', 'Available', 'Reserved', 'Occupied'];

  return (
    <div className={styles.floorPlanRoot}>
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Table Floorplan &amp; Live Availability</h1>
          <p className="page-subtitle">
            Real-time visual table management across restaurant dining zones
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={onResetData}
            title="Reset tables and reservations to default mock state"
          >
            <RefreshIcon size={14} />
            <span>Reset Demo Data</span>
          </button>
        </div>
      </div>

      {/* Operational Stats: demonstrates reduce and filter */}
      <StatsOverview tables={tables} reservations={reservations} />

      {/* Interactive Controls Bar: Filter by Section and Status */}
      <div className={styles.controlsBar}>
        {/* Section Tabs using JavaScript Array.map() */}
        <div className={styles.sectionTabs} role="tablist" aria-label="Dining Sections">
          {SECTIONS.map((section) => (
            <button
              key={section}
              type="button"
              role="tab"
              aria-selected={selectedSection === section}
              className={`${styles.sectionTab} ${
                selectedSection === section ? styles.sectionTabActive : ''
              }`}
              onClick={() => setSelectedSection(section)}
            >
              {section}
            </button>
          ))}
        </div>

        {/* Status Filter Buttons using Array.map() */}
        <div className={styles.statusFilterGroup}>
          <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
            Status:
          </span>
          {statusOptions.map((opt) => (
            <button
              key={opt}
              type="button"
              className={`${styles.statusFilterBtn} ${
                statusFilter === opt ? styles.statusFilterBtnActive : ''
              }`}
              onClick={() => setStatusFilter(opt)}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Tables Grid rendered via JavaScript Array.map() */}
      {filteredTables.length > 0 ? (
        <div className={styles.tablesGrid}>
          {filteredTables.map((table) => (
            <TableCard
              key={table.id}
              table={table}
              onStatusChange={onUpdateTableStatus}
              onSelectTable={onSelectTable}
              onQuickSeat={onQuickSeat}
            />
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <p className={styles.emptyTitle}>No tables match current filter criteria</p>
          <p>
            Try selecting a different dining section or resetting the status filter.
          </p>
        </div>
      )}
    </div>
  );
}

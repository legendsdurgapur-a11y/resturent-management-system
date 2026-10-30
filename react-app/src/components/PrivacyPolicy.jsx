import React from 'react';
import { ShieldIcon } from './Icons';

export default function PrivacyPolicy() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '16px 0' }}>
      <div className="page-header">
        <div>
          <h1 className="page-title" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShieldIcon size={24} />
            <span>Privacy Policy</span>
          </h1>
          <p className="page-subtitle">
            Effective Date: October 30, 2026. BistroFlow Restaurant Reservation and Table Management System.
          </p>
        </div>
      </div>

      <div style={{ backgroundColor: '#ffffff', border: '1px solid var(--color-border)', borderRadius: '12px', padding: '28px', lineHeight: '1.7', color: 'var(--color-text-muted)' }}>
        <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '8px' }}>
          1. Information We Collect
        </h2>
        <p style={{ marginBottom: '16px' }}>
          BistroFlow collects customer reservation data including guest name, telephone number, email address, party size, dining preferences, and dietary restrictions solely to manage restaurant seating, confirm bookings, and optimize table turnover.
        </p>

        <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '8px' }}>
          2. How We Use Reservation Information
        </h2>
        <p style={{ marginBottom: '16px' }}>
          Data collected is utilized exclusively for operational restaurant logistics: assigning dining tables, tracking table availability in real-time, verifying reservations upon guest arrival, and accommodating special dietary requests.
        </p>

        <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '8px' }}>
          3. Local Storage and Data Persistence
        </h2>
        <p style={{ marginBottom: '16px' }}>
          This system stores operational state locally within your browser storage (localStorage) to allow offline table management and session persistence. We do not sell or monetize guest contact information.
        </p>

        <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '8px' }}>
          4. Contact Operations
        </h2>
        <p>
          For questions regarding table reservations or guest data management, contact the restaurant management desk at operations@bistroflow.local.
        </p>
      </div>
    </div>
  );
}

import React from 'react';
import { FileTextIcon } from './Icons';

export default function TermsOfService() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '16px 0' }}>
      <div className="page-header">
        <div>
          <h1 className="page-title" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FileTextIcon size={24} />
            <span>Terms of Service</span>
          </h1>
          <p className="page-subtitle">
            Effective Date: October 30, 2026. Standard Dining and Table Management Conditions.
          </p>
        </div>
      </div>

      <div style={{ backgroundColor: '#ffffff', border: '1px solid var(--color-border)', borderRadius: '12px', padding: '28px', lineHeight: '1.7', color: 'var(--color-text-muted)' }}>
        <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '8px' }}>
          1. Reservation Hold Policy
        </h2>
        <p style={{ marginBottom: '16px' }}>
          Confirmed reservations are held for up to 15 minutes past the scheduled seating time. If the party has not arrived within this grace window, the assigned table may be released to waiting walk-in guests.
        </p>

        <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '8px' }}>
          2. Table Assignments and Section Requests
        </h2>
        <p style={{ marginBottom: '16px' }}>
          While our system endeavors to honor specific table and dining section requests (such as Patio, Indoor, or VIP Booths), assignments remain subject to dining room flow and weather conditions for outdoor areas.
        </p>

        <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '8px' }}>
          3. Cancellations and Modifications
        </h2>
        <p style={{ marginBottom: '16px' }}>
          Guests may modify or cancel reservations through the host desk or reservation portal up to 2 hours prior to the booked seating slot without penalty.
        </p>

        <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '8px' }}>
          4. Operational Responsibility
        </h2>
        <p>
          Restaurant management reserves the right to manage seating allocation to preserve service safety and emergency egress compliance across all dining sections.
        </p>
      </div>
    </div>
  );
}

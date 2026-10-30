import React from 'react';
import { NavLink } from 'react-router-dom';
import { TableIcon, CalendarIcon, PlusIcon, CodeIcon, LayersIcon } from './Icons';
import './Navbar.css';

export default function Navbar({ activeReservationCount, availableTableCount }) {
  return (
    <header className="navbar-root">
      <div className="navbar-container">
        {/* Brand Logo & Name */}
        <NavLink to="/" className="navbar-brand">
          <div className="brand-icon-box">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 2v20" />
              <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
              <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
              <path d="M7 2v20" />
            </svg>
          </div>
          <div>
            <span className="brand-title">BistroFlow</span>
            <span className="brand-subtitle">Table &amp; Reservation Management</span>
          </div>
        </NavLink>

        {/* Primary Navigation Links */}
        <nav className="navbar-links" aria-label="Main Navigation">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
          >
            <TableIcon size={16} />
            <span>Floor Plan &amp; Tables</span>
            <span className="nav-counter count-available" title="Available Tables">
              {availableTableCount}
            </span>
          </NavLink>

          <NavLink
            to="/reservations"
            className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
          >
            <CalendarIcon size={16} />
            <span>Reservations</span>
            <span className="nav-counter count-reserved" title="Active Reservations">
              {activeReservationCount}
            </span>
          </NavLink>

          <NavLink
            to="/new-reservation"
            className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
          >
            <PlusIcon size={16} />
            <span>Book Table</span>
          </NavLink>

          <NavLink
            to="/html-to-jsx"
            className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
          >
            <CodeIcon size={16} />
            <span>HTML-to-JSX Guide</span>
          </NavLink>

          <NavLink
            to="/angular-version"
            className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
          >
            <LayersIcon size={16} />
            <span>Angular Comparison</span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

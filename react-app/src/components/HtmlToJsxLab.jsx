import React, { useState } from 'react';
import { CodeIcon, CheckIcon, ChevronRightIcon } from './Icons';
import './HtmlToJsxLab.css';

export default function HtmlToJsxLab() {
  const [inputHtml, setInputHtml] = useState(
`<div class="reservation-card" id="table-card">
  <!-- Restaurant Table Card Example -->
  <h3 class="table-title">Table 04</h3>
  <label for="guest-input">Guest Name:</label>
  <input type="text" class="form-input" id="guest-input" placeholder="Enter name">
  <button onclick="seatParty()" style="background-color: #0f172a; color: white;">
    Seat Party
  </button>
  <img src="/patio-view.jpg" alt="Patio view">
</div>`
  );

  // HTML to JSX Conversion algorithm
  const convertHtmlToJsx = (htmlString) => {
    let converted = htmlString;

    // 1. Replace class= with className=
    converted = converted.replace(/class=/g, 'className=');

    // 2. Replace for= with htmlFor=
    converted = converted.replace(/for=/g, 'htmlFor=');

    // 3. Replace onclick, onchange, etc. with camelCase
    converted = converted.replace(/onclick=/g, 'onClick=');
    converted = converted.replace(/onchange=/g, 'onChange=');
    converted = converted.replace(/onsubmit=/g, 'onSubmit=');

    // 4. Convert HTML comments <!-- ... --> to JSX {/* ... */}
    converted = converted.replace(/<!--([\s\S]*?)-->/g, '{/*$1*/}');

    // 5. Ensure void tags self-close (input, img, hr, br)
    converted = converted.replace(/<input([^>]*?[^\/])>/g, '<input$1 />');
    converted = converted.replace(/<img([^>]*?[^\/])>/g, '<img$1 />');
    converted = converted.replace(/<br>/g, '<br />');
    converted = converted.replace(/<hr>/g, '<hr />');

    // 6. Inline style string conversion notice or basic style transform
    converted = converted.replace(/style="([^"]*)"/g, (match, styleContent) => {
      const declarations = styleContent.split(';').filter((s) => s.trim().length > 0);
      const styleObj = declarations.map((decl) => {
        const [prop, val] = decl.split(':');
        if (!prop || !val) return '';
        // Convert kebab-case property to camelCase
        const camelProp = prop.trim().replace(/-([a-z])/g, (g) => g[1].toUpperCase());
        return `${camelProp}: '${val.trim()}'`;
      }).filter(Boolean).join(', ');
      return `style={{ ${styleObj} }}`;
    });

    return converted;
  };

  const outputJsx = convertHtmlToJsx(inputHtml);

  return (
    <div className="lab-root">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">HTML to JSX Conversion Lab</h1>
          <p className="page-subtitle">
            Core differences between traditional HTML and React JSX syntax
          </p>
        </div>
      </div>

      {/* Conversion Rules Grid */}
      <div className="lab-rules-grid">
        <div className="rule-card">
          <div className="rule-title">
            <span className="code-pill">className</span> vs <span className="code-pill">class</span>
          </div>
          <p className="rule-desc">
            In JavaScript, 'class' is a reserved keyword. React JSX uses 'className' to define CSS classes on elements.
          </p>
          <div style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: 'var(--color-text-muted)' }}>
            HTML: &lt;div class="card"&gt;<br />
            JSX: &lt;div className="card"&gt;
          </div>
        </div>

        <div className="rule-card">
          <div className="rule-title">
            <span className="code-pill">htmlFor</span> vs <span className="code-pill">for</span>
          </div>
          <p className="rule-desc">
            'for' is reserved for JavaScript loops. In JSX form labels, use 'htmlFor' to associate a label with an input ID.
          </p>
          <div style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: 'var(--color-text-muted)' }}>
            HTML: &lt;label for="name"&gt;<br />
            JSX: &lt;label htmlFor="name"&gt;
          </div>
        </div>

        <div className="rule-card">
          <div className="rule-title">
            <span className="code-pill">&lt;input /&gt;</span> Self-Closing Tags
          </div>
          <p className="rule-desc">
            In JSX, all void tags (input, img, br, hr) must be explicitly self-closed with a trailing slash.
          </p>
          <div style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: 'var(--color-text-muted)' }}>
            HTML: &lt;input type="text"&gt;<br />
            JSX: &lt;input type="text" /&gt;
          </div>
        </div>

        <div className="rule-card">
          <div className="rule-title">
            <span className="code-pill">style={`{{ ... }}`}</span> Objects
          </div>
          <p className="rule-desc">
            Inline styles in JSX are JavaScript objects written in camelCase (e.g. backgroundColor) instead of kebab strings.
          </p>
          <div style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: 'var(--color-text-muted)' }}>
            HTML: style="margin-top: 10px;"<br />
            JSX: style={`{{ marginTop: '10px' }}`}
          </div>
        </div>
      </div>

      {/* Side-by-Side Restaurant Component Example */}
      <div className="comparison-box">
        <div>
          <div className="code-column-header header-html">Standard HTML (Static Markup)</div>
          <pre className="code-pre">{`<!-- Static Restaurant Table Card in HTML -->
<div class="table-card occupied" id="table-1">
  <div class="header">
    <span class="title">Table 1</span>
    <span class="badge">Occupied</span>
  </div>
  <div class="info">
    <p>Capacity: 4 Guests</p>
    <p>Guest: Alexander Smith</p>
  </div>
  <button class="btn" onclick="vacateTable(1)">
    Vacate Table
  </button>
</div>`}</pre>
        </div>

        <div>
          <div className="code-column-header header-jsx">React JSX (Reusable Functional Component)</div>
          <pre className="code-pre">{`// Reusable Functional Component in React JSX
export default function TableCard({ table, onVacate }) {
  return (
    <div className={\`table-card \${table.status.toLowerCase()}\`}>
      <div className="header">
        <span className="title">{table.name}</span>
        <span className="badge">{table.status}</span>
      </div>
      <div className="info">
        <p>Capacity: {table.capacity} Guests</p>
        <p>Guest: {table.currentGuest || 'None'}</p>
      </div>
      <button 
        className="btn" 
        onClick={() => onVacate(table.id)}
      >
        Vacate Table
      </button>
    </div>
  );
}`}</pre>
        </div>
      </div>

      {/* Interactive Converter Tool */}
      <div className="interactive-converter-box">
        <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-brand-primary)' }}>
          Interactive HTML to JSX Live Converter
        </h2>
        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
          Paste any HTML snippet below to see automatic transformation to JSX syntax
        </p>

        <div className="converter-grid">
          <div>
            <label style={{ fontSize: '0.8125rem', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
              Input HTML:
            </label>
            <textarea
              className="converter-textarea"
              value={inputHtml}
              onChange={(e) => setInputHtml(e.target.value)}
              placeholder="Paste HTML here..."
            />
          </div>

          <div>
            <label style={{ fontSize: '0.8125rem', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
              Output JSX:
            </label>
            <textarea
              className="converter-textarea"
              value={outputJsx}
              readOnly
              style={{ backgroundColor: '#0f172a', color: '#f8fafc', borderColor: '#334155' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

import { Link } from 'react-router-dom';
import { useState } from 'react';
import './Header.css';

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="header">
      <Link to="/" className="logo">EdGenAI</Link>
      <button
        className="menu-toggle"
        onClick={() => setOpen((v) => !v)}
        aria-label="Toggle menu"
      >
        ☰
      </button>
      <nav className={`nav ${open ? 'open' : ''}`}>
        <div className="nav-item">
          <button className="nav-link">Why EdGenAI</button>
          <div className="dropdown">
            <a href="/#mission">Mission</a>
            <a href="/#how">How We Work</a>
            <a href="/#principles">AI Principles</a>
          </div>
        </div>
        <div className="nav-item">
          <button className="nav-link">Our Services</button>
          <div className="dropdown">
            <Link to="/services#consultancy">GenAI Consultancy</Link>
            <Link to="/services#content-design">Content Design</Link>
            <Link to="/services#authentic">Authentic Assessment</Link>
          </div>
        </div>
        <div className="nav-item">
          <button className="nav-link">Our Products</button>
          <div className="dropdown">
            <Link to="/products#auto-grade">Auto Grade</Link>
            <Link to="/products#plan-my-assignments">Plan My Assignment</Link>
          </div>
        </div>
        <div className="nav-item">
          <button className="nav-link">Success Stories</button>
          <div className="dropdown">
            <a href="/#case-studies">Case Studies</a>
            <a href="/#testimonials">Testimonials</a>
          </div>
        </div>
        <Link to="/contact" className="nav-link">Contact Us</Link>
        <Link to="/request-access" className="request-button">
          Request Access
        </Link>
      </nav>
    </header>
  );
}

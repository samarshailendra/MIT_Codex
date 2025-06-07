import { Link } from 'react-router-dom';
import { useState } from 'react';
import './Header.css';

export default function Header() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMenus = () => setOpenMenu(null);

  return (
    <header className="header" onMouseLeave={closeMenus}>
      <Link to="/" className="logo">
        EdGenAI
      </Link>

      <button
        className="hamburger"
        onClick={() => setMobileOpen((o) => !o)}
        aria-label="Toggle menu"
      >
        <span />
        <span />
        <span />
      </button>

      <nav className={`nav ${mobileOpen ? 'open' : ''}`}>
        <Link to="/" className="nav-link" onClick={closeMenus}>
          Home
        </Link>
        <div
          className="nav-item"
          onMouseEnter={() => setOpenMenu('why')}
        >
          <span className="nav-link">Why EdGenAI</span>
          <div className={`dropdown ${openMenu === 'why' ? 'open' : ''}`}>
            <Link to="/mission">Mission</Link>
            <Link to="/how-we-work">How We Work</Link>
            <Link to="/ai-principles">AI Principles</Link>
          </div>
        </div>

        <div
          className="nav-item"
          onMouseEnter={() => setOpenMenu('services')}
        >
          <Link to="/services" className="nav-link">
            Our Services
          </Link>
          <div className={`dropdown ${openMenu === 'services' ? 'open' : ''}`}>
            <Link to="/services#consultancy">GenAI Consultancy</Link>
            <Link to="/services#content-design">Content Design</Link>
            <Link to="/services#course-design">Course Design</Link>
          </div>
        </div>

        <div
          className="nav-item"
          onMouseEnter={() => setOpenMenu('products')}
        >
          <Link to="/products" className="nav-link">
            Our Products
          </Link>
          <div className={`dropdown ${openMenu === 'products' ? 'open' : ''}`}>
            <Link to="/products#auto-grade">Auto Grade</Link>
            <Link to="/products#plan-my-assignments">Plan My Assignment</Link>
          </div>
        </div>

        <div
          className="nav-item"
          onMouseEnter={() => setOpenMenu('success')}
        >
          <span className="nav-link">Success Stories</span>
          <div className={`dropdown ${openMenu === 'success' ? 'open' : ''}`}>
            <Link to="/case-studies">Case Studies</Link>
            <Link to="/testimonials">Testimonials</Link>
          </div>
        </div>

        <Link to="/contact" className="nav-link">
          Contact Us
        </Link>

        <Link to="/request-access" className="request-button">
          Request Access
        </Link>
      </nav>
    </header>
  );
}

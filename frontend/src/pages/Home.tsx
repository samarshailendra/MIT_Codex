import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  return (
    <div className="container home">
      <section className="hero">
        <h1>Empowering Education with Generative AI</h1>
        <p>Auto Grade, Plan My Assignments, and Expert Consultancy to Transform Learning.</p>
        <div className="actions">
          <Link to="/products" className="btn-primary">Explore Products</Link>
          <Link to="/request-access" className="btn-primary">Request Access</Link>
        </div>
      </section>

      <section className="intro">
        <p className="lead">
          We combine cutting‑edge AI with proven pedagogy to streamline grading
          and assignment planning while keeping instructors in the loop.
        </p>
      </section>
      <section className="services">
        <h2>Our Services</h2>
        <ul className="grid">
          <li><Link to="/services#consultancy">GenAI Consultancy</Link></li>
          <li><Link to="/services#content-design">Content Design</Link></li>
          <li><Link to="/services#authentic">Authentic Assignment Design</Link></li>
          <li><Link to="/services#course-design">Course Design</Link></li>
        </ul>
      </section>

      <section className="home-products">
        <h2>Our Products</h2>
        <ul className="grid">
          <li><Link to="/products#auto-grade">Auto Grade</Link></li>
          <li><Link to="/products#plan-my-assignments">Plan My Assignments</Link></li>
        </ul>
      </section>

      <section className="why">
        <h2>Why Choose EdGenAI?</h2>
        <ul className="grid">
          <li>AI for Authentic Learning</li>
          <li>Transparent &amp; Modular</li>
          <li>API-first architecture</li>
          <li>Privacy &amp; Security Focus</li>
        </ul>
      </section>

      <section className="cta">
        <h3>Ready to Transform Learning?</h3>
        <Link to="/request-access" className="btn-primary">Request Access</Link>
      </section>
    </div>
  );
}

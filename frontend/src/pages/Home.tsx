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

      <section className="offerings">
        <h2>Our Offerings</h2>
        <ul className="grid">
          <li>GenAI Consultancy</li>
          <li>Content Design</li>
          <li>Authentic Assignment Design</li>
          <li>Course Design</li>
          <li>Auto Grade</li>
          <li>Plan My Assignments</li>
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

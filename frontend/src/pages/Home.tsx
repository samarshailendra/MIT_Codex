import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  return (
    <div className="container home">
      <section className="hero">
        <h1>Empowering Education with Generative AI</h1>
        <p className="subtitle">
          Auto Grade, Plan My Assignment, and GenAI Consultancy to Transform
          Learning
        </p>
        <div className="actions">
          <Link to="/services" className="btn-primary">Explore Services</Link>
          <Link to="/products" className="btn-primary">Explore Products</Link>
        </div>
      </section>
      <section className="services">
        <h2>Our Services</h2>
        <div className="offerings">
          <Link to="/services#consultancy" className="card">
            <h3>GenAI Consultancy</h3>
            <ul>
              <li>Content Design</li>
              <li>Authentic Assessment Design</li>
              <li>Course Design</li>
            </ul>
          </Link>
        </div>
      </section>

      <section className="home-products">
        <h2>Our Products</h2>
        <div className="offerings">
          <Link to="/products#auto-grade" className="card">
            <h3>Auto Grade</h3>
          </Link>
          <Link to="/products#plan-my-assignments" className="card">
            <h3>Plan My Assignment</h3>
          </Link>
        </div>
      </section>

      <section className="why">
        <h2>Why Choose EdGenAI?</h2>
        <ul className="grid">
          <li>GenAI for Authentic Learning</li>
          <li>Transparency &amp; Modular</li>
          <li>Privacy &amp; Security Focus</li>
        </ul>
      </section>

      <section className="success">
        <h2>Success Stories</h2>
        <div className="logos">
          <div className="logo-placeholder">University A</div>
          <div className="logo-placeholder">College B</div>
        </div>
      </section>

      <section className="demo">
        <h2>Platform Demo</h2>
        <div className="video-placeholder" />
      </section>

      <section className="cta">
        <h3>Ready to Transform Learning?</h3>
        <Link to="/request-access" className="btn-primary">Request Access</Link>
      </section>
    </div>
  );
}

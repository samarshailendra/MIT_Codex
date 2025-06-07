import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  return (
    <div className="home-page">
      <section className="hero container">
        <h1>Empowering Education with Generative AI</h1>
        <p>
          Auto Grade, Plan My Assignment, and GenAI Consultancy to Transform
          Learning
        </p>
        <div className="hero-actions">
          <Link to="/services" className="btn-primary">
            Explore Services
          </Link>
          <Link to="/products" className="btn-primary">
            Explore Products
          </Link>
        </div>
      </section>

      <section className="services-section container">
        <h2>Our Services</h2>
        <div className="cards">
          <div className="card">
            <h3>GenAI Consultancy</h3>
            <ul>
              <li>Content Design</li>
              <li>Authentic Assessment Design</li>
              <li>Course Design</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="products-section container">
        <h2>Our Products</h2>
        <div className="cards">
          <div className="card">
            <h3>Auto Grade</h3>
          </div>
          <div className="card">
            <h3>Plan My Assignment</h3>
          </div>
        </div>
      </section>

      <section className="why-section container">
        <h2>Why Choose EdGenAI?</h2>
        <div className="cards">
          <div className="card">GenAI for Authentic Learning</div>
          <div className="card">Transparency and Modular</div>
          <div className="card">Privacy and Security Focus</div>
        </div>
      </section>

      <section className="success-section container">
        <h2>Success Stories</h2>
        <div className="testimonials">Logos / Testimonials Placeholder</div>
      </section>
    </div>
  );
}

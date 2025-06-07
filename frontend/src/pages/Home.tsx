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

      <section className="services-section container page-section">
        <h2>Our Services</h2>
        <div className="cards service-cards">
          <Link to="/services#consultancy" className="card link-card">
            <h3>GenAI Consultancy</h3>
          </Link>
          <Link to="/services#content-design" className="card link-card">
            <h3>Content Design</h3>
          </Link>
          <Link to="/services#authentic" className="card link-card">
            <h3>Authentic Assessment Design</h3>
          </Link>
          <Link to="/services#course-design" className="card link-card">
            <h3>Course Design</h3>
          </Link>
        </div>
      </section>

      <section className="products-section container page-section">
        <h2>Our Products</h2>
        <div className="cards">
          <Link to="/products#auto-grade" className="card link-card">
            <h3>Auto Grade</h3>
          </Link>
          <Link to="/products#plan-my-assignments" className="card link-card">
            <h3>Plan My Assignment</h3>
          </Link>
        </div>
      </section>

      <section className="why-section container page-section">
        <h2>Why Choose EdGenAI?</h2>
        <div className="cards">
          <Link to="/why-edgenai#mission" className="card link-card">
            GenAI for Authentic Learning
          </Link>
          <Link to="/why-edgenai#how-we-work" className="card link-card">
            Transparency and Modular
          </Link>
          <Link to="/why-edgenai#ai-principles" className="card link-card">
            Privacy and Security Focus
          </Link>
        </div>
      </section>

      <section className="success-section container page-section">
        <h2>Success Stories</h2>
        <Link to="/success-stories" className="testimonials link-card">
          Logos / Testimonials Placeholder
        </Link>
      </section>
    </div>
  );
}

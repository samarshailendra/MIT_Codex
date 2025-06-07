import { Link } from 'react-router-dom';
import './Products.css';

export default function Products() {
  return (
    <div className="container products">
      <h1>Our Products</h1>
      <p className="subtitle">Purpose-built AI tools for modern education.</p>

      <section id="auto-grade" className="product page-section">
        <h2>Auto Grade</h2>
        <ul>
          <li>AI-powered grading</li>
          <li>Custom rubrics</li>
          <li>Batch processing</li>
          <li>Transparent feedback</li>
        </ul>
        <div className="video-placeholder">Demo Video</div>
        <Link to="/request-access" className="btn-primary">Request Access</Link>
      </section>

      <section id="plan-my-assignments" className="product page-section">
        <h2>Plan My Assignments</h2>
        <ul>
          <li>Assignment planning</li>
          <li>Learning outcome mapping</li>
          <li>AI-generated scaffolding</li>
        </ul>
        <div className="video-placeholder">Demo Video</div>
        <Link to="/request-access" className="btn-primary">Request Access</Link>
      </section>
    </div>
  );
}

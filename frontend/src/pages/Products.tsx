import { Link } from 'react-router-dom';
import './Products.css';

export default function Products() {
  return (
    <div className="container products">
      <h1>Our Products</h1>
      <p className="subtitle">Purpose-built AI tools for modern education.</p>

      <section id="auto-grade" className="product">
        <h2>Auto Grade</h2>
        <ul>
          <li>AI-powered grading</li>
          <li>Custom rubrics</li>
          <li>Batch processing</li>
          <li>Transparent feedback</li>
        </ul>
        <Link to="/request-access" className="btn-primary">Request Access</Link>
      </section>

      <section id="plan-my-assignments" className="product">
        <h2>Plan My Assignments</h2>
        <ul>
          <li>Assignment planning</li>
          <li>Learning outcome mapping</li>
          <li>AI-generated scaffolding</li>
        </ul>
        <Link to="/request-access" className="btn-primary">Request Access</Link>
      </section>

      <section className="product-demos">
        <h2>Product Demos</h2>
        <div className="demo-grid">
          <div className="video-placeholder">Auto Grade Demo 1</div>
          <div className="video-placeholder">Auto Grade Demo 2</div>
          <div className="video-placeholder">Plan My Assignment Demo 1</div>
          <div className="video-placeholder">Plan My Assignment Demo 2</div>
        </div>
      </section>
    </div>
  );
}

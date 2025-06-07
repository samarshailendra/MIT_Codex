import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <nav className="footer-links">
        <a href="/">Home</a>
        <a href="/services">Services</a>
        <a href="/products">Products</a>
        <a href="/contact">Contact Us</a>
        <a href="/privacy">Privacy Policy</a>
      </nav>
      <div className="social">
        <a href="#" aria-label="LinkedIn">in</a>
        <a href="#" aria-label="Twitter">t</a>
      </div>
      <p>&copy; {new Date().getFullYear()} EdGenAI</p>
    </footer>
  );
}

import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-links">
        <a href="/">Home</a>
        <a href="/services">Services</a>
        <a href="/products">Products</a>
        <a href="/contact">Contact Us</a>
        <a href="/privacy">Privacy Policy</a>
      </div>
      <div className="footer-social">
        <a href="https://linkedin.com" aria-label="LinkedIn">
          LinkedIn
        </a>
        <a href="https://twitter.com" aria-label="Twitter">
          Twitter
        </a>
      </div>
      <p className="copyright">&copy; {new Date().getFullYear()} EdGenAI</p>
    </footer>
  );
}

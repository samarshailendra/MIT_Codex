import { Link } from 'react-router-dom';
import './Header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="logo">EdGenAI</div>
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/contact">Contact Us</Link>
      </nav>
      <Link to="/request-access" className="request-button">
        Request Access
      </Link>
    </header>
  );
}

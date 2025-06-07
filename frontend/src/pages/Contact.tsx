import { useState } from 'react';
import './Contact.css';

export default function Contact() {
  const [status, setStatus] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('Sending...');
    setTimeout(() => {
      setStatus('Message sent!');
    }, 500);
  };

  return (
    <div className="container contact">
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit} className="contact-form">
        <input type="text" name="name" placeholder="Name" required />
        <input type="email" name="email" placeholder="Email" required />
        <textarea name="message" placeholder="Message" rows={5} required />
        <button className="btn-primary" type="submit">Submit</button>
      </form>
      {status && <p className="status">{status}</p>}
    </div>
  );
}

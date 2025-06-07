import { useState } from 'react';
import './RequestAccess.css';

export default function RequestAccess() {
  const [status, setStatus] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value
    };
    setStatus('Sending request...');
    // Dummy API call
    setTimeout(() => {
      console.log('Send to API', data);
      setStatus('Thanks! We\'ll contact you shortly.');
      form.reset();
    }, 500);
  };

  return (
    <div className="container request-access">
      <h1>Request Access</h1>
      <form onSubmit={handleSubmit} className="access-form">
        <input name="name" type="text" placeholder="Name" required />
        <input name="email" type="email" placeholder="Email" required />
        <input name="phone" type="tel" placeholder="Phone (optional)" />
        <button type="submit" className="btn-primary">Submit</button>
      </form>
      {status && <p className="status">{status}</p>}
    </div>
  );
}

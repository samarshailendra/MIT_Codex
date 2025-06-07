import './Services.css';

export default function Services() {
  return (
    <div className="container services">
      <h1>Our Services</h1>
      <section id="consultancy" className="service">
        <h2>GenAI Consultancy</h2>
        <p>Expert guidance on integrating generative AI into your institution.</p>
      </section>
      <section id="content-design" className="service">
        <h2>Content Design</h2>
        <p>Engaging learning materials crafted with AI-powered tools.</p>
      </section>
      <section id="authentic" className="service">
        <h2>Authentic Assignment Design</h2>
        <p>Assignments that promote creativity and deeper learning.</p>
      </section>
      <section id="course-design" className="service">
        <h2>Course Design</h2>
        <p>Turnkey course solutions built with AI-driven insights.</p>
      </section>
    </div>
  );
}

import Layout from '../components/Layout';
import Link from 'next/link';

export default function Services() {
  return (
    <Layout>
      <h1>Our Services</h1>
      <ul>
        <li>
          <Link href="/autograder">Auto Grader</Link>
        </li>
        <li>
          <Link href="/project-planner">Project Planner</Link>
        </li>
      </ul>
    </Layout>
  );
}

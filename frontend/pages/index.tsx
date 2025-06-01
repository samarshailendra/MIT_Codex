import Layout from '../components/Layout';
import Link from 'next/link';

export default function Home() {
  return (
    <Layout>
      <h1>Welcome to EdGenAI</h1>
      <p>
        At EdGenAI we harness Generative AI to transform the learning experience
        for both students and instructors.
      </p>
      <p>
        Our flagship <strong>Auto Grader</strong> automates the grading workflow,
        providing consistent and detailed feedback within minutes. Simply upload
        your assignment files and let our models handle the rest.
      </p>
      <p>
        Explore our <Link href="/services">services</Link> to learn more about
        what we offer.
      </p>
    </Layout>
  );
}

import Layout from '../components/Layout';
import Link from 'next/link';

export default function Home() {
  return (
    <Layout>
      <h1>Welcome to EdGenAI</h1>
      <p>
        EdGenAI's Auto Grader leverages Generative AI to streamline the grading
        process. Upload your assignments and let our models provide fast and
        consistent feedback for every submission.
      </p>
      <p>
        Explore our <Link href="/services">services</Link> to learn more about
        what we offer.
      </p>
    </Layout>
  );
}

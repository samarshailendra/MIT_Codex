import styles from './page.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className={styles.wrapper}>
      <section className={styles.hero}>
        <h2 className={styles.title}>Autograder Research Project</h2>
        <p className={styles.subtitle}>Leveraging AI for automated assessment</p>
        <Link href="/demo" className={styles.cta}>Register for Demo</Link>
      </section>

      <section className={styles.videos}>
        <h3>Demo Videos</h3>
        <div className={styles.videoGrid}>
          <div className={styles.videoWrapper}>
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Demo 1"
              allowFullScreen
            ></iframe>
          </div>
          <div className={styles.videoWrapper}>
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Demo 2"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      <section className={styles.publications}>
        <h3>Featured Publications</h3>
        <div className={styles.cardGrid}>
          <div className={styles.card}>
            <Image src="https://via.placeholder.com/300x180" alt="Pub 1" width={300} height={180} />
            <h4>Publication Title 1</h4>
            <p>Short description for the publication.</p>
            <Link href="/publications">Read More</Link>
          </div>
          <div className={styles.card}>
            <Image src="https://via.placeholder.com/300x180" alt="Pub 2" width={300} height={180} />
            <h4>Publication Title 2</h4>
            <p>Short description for the publication.</p>
            <Link href="/publications">Read More</Link>
          </div>
          <div className={styles.card}>
            <Image src="https://via.placeholder.com/300x180" alt="Pub 3" width={300} height={180} />
            <h4>Publication Title 3</h4>
            <p>Short description for the publication.</p>
            <Link href="/publications">Read More</Link>
          </div>
        </div>
      </section>

      <section className={styles.blogs}>
        <h3>Latest Blog Posts</h3>
        <div className={styles.blogList}>
          <article>
            <h4>Blog Post 1</h4>
            <p>Brief summary of the blog post.</p>
          </article>
          <article>
            <h4>Blog Post 2</h4>
            <p>Brief summary of the blog post.</p>
          </article>
          <article>
            <h4>Blog Post 3</h4>
            <p>Brief summary of the blog post.</p>
          </article>
        </div>
        <Link href="/blog" className={styles.blogLink}>View all posts</Link>
      </section>

      <section className={styles.demoCall}>
        <Link href="/demo" className={styles.demoButton}>Try Demo</Link>
      </section>
    </div>
  );
}

import { Link } from 'react-router-dom'
import Logo from '../components/Logo'
import '../styles/tokens.css'
import styles from './Blog.module.css'

const posts = [
  {
    slug: 'closing-the-gap',
    category: 'Personal Essay',
    categoryClass: 'personal',
    title: 'Closing the Gap',
    subtitle: '"He\'s sober right now.. it might be a good chance to tell him how you feel."',
    excerpt: 'On addiction, judgment, and the harder love that keeps people alive.',
    author: 'Britne D Link',
    readTime: '14 min read',
    featured: true,
  },
  {
    slug: '#',
    category: 'Recovery',
    categoryClass: 'recovery',
    title: 'The Part No One Tells You About Getting Sober',
    excerpt: 'Recovery looks like clarity from the outside. From the inside, the first months feel like learning to exist in a body you\'ve been avoiding for years.',
    author: 'Britne D Link',
    readTime: '9 min',
    featured: false,
  },
  {
    slug: '#',
    category: 'Systems',
    categoryClass: 'systems',
    title: 'When the System Was Never Built for You',
    excerpt: 'Navigating VA claims, benefits bureaucracy, and institutions designed for a different person than the one standing in front of them.',
    author: 'Britne D Link',
    readTime: '11 min',
    featured: false,
  },
  {
    slug: '#',
    category: 'Personal Essay',
    categoryClass: 'personal',
    title: 'Single Motherhood Is a Country with No Map',
    excerpt: 'Nobody hands you coordinates when you become a family of one. This is what the first year actually looks like — and what nobody prepared me for.',
    author: 'Britne D Link',
    readTime: '7 min',
    featured: false,
  },
]

const featured = posts.find(p => p.featured)
const grid = posts.filter(p => !p.featured)

export default function Blog() {
  return (
    <div className={styles.page}>
      <section className={styles.blogSection}>
        <div className={styles.blogHeader}>
          <div className={styles.blogHeaderLeft}>
            <div className={styles.sectionLabel}>Field Notes &amp; Essays</div>
            <h2 className={styles.sectionTitle}>The <em>Blog</em></h2>
          </div>
          <div className={styles.filterRow}>
            {['All', 'Personal Essay', 'Recovery', 'Systems', 'Grief'].map(tag => (
              <button key={tag} className={`${styles.filterTag} ${tag === 'All' ? styles.active : ''}`}>
                {tag}
              </button>
            ))}
          </div>
        </div>

        <Link to={`/blog/${featured.slug}`} className={styles.featuredCard}>
          <div className={styles.featuredBody}>
            <div>
              <div className={`${styles.articleCategory} ${styles[featured.categoryClass]}`}>
                {featured.category}
              </div>
              <h3 className={styles.featuredTitle}>
                Closing<br />the <em>Gap</em>
              </h3>
              <p className={styles.featuredSubtitle}>{featured.subtitle}</p>
            </div>
            <div className={styles.metaRow}>
              <span className={styles.author}>{featured.author}</span>
              <span className={styles.metaDot} />
              <span className={styles.readTime}>{featured.readTime}</span>
              <span className={styles.readCta}>Read →</span>
            </div>
          </div>
          <div className={styles.featuredVisual}>
            <Logo variant="dark" size={96} />
            <div className={styles.visualDivider} />
            <p className={styles.visualPull}>{featured.excerpt}</p>
          </div>
        </Link>

        <div className={styles.grid}>
          {grid.map(post => (
            <Link key={post.title} to={post.slug.startsWith('#') ? '#' : `/blog/${post.slug}`} className={styles.card}>
              <div>
                <div className={`${styles.cardCategory} ${styles[post.categoryClass]}`}>{post.category}</div>
                <h4 className={styles.cardTitle}>{post.title}</h4>
                <p className={styles.cardExcerpt}>{post.excerpt}</p>
              </div>
              <div className={styles.cardBottom}>
                <span className={styles.cardMeta}>{post.author} · {post.readTime}</span>
                <span className={styles.cardArrow}>→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

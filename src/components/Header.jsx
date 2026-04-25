import { Link } from 'react-router-dom'
import Logo from './Logo'
import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.brand}>
          <Logo variant="light" size={56} />
          <div className={styles.wordmark}>
            <span className={styles.wordmarkTitle}>The Missing</span>
            <span className={styles.wordmarkTitle}>Guides</span>
            <span className={styles.tagline}>
              The comprehensive guides life forgot to include.
            </span>
          </div>
        </Link>

        <nav className={styles.nav}>
          <Link to="/blog" className={styles.navLink}>Blog</Link>
          <Link to="/about" className={styles.navLink}>About</Link>
        </nav>
      </div>
    </header>
  )
}

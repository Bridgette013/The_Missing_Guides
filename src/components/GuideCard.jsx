import { Link } from 'react-router-dom'
import styles from './GuideCard.module.css'

export default function GuideCard({ guide }) {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>
        The Missing Guide to<br />{guide.title}
      </h3>
      <span className={styles.substance}>{guide.substance}</span>
      <p className={styles.description}>{guide.description}</p>
      <div className={styles.price}>${guide.price}</div>
      <Link to={`/guide/${guide.id}`} className={styles.cta}>
        Get This Guide
      </Link>
    </div>
  )
}

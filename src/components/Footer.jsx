import { Link } from 'react-router-dom'
import Logo from './Logo'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>

        {/* Brand */}
        <div className={styles.brandCol}>
          <div className={styles.brandMark}>
            <Logo variant="dark" size={40} />
            <span className={styles.brandName}>The Missing Guides</span>
          </div>
          <p className={styles.brandTagline}>
            The comprehensive guides life forgot to include.
          </p>
        </div>

        {/* Legal */}
        <div>
          <h4 className={styles.colHeading}>Legal</h4>
          <ul className={styles.linkList}>
            <li><Link to="/terms" className={styles.footerLink}>Terms of Service</Link></li>
            <li><Link to="/privacy" className={styles.footerLink}>Privacy Policy</Link></li>
            <li><Link to="/refund" className={styles.footerLink}>Refund Policy</Link></li>
            <li><Link to="/disclaimer" className={styles.footerLink}>Medical Disclaimer</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className={styles.colHeading}>Support</h4>
          <p className={styles.muted}>Email: admin@vvvdigitals.com</p>
          <p className={styles.muted}>Response time: Within 48 hours</p>
        </div>

        {/* Emergency */}
        <div>
          <h4 className={`${styles.colHeading} ${styles.emergencyHeading}`}>
            Emergency Resources
          </h4>
          <p className={styles.muted}><strong>Emergency:</strong> 911</p>
          <p className={styles.muted}><strong>Suicide Prevention:</strong> 988</p>
          <p className={styles.muted}>
            <strong>SAMHSA Helpline:</strong><br />1-800-662-4357
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={styles.bottomBar}>
        <p className={styles.copyright}>
          &copy; 2026 VVV Digitals LLC. All rights reserved.
        </p>
        <p className={styles.disclaimer}>
          TheMissingGuides.com &middot; Not medical advice. Always consult healthcare professionals.
        </p>
      </div>
    </footer>
  )
}

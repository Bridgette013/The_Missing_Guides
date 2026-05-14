import styles from './LegalLayout.module.css'

/**
 * Cross-brand legal page body. Pages keep their own <Header /> and
 * <Footer /> imports — LegalLayout only owns the article surface so the
 * site chrome stays brand-themed while the legal copy lives in a
 * palette-pure namespace (--legal-*).
 *
 * Designed to be cloneable to sibling repos (VVV Digitals) with only
 * verbiage diffs.
 *
 * Props:
 *   title          — page title (h1)
 *   effectiveDate  — "Effective Date: ..." subtitle (optional)
 *   children       — body content; use plain h2/h3/p/ul. Cascading
 *                    rules in LegalLayout.module.css style them.
 *   lastUpdated    — footer "Last Updated: ..." (optional)
 *   entity         — footer entity line, e.g. "VVV Digitals LLC • The
 *                    Missing Guides" (optional)
 */
export default function LegalLayout({
  title,
  effectiveDate,
  children,
  lastUpdated,
  entity,
}) {
  return (
    <div className={styles.shell}>
      <article className={styles.article}>
        <h1 className={styles.title}>{title}</h1>
        {effectiveDate && (
          <p className={styles.effectiveDate}>Effective Date: {effectiveDate}</p>
        )}
        <div className={styles.body}>{children}</div>
        {(lastUpdated || entity) && (
          <div className={styles.footer}>
            {lastUpdated && <p>Last Updated: {lastUpdated}</p>}
            {entity && <p>{entity}</p>}
          </div>
        )}
      </article>
    </div>
  )
}

export const legalStyles = styles

import Header from '../components/Header'
import Footer from '../components/Footer'
import LegalLayout, { legalStyles } from '../components/LegalLayout'

export default function Refund() {
  return (
    <div>
      <Header />
      <LegalLayout
        title="Refund Policy"
        effectiveDate="January 27, 2026"
        lastUpdated="January 27, 2026"
        entity="VVV Digitals LLC • The Missing Guides"
      >
        <aside className={legalStyles.callout}>
          <h2>Our Policy: All Sales Are Final</h2>
          <p>Due to the immediate delivery and personalized nature of our digital guides.</p>
        </aside>

        <h2>Why No Refunds?</h2>
        <ul>
          <li><strong>Instant Personalization:</strong> Your guide is customized the moment you purchase. We cannot "un-personalize" a delivered digital product.</li>
          <li><strong>Immediate Delivery:</strong> You receive the complete 200-page guide instantly with immediate access to all content.</li>
          <li><strong>Contains Private Information:</strong> The guide includes your personal information throughout.</li>
        </ul>

        <h2>Exceptions - We'll Make It Right</h2>
        <p>While sales are final, we're not unreasonable. We'll issue refunds for:</p>

        <div className={legalStyles.subSurface}>
          <h3>Technical Issues:</h3>
          <ul>
            <li>Unable to download due to our system error</li>
            <li>Corrupted or defective file that won't open</li>
            <li>Guide not delivered within 24 hours</li>
          </ul>
        </div>

        <div className={legalStyles.subSurface}>
          <h3>Our Mistakes:</h3>
          <ul>
            <li>Charged you twice by error</li>
            <li>Misleading information on our site</li>
            <li>Significant personalization errors (wrong names throughout)</li>
          </ul>
        </div>

        <div className={legalStyles.subSurface}>
          <h3>Duplicate Purchases:</h3>
          <p>Accidentally purchased same guide twice - must contact us within 48 hours.</p>
        </div>

        <h2>What We Cannot Refund</h2>
        <ul>
          <li>"I changed my mind" - after downloading</li>
          <li>"I didn't read it" - you received what you purchased</li>
          <li>"It wasn't what I expected" - review product description before purchase</li>
          <li>"I found free information online" - our value is comprehensive organization</li>
          <li>"My situation changed" - life circumstances after purchase</li>
        </ul>

        <h2>Before You Purchase - Make Sure</h2>
        <p>To avoid disappointment:</p>
        <ul>
          <li>Review the product description carefully</li>
          <li>Verify you're selecting the correct guide</li>
          <li>Check your email for delivery (including spam folder)</li>
          <li>Contact support BEFORE purchasing if you have questions</li>
        </ul>

        <h2>How to Request a Refund</h2>
        <p>If you believe you qualify for a refund:</p>
        <ol>
          <li>Email: admin@vvvdigitals.com</li>
          <li>Subject line: "Refund Request - [Your Name]"</li>
          <li>Include: Order number, reason, description of issue</li>
        </ol>
        <p>
          <strong>Response Time:</strong> We respond within 48 hours. Approved refunds processed within 5-7 business days to original payment method.
        </p>

        <aside className={legalStyles.callout}>
          <h3>Our Commitment</h3>
          <p>
            While we maintain a no-refund policy for legitimate digital product reasons, we're committed to delivering quality products, accurate personalization, technical support, fair treatment, and responsive service. If something's wrong, let us know and we'll work to fix it.
          </p>
        </aside>
      </LegalLayout>
      <Footer />
    </div>
  )
}

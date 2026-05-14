import Header from '../components/Header'
import Footer from '../components/Footer'
import LegalLayout, { legalStyles } from '../components/LegalLayout'

export default function Privacy() {
  return (
    <div>
      <Header />
      <LegalLayout
        title="Privacy Policy"
        effectiveDate="January 27, 2026"
        lastUpdated="January 27, 2026"
        entity="VVV Digitals LLC • The Missing Guides"
      >
        <p>
          VVV Digitals LLC ("we," "us," "our") operates TheMissingGuides.com. This Privacy Policy explains how we collect, use, and protect your personal information.
        </p>

        <h2>1. Information We Collect</h2>
        <p><strong>Information You Provide:</strong></p>
        <ul>
          <li>Your name (caregiver)</li>
          <li>Loved one's name (patient)</li>
          <li>Email address (for delivery)</li>
          <li>Relationship (e.g., mother, partner, friend)</li>
          <li>Pronoun preferences</li>
          <li>Optional information (hospital name, emergency contact)</li>
        </ul>
        <p><strong>Payment Information:</strong></p>
        <ul>
          <li>Processed by Stripe (our payment processor)</li>
          <li>We DO NOT store credit card information</li>
          <li>Stripe handles all payment data securely</li>
        </ul>
        <p><strong>Automatically Collected:</strong></p>
        <ul>
          <li>IP address</li>
          <li>Browser type and version</li>
          <li>Pages visited on our site</li>
          <li>Time and date of visits</li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <p><strong>Primary Purpose - Guide Personalization:</strong></p>
        <ul>
          <li>Customize your guide with names, pronouns, and relationships</li>
          <li>Generate a personalized 200-page PDF</li>
          <li>Deliver your guide via email</li>
        </ul>
        <p><strong>What We DON'T Do:</strong></p>
        <ul>
          <li>Sell your information to third parties</li>
          <li>Share sensitive details with anyone</li>
          <li>Send marketing emails (unless you opt-in)</li>
          <li>Use your data for advertising</li>
        </ul>

        <h2>3. How We Share Your Information</h2>
        <p><strong>Service Providers:</strong></p>
        <ul>
          <li><strong>Stripe</strong> - Payment processing</li>
          <li><strong>SendGrid</strong> - Email delivery (email address only)</li>
          <li><strong>Netlify</strong> - Hosting (technical data only)</li>
        </ul>
        <p><strong>We Never Share:</strong></p>
        <ul>
          <li>Patient names with third parties</li>
          <li>Relationship details with anyone</li>
          <li>Sensitive personal information</li>
        </ul>

        <h2>4. Data Security</h2>
        <ul>
          <li><strong>Encryption:</strong> SSL/TLS encryption for all data transmission</li>
          <li><strong>Secure hosting:</strong> Netlify's secure infrastructure</li>
          <li><strong>Payment security:</strong> PCI-compliant through Stripe</li>
          <li><strong>No storage:</strong> Personalized data not stored long-term</li>
        </ul>

        <h2>5. Your Rights</h2>
        <p><strong>You Have the Right To:</strong></p>
        <ul>
          <li>Access - Request a copy of your data</li>
          <li>Correction - Update inaccurate information</li>
          <li>Deletion - Request removal of your data</li>
          <li>Portability - Receive your data in usable format</li>
        </ul>

        <h2>6. Contact Us</h2>
        <p><strong>Questions about your privacy?</strong></p>
        <p>Email: admin@vvvdigitals.com</p>
        <p>Business: VVV Digitals LLC</p>
        <p>Response Time: Within 72 hours</p>

        <aside className={legalStyles.callout}>
          <h3>Our Commitment to Privacy</h3>
          <p>
            We understand the sensitive nature of addiction recovery. Your privacy and your loved one's privacy are paramount. We collect only what's necessary to personalize your guide and will never share sensitive details.
          </p>
          <p><strong>You trusted us with your story. We take that seriously.</strong></p>
        </aside>
      </LegalLayout>
      <Footer />
    </div>
  )
}

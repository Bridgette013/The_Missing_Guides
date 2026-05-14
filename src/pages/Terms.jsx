import Header from '../components/Header'
import Footer from '../components/Footer'
import LegalLayout from '../components/LegalLayout'

export default function Terms() {
  return (
    <div>
      <Header />
      <LegalLayout
        title="Terms of Service"
        effectiveDate="January 27, 2026"
        lastUpdated="January 27, 2026"
        entity="VVV Digitals LLC • The Missing Guides"
      >
        <p>
          Welcome to The Missing Guides, operated by VVV Digitals LLC ("we," "us," "our"). By accessing or using TheMissingGuides.com, you agree to these Terms of Service.
        </p>

        <h2>1. Acceptance of Terms</h2>
        <p>
          By purchasing or accessing our guides, you agree to be bound by these Terms. If you do not agree, do not use our services.
        </p>

        <h2>2. Services Provided</h2>
        <p>
          We provide personalized digital guides for families navigating addiction treatment. Guides are delivered as downloadable PDF files after purchase.
        </p>
        <p><strong>What You Get:</strong></p>
        <ul>
          <li>Personalized 200-page guide customized with your information</li>
          <li>Immediate download access after payment</li>
          <li>Email delivery of your guide</li>
          <li>One-time purchase (not a subscription)</li>
        </ul>

        <h2>3. Personalization &amp; Use</h2>
        <p><strong>Permitted Use:</strong></p>
        <ul>
          <li>Personal use only</li>
          <li>One family/household per purchase</li>
          <li>You may print your guide</li>
          <li>You may save digital copies for personal backup</li>
        </ul>
        <p><strong>Prohibited Use:</strong></p>
        <ul>
          <li>No resale or commercial distribution</li>
          <li>No sharing with others outside your household</li>
          <li>No reproduction for distribution</li>
          <li>No modification and republication</li>
        </ul>

        <h2>4. Pricing &amp; Payment</h2>
        <p><strong>Current Pricing:</strong></p>
        <ul>
          <li>Individual Guides: $97 USD each</li>
          <li>Complete Bundle: $297 USD (all 5 guides)</li>
        </ul>
        <p>
          Payment is processed securely through Stripe. One-time payment with no recurring charges. Prices subject to change (existing purchases honored).
        </p>

        <h2>5. Refund Policy</h2>
        <p>
          Due to the immediate delivery and personalized nature of our guides, <strong>all sales are final</strong>.
        </p>
        <p><strong>Exceptions:</strong></p>
        <ul>
          <li>Technical issues preventing download</li>
          <li>Defective/corrupted files - we'll resend at no charge</li>
          <li>Duplicate purchases - contact us within 48 hours</li>
        </ul>

        <h2>6. Disclaimer of Warranties</h2>
        <p>
          <strong>THE GUIDES ARE PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND.</strong> Our guides are educational resources, not medical advice. Always consult qualified healthcare professionals for medical decisions. See full Medical Disclaimer.
        </p>

        <h2>7. Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by law, VVV Digitals LLC is not liable for decisions made based on guide content, medical outcomes, or indirect damages.
        </p>
        <p>
          <strong>Maximum Liability:</strong> Our total liability shall not exceed the amount you paid for the guide.
        </p>

        <h2>8. Contact</h2>
        <p><strong>Questions or concerns?</strong></p>
        <p>Email: admin@vvvdigitals.com</p>
        <p>Business: VVV Digitals LLC</p>
        <p>Website: TheMissingGuides.com</p>
      </LegalLayout>
      <Footer />
    </div>
  )
}

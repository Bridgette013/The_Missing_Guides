import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Terms() {
  return (
    <div>
      <Header />
      <div style={{
        maxWidth: '900px',
        margin: '60px auto',
        padding: '0 20px',
        fontFamily: 'Inter, sans-serif',
        lineHeight: 1.8,
        color: '#20201D'
      }}>
        <h1 style={{
          fontFamily: '"Merriweather", serif',
          fontSize: '42px',
          color: '#2529A7',
          marginBottom: '20px'
        }}>
          Terms of Service
        </h1>
        
        <p style={{ color: '#8E8E8B', marginBottom: '40px' }}>
          Effective Date: January 27, 2026
        </p>

        <p style={{ marginBottom: '30px' }}>
          Welcome to The Missing Guides, operated by VVV Digitals LLC ("we," "us," "our"). By accessing or using TheMissingGuides.com, you agree to these Terms of Service.
        </p>

        <h2 style={{ fontSize: '28px', fontFamily: '"Merriweather", serif', color: '#2529A7', marginTop: '40px', marginBottom: '20px' }}>
          1. Acceptance of Terms
        </h2>
        <p style={{ marginBottom: '30px' }}>
          By purchasing or accessing our guides, you agree to be bound by these Terms. If you do not agree, do not use our services.
        </p>

        <h2 style={{ fontSize: '28px', fontFamily: '"Merriweather", serif', color: '#2529A7', marginTop: '40px', marginBottom: '20px' }}>
          2. Services Provided
        </h2>
        <p style={{ marginBottom: '20px' }}>
          We provide personalized digital guides for families navigating addiction treatment. Guides are delivered as downloadable PDF files after purchase.
        </p>
        <p style={{ marginBottom: '15px', fontWeight: 600 }}>What You Get:</p>
        <ul style={{ marginBottom: '30px', paddingLeft: '30px' }}>
          <li style={{ marginBottom: '10px' }}>Personalized 200-page guide customized with your information</li>
          <li style={{ marginBottom: '10px' }}>Immediate download access after payment</li>
          <li style={{ marginBottom: '10px' }}>Email delivery of your guide</li>
          <li style={{ marginBottom: '10px' }}>One-time purchase (not a subscription)</li>
        </ul>

        <h2 style={{ fontSize: '28px', fontFamily: '"Merriweather", serif', color: '#2529A7', marginTop: '40px', marginBottom: '20px' }}>
          3. Personalization & Use
        </h2>
        <p style={{ marginBottom: '15px', fontWeight: 600 }}>Permitted Use:</p>
        <ul style={{ marginBottom: '20px', paddingLeft: '30px' }}>
          <li style={{ marginBottom: '10px' }}>Personal use only</li>
          <li style={{ marginBottom: '10px' }}>One family/household per purchase</li>
          <li style={{ marginBottom: '10px' }}>You may print your guide</li>
          <li style={{ marginBottom: '10px' }}>You may save digital copies for personal backup</li>
        </ul>
        <p style={{ marginBottom: '15px', fontWeight: 600 }}>Prohibited Use:</p>
        <ul style={{ marginBottom: '30px', paddingLeft: '30px' }}>
          <li style={{ marginBottom: '10px' }}>No resale or commercial distribution</li>
          <li style={{ marginBottom: '10px' }}>No sharing with others outside your household</li>
          <li style={{ marginBottom: '10px' }}>No reproduction for distribution</li>
          <li style={{ marginBottom: '10px' }}>No modification and republication</li>
        </ul>

        <h2 style={{ fontSize: '28px', fontFamily: '"Merriweather", serif', color: '#2529A7', marginTop: '40px', marginBottom: '20px' }}>
          4. Pricing & Payment
        </h2>
        <p style={{ marginBottom: '15px' }}>
          <strong>Current Pricing:</strong>
        </p>
        <ul style={{ marginBottom: '20px', paddingLeft: '30px' }}>
          <li style={{ marginBottom: '10px' }}>Individual Guides: $97 USD each</li>
          <li style={{ marginBottom: '10px' }}>Complete Bundle: $397 USD (all 5 guides)</li>
        </ul>
        <p style={{ marginBottom: '30px' }}>
          Payment is processed securely through Stripe. One-time payment with no recurring charges. Prices subject to change (existing purchases honored).
        </p>

        <h2 style={{ fontSize: '28px', fontFamily: '"Merriweather", serif', color: '#2529A7', marginTop: '40px', marginBottom: '20px' }}>
          5. Refund Policy
        </h2>
        <p style={{ marginBottom: '20px' }}>
          Due to the immediate delivery and personalized nature of our guides, <strong>all sales are final</strong>.
        </p>
        <p style={{ marginBottom: '15px', fontWeight: 600 }}>Exceptions:</p>
        <ul style={{ marginBottom: '30px', paddingLeft: '30px' }}>
          <li style={{ marginBottom: '10px' }}>Technical issues preventing download</li>
          <li style={{ marginBottom: '10px' }}>Defective/corrupted files - we'll resend at no charge</li>
          <li style={{ marginBottom: '10px' }}>Duplicate purchases - contact us within 48 hours</li>
        </ul>

        <h2 style={{ fontSize: '28px', fontFamily: '"Merriweather", serif', color: '#2529A7', marginTop: '40px', marginBottom: '20px' }}>
          6. Disclaimer of Warranties
        </h2>
        <p style={{ marginBottom: '30px' }}>
          <strong>THE GUIDES ARE PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND.</strong> Our guides are educational resources, not medical advice. Always consult qualified healthcare professionals for medical decisions. See full Medical Disclaimer.
        </p>

        <h2 style={{ fontSize: '28px', fontFamily: '"Merriweather", serif', color: '#2529A7', marginTop: '40px', marginBottom: '20px' }}>
          7. Limitation of Liability
        </h2>
        <p style={{ marginBottom: '20px' }}>
          To the maximum extent permitted by law, VVV Digitals LLC is not liable for decisions made based on guide content, medical outcomes, or indirect damages.
        </p>
        <p style={{ marginBottom: '30px' }}>
          <strong>Maximum Liability:</strong> Our total liability shall not exceed the amount you paid for the guide.
        </p>

        <h2 style={{ fontSize: '28px', fontFamily: '"Merriweather", serif', color: '#2529A7', marginTop: '40px', marginBottom: '20px' }}>
          8. Contact
        </h2>
        <p style={{ marginBottom: '10px' }}>
          <strong>Questions or concerns?</strong>
        </p>
        <p style={{ marginBottom: '10px' }}>Email: support@themissingguides.com</p>
        <p style={{ marginBottom: '10px' }}>Business: VVV Digitals LLC</p>
        <p style={{ marginBottom: '40px' }}>Website: TheMissingGuides.com</p>

        <div style={{
          borderTop: '2px solid #9A9DE7',
          paddingTop: '30px',
          marginTop: '60px',
          color: '#8E8E8B',
          fontSize: '14px'
        }}>
          <p>Last Updated: January 27, 2026</p>
          <p>VVV Digitals LLC • The Missing Guides</p>
        </div>
      </div>
      <Footer />
    </div>
  )
}

import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Privacy() {
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
          Privacy Policy
        </h1>
        
        <p style={{ color: '#8E8E8B', marginBottom: '40px' }}>
          Effective Date: January 27, 2026
        </p>

        <p style={{ marginBottom: '30px' }}>
          VVV Digitals LLC ("we," "us," "our") operates TheMissingGuides.com. This Privacy Policy explains how we collect, use, and protect your personal information.
        </p>

        <h2 style={{ fontSize: '28px', fontFamily: '"Merriweather", serif', color: '#2529A7', marginTop: '40px', marginBottom: '20px' }}>
          1. Information We Collect
        </h2>
        
        <p style={{ marginBottom: '15px', fontWeight: 600 }}>Information You Provide:</p>
        <ul style={{ marginBottom: '20px', paddingLeft: '30px' }}>
          <li style={{ marginBottom: '10px' }}>Your name (caregiver)</li>
          <li style={{ marginBottom: '10px' }}>Loved one's name (patient)</li>
          <li style={{ marginBottom: '10px' }}>Email address (for delivery)</li>
          <li style={{ marginBottom: '10px' }}>Relationship (e.g., mother, partner, friend)</li>
          <li style={{ marginBottom: '10px' }}>Pronoun preferences</li>
          <li style={{ marginBottom: '10px' }}>Optional information (hospital name, emergency contact)</li>
        </ul>

        <p style={{ marginBottom: '15px', fontWeight: 600 }}>Payment Information:</p>
        <ul style={{ marginBottom: '20px', paddingLeft: '30px' }}>
          <li style={{ marginBottom: '10px' }}>Processed by Stripe (our payment processor)</li>
          <li style={{ marginBottom: '10px' }}>We DO NOT store credit card information</li>
          <li style={{ marginBottom: '10px' }}>Stripe handles all payment data securely</li>
        </ul>

        <p style={{ marginBottom: '15px', fontWeight: 600 }}>Automatically Collected:</p>
        <ul style={{ marginBottom: '30px', paddingLeft: '30px' }}>
          <li style={{ marginBottom: '10px' }}>IP address</li>
          <li style={{ marginBottom: '10px' }}>Browser type and version</li>
          <li style={{ marginBottom: '10px' }}>Pages visited on our site</li>
          <li style={{ marginBottom: '10px' }}>Time and date of visits</li>
        </ul>

        <h2 style={{ fontSize: '28px', fontFamily: '"Merriweather", serif', color: '#2529A7', marginTop: '40px', marginBottom: '20px' }}>
          2. How We Use Your Information
        </h2>
        
        <p style={{ marginBottom: '15px', fontWeight: 600 }}>Primary Purpose - Guide Personalization:</p>
        <ul style={{ marginBottom: '20px', paddingLeft: '30px' }}>
          <li style={{ marginBottom: '10px' }}>Customize your guide with names, pronouns, and relationships</li>
          <li style={{ marginBottom: '10px' }}>Generate a personalized 200-page PDF</li>
          <li style={{ marginBottom: '10px' }}>Deliver your guide via email</li>
        </ul>

        <p style={{ marginBottom: '15px', fontWeight: 600 }}>What We DON'T Do:</p>
        <ul style={{ marginBottom: '30px', paddingLeft: '30px' }}>
          <li style={{ marginBottom: '10px' }}>❌ Sell your information to third parties</li>
          <li style={{ marginBottom: '10px' }}>❌ Share sensitive details with anyone</li>
          <li style={{ marginBottom: '10px' }}>❌ Send marketing emails (unless you opt-in)</li>
          <li style={{ marginBottom: '10px' }}>❌ Use your data for advertising</li>
        </ul>

        <h2 style={{ fontSize: '28px', fontFamily: '"Merriweather", serif', color: '#2529A7', marginTop: '40px', marginBottom: '20px' }}>
          3. How We Share Your Information
        </h2>
        
        <p style={{ marginBottom: '15px', fontWeight: 600 }}>Service Providers:</p>
        <ul style={{ marginBottom: '20px', paddingLeft: '30px' }}>
          <li style={{ marginBottom: '10px' }}><strong>Stripe</strong> - Payment processing</li>
          <li style={{ marginBottom: '10px' }}><strong>SendGrid</strong> - Email delivery (email address only)</li>
          <li style={{ marginBottom: '10px' }}><strong>Netlify</strong> - Hosting (technical data only)</li>
        </ul>

        <p style={{ marginBottom: '15px', fontWeight: 600 }}>We Never Share:</p>
        <ul style={{ marginBottom: '30px', paddingLeft: '30px' }}>
          <li style={{ marginBottom: '10px' }}>Patient names with third parties</li>
          <li style={{ marginBottom: '10px' }}>Relationship details with anyone</li>
          <li style={{ marginBottom: '10px' }}>Sensitive personal information</li>
        </ul>

        <h2 style={{ fontSize: '28px', fontFamily: '"Merriweather", serif', color: '#2529A7', marginTop: '40px', marginBottom: '20px' }}>
          4. Data Security
        </h2>
        <ul style={{ marginBottom: '30px', paddingLeft: '30px' }}>
          <li style={{ marginBottom: '10px' }}><strong>Encryption:</strong> SSL/TLS encryption for all data transmission</li>
          <li style={{ marginBottom: '10px' }}><strong>Secure hosting:</strong> Netlify's secure infrastructure</li>
          <li style={{ marginBottom: '10px' }}><strong>Payment security:</strong> PCI-compliant through Stripe</li>
          <li style={{ marginBottom: '10px' }}><strong>No storage:</strong> Personalized data not stored long-term</li>
        </ul>

        <h2 style={{ fontSize: '28px', fontFamily: '"Merriweather", serif', color: '#2529A7', marginTop: '40px', marginBottom: '20px' }}>
          5. Your Rights
        </h2>
        <p style={{ marginBottom: '15px', fontWeight: 600 }}>You Have the Right To:</p>
        <ul style={{ marginBottom: '30px', paddingLeft: '30px' }}>
          <li style={{ marginBottom: '10px' }}>Access - Request a copy of your data</li>
          <li style={{ marginBottom: '10px' }}>Correction - Update inaccurate information</li>
          <li style={{ marginBottom: '10px' }}>Deletion - Request removal of your data</li>
          <li style={{ marginBottom: '10px' }}>Portability - Receive your data in usable format</li>
        </ul>

        <h2 style={{ fontSize: '28px', fontFamily: '"Merriweather", serif', color: '#2529A7', marginTop: '40px', marginBottom: '20px' }}>
          6. Contact Us
        </h2>
        <p style={{ marginBottom: '10px' }}>
          <strong>Questions about your privacy?</strong>
        </p>
        <p style={{ marginBottom: '10px' }}>Email: support@themissingguides.com</p>
        <p style={{ marginBottom: '10px' }}>Business: VVV Digitals LLC</p>
        <p style={{ marginBottom: '40px' }}>Response Time: Within 72 hours</p>

        <div style={{
          background: '#F8F9FA',
          border: '2px solid #9A9DE7',
          borderRadius: '8px',
          padding: '30px',
          marginTop: '40px',
          marginBottom: '40px'
        }}>
          <h3 style={{ fontSize: '20px', fontFamily: '"Merriweather", serif', color: '#2529A7', marginBottom: '15px' }}>
            Our Commitment to Privacy
          </h3>
          <p style={{ margin: 0 }}>
            We understand the sensitive nature of addiction recovery. Your privacy and your loved one's privacy are paramount. We collect only what's necessary to personalize your guide and will never share sensitive details.
          </p>
          <p style={{ marginTop: '15px', marginBottom: 0, fontWeight: 600 }}>
            You trusted us with your story. We take that seriously.
          </p>
        </div>

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

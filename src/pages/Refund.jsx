import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Refund() {
  return (
    <div>
      <Header />
      <div style={{
        maxWidth: '900px',
        margin: '60px auto',
        padding: '40px 20px',
        fontFamily: 'Inter, sans-serif',
        lineHeight: 1.8,
        color: '#1a1a1a',
        background: '#FFFFFF'
      }}>
        <h1 style={{
          fontFamily: '"Merriweather", serif',
          fontSize: '42px',
          color: '#616BA5',
          marginBottom: '20px'
        }}>
          Refund Policy
        </h1>
        
        <p style={{ color: '#8E8E8B', marginBottom: '40px' }}>
          Effective Date: January 27, 2026
        </p>

        <div style={{
          background: '#F8F9FA',
          border: '3px solid #616BA5',
          borderRadius: '8px',
          padding: '30px',
          marginBottom: '40px',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: '32px',
            fontFamily: '"Merriweather", serif',
            color: '#616BA5',
            marginBottom: '15px'
          }}>
            Our Policy: All Sales Are Final
          </h2>
          <p style={{ fontSize: '18px', margin: 0 }}>
            Due to the immediate delivery and personalized nature of our digital guides
          </p>
        </div>

        <h2 style={{ fontSize: '28px', fontFamily: '"Merriweather", serif', color: '#616BA5', marginTop: '40px', marginBottom: '20px' }}>
          Why No Refunds?
        </h2>
        <ul style={{ marginBottom: '30px', paddingLeft: '30px' }}>
          <li style={{ marginBottom: '15px' }}>
            <strong>Instant Personalization:</strong> Your guide is customized the moment you purchase. We cannot "un-personalize" a delivered digital product.
          </li>
          <li style={{ marginBottom: '15px' }}>
            <strong>Immediate Delivery:</strong> You receive the complete 200-page guide instantly with immediate access to all content.
          </li>
          <li style={{ marginBottom: '15px' }}>
            <strong>Contains Private Information:</strong> The guide includes your personal information throughout.
          </li>
        </ul>

        <h2 style={{ fontSize: '28px', fontFamily: '"Merriweather", serif', color: '#616BA5', marginTop: '40px', marginBottom: '20px' }}>
          Exceptions - We'll Make It Right
        </h2>
        <p style={{ marginBottom: '20px' }}>
          While sales are final, we're not unreasonable. We'll issue refunds for:
        </p>

        <div style={{ background: '#F8F9FA', borderRadius: '8px', padding: '25px', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '15px' }}>Technical Issues:</h3>
          <ul style={{ paddingLeft: '25px', margin: 0 }}>
            <li style={{ marginBottom: '10px' }}>Unable to download due to our system error</li>
            <li style={{ marginBottom: '10px' }}>Corrupted or defective file that won't open</li>
            <li>Guide not delivered within 24 hours</li>
          </ul>
        </div>

        <div style={{ background: '#F8F9FA', borderRadius: '8px', padding: '25px', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '15px' }}>Our Mistakes:</h3>
          <ul style={{ paddingLeft: '25px', margin: 0 }}>
            <li style={{ marginBottom: '10px' }}>Charged you twice by error</li>
            <li style={{ marginBottom: '10px' }}>Misleading information on our site</li>
            <li>Significant personalization errors (wrong names throughout)</li>
          </ul>
        </div>

        <div style={{ background: '#F8F9FA', borderRadius: '8px', padding: '25px', marginBottom: '30px' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '15px' }}>Duplicate Purchases:</h3>
          <p style={{ margin: 0 }}>
            Accidentally purchased same guide twice - must contact us within 48 hours
          </p>
        </div>

        <h2 style={{ fontSize: '28px', fontFamily: '"Merriweather", serif', color: '#616BA5', marginTop: '40px', marginBottom: '20px' }}>
          What We Cannot Refund
        </h2>
        <ul style={{ marginBottom: '30px', paddingLeft: '30px' }}>
          <li style={{ marginBottom: '10px' }}>❌ "I changed my mind" - after downloading</li>
          <li style={{ marginBottom: '10px' }}>❌ "I didn't read it" - you received what you purchased</li>
          <li style={{ marginBottom: '10px' }}>❌ "It wasn't what I expected" - review product description before purchase</li>
          <li style={{ marginBottom: '10px' }}>❌ "I found free information online" - our value is comprehensive organization</li>
          <li style={{ marginBottom: '10px' }}>❌ "My situation changed" - life circumstances after purchase</li>
        </ul>

        <h2 style={{ fontSize: '28px', fontFamily: '"Merriweather", serif', color: '#616BA5', marginTop: '40px', marginBottom: '20px' }}>
          Before You Purchase - Make Sure
        </h2>
        <p style={{ marginBottom: '15px' }}>To avoid disappointment:</p>
        <ul style={{ marginBottom: '30px', paddingLeft: '30px' }}>
          <li style={{ marginBottom: '10px' }}>✅ Review the product description carefully</li>
          <li style={{ marginBottom: '10px' }}>✅ Verify you're selecting the correct guide</li>
          <li style={{ marginBottom: '10px' }}>✅ Check your email for delivery (including spam folder)</li>
          <li style={{ marginBottom: '10px' }}>✅ Contact support BEFORE purchasing if you have questions</li>
        </ul>

        <h2 style={{ fontSize: '28px', fontFamily: '"Merriweather", serif', color: '#616BA5', marginTop: '40px', marginBottom: '20px' }}>
          How to Request a Refund
        </h2>
        <p style={{ marginBottom: '15px' }}>If you believe you qualify for a refund:</p>
        <ol style={{ marginBottom: '20px', paddingLeft: '30px' }}>
          <li style={{ marginBottom: '10px' }}>Email: admin@vvvdigitals.com</li>
          <li style={{ marginBottom: '10px' }}>Subject line: "Refund Request - [Your Name]"</li>
          <li style={{ marginBottom: '10px' }}>Include: Order number, reason, description of issue</li>
        </ol>
        <p style={{ marginBottom: '30px' }}>
          <strong>Response Time:</strong> We respond within 48 hours. Approved refunds processed within 5-7 business days to original payment method.
        </p>

        <div style={{
          background: '#9199C7',
          color: '#FFFFFF',
          borderRadius: '8px',
          padding: '30px',
          marginTop: '40px',
          marginBottom: '40px'
        }}>
          <h3 style={{ fontSize: '24px', fontFamily: '"Merriweather", serif', marginBottom: '15px' }}>
            Our Commitment
          </h3>
          <p style={{ margin: 0, fontSize: '16px' }}>
            While we maintain a no-refund policy for legitimate digital product reasons, we're committed to delivering quality products, accurate personalization, technical support, fair treatment, and responsive service. If something's wrong, let us know and we'll work to fix it.
          </p>
        </div>

        <div style={{
          borderTop: '2px solid #9199C7',
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

import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Disclaimer() {
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
        <div style={{
          background: 'linear-gradient(135deg, #616BA5 0%, #9199C7 100%)',
          color: '#FFFFFF',
          borderRadius: '8px',
          padding: '40px',
          marginBottom: '40px',
          textAlign: 'center'
        }}>
          <h1 style={{
            fontFamily: '"Merriweather", serif',
            fontSize: '42px',
            marginBottom: '20px'
          }}>
            Medical Disclaimer
          </h1>
          <p style={{ fontSize: '24px', fontWeight: 600, margin: 0 }}>
            IMPORTANT: Please Read Carefully
          </p>
        </div>

        <div style={{
          background: '#FFF3CD',
          border: '3px solid #FFC107',
          borderRadius: '8px',
          padding: '30px',
          marginBottom: '40px'
        }}>
          <p style={{ fontSize: '18px', fontWeight: 600, marginBottom: '15px', color: '#856404' }}>
            The Missing Guides provides educational information and practical guidance for families navigating a loved one's addiction treatment.
          </p>
          <p style={{ fontSize: '24px', fontWeight: 700, margin: 0, color: '#856404' }}>
            This is NOT medical advice.
          </p>
        </div>

        <h2 style={{ fontSize: '28px', fontFamily: '"Merriweather", serif', color: '#616BA5', marginTop: '40px', marginBottom: '20px' }}>
          What This Guide IS:
        </h2>
        <ul style={{ marginBottom: '30px', paddingLeft: '30px' }}>
          <li style={{ marginBottom: '15px' }}>
            A comprehensive resource for understanding treatment processes
          </li>
          <li style={{ marginBottom: '15px' }}>
            Practical checklists and forms for organizing information
          </li>
          <li style={{ marginBottom: '15px' }}>
            Questions to ask healthcare providers
          </li>
          <li style={{ marginBottom: '15px' }}>
            Navigation tools for the healthcare system
          </li>
        </ul>

        <h2 style={{ fontSize: '28px', fontFamily: '"Merriweather", serif', color: '#616BA5', marginTop: '40px', marginBottom: '20px' }}>
          What This Guide is NOT:
        </h2>
        <ul style={{ marginBottom: '30px', paddingLeft: '30px' }}>
          <li style={{ marginBottom: '15px' }}>
            ❌ Medical advice, diagnosis, or treatment recommendations
          </li>
          <li style={{ marginBottom: '15px' }}>
            ❌ A substitute for professional medical care
          </li>
          <li style={{ marginBottom: '15px' }}>
            ❌ Emergency medical services
          </li>
          <li style={{ marginBottom: '15px' }}>
            ❌ Licensed counseling or therapy
          </li>
        </ul>

        <h2 style={{ fontSize: '28px', fontFamily: '"Merriweather", serif', color: '#616BA5', marginTop: '40px', marginBottom: '20px' }}>
          Your Responsibilities:
        </h2>
        <ul style={{ marginBottom: '30px', paddingLeft: '30px' }}>
          <li style={{ marginBottom: '15px' }}>
            <strong>Always consult qualified healthcare professionals</strong> for medical decisions
          </li>
          <li style={{ marginBottom: '15px' }}>
            <strong>Call 911 immediately</strong> for medical emergencies
          </li>
          <li style={{ marginBottom: '15px' }}>
            Follow your loved one's treatment team recommendations
          </li>
          <li style={{ marginBottom: '15px' }}>
            Verify all information with licensed providers
          </li>
        </ul>

        <div style={{
          background: '#DC3545',
          color: '#FFFFFF',
          borderRadius: '8px',
          padding: '30px',
          marginTop: '40px',
          marginBottom: '40px'
        }}>
          <h2 style={{ fontSize: '28px', fontFamily: '"Merriweather", serif', marginBottom: '20px' }}>
            Emergency Resources
          </h2>
          <div style={{ fontSize: '20px', lineHeight: 2 }}>
            <p style={{ marginBottom: '15px' }}>
              <strong>Emergency:</strong> 911
            </p>
            <p style={{ marginBottom: '15px' }}>
              <strong>Suicide Prevention Lifeline:</strong> 988
            </p>
            <p style={{ margin: 0 }}>
              <strong>SAMHSA National Helpline:</strong> 1-800-662-4357<br />
              <span style={{ fontSize: '16px' }}>(24/7, free, confidential)</span>
            </p>
          </div>
        </div>

        <h2 style={{ fontSize: '28px', fontFamily: '"Merriweather", serif', color: '#616BA5', marginTop: '40px', marginBottom: '20px' }}>
          Limitation of Liability
        </h2>
        <p style={{ marginBottom: '30px' }}>
          VVV Digitals LLC and The Missing Guides provide this information "as is" without warranty of any kind. We are not liable for any decisions made based on this information. Always seek professional medical advice.
        </p>

        <div style={{
          background: '#F8F9FA',
          border: '2px solid #616BA5',
          borderRadius: '8px',
          padding: '30px',
          marginTop: '40px',
          marginBottom: '40px',
          textAlign: 'center'
        }}>
          <p style={{ fontSize: '18px', fontWeight: 600, marginBottom: '20px', color: '#616BA5' }}>
            By purchasing and using this guide, you acknowledge that you understand and agree to this disclaimer.
          </p>
          <p style={{ fontSize: '16px', margin: 0, fontStyle: 'italic' }}>
            This disclaimer is a legal requirement to protect both you and us. It ensures you understand the nature of the guide and seek appropriate medical care.
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

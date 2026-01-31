import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{
      background: '#20201D',
      color: '#FFFFFF',
      padding: '60px 20px 40px',
      marginTop: '80px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '40px',
        marginBottom: '40px'
      }}>
        {/* Brand */}
        <div>
          <h3 style={{
            fontFamily: '"Merriweather", serif',
            fontSize: '20px',
            marginBottom: '15px',
            color: '#9A9DE7'
          }}>
            THE MISSING GUIDES
          </h3>
          <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#8E8E8B' }}>
            The comprehensive guides life forgot to include.
          </p>
        </div>

        {/* Legal */}
        <div>
          <h4 style={{
            fontSize: '16px',
            marginBottom: '15px',
            fontWeight: 600
          }}>Legal</h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '10px' }}>
              <Link to="/terms" style={{ color: '#8E8E8B', textDecoration: 'none', fontSize: '14px' }}>
                Terms of Service
              </Link>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <Link to="/privacy" style={{ color: '#8E8E8B', textDecoration: 'none', fontSize: '14px' }}>
                Privacy Policy
              </Link>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <Link to="/refund" style={{ color: '#8E8E8B', textDecoration: 'none', fontSize: '14px' }}>
                Refund Policy
              </Link>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <Link to="/disclaimer" style={{ color: '#8E8E8B', textDecoration: 'none', fontSize: '14px' }}>
                Medical Disclaimer
              </Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 style={{
            fontSize: '16px',
            marginBottom: '15px',
            fontWeight: 600
          }}>Support</h4>
          <p style={{ fontSize: '14px', color: '#8E8E8B', marginBottom: '10px' }}>
            Email: support@themissingguides.com
          </p>
          <p style={{ fontSize: '14px', color: '#8E8E8B' }}>
            Response time: Within 48 hours
          </p>
        </div>

        {/* Emergency */}
        <div>
          <h4 style={{
            fontSize: '16px',
            marginBottom: '15px',
            fontWeight: 600,
            color: '#9A9DE7'
          }}>Emergency Resources</h4>
          <p style={{ fontSize: '14px', color: '#8E8E8B', marginBottom: '8px' }}>
            <strong>Emergency:</strong> 911
          </p>
          <p style={{ fontSize: '14px', color: '#8E8E8B', marginBottom: '8px' }}>
            <strong>Suicide Prevention:</strong> 988
          </p>
          <p style={{ fontSize: '14px', color: '#8E8E8B' }}>
            <strong>SAMHSA Helpline:</strong><br />1-800-662-4357
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{
        borderTop: '1px solid #8E8E8B',
        paddingTop: '30px',
        textAlign: 'center'
      }}>
        <p style={{ fontSize: '14px', color: '#8E8E8B', marginBottom: '10px' }}>
          &copy; 2026 VVV Digitals LLC. All rights reserved.
        </p>
        <p style={{ fontSize: '12px', color: '#8E8E8B' }}>
          TheMissingGuides.com | Not medical advice. Always consult healthcare professionals.
        </p>
      </div>
    </footer>
  )
}

import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header style={{
      background: '#FFFFFF',
      borderBottom: '2px solid #616BA5',
      padding: 'clamp(15px, 2vw, 30px) 0',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div className="container" style={{
        maxWidth: '1600px',
        margin: '0 auto',
        padding: '0 clamp(20px, 5vw, 80px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Link to="/" style={{
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: 'clamp(12px, 2vw, 24px)'
        }}>
          <img
            src="/images/logo.png"
            alt="The Missing Guides Logo"
            style={{
              height: 'clamp(50px, 6vw, 80px)',
              width: 'auto',
              flexShrink: 0
            }}
          />
          <div style={{ textAlign: 'left' }}>
            <h1 style={{
              fontFamily: '"Merriweather", serif',
              fontSize: 'clamp(20px, 2.2vw, 36px)',
              fontWeight: 900,
              color: '#616BA5',
              letterSpacing: '1px',
              marginBottom: '2px',
              lineHeight: 1.2
            }}>
              THE MISSING GUIDES
            </h1>
            <p style={{
              fontSize: 'clamp(11px, 0.9vw, 14px)',
              color: '#8E8E8B',
              fontWeight: 400,
              margin: 0
            }}>
              The comprehensive guides life forgot to include.
            </p>
          </div>
        </Link>
        <nav>
          <Link to="/about" style={{
            fontFamily: '"Work Sans", sans-serif',
            fontSize: 'clamp(14px, 1.1vw, 17px)',
            fontWeight: 500,
            color: '#616BA5',
            textDecoration: 'none',
            letterSpacing: '0.5px',
          }}>
            About
          </Link>
        </nav>
      </div>
    </header>
  )
}

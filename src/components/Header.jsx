import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header style={{
      background: '#FFFFFF',
      borderBottom: '2px solid #2529A7',
      padding: 'clamp(20px, 2.5vw, 40px) 0',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div className="container" style={{
        maxWidth: '1600px',
        margin: '0 auto',
        padding: '0 clamp(20px, 5vw, 80px)',
        textAlign: 'center'
      }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h1 style={{
            fontFamily: '"Merriweather", serif',
            fontSize: 'clamp(24px, 2.5vw, 40px)',
            fontWeight: 900,
            color: '#2529A7',
            letterSpacing: '1px',
            marginBottom: '5px'
          }}>
            THE MISSING GUIDES
          </h1>
          <p style={{
            fontSize: 'clamp(12px, 1vw, 16px)',
            color: '#8E8E8B',
            fontWeight: 400
          }}>
            The comprehensive guides life forgot to include.
          </p>
        </Link>
      </div>
    </header>
  )
}

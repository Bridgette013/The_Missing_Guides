import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header style={{
      background: '#FFFFFF',
      borderBottom: '2px solid #2529A7',
      padding: '30px 0',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px',
        textAlign: 'center'
      }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h1 style={{
            fontFamily: '"Merriweather", serif',
            fontSize: '32px',
            fontWeight: 900,
            color: '#2529A7',
            letterSpacing: '1px',
            marginBottom: '5px'
          }}>
            THE MISSING GUIDES
          </h1>
          <p style={{
            fontSize: '14px',
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

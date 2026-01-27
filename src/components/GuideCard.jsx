import { Link } from 'react-router-dom'

export default function GuideCard({ guide }) {
  const cardStyle = {
    background: '#FFFFFF',
    border: '2px solid #2529A7',
    borderRadius: '8px',
    padding: '30px',
    textAlign: 'center',
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  }

  const substanceStyle = {
    display: 'inline-block',
    background: '#9A9DE7',
    color: '#FFFFFF',
    padding: '5px 15px',
    borderRadius: '20px',
    fontSize: '14px',
    marginBottom: '15px',
    fontWeight: 600
  }

  const priceStyle = {
    fontSize: '32px',
    fontWeight: 700,
    color: '#2529A7',
    marginBottom: '20px'
  }

  const buttonStyle = {
    display: 'inline-block',
    background: '#2529A7',
    color: '#FFFFFF',
    padding: '12px 30px',
    fontWeight: 600,
    textDecoration: 'none',
    borderRadius: '6px',
    fontFamily: '"Work Sans", sans-serif',
    transition: 'all 0.3s ease',
    border: 'none',
    cursor: 'pointer'
  }

  return (
    <div style={cardStyle} onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-5px)'
      e.currentTarget.style.boxShadow = '0 10px 30px rgba(37, 41, 167, 0.2)'
    }} onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)'
      e.currentTarget.style.boxShadow = 'none'
    }}>
      <h3 style={{
        fontFamily: '"Merriweather", serif',
        fontSize: '22px',
        marginBottom: '15px',
        color: '#2529A7'
      }}>
        The Missing Guide to<br />{guide.title}
      </h3>
      <span style={substanceStyle}>{guide.substance}</span>
      <p style={{
        marginBottom: '20px',
        color: '#8E8E8B',
        fontSize: '14px'
      }}>
        {guide.description}
      </p>
      <div style={priceStyle}>${guide.price}</div>
      <Link to={`/guide/${guide.id}`}>
        <button style={buttonStyle}>Get This Guide</button>
      </Link>
    </div>
  )
}

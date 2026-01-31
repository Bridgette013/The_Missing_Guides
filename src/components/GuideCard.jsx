import { Link } from 'react-router-dom'

export default function GuideCard({ guide }) {
  const cardStyle = {
    background: '#FFFFFF',
    border: '2px solid #616BA5',
    borderRadius: '8px',
    padding: 'clamp(24px, 2.5vw, 40px)',
    textAlign: 'center',
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  }

  const substanceStyle = {
    display: 'inline-block',
    background: '#9199C7',
    color: '#FFFFFF',
    padding: '5px 15px',
    borderRadius: '20px',
    fontSize: 'clamp(12px, 1vw, 15px)',
    marginBottom: '15px',
    fontWeight: 600
  }

  const priceStyle = {
    fontSize: 'clamp(28px, 2.5vw, 38px)',
    fontWeight: 700,
    color: '#616BA5',
    marginBottom: '20px'
  }

  const buttonStyle = {
    display: 'inline-block',
    background: '#616BA5',
    color: '#FFFFFF',
    padding: 'clamp(10px, 1vw, 16px) clamp(24px, 2vw, 36px)',
    fontWeight: 600,
    textDecoration: 'none',
    borderRadius: '6px',
    fontFamily: '"Work Sans", sans-serif',
    transition: 'all 0.3s ease',
    border: 'none',
    cursor: 'pointer',
    fontSize: 'clamp(14px, 1.1vw, 18px)'
  }

  return (
    <div style={cardStyle} onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-5px)'
      e.currentTarget.style.boxShadow = '0 10px 30px rgba(97, 107, 165, 0.2)'
    }} onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)'
      e.currentTarget.style.boxShadow = 'none'
    }}>
      <h3 style={{
        fontFamily: '"Merriweather", serif',
        fontSize: 'clamp(18px, 1.6vw, 26px)',
        marginBottom: '15px',
        color: '#616BA5'
      }}>
        The Missing Guide to<br />{guide.title}
      </h3>
      <span style={substanceStyle}>{guide.substance}</span>
      <p style={{
        marginBottom: '20px',
        color: '#8E8E8B',
        fontSize: 'clamp(13px, 1vw, 16px)',
        lineHeight: 1.5
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

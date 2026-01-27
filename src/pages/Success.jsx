import Header from '../components/Header'

export default function Success() {
  return (
    <div>
      <Header />
      <div style={{ padding: '60px 20px', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
        <h2 style={{ fontFamily: '"Merriweather", serif', fontSize: '36px', color: '#2529A7', marginBottom: '20px' }}>
          Your Guide is Being Prepared
        </h2>
        <p style={{ fontSize: '18px', lineHeight: 1.8 }}>
          You'll receive an email within the next few minutes with your personalized guide.
        </p>
      </div>
    </div>
  )
}

import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Success() {
  return (
    <div>
      <Header />
      <div style={{ padding: 'clamp(40px, 6vw, 80px) clamp(20px, 5vw, 60px)', textAlign: 'center', maxWidth: 'min(700px, 85vw)', margin: '0 auto' }}>
        <h2 style={{ fontFamily: '"Merriweather", serif', fontSize: 'clamp(28px, 3vw, 44px)', color: '#616BA5', marginBottom: 'clamp(16px, 2vw, 28px)' }}>
          Your Guide is Being Prepared
        </h2>
        <p style={{ fontSize: 'clamp(16px, 1.4vw, 22px)', lineHeight: 1.8 }}>
          You'll receive an email within the next few minutes with your personalized guide.
        </p>
      </div>
      <Footer />
    </div>
  )
}

import Header from '../components/Header'

export default function About() {
  return (
    <div>
      <Header />
      <div style={{ maxWidth: 'min(900px, 85vw)', margin: 'clamp(40px, 6vw, 80px) auto', padding: '0 clamp(20px, 5vw, 60px)' }}>
        <h2 style={{ fontFamily: '"Merriweather", serif', fontSize: 'clamp(32px, 3.5vw, 50px)', color: '#2529A7', marginBottom: 'clamp(16px, 2vw, 28px)' }}>
          The Guides That Didn't Exist
        </h2>
        <p style={{ fontSize: 'clamp(16px, 1.3vw, 20px)', lineHeight: 1.8, marginBottom: 'clamp(16px, 2vw, 24px)' }}>
          In 2024, when someone I love needed addiction treatment, I searched everywhere for a comprehensive guide.
        </p>
        <p style={{ fontSize: 'clamp(16px, 1.3vw, 20px)', lineHeight: 1.8, marginBottom: 'clamp(16px, 2vw, 24px)' }}>
          Treatment centers gave me pamphlets. Websites gave me listicles. Books gave me theory.
        </p>
        <p style={{ fontSize: 'clamp(16px, 1.3vw, 20px)', lineHeight: 1.8, marginBottom: 'clamp(16px, 2vw, 24px)' }}>
          Nobody gave me the 200-page manual I actually needed.
        </p>
        <p style={{ fontSize: 'clamp(16px, 1.3vw, 20px)', lineHeight: 1.8, marginBottom: 'clamp(16px, 2vw, 24px)' }}>
          <strong>So I built it.</strong>
        </p>
      </div>
    </div>
  )
}

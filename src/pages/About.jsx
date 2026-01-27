import Header from '../components/Header'

export default function About() {
  return (
    <div>
      <Header />
      <div style={{ maxWidth: '800px', margin: '60px auto', padding: '0 20px' }}>
        <h2 style={{ fontFamily: '"Merriweather", serif', fontSize: '42px', color: '#2529A7', marginBottom: '20px' }}>
          The Guides That Didn't Exist
        </h2>
        <p style={{ fontSize: '17px', lineHeight: 1.8, marginBottom: '20px' }}>
          In 2024, when someone I love needed addiction treatment, I searched everywhere for a comprehensive guide.
        </p>
        <p style={{ fontSize: '17px', lineHeight: 1.8, marginBottom: '20px' }}>
          Treatment centers gave me pamphlets. Websites gave me listicles. Books gave me theory.
        </p>
        <p style={{ fontSize: '17px', lineHeight: 1.8, marginBottom: '20px' }}>
          Nobody gave me the 200-page manual I actually needed.
        </p>
        <p style={{ fontSize: '17px', lineHeight: 1.8, marginBottom: '20px' }}>
          <strong>So I built it.</strong>
        </p>
      </div>
    </div>
  )
}

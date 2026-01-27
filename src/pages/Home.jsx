import Header from '../components/Header'
import GuideCard from '../components/GuideCard'
import { Link } from 'react-router-dom'

const guides = [
  {
    id: 'alcohol',
    title: 'Alcohol Recovery',
    substance: 'ALCOHOL',
    description: 'Life-threatening withdrawal. 3-7 day detox timeline. Medical supervision requirements.',
    price: 97
  },
  {
    id: 'opioid',
    title: 'Opioid Recovery',
    substance: 'OPIOIDS',
    description: 'Heroin, fentanyl, prescription painkillers. MAT options. 1-14 day timeline.',
    price: 97
  },
  {
    id: 'stimulant',
    title: 'Stimulant Recovery',
    substance: 'STIMULANTS',
    description: 'Meth, cocaine, prescription stimulants. Psychological withdrawal. Sleep management.',
    price: 97
  },
  {
    id: 'benzo',
    title: 'Benzodiazepine Recovery',
    substance: 'BENZOS',
    description: 'Xanax, Valium, Klonopin. Life-threatening withdrawal. Medical taper required.',
    price: 97
  },
  {
    id: 'general',
    title: 'Substance Recovery',
    substance: 'GENERAL',
    description: 'Universal recovery principles. Any substance. Treatment navigation.',
    price: 97
  }
]

export default function Home() {
  return (
    <div>
      <Header />
      
      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, #2529A7 0%, #9A9DE7 100%)',
        color: '#FFFFFF',
        padding: '80px 20px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: '"Merriweather", serif',
            fontSize: '48px',
            marginBottom: '20px'
          }}>
            Your Loved One Needs Treatment.<br />You Need Answers.
          </h2>
          <p style={{ fontSize: '24px', marginBottom: '40px' }}>
            The comprehensive guides life forgot to include.
          </p>
          <p style={{
            fontSize: '18px',
            marginBottom: '50px',
            maxWidth: '800px',
            margin: '0 auto 50px',
            lineHeight: 1.8
          }}>
            When crisis hits, you searched for the guide.<br />
            It didn't exist.<br /><br />
            <strong>Until now.</strong>
          </p>
          <a href="#guides" style={{
            display: 'inline-block',
            background: '#FFFFFF',
            color: '#2529A7',
            padding: '18px 40px',
            fontSize: '18px',
            fontWeight: 600,
            textDecoration: 'none',
            borderRadius: '8px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
          }}>
            Browse The Missing Guides
          </a>
        </div>
      </section>

      {/* Guides Grid */}
      <section id="guides" style={{ padding: '80px 20px', background: '#F8F9FA' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: '"Merriweather", serif',
            fontSize: '36px',
            textAlign: 'center',
            marginBottom: '50px',
            color: '#2529A7'
          }}>
            The Missing Guide to Addiction Recovery
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '40px'
          }}>
            {guides.map(guide => (
              <GuideCard key={guide.id} guide={guide} />
            ))}
          </div>

          {/* Bundle */}
          <div style={{
            background: 'linear-gradient(135deg, #2529A7 0%, #9A9DE7 100%)',
            color: '#FFFFFF',
            borderRadius: '8px',
            padding: '50px',
            textAlign: 'center',
            maxWidth: '800px',
            margin: '50px auto 0'
          }}>
            <h3 style={{
              fontFamily: '"Merriweather", serif',
              fontSize: '32px',
              marginBottom: '20px'
            }}>
              Complete Recovery Bundle
            </h3>
            <p style={{ fontSize: '20px', marginBottom: '30px' }}>
              Get all 5 guides. Save $88.
            </p>
            <p style={{
              textDecoration: 'line-through',
              opacity: 0.7,
              fontSize: '24px',
              marginBottom: '30px'
            }}>
              $485 if purchased separately
            </p>
            <p style={{ fontSize: '48px', fontWeight: 900, marginBottom: '30px' }}>
              $397
            </p>
            <Link to="/guide/bundle" style={{
              background: '#FFFFFF',
              color: '#2529A7',
              padding: '18px 50px',
              fontSize: '20px',
              fontWeight: 700,
              textDecoration: 'none',
              borderRadius: '8px',
              display: 'inline-block'
            }}>
              Get Complete Bundle
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        background: '#20201D',
        color: '#FFFFFF',
        padding: '40px 20px',
        textAlign: 'center'
      }}>
        <p>&copy; 2026 The Missing Guides. All rights reserved.</p>
        <p style={{ marginTop: '10px', fontSize: '14px' }}>TheMissingGuides.com</p>
      </footer>
    </div>
  )
}

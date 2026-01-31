import Header from '../components/Header'
import GuideCard from '../components/GuideCard'
import Footer from '../components/Footer'
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
        padding: 'clamp(60px, 8vw, 120px) clamp(20px, 5vw, 80px)',
        textAlign: 'center'
      }}>
        <div className="container" style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: '"Merriweather", serif',
            fontSize: 'clamp(32px, 4vw, 56px)',
            marginBottom: '20px',
            lineHeight: 1.2
          }}>
            Your Loved One Needs Treatment.<br />You Need Answers.
          </h2>
          <p style={{ fontSize: 'clamp(18px, 2vw, 28px)', marginBottom: '40px' }}>
            The comprehensive guides life forgot to include.
          </p>
          <p style={{
            fontSize: 'clamp(16px, 1.5vw, 20px)',
            marginBottom: '50px',
            maxWidth: '900px',
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
            padding: 'clamp(14px, 1.5vw, 22px) clamp(30px, 3vw, 50px)',
            fontSize: 'clamp(16px, 1.3vw, 20px)',
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
      <section id="guides" style={{ padding: 'clamp(60px, 8vw, 120px) clamp(20px, 5vw, 80px)', background: '#F8F9FA' }}>
        <div className="container" style={{ maxWidth: '1600px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: '"Merriweather", serif',
            fontSize: 'clamp(28px, 3vw, 44px)',
            textAlign: 'center',
            marginBottom: 'clamp(40px, 5vw, 70px)',
            color: '#2529A7'
          }}>
            The Missing Guide to Addiction Recovery
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: 'clamp(24px, 3vw, 50px)',
            maxWidth: '1400px',
            margin: '0 auto'
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
            padding: 'clamp(40px, 5vw, 70px)',
            textAlign: 'center',
            maxWidth: '900px',
            margin: 'clamp(40px, 5vw, 70px) auto 0'
          }}>
            <h3 style={{
              fontFamily: '"Merriweather", serif',
              fontSize: 'clamp(26px, 2.5vw, 38px)',
              marginBottom: '20px'
            }}>
              Complete Recovery Bundle
            </h3>
            <p style={{ fontSize: 'clamp(18px, 1.5vw, 24px)', marginBottom: '30px' }}>
              Get all 5 guides. Save $88.
            </p>
            <p style={{
              textDecoration: 'line-through',
              opacity: 0.7,
              fontSize: 'clamp(20px, 1.8vw, 28px)',
              marginBottom: '30px'
            }}>
              $485 if purchased separately
            </p>
            <p style={{ fontSize: 'clamp(40px, 4vw, 56px)', fontWeight: 900, marginBottom: '30px' }}>
              $397
            </p>
            <Link to="/guide/bundle" style={{
              background: '#FFFFFF',
              color: '#2529A7',
              padding: 'clamp(14px, 1.5vw, 22px) clamp(40px, 4vw, 60px)',
              fontSize: 'clamp(18px, 1.5vw, 24px)',
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

      <Footer />
    </div>
  )
}

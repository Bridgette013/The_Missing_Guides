import Header from '../components/Header'
import GuideCard from '../components/GuideCard'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import '../styles/tokens.css'

const guides = [
  { id: 'alcohol', title: 'Alcohol Recovery', substance: 'ALCOHOL', description: 'Life-threatening withdrawal. 3-7 day detox timeline. Medical supervision requirements.', price: 97 },
  { id: 'opioid', title: 'Opioid Recovery', substance: 'OPIOIDS', description: 'Heroin, fentanyl, prescription painkillers. MAT options. 1-14 day timeline.', price: 97 },
  { id: 'stimulant', title: 'Stimulant Recovery', substance: 'STIMULANTS', description: 'Meth, cocaine, prescription stimulants. Psychological withdrawal. Sleep management.', price: 97 },
  { id: 'benzo', title: 'Benzodiazepine Recovery', substance: 'BENZOS', description: 'Xanax, Valium, Klonopin. Life-threatening withdrawal. Medical taper required.', price: 97 },
  { id: 'general', title: 'Substance Recovery', substance: 'GENERAL', description: 'Universal recovery principles. Any substance. Treatment navigation.', price: 97 },
]

export default function Home() {
  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <Header />

      {/* Hero */}
      <section style={{
        background: 'var(--ink)',
        color: 'var(--cream)',
        padding: 'clamp(100px, 14vw, 180px) clamp(24px, 6vw, 100px) clamp(80px, 10vw, 140px)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* decorative line */}
        <div style={{
          position: 'absolute', top: 0, left: '50%',
          transform: 'translateX(-50%)',
          width: '1px', height: '80px',
          background: 'linear-gradient(to bottom, transparent, var(--gold))',
        }} />

        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '10px', fontWeight: 700,
            letterSpacing: '0.35em', textTransform: 'uppercase',
            color: 'var(--rust)', marginBottom: '32px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
          }}>
            <span style={{ display: 'block', width: '32px', height: '1px', background: 'var(--rust)' }} />
            The Missing Guides
            <span style={{ display: 'block', width: '32px', height: '1px', background: 'var(--rust)' }} />
          </div>

          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(42px, 7vw, 88px)',
            fontWeight: 300, lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: 'var(--cream)',
            marginBottom: '32px',
          }}>
            Your Loved One<br />Needs Treatment.<br />
            <em style={{ fontStyle: 'italic', color: 'var(--rust)' }}>You Need Answers.</em>
          </h1>

          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(18px, 1.8vw, 24px)',
            lineHeight: 1.7, fontWeight: 300,
            color: 'rgba(245,239,230,0.65)',
            maxWidth: '640px', margin: '0 auto 20px',
          }}>
            When crisis hits, you searched for the guide.
          </p>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(18px, 1.8vw, 24px)',
            lineHeight: 1.7, fontWeight: 300,
            color: 'rgba(245,239,230,0.65)',
            maxWidth: '640px', margin: '0 auto 56px',
          }}>
            It didn't exist. <em style={{ color: 'var(--cream)', fontStyle: 'italic' }}>Until now.</em>
          </p>

          <a href="#guides" style={{
            display: 'inline-block',
            background: 'var(--rust)',
            color: 'var(--cream)',
            padding: 'clamp(14px, 1.5vw, 20px) clamp(36px, 4vw, 56px)',
            fontFamily: 'var(--font-ui)',
            fontSize: '11px', fontWeight: 700,
            letterSpacing: '0.25em', textTransform: 'uppercase',
            textDecoration: 'none',
            transition: 'background 0.2s',
          }}>
            Browse The Missing Guides
          </a>
        </div>
      </section>

      {/* Guides Grid */}
      <section id="guides" style={{
        padding: 'clamp(80px, 10vw, 140px) clamp(24px, 5vw, 80px)',
        background: 'var(--cream)',
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>

          <div style={{ marginBottom: 'clamp(48px, 6vw, 80px)', paddingBottom: '32px', borderBottom: '1px solid var(--ink)' }}>
            <div style={{
              fontFamily: 'var(--font-ui)', fontSize: '10px', fontWeight: 700,
              letterSpacing: '0.35em', textTransform: 'uppercase',
              color: 'var(--rust)', marginBottom: '16px',
            }}>
              Addiction Recovery
            </div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(32px, 4vw, 52px)',
              fontWeight: 300, color: 'var(--ink)', lineHeight: 1, margin: 0,
            }}>
              The Missing Guide to <em style={{ fontStyle: 'italic', color: 'var(--rust)' }}>Recovery</em>
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: '2px',
          }}>
            {guides.map(guide => (
              <GuideCard key={guide.id} guide={guide} />
            ))}
          </div>

          {/* Bundle */}
          <div style={{
            background: 'var(--ink)',
            padding: 'clamp(48px, 6vw, 80px)',
            marginTop: '2px',
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            alignItems: 'center',
            gap: '48px',
          }}>
            <div>
              <div style={{
                fontFamily: 'var(--font-ui)', fontSize: '10px', fontWeight: 700,
                letterSpacing: '0.35em', textTransform: 'uppercase',
                color: 'var(--rust)', marginBottom: '16px',
              }}>
                Best Value
              </div>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(28px, 3vw, 44px)',
                fontWeight: 300, color: 'var(--cream)', lineHeight: 1.1, margin: '0 0 16px',
              }}>
                Complete Recovery Bundle
              </h3>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(16px, 1.3vw, 20px)',
                color: 'rgba(245,239,230,0.6)', fontWeight: 300, margin: 0,
              }}>
                All 5 guides. Save $188.
              </p>
            </div>
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(36px, 4vw, 56px)',
                fontWeight: 300, color: 'var(--cream)', lineHeight: 1, marginBottom: '8px',
              }}>
                $297
              </div>
              <div style={{
                fontFamily: 'var(--font-ui)', fontSize: '11px',
                color: 'rgba(245,239,230,0.4)', textDecoration: 'line-through', marginBottom: '24px',
              }}>
                $485 separately
              </div>
              <Link to="/guide/bundle" style={{
                display: 'inline-block',
                background: 'var(--rust)',
                color: 'var(--cream)',
                padding: '14px 36px',
                fontFamily: 'var(--font-ui)',
                fontSize: '11px', fontWeight: 700,
                letterSpacing: '0.25em', textTransform: 'uppercase',
                textDecoration: 'none',
              }}>
                Get Complete Bundle
              </Link>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  )
}

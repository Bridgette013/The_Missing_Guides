import Header from '../components/Header'
import Footer from '../components/Footer'
import '../styles/tokens.css'

export default function AboutPage() {
  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <Header />

      <main style={{
        maxWidth: '700px',
        margin: '0 auto',
        padding: 'clamp(60px, 8vw, 120px) clamp(24px, 5vw, 40px)',
      }}>

        {/* Headshot */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(40px, 6vw, 64px)' }}>
          <img
            src="/images/about_brit.png"
            alt="Brit, founder of The Missing Guides"
            style={{
              width: '180px',
              height: '180px',
              borderRadius: '50%',
              objectFit: 'cover',
              objectPosition: 'center top',
              border: '1px solid var(--cream-dark)',
            }}
          />
        </div>

        {/* Eyebrow */}
        <div style={{
          fontFamily: 'var(--font-ui)',
          fontSize: '10px',
          fontWeight: 700,
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: 'var(--rust)',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}>
          <span style={{ display: 'block', width: '32px', height: '1px', background: 'var(--rust)' }} />
          About
        </div>

        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(36px, 5vw, 52px)',
          fontWeight: 300,
          lineHeight: 1.1,
          color: 'var(--ink)',
          marginBottom: '48px',
          marginTop: 0,
        }}>
          Nobody teaches you<br /><em style={{ fontStyle: 'italic', color: 'var(--rust)' }}>this stuff.</em>
        </h2>

        <p style={body}>
          Not how to get your husband into detox at 2am. Not what to say when the ER asks how much he drinks. Not how to keep breathing when the person you love is destroying themselves.
        </p>

        <p style={body}>
          You're supposed to just... figure it out. Google it. Piece it together from Reddit threads and outdated PDFs while your hands shake and your heart breaks.
        </p>

        <p style={body}>I know. I've been there.</p>

        <p style={lead}>
          I'm a recovering addict. I'm the loved one of a recovering addict. And I'm the loved one of one I didn't get to in time.
        </p>

        <p style={body}>
          I've sat on every side of this table. I know what it's like to be the one drowning. I know what it's like to watch someone drown. And I know what it's like to show up too late.
        </p>

        <p style={lead}>
          The Missing Guides exist because I needed them and they didn't exist.
        </p>

        <p style={body}>
          When I was navigating the worst moments of my life, I didn't need another article about "the stages of addiction." I needed someone to tell me exactly what to do. Step by step. What to pack. What to say. Who to call. What happens next.
        </p>

        <p style={body}>
          I needed a guide that treated me like a capable adult in crisis — not a pamphlet, not a hotline, not a lecture. Just clear, honest, practical information that assumed I was smart enough to handle the truth and exhausted enough to need it laid out plainly.
        </p>

        <p style={body}>So I built it.</p>

        <p style={lead}>
          These guides are the resource I wish someone had handed me.
        </p>

        <p style={body}>
          Every page comes from real experience. Real research. Real conversations with families who've walked this path. They're personalized because your situation isn't generic. They're comprehensive because crisis doesn't come in bite-sized pieces. And they're yours to keep — no subscriptions, no logins, no "your trial has expired" when you need help most.
        </p>

        <p style={lead}>This is just the beginning.</p>

        <p style={body}>
          The Missing Guides will grow. Addiction recovery was first because it was personal. But there are a thousand moments in life where you're left Googling at 2am, wondering why nobody ever told you how this works — filing for an LLC, navigating a divorce, applying for adoption, dealing with CPS, buying your first home, burying a parent.
        </p>

        <p style={body}>The guides that should exist but don't? I'm building them.</p>

        {/* Signoff */}
        <div style={{
          marginTop: '72px',
          paddingTop: '48px',
          borderTop: '1px solid var(--ink)',
          display: 'grid',
          gridTemplateColumns: '4px 1fr',
          gap: '28px',
        }}>
          <div style={{ background: 'var(--rust)' }} />
          <div>
            <p style={{
              fontFamily: 'var(--font-display)',
              fontSize: '32px',
              fontWeight: 500,
              color: 'var(--ink)',
              marginBottom: '8px',
              lineHeight: 1,
            }}>— Brit</p>
            <p style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '10px',
              fontWeight: 500,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--ink-light)',
              marginBottom: '4px',
            }}>Founder, VVV Digitals LLC</p>
            <p style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '10px',
              fontWeight: 400,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--ink-light)',
              opacity: 0.7,
            }}>U.S. Army Veteran</p>
          </div>
        </div>

      </main>

      {/* Timeline photo strip — untouched */}
      <div style={{ marginTop: 'clamp(60px, 8vw, 120px)', width: '100%', lineHeight: 0 }}>
        <picture>
          <source media="(max-width: 768px)" srcSet="/images/about-timeline-mobile.png" />
          <source media="(min-width: 769px)" srcSet="/images/about-timeline-desktop.png" />
          <img
            src="/images/about-timeline-desktop.png"
            alt="Timeline of life moments"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </picture>
      </div>

      <Footer />
    </div>
  )
}

const body = {
  fontFamily: 'var(--font-body)',
  fontSize: 'clamp(17px, 1.2vw, 20px)',
  lineHeight: 1.85,
  color: 'var(--ink-mid)',
  fontWeight: 300,
  marginBottom: '28px',
}

const lead = {
  fontFamily: 'var(--font-display)',
  fontSize: 'clamp(19px, 1.4vw, 24px)',
  fontWeight: 400,
  fontStyle: 'italic',
  lineHeight: 1.6,
  color: 'var(--ink)',
  marginBottom: '28px',
  marginTop: '52px',
  paddingLeft: '20px',
  borderLeft: '2px solid var(--gold)',
}

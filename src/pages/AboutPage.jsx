import Header from '../components/Header'
import Footer from '../components/Footer'

export default function AboutPage() {
  const containerStyle = {
    maxWidth: '700px',
    margin: '0 auto',
    padding: 'clamp(60px, 8vw, 120px) clamp(20px, 5vw, 40px)',
  }

  const paragraphStyle = {
    fontFamily: 'Inter, sans-serif',
    fontSize: 'clamp(16px, 1.2vw, 18px)',
    lineHeight: 1.9,
    color: '#2A2A2A',
    marginBottom: '28px',
  }

  const boldLeadStyle = {
    fontFamily: '"Merriweather", serif',
    fontSize: 'clamp(18px, 1.4vw, 22px)',
    fontWeight: 700,
    lineHeight: 1.7,
    color: '#2529A7',
    marginBottom: '16px',
    marginTop: '56px',
  }

  const signoffStyle = {
    fontFamily: '"Merriweather", serif',
    fontSize: 'clamp(17px, 1.3vw, 20px)',
    fontWeight: 700,
    color: '#2529A7',
    marginBottom: '4px',
    marginTop: '56px',
  }

  const italicStyle = {
    fontFamily: 'Inter, sans-serif',
    fontSize: 'clamp(14px, 1.1vw, 16px)',
    fontStyle: 'italic',
    color: '#6B6B6B',
    marginBottom: '2px',
    lineHeight: 1.6,
  }

  return (
    <div>
      <Header />

      <div style={containerStyle}>

        <h2 style={{ ...boldLeadStyle, marginTop: 0 }}>
          Nobody teaches you this stuff.
        </h2>

        <p style={paragraphStyle}>
          Not how to get your husband into detox at 2am. Not what to say when the ER asks how much he drinks. Not how to keep breathing when the person you love is destroying themselves.
        </p>

        <p style={paragraphStyle}>
          You're supposed to just... figure it out. Google it. Piece it together from Reddit threads and outdated PDFs while your hands shake and your heart breaks.
        </p>

        <p style={paragraphStyle}>
          I know. I've been there.
        </p>

        <p style={boldLeadStyle}>
          I'm a recovering addict. I'm the loved one of a recovering addict. And I'm the loved one of one I didn't get to in time.
        </p>

        <p style={paragraphStyle}>
          I've sat on every side of this table. I know what it's like to be the one drowning. I know what it's like to watch someone drown. And I know what it's like to show up too late.
        </p>

        <p style={boldLeadStyle}>
          The Missing Guides exist because I needed them and they didn't exist.
        </p>

        <p style={paragraphStyle}>
          When I was navigating the worst moments of my life, I didn't need another article about "the stages of addiction." I needed someone to tell me exactly what to do. Step by step. What to pack. What to say. Who to call. What happens next.
        </p>

        <p style={paragraphStyle}>
          I needed a guide that treated me like a capable adult in crisis — not a pamphlet, not a hotline, not a lecture. Just clear, honest, practical information that assumed I was smart enough to handle the truth and exhausted enough to need it laid out plainly.
        </p>

        <p style={paragraphStyle}>
          So I built it.
        </p>

        <p style={boldLeadStyle}>
          These guides are the resource I wish someone had handed me.
        </p>

        <p style={paragraphStyle}>
          Every page comes from real experience. Real research. Real conversations with families who've walked this path. They're personalized because your situation isn't generic. They're comprehensive because crisis doesn't come in bite-sized pieces. And they're yours to keep — no subscriptions, no logins, no "your trial has expired" when you need help most.
        </p>

        <p style={boldLeadStyle}>
          This is just the beginning.
        </p>

        <p style={paragraphStyle}>
          The Missing Guides will grow. Addiction recovery was first because it was personal. But there are a thousand moments in life where you're left Googling at 2am, wondering why nobody ever told you how this works — filing for an LLC, navigating a divorce, applying for adoption, dealing with CPS, buying your first home, burying a parent.
        </p>

        <p style={paragraphStyle}>
          The guides that should exist but don't? I'm building them.
        </p>

        <p style={signoffStyle}>
          — Brit
        </p>
        <p style={italicStyle}>
          Founder, VVV Digitals LLC
        </p>
        <p style={italicStyle}>
          U.S. Army Veteran
        </p>

      </div>

      {/* Timeline image banner */}
      <div style={{
        marginTop: 'clamp(60px, 8vw, 120px)',
        width: '100%',
        lineHeight: 0,
      }}>
        <img
          src="/images/about-timeline.png"
          alt=""
          style={{
            width: '100%',
            display: 'block',
          }}
        />
      </div>

      <Footer />
    </div>
  )
}

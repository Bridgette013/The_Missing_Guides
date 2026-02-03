import { useState } from 'react'
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

const comingSoon = [
  'Filing an LLC (DIY)',
  'Navigating Divorce',
  'Applying for Adoption',
  'What To Do If CPS Shows Up',
  'Buying Your First Home',
  'Navigating Probate'
]

const whatsInside = [
  '200+ pages of step-by-step guidance — not theory, not lectures, just what to DO',
  'Local resources personalized to YOUR zip code — hospitals, detox facilities, treatment centers near you',
  'Word-for-word scripts for the hard conversations — what to say to the ER, to insurance, to your loved one',
  'Printable checklists — what to pack, what to bring, what to ask',
  'Insurance navigation templates — how to get treatment covered',
  'Relapse emergency plan — because hope isn\'t a strategy',
  'Delivered instantly to your email as a PDF — print it, save it, use it tonight'
]

const whoItsFor = [
  'You just found out and don\'t know where to start',
  'You\'re taking them to the hospital tonight and need a plan',
  'You\'ve been through this before and it didn\'t work — you need a better approach',
  'You\'re the spouse, parent, child, sibling, or friend holding everyone else together',
  'You\'re exhausted from Googling and getting nowhere'
]

/* Shared style constants */
const COLORS = {
  royal: '#2529A7',
  periwinkle: '#9A9DE7',
  white: '#FFFFFF',
  lightGray: '#F8F9FA',
  mediumGray: '#8E8E8B',
  darkBg: '#20201D',
  text: '#2D2D2D'
}

const sectionPadding = 'clamp(60px, 8vw, 120px) clamp(20px, 5vw, 80px)'
const containerStyle = { maxWidth: '1000px', margin: '0 auto' }
const headingFont = '"Merriweather", serif'
const bodyFont = '"Inter", "Work Sans", sans-serif'

export default function Home() {
  const [waitlistEmail, setWaitlistEmail] = useState('')
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false)

  const handleWaitlist = (e) => {
    e.preventDefault()
    if (waitlistEmail) {
      setWaitlistSubmitted(true)
    }
  }

  return (
    <div style={{ background: COLORS.white }}>
      <Header />

      {/* ─── SECTION 1: HERO ─── */}
      <section style={{
        background: `linear-gradient(135deg, ${COLORS.royal} 0%, ${COLORS.periwinkle} 100%)`,
        color: COLORS.white,
        padding: 'clamp(80px, 10vw, 160px) clamp(20px, 5vw, 80px)',
        textAlign: 'center'
      }}>
        <div style={{ ...containerStyle, maxWidth: '900px' }}>
          <h2 style={{
            fontFamily: headingFont,
            fontSize: 'clamp(30px, 4vw, 52px)',
            marginBottom: '24px',
            lineHeight: 1.2,
            fontWeight: 700
          }}>
            The Comprehensive Guides<br />Life Forgot to Include
          </h2>
          <p style={{
            fontSize: 'clamp(18px, 2vw, 26px)',
            marginBottom: '24px',
            fontFamily: bodyFont,
            lineHeight: 1.5,
            fontWeight: 300
          }}>
            Step-by-step guidance for the moments nobody prepared you for.
          </p>
          <p style={{
            fontSize: 'clamp(14px, 1.2vw, 18px)',
            marginBottom: '48px',
            fontFamily: bodyFont,
            opacity: 0.9,
            lineHeight: 1.6
          }}>
            Starting with addiction recovery. More guides coming soon.
          </p>
          <a href="#guides" style={{
            display: 'inline-block',
            background: COLORS.white,
            color: COLORS.royal,
            padding: 'clamp(14px, 1.5vw, 20px) clamp(32px, 3vw, 52px)',
            fontSize: 'clamp(16px, 1.3vw, 20px)',
            fontWeight: 600,
            textDecoration: 'none',
            borderRadius: '8px',
            fontFamily: '"Work Sans", sans-serif',
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease'
          }}>
            Browse Available Guides
          </a>
        </div>
      </section>

      {/* ─── SECTION 2: THE PROBLEM ─── */}
      <section style={{
        background: COLORS.white,
        padding: sectionPadding,
        textAlign: 'center'
      }}>
        <div style={containerStyle}>
          <h2 style={{
            fontFamily: headingFont,
            fontSize: 'clamp(26px, 3vw, 42px)',
            color: COLORS.royal,
            marginBottom: '32px',
            lineHeight: 1.2
          }}>
            Nobody Teaches You This Stuff
          </h2>
          <p style={{
            fontFamily: bodyFont,
            fontSize: 'clamp(16px, 1.2vw, 19px)',
            color: COLORS.text,
            lineHeight: 1.9,
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            Not how to get your husband into detox at 3am. Not how to file for an LLC without a lawyer.
            Not what to do when CPS shows up at your door.
            <br /><br />
            Life's hardest moments don't come with instructions. You're supposed to just... figure it out.
            Google it. Piece it together while your hands shake.
            <br /><br />
            <strong>We're building the guides that should exist but don't.</strong>
          </p>
        </div>
      </section>

      {/* ─── SECTION 3: WHAT'S AVAILABLE NOW ─── */}
      <section style={{
        background: COLORS.lightGray,
        padding: sectionPadding
      }}>
        <div style={containerStyle}>
          <h2 style={{
            fontFamily: headingFont,
            fontSize: 'clamp(26px, 3vw, 42px)',
            color: COLORS.royal,
            marginBottom: '16px',
            textAlign: 'center',
            lineHeight: 1.2
          }}>
            Now Available: Addiction Recovery Guides
          </h2>
          <p style={{
            fontFamily: bodyFont,
            fontSize: 'clamp(16px, 1.2vw, 19px)',
            color: COLORS.mediumGray,
            textAlign: 'center',
            marginBottom: '48px',
            maxWidth: '750px',
            margin: '0 auto 48px',
            lineHeight: 1.6
          }}>
            Our first collection helps families navigate the hardest days of loving someone in addiction.
          </p>
          <div style={{
            maxWidth: '780px',
            margin: '0 auto'
          }}>
            {whatsInside.map((item, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '16px',
                marginBottom: '20px',
                padding: '16px 20px',
                background: COLORS.white,
                borderRadius: '8px',
                boxShadow: '0 1px 4px rgba(0,0,0,0.04)'
              }}>
                <span style={{
                  color: COLORS.royal,
                  fontSize: '20px',
                  fontWeight: 700,
                  flexShrink: 0,
                  lineHeight: 1.5
                }}>
                  ✓
                </span>
                <span style={{
                  fontFamily: bodyFont,
                  fontSize: 'clamp(15px, 1.1vw, 17px)',
                  color: COLORS.text,
                  lineHeight: 1.6
                }}>
                  {item}
                </span>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <a href="#guides" style={{
              display: 'inline-block',
              background: COLORS.royal,
              color: COLORS.white,
              padding: 'clamp(14px, 1.5vw, 20px) clamp(32px, 3vw, 52px)',
              fontSize: 'clamp(16px, 1.3vw, 20px)',
              fontWeight: 600,
              textDecoration: 'none',
              borderRadius: '8px',
              fontFamily: '"Work Sans", sans-serif',
              boxShadow: `0 4px 20px rgba(37, 41, 167, 0.25)`,
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}>
              See Recovery Guides
            </a>
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: WHO THIS IS FOR ─── */}
      <section style={{
        background: COLORS.white,
        padding: sectionPadding
      }}>
        <div style={containerStyle}>
          <h2 style={{
            fontFamily: headingFont,
            fontSize: 'clamp(26px, 3vw, 42px)',
            color: COLORS.royal,
            marginBottom: '40px',
            textAlign: 'center',
            lineHeight: 1.2
          }}>
            This Guide Is For You If...
          </h2>
          <div style={{
            maxWidth: '700px',
            margin: '0 auto'
          }}>
            {whoItsFor.map((item, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '16px',
                marginBottom: '22px'
              }}>
                <span style={{
                  color: COLORS.royal,
                  fontSize: 'clamp(18px, 1.4vw, 22px)',
                  fontWeight: 600,
                  flexShrink: 0,
                  lineHeight: 1.5
                }}>
                  →
                </span>
                <span style={{
                  fontFamily: bodyFont,
                  fontSize: 'clamp(16px, 1.2vw, 19px)',
                  color: COLORS.text,
                  lineHeight: 1.6
                }}>
                  {item}
                </span>
              </div>
            ))}
          </div>
          <p style={{
            fontFamily: headingFont,
            fontSize: 'clamp(16px, 1.3vw, 20px)',
            color: COLORS.text,
            fontStyle: 'italic',
            textAlign: 'center',
            marginTop: '48px',
            maxWidth: '700px',
            margin: '48px auto 0',
            lineHeight: 1.7
          }}>
            You don't need another article about "the stages of addiction."
            You need someone to tell you exactly what to do.
          </p>
        </div>
      </section>

      {/* ─── SECTION 5: PRODUCT CARDS ─── */}
      <section id="guides" style={{
        background: COLORS.lightGray,
        padding: sectionPadding
      }}>
        <div className="container" style={{ maxWidth: '1600px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: headingFont,
            fontSize: 'clamp(28px, 3vw, 44px)',
            textAlign: 'center',
            marginBottom: 'clamp(40px, 5vw, 70px)',
            color: COLORS.royal
          }}>
            Choose Your Guide
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
            background: `linear-gradient(135deg, ${COLORS.royal} 0%, ${COLORS.periwinkle} 100%)`,
            color: COLORS.white,
            borderRadius: '8px',
            padding: 'clamp(40px, 5vw, 70px)',
            textAlign: 'center',
            maxWidth: '900px',
            margin: 'clamp(40px, 5vw, 70px) auto 0'
          }}>
            <h3 style={{
              fontFamily: headingFont,
              fontSize: 'clamp(26px, 2.5vw, 38px)',
              marginBottom: '20px'
            }}>
              Complete Recovery Bundle
            </h3>
            <p style={{ fontSize: 'clamp(18px, 1.5vw, 24px)', marginBottom: '30px', fontFamily: bodyFont }}>
              Get all 5 guides. Save $188.
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
              $297
            </p>
            <Link to="/guide/bundle" style={{
              background: COLORS.white,
              color: COLORS.royal,
              padding: 'clamp(14px, 1.5vw, 22px) clamp(40px, 4vw, 60px)',
              fontSize: 'clamp(18px, 1.5vw, 24px)',
              fontWeight: 700,
              textDecoration: 'none',
              borderRadius: '8px',
              display: 'inline-block',
              fontFamily: '"Work Sans", sans-serif'
            }}>
              Get Complete Bundle
            </Link>
          </div>
        </div>
      </section>

      {/* ─── SECTION 6: COMING SOON ─── */}
      <section style={{
        background: `linear-gradient(135deg, ${COLORS.royal} 0%, ${COLORS.periwinkle} 100%)`,
        color: COLORS.white,
        padding: sectionPadding,
        textAlign: 'center'
      }}>
        <div style={containerStyle}>
          <h2 style={{
            fontFamily: headingFont,
            fontSize: 'clamp(26px, 3vw, 42px)',
            marginBottom: '12px',
            lineHeight: 1.2
          }}>
            More Guides In Development
          </h2>
          <p style={{
            fontFamily: bodyFont,
            fontSize: 'clamp(18px, 1.5vw, 24px)',
            marginBottom: '48px',
            opacity: 0.9
          }}>
            The Missing Guide to...
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
            gap: '20px',
            maxWidth: '800px',
            margin: '0 auto 48px'
          }}>
            {comingSoon.map((title, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.12)',
                borderRadius: '8px',
                padding: '20px 24px',
                fontFamily: bodyFont,
                fontSize: 'clamp(15px, 1.2vw, 18px)',
                fontWeight: 500,
                backdropFilter: 'blur(4px)',
                border: '1px solid rgba(255,255,255,0.15)'
              }}>
                {title}
              </div>
            ))}
          </div>

          {/* Waitlist signup */}
          {!waitlistSubmitted ? (
            <div style={{ maxWidth: '500px', margin: '0 auto' }}>
              <p style={{
                fontFamily: bodyFont,
                fontSize: 'clamp(15px, 1.2vw, 18px)',
                marginBottom: '20px',
                opacity: 0.9
              }}>
                Want to know when new guides launch?
              </p>
              <form onSubmit={handleWaitlist} style={{
                display: 'flex',
                gap: '12px',
                flexWrap: 'wrap',
                justifyContent: 'center'
              }}>
                <input
                  type="email"
                  placeholder="you@email.com"
                  value={waitlistEmail}
                  onChange={(e) => setWaitlistEmail(e.target.value)}
                  required
                  style={{
                    flex: '1 1 260px',
                    padding: '14px 20px',
                    borderRadius: '8px',
                    border: 'none',
                    fontSize: '16px',
                    fontFamily: bodyFont,
                    outline: 'none',
                    minWidth: '0'
                  }}
                />
                <button type="submit" style={{
                  background: COLORS.white,
                  color: COLORS.royal,
                  border: 'none',
                  padding: '14px 28px',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '16px',
                  fontFamily: '"Work Sans", sans-serif',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}>
                  Join Waitlist
                </button>
              </form>
            </div>
          ) : (
            <p style={{
              fontFamily: bodyFont,
              fontSize: 'clamp(16px, 1.3vw, 20px)',
              fontWeight: 600
            }}>
              You're on the list! We'll let you know when new guides drop.
            </p>
          )}
        </div>
      </section>

      {/* ─── SECTION 7: TRUST / CREDIBILITY ─── */}
      <section style={{
        background: COLORS.white,
        padding: sectionPadding,
        textAlign: 'center'
      }}>
        <div style={containerStyle}>
          <h2 style={{
            fontFamily: headingFont,
            fontSize: 'clamp(26px, 3vw, 42px)',
            color: COLORS.royal,
            marginBottom: '32px',
            lineHeight: 1.2
          }}>
            Built By Someone Who Gets It
          </h2>
          <p style={{
            fontFamily: bodyFont,
            fontSize: 'clamp(16px, 1.2vw, 19px)',
            color: COLORS.text,
            lineHeight: 1.9,
            maxWidth: '750px',
            margin: '0 auto 36px'
          }}>
            I built the first guide because I needed it and it didn't exist. I've been the one in crisis.
            I've been the one Googling at 2am. I've been the one who showed up too late.
            <br /><br />
            Every guide in this collection comes from real experience — not theory, not textbooks.
            Just practical help for the worst days of your life.
          </p>
          <Link to="/about" style={{
            fontFamily: '"Work Sans", sans-serif',
            fontSize: 'clamp(16px, 1.3vw, 20px)',
            color: COLORS.royal,
            fontWeight: 600,
            textDecoration: 'none',
            borderBottom: `2px solid ${COLORS.periwinkle}`,
            paddingBottom: '2px'
          }}>
            Read My Story →
          </Link>
        </div>
      </section>

      {/* ─── SECTION 8: FINAL CTA ─── */}
      <section style={{
        background: COLORS.lightGray,
        padding: sectionPadding,
        textAlign: 'center'
      }}>
        <div style={{ ...containerStyle, maxWidth: '800px' }}>
          <h2 style={{
            fontFamily: headingFont,
            fontSize: 'clamp(26px, 3vw, 42px)',
            color: COLORS.royal,
            marginBottom: '24px',
            lineHeight: 1.2
          }}>
            You Found This Page For A Reason
          </h2>
          <p style={{
            fontFamily: bodyFont,
            fontSize: 'clamp(16px, 1.2vw, 19px)',
            color: COLORS.text,
            lineHeight: 1.8,
            marginBottom: '40px'
          }}>
            You're not here by accident. You're here because someone you love is struggling and you need help.
            The guide is ready. Your next step is clear.
          </p>
          <a href="#guides" style={{
            display: 'inline-block',
            background: COLORS.royal,
            color: COLORS.white,
            padding: 'clamp(16px, 1.5vw, 22px) clamp(36px, 4vw, 60px)',
            fontSize: 'clamp(18px, 1.5vw, 22px)',
            fontWeight: 700,
            textDecoration: 'none',
            borderRadius: '8px',
            fontFamily: '"Work Sans", sans-serif',
            boxShadow: `0 4px 20px rgba(37, 41, 167, 0.3)`,
            transition: 'transform 0.2s ease, box-shadow 0.2s ease'
          }}>
            Get Your Guide Now
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}

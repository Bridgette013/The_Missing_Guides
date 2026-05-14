import Header from '../components/Header'
import Footer from '../components/Footer'
import LegalLayout, { legalStyles } from '../components/LegalLayout'

/* ADA-semantic medical callout palettes are intentionally hardcoded
   (yellow-warning + red-emergency). They are compliance-regulated,
   color-blind-tested signals — same reasoning as public/templates/
   recovery guide PDFs. Do not tokenize. */
const warningCallout = {
  background: '#FFF3CD',
  border: '3px solid #FFC107',
  borderRadius: '8px',
  padding: '24px 28px',
  margin: '24px 0 32px',
}
const warningHeading = { color: '#856404', fontWeight: 700, fontSize: '20px', margin: '0 0 12px' }
const warningText = { color: '#856404', margin: 0 }

const emergencyCallout = {
  background: '#DC3545',
  color: '#FFFFFF',
  borderRadius: '8px',
  padding: '28px 32px',
  margin: '32px 0',
}
const emergencyHeading = { fontSize: '24px', fontWeight: 700, margin: '0 0 16px' }
const emergencyList = { listStyle: 'none', padding: 0, margin: 0, lineHeight: 1.9, fontSize: '18px' }

export default function Disclaimer() {
  return (
    <div>
      <Header />
      <LegalLayout
        title="Medical Disclaimer"
        lastUpdated="January 27, 2026"
        entity="VVV Digitals LLC • The Missing Guides"
      >
        <p><strong>IMPORTANT: Please read carefully.</strong></p>

        {/* ADA medical-warning callout — yellow per WCAG warning-state convention */}
        <aside style={warningCallout} role="note" aria-label="Medical advice notice">
          <p style={warningHeading}>
            The Missing Guides provides educational information and practical guidance for families navigating a loved one's addiction treatment.
          </p>
          <p style={warningText}><strong>This is NOT medical advice.</strong></p>
        </aside>

        <h2>What This Guide IS:</h2>
        <ul>
          <li>A comprehensive resource for understanding treatment processes</li>
          <li>Practical checklists and forms for organizing information</li>
          <li>Questions to ask healthcare providers</li>
          <li>Navigation tools for the healthcare system</li>
        </ul>

        <h2>What This Guide is NOT:</h2>
        <ul>
          <li>Medical advice, diagnosis, or treatment recommendations</li>
          <li>A substitute for professional medical care</li>
          <li>Emergency medical services</li>
          <li>Licensed counseling or therapy</li>
        </ul>

        <h2>Your Responsibilities:</h2>
        <ul>
          <li><strong>Always consult qualified healthcare professionals</strong> for medical decisions</li>
          <li><strong>Call 911 immediately</strong> for medical emergencies</li>
          <li>Follow your loved one's treatment team recommendations</li>
          <li>Verify all information with licensed providers</li>
        </ul>

        {/* ADA emergency-resources callout — red per WCAG emergency-state convention */}
        <aside style={emergencyCallout} role="alert" aria-label="Emergency resources">
          <h2 style={emergencyHeading}>Emergency Resources</h2>
          <ul style={emergencyList}>
            <li><strong>Emergency:</strong> 911</li>
            <li><strong>Suicide Prevention Lifeline:</strong> 988</li>
            <li><strong>SAMHSA National Helpline:</strong> 1-800-662-4357 <span style={{ fontSize: '15px', opacity: 0.85 }}>(24/7, free, confidential)</span></li>
          </ul>
        </aside>

        <h2>Limitation of Liability</h2>
        <p>
          VVV Digitals LLC and The Missing Guides provide this information "as is" without warranty of any kind. We are not liable for any decisions made based on this information. Always seek professional medical advice.
        </p>

        <aside className={legalStyles.callout}>
          <p>
            <strong>By purchasing and using this guide, you acknowledge that you understand and agree to this disclaimer.</strong>
          </p>
          <p>
            This disclaimer is a legal requirement to protect both you and us. It ensures you understand the nature of the guide and seek appropriate medical care.
          </p>
        </aside>
      </LegalLayout>
      <Footer />
    </div>
  )
}

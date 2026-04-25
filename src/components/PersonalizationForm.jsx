import { useState } from 'react'
import styles from './PersonalizationForm.module.css'

export default function PersonalizationForm({ guideId, onSubmit }) {
  const [formData, setFormData] = useState({
    caregiverName: '',
    patientName: '',
    pronouns: 'they/them',
    relationship: '',
    emergencyContact: '',
    zip: '',
    hospital: '',
    email: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2 className={styles.heading}>Personalize Your Guide</h2>
      <p className={styles.subheading}>
        We'll customize the guide with your information throughout.
      </p>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="caregiverName">Your Name *</label>
        <input
          type="text" id="caregiverName" name="caregiverName"
          value={formData.caregiverName} onChange={handleChange}
          required className={styles.input} placeholder="e.g., Sarah"
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="patientName">Patient/Loved One's Name *</label>
        <input
          type="text" id="patientName" name="patientName"
          value={formData.patientName} onChange={handleChange}
          required className={styles.input} placeholder="e.g., Michael"
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="pronouns">Preferred Pronouns *</label>
        <select
          id="pronouns" name="pronouns"
          value={formData.pronouns} onChange={handleChange}
          className={styles.input}
        >
          <option value="they/them">they/them</option>
          <option value="he/him">he/him</option>
          <option value="she/her">she/her</option>
        </select>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="relationship">Your Relationship</label>
        <input
          type="text" id="relationship" name="relationship"
          value={formData.relationship} onChange={handleChange}
          className={styles.input} placeholder="e.g., Mother, Partner, Friend"
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="emergencyContact">Emergency Contact Phone</label>
        <input
          type="tel" id="emergencyContact" name="emergencyContact"
          value={formData.emergencyContact} onChange={handleChange}
          className={styles.input} placeholder="e.g., (555) 123-4567"
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="zip">ZIP Code</label>
        <input
          type="text" id="zip" name="zip"
          value={formData.zip} onChange={handleChange}
          className={styles.input} placeholder="e.g., 12345" maxLength="5"
        />
        <small className={styles.hint}>
          Used to find local hospitals and treatment facilities.
        </small>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="hospital">Hospital/Treatment Center Name</label>
        <input
          type="text" id="hospital" name="hospital"
          value={formData.hospital} onChange={handleChange}
          className={styles.input} placeholder="e.g., County Medical Center"
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="email">Email Address *</label>
        <input
          type="email" id="email" name="email"
          value={formData.email} onChange={handleChange}
          required className={styles.input} placeholder="your@email.com"
        />
        <small className={styles.hint}>
          We'll send your personalized guide here.
        </small>
      </div>

      <button type="submit" className={styles.button}>
        Preview &amp; Purchase
      </button>
    </form>
  )
}

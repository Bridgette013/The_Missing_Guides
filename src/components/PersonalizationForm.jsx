import { useState } from 'react'

export default function PersonalizationForm({ guideId, onSubmit }) {
  const [formData, setFormData] = useState({
    caregiverName: '',
    patientName: '',
    pronouns: 'they/them',
    relationship: '',
    emergencyContact: '',
    hospital: '',
    email: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const formStyle = {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '40px',
    background: '#F8F9FA',
    borderRadius: '8px'
  }

  const fieldStyle = {
    marginBottom: '20px'
  }

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontWeight: 600,
    color: '#20201D'
  }

  const inputStyle = {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    border: '2px solid #9A9DE7',
    borderRadius: '6px',
    fontFamily: 'Inter, sans-serif'
  }

  const buttonStyle = {
    width: '100%',
    padding: '16px',
    fontSize: '18px',
    fontWeight: 600,
    background: '#2529A7',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontFamily: '"Work Sans", sans-serif'
  }

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2 style={{
        fontFamily: '"Merriweather", serif',
        fontSize: '28px',
        marginBottom: '10px',
        color: '#2529A7',
        textAlign: 'center'
      }}>
        Personalize Your Guide
      </h2>
      <p style={{
        textAlign: 'center',
        marginBottom: '30px',
        color: '#8E8E8B'
      }}>
        We'll customize the guide with your information throughout.
      </p>

      <div style={fieldStyle}>
        <label style={labelStyle} htmlFor="caregiverName">Your Name *</label>
        <input 
          type="text" 
          id="caregiverName"
          name="caregiverName"
          value={formData.caregiverName}
          onChange={handleChange}
          required
          style={inputStyle}
          placeholder="e.g., Sarah"
        />
      </div>

      <div style={fieldStyle}>
        <label style={labelStyle} htmlFor="patientName">Patient/Loved One's Name *</label>
        <input 
          type="text" 
          id="patientName"
          name="patientName"
          value={formData.patientName}
          onChange={handleChange}
          required
          style={inputStyle}
          placeholder="e.g., Michael"
        />
      </div>

      <div style={fieldStyle}>
        <label style={labelStyle} htmlFor="pronouns">Preferred Pronouns *</label>
        <select 
          id="pronouns"
          name="pronouns"
          value={formData.pronouns}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="they/them">they/them</option>
          <option value="he/him">he/him</option>
          <option value="she/her">she/her</option>
        </select>
      </div>

      <div style={fieldStyle}>
        <label style={labelStyle} htmlFor="relationship">Your Relationship</label>
        <input 
          type="text" 
          id="relationship"
          name="relationship"
          value={formData.relationship}
          onChange={handleChange}
          style={inputStyle}
          placeholder="e.g., Mother, Partner, Friend"
        />
      </div>

      <div style={fieldStyle}>
        <label style={labelStyle} htmlFor="emergencyContact">Emergency Contact Phone</label>
        <input 
          type="tel" 
          id="emergencyContact"
          name="emergencyContact"
          value={formData.emergencyContact}
          onChange={handleChange}
          style={inputStyle}
          placeholder="e.g., (555) 123-4567"
        />
      </div>

      <div style={fieldStyle}>
        <label style={labelStyle} htmlFor="hospital">Hospital/Treatment Center Name</label>
        <input 
          type="text" 
          id="hospital"
          name="hospital"
          value={formData.hospital}
          onChange={handleChange}
          style={inputStyle}
          placeholder="e.g., County Medical Center"
        />
      </div>

      <div style={fieldStyle}>
        <label style={labelStyle} htmlFor="email">Email Address *</label>
        <input 
          type="email" 
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          style={inputStyle}
          placeholder="your@email.com"
        />
        <small style={{ color: '#8E8E8B', display: 'block', marginTop: '5px' }}>
          We'll send your personalized guide here.
        </small>
      </div>

      <button type="submit" style={buttonStyle}>
        Preview & Purchase
      </button>
    </form>
  )
}

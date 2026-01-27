import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/Header'
import PersonalizationForm from '../components/PersonalizationForm'

export default function GuidePage() {
  const { guideId } = useParams()
  const [showForm, setShowForm] = useState(true)

  const handleFormSubmit = async (formData) => {
    // Call Netlify Function to create Stripe checkout
    const response = await fetch('/.netlify/functions/create-checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        guideId,
        personalizationData: formData,
        isBundle: guideId === 'bundle'
      })
    })
    const { url } = await response.json()
    window.location.href = url
  }

  return (
    <div>
      <Header />
      <div style={{ padding: 'clamp(40px, 6vw, 80px) clamp(20px, 5vw, 80px)' }}>
        {showForm && <PersonalizationForm guideId={guideId} onSubmit={handleFormSubmit} />}
      </div>
    </div>
  )
}

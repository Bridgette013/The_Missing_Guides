import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import PersonalizationForm from '../components/PersonalizationForm'

export default function GuidePage() {
  const { guideId } = useParams()
  const [showForm, setShowForm] = useState(true)

  const handleFormSubmit = async (formData) => {
    try {
      console.log('Submitting form with data:', formData)
      console.log('Guide ID:', guideId)

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

      console.log('Response status:', response.status)

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Error response:', errorText)
        alert('Error creating checkout. Check console for details.')
        return
      }

      const data = await response.json()
      console.log('Checkout data:', data)

      if (data.url) {
        console.log('Redirecting to:', data.url)
        window.location.href = data.url
      } else {
        console.error('No URL in response:', data)
        alert('No checkout URL received')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      alert('Error: ' + error.message)
    }
  }

  return (
    <div>
      <Header />
      <div style={{ padding: '60px 20px' }}>
        {showForm && <PersonalizationForm guideId={guideId} onSubmit={handleFormSubmit} />}
      </div>
      <Footer />
    </div>
  )
}
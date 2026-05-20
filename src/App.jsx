import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AboutPage from './pages/AboutPage'
import GuidePage from './pages/GuidePage'
import Preview from './pages/Preview'
import Success from './pages/Success'
import Terms from './pages/Terms'
import Privacy from './pages/Privacy'
import Refund from './pages/Refund'
import Disclaimer from './pages/Disclaimer'
import Blog from './pages/Blog'
import ClosingTheGap from './pages/blog/ClosingTheGap'
import Store from './pages/Store'
import ProductPage from './pages/ProductPage'
import ThankYou from './pages/store/ThankYou'
import VaCalculator from './pages/tools/VaCalculator'
import LicenseGate from './components/store/LicenseGate'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/guide/:guideId" element={<GuidePage />} />
        <Route path="/preview" element={<Preview />} />
        <Route path="/success" element={<Success />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/refund" element={<Refund />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/closing-the-gap" element={<ClosingTheGap />} />
        <Route path="/store" element={<Store />} />
        <Route path="/store/:slug" element={<ProductPage />} />
        <Route path="/store/:slug/thank-you" element={<ThankYou />} />
        <Route
          path="/tools/va-calculator"
          element={
            <LicenseGate slug="va-toolkit">
              <VaCalculator />
            </LicenseGate>
          }
        />
      </Routes>
    </Router>
  )
}

export default App

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import GuidePage from './pages/GuidePage'
import Preview from './pages/Preview'
import Success from './pages/Success'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/guide/:guideId" element={<GuidePage />} />
        <Route path="/preview" element={<Preview />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </Router>
  )
}

export default App

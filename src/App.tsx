import { BrowserRouter, Routes, Route } from "react-router-dom"
import Landing from "./pages/Landing"
import Dashboard from "./pages/Dashboard"
import Detect from "./pages/Detect"
import Navbar from "./components/Navbar"

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/detect" element={<Detect />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

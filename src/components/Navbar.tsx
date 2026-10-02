import { Link } from "react-router-dom"
function Navbar() { return <nav className="navbar"><Link className="brand" to="/">Phishing URL Detector</Link><div><Link to="/detect">Detect</Link><Link to="/dashboard">Dashboard</Link></div></nav> }
export default Navbar

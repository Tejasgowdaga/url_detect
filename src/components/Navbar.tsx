import { Link } from "react-router-dom"

function Navbar() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 40px",
        background: "#111827",
      }}
    >
      <h2 style={{ fontSize: "20px" }}>
        AI Fraud Detection
      </h2>

      <div style={{ display: "flex", gap: "20px" }}>
        <Link to="/" style={{ textDecoration: "none", color: "white" }}>
          Home
        </Link>

        <Link to="/dashboard" style={{ textDecoration: "none", color: "white" }}>
          Dashboard
        </Link>

        <Link to="/detect" style={{ textDecoration: "none", color: "white" }}>
          Detect Fraud
        </Link>
      </div>
    </div>
  )
}

export default Navbar

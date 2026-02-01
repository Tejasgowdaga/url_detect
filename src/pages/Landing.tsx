import { useNavigate } from "react-router-dom"

function Landing() {
  const navigate = useNavigate()

  return (
    <div style={{ padding: "40px" }}>
      <h1 style={{ fontSize: "48px" }}>
        AI Fraud Detection System
      </h1>

      <p style={{ marginTop: "16px", fontSize: "18px" }}>
        Detect suspicious transactions using AI in real time
      </p>

      <button
        style={{ marginTop: "24px", padding: "10px 20px" }}
        onClick={() => navigate("/dashboard")}
      >
        Go to Dashboard
      </button>
    </div>
  )
}

export default Landing

import { useState } from "react"

function Detect() {
  const [amount, setAmount] = useState("")
  const [location, setLocation] = useState("")
  const [device, setDevice] = useState("")
  const [result, setResult] = useState<null | {
    status: string
    confidence: string
  }>(null)

  const handleDetect = () => {
    // Fake AI logic (hackathon-friendly)
    if (Number(amount) > 50000) {
      setResult({
        status: "Fraud Detected ❌",
        confidence: "92%",
      })
    } else {
      setResult({
        status: "Legit Transaction ✅",
        confidence: "96%",
      })
    }
  }

  return (
    <div style={{ padding: "40px", maxWidth: "500px" }}>
      <h1 style={{ fontSize: "32px", marginBottom: "24px" }}>
        Detect Fraud
      </h1>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <input
          placeholder="Transaction Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{ padding: "10px" }}
        />

        <input
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={{ padding: "10px" }}
        />

        <input
          placeholder="Device Type"
          value={device}
          onChange={(e) => setDevice(e.target.value)}
          style={{ padding: "10px" }}
        />

        <button
          onClick={handleDetect}
          style={{
            padding: "12px",
            marginTop: "12px",
            fontSize: "16px",
          }}
        >
          Detect Fraud
        </button>
      </div>

      {result && (
        <div
          style={{
            marginTop: "24px",
            padding: "16px",
            borderRadius: "8px",
            background: "#1f2933",
          }}
        >
          <h3>{result.status}</h3>
          <p>Confidence: {result.confidence}</p>
        </div>
      )}
    </div>
  )
}

export default Detect

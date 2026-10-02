import { FormEvent, useState } from "react"

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000"

type Result = {
  url: string
  label: "phishing" | "legitimate"
  confidence: number
  phishing_probability: number
  legitimate_probability: number
  features: Record<string, number>
}

function Detect() {
  const [url, setUrl] = useState("")
  const [result, setResult] = useState<Result | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleDetect = async (event: FormEvent) => {
    event.preventDefault()
    setError("")
    setResult(null)
    setLoading(true)
    try {
      const response = await fetch(`${API_URL}/api/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || "Prediction failed")
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not connect to the API")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="page narrow">
      <p className="eyebrow">LIVE MODEL PREDICTION</p>
      <h1>Analyse a URL</h1>
      <p className="muted">The backend extracts URL-level features and sends them to the trained Random Forest model.</p>

      <form className="url-form" onSubmit={handleDetect}>
        <input aria-label="URL" placeholder="https://example.com/login" value={url} onChange={(e) => setUrl(e.target.value)} />
        <button type="submit" disabled={loading || !url.trim()}>{loading ? "Analysing..." : "Analyse"}</button>
      </form>
      {error && <div className="error">{error}</div>}

      {result && (
        <section className={`result ${result.label}`}>
          <div className="result-heading">
            <div>
              <p className="eyebrow">CLASSIFICATION</p>
              <h2>{result.label === "phishing" ? "Phishing URL" : "Likely legitimate URL"}</h2>
            </div>
            <div className="confidence">{result.confidence}%<span>confidence</span></div>
          </div>
          <p className="url-value">{result.url}</p>
          <div className="probabilities">
            <div><span>Phishing probability</span><strong>{result.phishing_probability}%</strong></div>
            <div><span>Legitimate probability</span><strong>{result.legitimate_probability}%</strong></div>
          </div>
          <h3>Extracted URL features</h3>
          <div className="feature-list">
            {Object.entries(result.features).map(([name, value]) => (
              <div className="feature" key={name}><span>{name.replaceAll("_", " ")}</span><strong>{value}</strong></div>
            ))}
          </div>
        </section>
      )}
    </main>
  )
}
export default Detect

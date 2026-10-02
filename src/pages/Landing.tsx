import { useNavigate } from "react-router-dom"

function Landing() {
  const navigate = useNavigate()
  return (
    <main className="page hero">
      <section className="hero-card">
        <p className="eyebrow">MACHINE LEARNING • CYBERSECURITY</p>
        <h1>Phishing URL Detection System</h1>
        <p className="lead">
          Analyse URL structure with a Random Forest classifier and identify whether a URL is likely legitimate or phishing.
        </p>
        <button onClick={() => navigate("/detect")}>Analyse a URL</button>
        <div className="feature-grid">
          <div><strong>URL-only features</strong><span>Lexical and structural signals extracted directly from the URL.</span></div>
          <div><strong>Random Forest</strong><span>Supervised classification with reproducible train/test evaluation.</span></div>
          <div><strong>Explainable output</strong><span>View the features extracted for every prediction.</span></div>
        </div>
      </section>
    </main>
  )
}
export default Landing

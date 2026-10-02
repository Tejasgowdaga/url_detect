import { useEffect, useState } from "react"

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000"
type Metrics = { accuracy:number; precision:number; recall:number; f1:number; dataset_rows_after_cleaning:number; train_rows:number; test_rows:number; duplicates_removed:number }

function Dashboard() {
  const [metrics, setMetrics] = useState<Metrics | null>(null)
  useEffect(() => { fetch(`${API_URL}/api/metrics`).then(r => r.json()).then(setMetrics).catch(() => setMetrics(null)) }, [])
  return (
    <main className="page">
      <p className="eyebrow">MODEL OVERVIEW</p>
      <h1>Model Dashboard</h1>
      <p className="muted">Evaluation statistics generated from the training pipeline. No hard-coded performance figures.</p>
      {metrics ? <>
        <div className="stat-grid">
          <Stat label="Accuracy" value={`${(metrics.accuracy*100).toFixed(2)}%`} />
          <Stat label="Precision" value={`${(metrics.precision*100).toFixed(2)}%`} />
          <Stat label="Recall" value={`${(metrics.recall*100).toFixed(2)}%`} />
          <Stat label="F1 Score" value={`${(metrics.f1*100).toFixed(2)}%`} />
        </div>
        <section className="panel">
          <h2>Training dataset</h2>
          <div className="detail-grid">
            <Stat label="Clean rows" value={metrics.dataset_rows_after_cleaning.toLocaleString()} />
            <Stat label="Training rows" value={metrics.train_rows.toLocaleString()} />
            <Stat label="Test rows" value={metrics.test_rows.toLocaleString()} />
            <Stat label="Duplicates removed" value={metrics.duplicates_removed.toLocaleString()} />
          </div>
        </section>
      </> : <div className="panel">Start the Flask backend and train the model to load metrics.</div>}
    </main>
  )
}
function Stat({label,value}:{label:string;value:string}) { return <div className="stat"><span>{label}</span><strong>{value}</strong></div> }
export default Dashboard

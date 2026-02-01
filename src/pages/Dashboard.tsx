import StatCard from "../components/StatCard"
import ChartBox from "../components/ChartBox"
import TransactionTable from "../components/TransactionTable"

function Dashboard() {
  return (
    <div style={{ padding: "40px" }}>
      <h1 style={{ fontSize: "36px", marginBottom: "24px" }}>
        Dashboard
      </h1>

      <div style={{ display: "flex", gap: "20px" }}>
        <StatCard title="Total Transactions" value="12,430" />
        <StatCard title="Fraud Detected" value="312" />
        <StatCard title="Fraud Rate" value="2.5%" />
        <StatCard title="Model Accuracy" value="96.4%" />
      </div>

      <ChartBox />

      <TransactionTable />
    </div>
  )
}

export default Dashboard

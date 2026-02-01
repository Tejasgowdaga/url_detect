import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const lineData = [
  { day: "Mon", transactions: 400, fraud: 20 },
  { day: "Tue", transactions: 300, fraud: 15 },
  { day: "Wed", transactions: 500, fraud: 30 },
  { day: "Thu", transactions: 200, fraud: 10 },
  { day: "Fri", transactions: 600, fraud: 40 },
]

const pieData = [
  { name: "Legit", value: 95 },
  { name: "Fraud", value: 5 },
]

const COLORS = ["#22c55e", "#ef4444"]

function ChartBox() {
  return (
    <div style={{ display: "flex", gap: "40px", marginTop: "40px" }}>
      {/* Line Chart */}
      <div style={{ width: "60%", height: "300px" }}>
        <h3>Transactions vs Fraud</h3>
        <ResponsiveContainer>
          <LineChart data={lineData}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="transactions" stroke="#3b82f6" />
            <Line type="monotone" dataKey="fraud" stroke="#ef4444" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div style={{ width: "40%", height: "300px" }}>
        <h3>Fraud Distribution</h3>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              outerRadius={100}
              label
            >
              {pieData.map((_, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default ChartBox

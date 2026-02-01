type StatCardProps = {
  title: string
  value: string
}

function StatCard({ title, value }: StatCardProps) {
  return (
    <div
      style={{
        background: "#1f2933",
        padding: "20px",
        borderRadius: "12px",
        width: "220px",
      }}
    >
      <p style={{ color: "#9ca3af", fontSize: "14px" }}>{title}</p>
      <h2 style={{ fontSize: "28px", marginTop: "8px" }}>{value}</h2>
    </div>
  )
}

export default StatCard

const transactions = [
  { id: "TXN001", amount: 1200, status: "Legit", risk: "Low" },
  { id: "TXN002", amount: 45000, status: "Legit", risk: "Medium" },
  { id: "TXN003", amount: 78000, status: "Fraud", risk: "High" },
  { id: "TXN004", amount: 15000, status: "Legit", risk: "Low" },
  { id: "TXN005", amount: 92000, status: "Fraud", risk: "High" },
]

function TransactionTable() {
  return (
    <div style={{ marginTop: "40px" }}>
      <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>
        Recent Transactions
      </h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "#020617",
          border: "1px solid #1e293b",
          borderRadius: "8px",
        }}
      >
        <thead>
          <tr style={{ borderBottom: "1px solid #1e293b" }}>
            <th style={{ padding: "12px 0", textAlign: "left" }}>
              Transaction ID
            </th>
            <th style={{ padding: "12px 0", textAlign: "left" }}>
              Amount
            </th>
            <th style={{ padding: "12px 0", textAlign: "left" }}>
              Status
            </th>
            <th style={{ padding: "12px 0", textAlign: "left" }}>
              Risk
            </th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((tx) => (
            <tr
              key={tx.id}
              style={{ borderBottom: "1px solid #1e293b" }}
            >
              <td style={{ padding: "12px 0" }}>
                {tx.id}
              </td>

              <td style={{ padding: "12px 0" }}>
                ₹{tx.amount}
              </td>

              <td
                style={{
                  padding: "12px 0",
                  color:
                    tx.status === "Fraud"
                      ? "#ef4444"
                      : "#22c55e",
                }}
              >
                {tx.status}
              </td>

              <td style={{ padding: "12px 0" }}>
                {tx.risk}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TransactionTable

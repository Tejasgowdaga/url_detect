import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"

document.body.style.backgroundColor = "#020617"
document.body.style.color = "white"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

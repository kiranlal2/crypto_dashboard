import React from "react";
import ReactDOM from "react-dom/client";
import Dashboard from "./App";
import { PortfolioProvider } from "./context/PortfolioContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PortfolioProvider>
      <Dashboard />
    </PortfolioProvider>
  </React.StrictMode>
);

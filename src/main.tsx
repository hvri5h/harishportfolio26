import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "dialkit/styles.css";
import App from "./App.tsx";
import { DialRoot } from "dialkit";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <DialRoot />
  </StrictMode>,
);

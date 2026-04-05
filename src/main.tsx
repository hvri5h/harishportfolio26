import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Portfolio from "./App";
import { initTracker } from "./lib/tracker";

// Initialize tracker outside React render cycle
initTracker();

const Analytics = lazy(() => import("./pages/Analytics"));
const Anthropic = lazy(() => import("./pages/Anthropic"));

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route
          path="/analytics"
          element={
            <Suspense
              fallback={
                <div
                  style={{
                    minHeight: "100vh",
                    background: "#0a0a0a",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#888",
                  }}
                >
                  Loading...
                </div>
              }
            >
              <Analytics />
            </Suspense>
          }
        />
        <Route
          path="/anthropic"
          element={
            <Suspense
              fallback={
                <div
                  style={{
                    minHeight: "100vh",
                    background: "#292824",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#888",
                  }}
                >
                  Loading...
                </div>
              }
            >
              <Anthropic />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

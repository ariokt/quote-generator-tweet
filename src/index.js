import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import QuoteApp from "./App";
import "./index.css";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <QuoteApp />
  </StrictMode>
);

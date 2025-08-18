import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { categoryApi } from "./api/categories.ts";
import { BrowserRouter } from "react-router-dom";
import Index from "./pages/Index.tsx";
import { Provider } from "react-redux";
import { store } from "./api/api";
createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <StrictMode>
        <Index />
      </StrictMode>
    </Provider>
  </BrowserRouter>
);

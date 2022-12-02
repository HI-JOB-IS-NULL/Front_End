import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "antd/dist/antd.css";
import "@mui/icons-material"
import 'bootstrap/dist/css/bootstrap.min.css';

// import "antd/dist/antd.css";
import "@mui/icons-material";
import "bootstrap/dist/css/bootstrap.min.css";
import { QueryClientProvider, QueryClient } from "react-query";

ReactDOM.createRoot(document.getElementById("root")).render(
    //QueryClientProvider
    <App />
);

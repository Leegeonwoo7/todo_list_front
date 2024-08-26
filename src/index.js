import React from 'react';
import * as ReactDom from "react-dom";
import './index.css';
import reportWebVitals from './reportWebVitals';
import AppRouter from "./AppRoute";

ReactDom.render(
  <React.StrictMode>
      <AppRouter />
  </React.StrictMode>,
    document.getElementById("root")
);

reportWebVitals();

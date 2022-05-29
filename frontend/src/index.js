import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
//import App from './App';
import Analyze from "./pages/Analyze";
import Home from "./pages/Home";
//import Layout from './pages/Layout';
import SelectMenus from "./pages/SelectMenus";
import reportWebVitals from './reportWebVitals';

export default function Main() {
  return (
    <BrowserRouter>
      <Routes>
          <Route index element={<Home />} />
          <Route path="SelectMenus" element={<SelectMenus />} />
          <Route path="Analyze" element={<Analyze />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

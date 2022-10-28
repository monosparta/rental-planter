import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Main from "./pages/Main.js";
import Admin from "./pages/Admin";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.js";
import RentForm from "./pages/RentForm";
import Register from "./pages/Register";
import ForgetPwd from "./pages/ForgetPwd";
import ResetPwd from "./pages/ResetPwd";
import EditRent from "./pages/EditRent";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/main" element={<Main />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/rentForm/:id" element={<RentForm />} />
      <Route path="/rent/edit/:id" element={<EditRent />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgetPwd" element={<ForgetPwd />} />
      <Route path="/resetPwd" element={<ResetPwd />} />
      <Route path="*" element={<h1>404 Page Not Found</h1>} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

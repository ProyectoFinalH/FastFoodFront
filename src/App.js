/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./tailwind.css";
import LoginAdmin from "./Components/Login/Login_Admin/Login_Admin";
import LoginPrincipal from "./Components/Login/Login_Principal/Login_Principal";
import Account from "./views/account/account";
import Home from "./views/home/home";
import Menu from "./views/menu/menu";
import CreateMenuForm from "./Components/createMenu/createMenu";
import Carrito from "./Components/Carrito/Carrito";
import RespuestaCarr from "./Components/Carrito/Respuesta_Carrito";
import MisCompras from "./Components/MisCompras/MisCompras";
import Company from "./views/company/company";
import DetailCompany from "./views/company/detailCompany/detailCompany";
import Admin from "./views/admin/admin";
import { AuthProvider } from "./AuthContext/AuthContext";
import ProtectedRoute from "./AuthContext/ProtectedRoute";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import ScrollToTopButton from "./Components/scrollTop/scrollTop";
import OrderUsers from "./views/Orders_User/Order_User";
import Maintenance from "./views/maintenance/maintenance";
import axios from "axios";
import Loading from "./Components/loading/Loading";

import Rating from "./Components/rating/rating";

function App() {
  return (
    <div className="bg-darkWhite min-h-screen">
      <AuthProvider>
        <Routes>
          <Route path="/LoginAdmin" element={<LoginAdmin />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/company" element={<Company />} />
          <Route path="/restaurants/:id" element={<DetailCompany />} />
          <Route path="/reviews" element={<Rating />} />
          <Route path="/" element={<LoginPrincipal />} />
          <Route path="/home" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/menu/:id" element={<Menu />} />
          <Route path="/account" element={<Account />} />
          <Route path="/menu/create" element={<CreateMenuForm />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/miscompras" element={<MisCompras />} />
          <Route path="/userorders" element={<OrderUsers />} />{" "}
          <Route path="/respuestacarrito" element={<RespuestaCarr />} />
          <Route
            path="/dashboard"
            element={<ProtectedRoute component={Dashboard} />}
          />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
        <ScrollToTopButton />
      </AuthProvider>
    </div>
  );
}

export default App;

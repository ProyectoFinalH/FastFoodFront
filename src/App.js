import React from "react";
import "./App.css";
import LoginAdmin from "./Components/Login/Login_Admin/Login_Admin";
import LoginPrincipal from "./Components/Login/Login_Principal/Login_Principal";
import Detail from "./views/detail/detail";
import Account from "./views/account/account";
import Home from "./views/home/home";
import Menu from "./views/menu/menu";
import CreateMenuForm from "./Components/createMenu/createMenu";
import Carrito from "./Components/Carrito/Carrito";
import MisCompras from "./Components/MisCompras/MisCompras";

import Company from "./views/company/company";

import DetailCompany from "./views/company/detailCompany/detailCompany";
import Admin from "./views/admin/admin";

import { AuthProvider } from "./AuthContext/AuthContext";
import ProtectedRoute from "./AuthContext/ProtectedRoute";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard"; // Verifica que esta ruta sea correcta

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route path="/company" element={<Company />} />
          <Route path="/restaurants/:id" element={<DetailCompany />} />

          <Route path="/" element={<LoginPrincipal />} />
          <Route path="/LoginAdmin" element={<LoginAdmin />} />
          <Route path="/home" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/menu/:id" element={<Detail />} />
          <Route path="/account" element={<Account />} />
          <Route path="/menu/create" element={<CreateMenuForm />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/miscompras" element={<MisCompras />} />
          <Route
            path="/dashboard"
            element={<ProtectedRoute component={Dashboard} />}
          />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;

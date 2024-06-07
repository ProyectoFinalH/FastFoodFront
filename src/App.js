import "./App.css";
import LoginAdmin from "./Components/Login/Login_Admin/Login_Admin";
import LoginPrincipal from "./Components/Login/Login_Principal/Login_Principal";
import Detail from "./views/detail/detail";
import Account from "./views/account/account";
import Home from "./views/home/home";
import Menu from "./views/menu/menu";
import CreateMenuForm from "./Components/createMenu/createMenu";

import { Routes, Route } from "react-router-dom";
import Company from "./views/company/company";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPrincipal />} />
        <Route path="/LoginAdmin" element={<LoginAdmin />} />
        <Route path="/home" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/menu/:id" element={<Detail />} />
        <Route path="/account" element={<Account />} />
        <Route path="/menu/create" element={<CreateMenuForm />} />
        <Route path="/company" element={<Company/>}/>
      </Routes>
    </div>
  );
}

export default App;

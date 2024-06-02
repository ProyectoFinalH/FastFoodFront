import { Route, Routes } from "react-router-dom"
import Home from "./views/home/home"
import Menu from "./views/menu/menu"
import Navbar from "./Components/navbar/navbar"
import "./App.css"
import Detail from "./views/detail/detail"
import Account from "./views/account/account"



function App() {

  return (
      <div>
        <Navbar/>
        <Routes>
          <Route path="/home" element={<Home/>}/>
          <Route path="/menu" element={<Menu/>}/>
          <Route path="/menu/:id" element={<Detail/>}/>
          <Route path="/account" element={<Account/>}/>
        </Routes>

      </div>
  )
}

export default App

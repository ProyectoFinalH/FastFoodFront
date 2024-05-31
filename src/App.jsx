import { Route, Routes } from "react-router-dom"
import Home from "./views/home/home"
import Menu from "./views/menu/menu"
import Navbar from "./Components/navbar/navbar"
import "./App.css"



function App() {

  return (
      <div>
        <Navbar/>
        <Routes>
          <Route path="/home" element={<Home/>}/>
          <Route path="/menu" element={<Menu/>}/>
        </Routes>

      </div>
  )
}

export default App

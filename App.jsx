import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css'
import MainPage from "./src/mainPage/mainPage";

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </div>
    </BrowserRouter>
      
  )
}

export default App

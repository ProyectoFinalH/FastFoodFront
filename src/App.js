import './App.css';
import LoginPrincipal from './Components/Login/Login_Principal/Login_Principal';

import { Routes,Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
       <Routes>
           <Route path='/' element={<LoginPrincipal/>}/>
      </Routes>
    </div>
  );
}

export default App;

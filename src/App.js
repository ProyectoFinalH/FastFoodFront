import './App.css';
import LoginAdmin from './Components/Login/Login_Admin/Login_Admin';
import LoginPrincipal from './Components/Login/Login_Principal/Login_Principal';

import { Routes,Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
       <Routes>
           <Route path='/' element={<LoginPrincipal/>}/>
           <Route path='/LoginAdmin' element={<LoginAdmin/>}/>
      </Routes>
    </div>
  );
}

export default App;

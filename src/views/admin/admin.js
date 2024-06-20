import Sidebar from "./sidebar/sidebar";
// import logo from "../../images/logo.png"
import "./admin.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../Components/loading/Loading";


function Admin() {

  const USER = useSelector((state)=> state.USER)
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);


  // useEffect(()=>{
  //   if (USER && USER.role_id === 2){
  //     // alertify.alert("Mensaje:", "Hola administrador")

  //   }else{
  //     navigate("/loginAdmin")
  //   }
  // })

  return (
    <div className="adminContainer">
      {loading && <Loading />}
        <Sidebar />
      
    </div>
  );
}

export default Admin;


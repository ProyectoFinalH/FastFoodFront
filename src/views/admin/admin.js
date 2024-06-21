import Sidebar from "./sidebar/sidebar";
// import logo from "../../images/logo.png"
import "./admin.css";
// import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import Loading from "../../Components/loading/Loading";
// import alertify from "alertifyjs";
// import { jwtDecode } from "jwt-decode";
// import { logoutAdmin } from "../../Redux/actions";




function Admin() {

  //const token = useSelector((state)=> state.token)
  const [loading, setLoading] = useState(true);
  // const navigate = useNavigate();
  // const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);


  // useEffect(()=>{
  //   if (token){
  //     //console.log(token.data);
  //     const infoAdmin=jwtDecode(token.data);
  //     //console.log(infoAdmin);
  //     if(infoAdmin.role_id!==3){
  //       alertify.alert("Mensaje", 
  //         'Usuario no autorizado',()=>{
  //           dispatch(logoutAdmin());
  //           navigate("/loginAdmin");
  //         }); 
  //       }

  //   }else{
  //     alertify.alert("Mensaje", 
  //       'No hay token presente, debe loguearse para continuar',()=>{
  //         navigate("/loginAdmin");
  //       }); 
      
  //   }
  // },[token,navigate,dispatch]);


  return (
    <div className="adminContainer">
      {loading && <Loading />}
        <Sidebar />
      
    </div>
  );
}

export default Admin;


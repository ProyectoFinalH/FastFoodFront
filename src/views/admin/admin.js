import Sidebar from "./sidebar/sidebar";
import { useEffect, useState } from "react";
import Loading from "../../Components/loading/Loading";
import { useDispatch } from "react-redux";
import { setTokenAdmin } from "../../Redux/actions";
import alertify from "alertifyjs";
import { useNavigate } from "react-router-dom";



function Admin() {
  const [loading, setLoading] = useState(true);
  const [tokenSet, setTokenSet] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  

  useEffect(()=>{
    const loggedAdminJSON=window.localStorage.getItem('loggedFastFoodAdmin');

    if(loggedAdminJSON){
      const token=JSON.parse(loggedAdminJSON);
      dispatch(setTokenAdmin(token))
      setTokenSet(true)
    }
    else{
      alertify.alert("Mensaje", //si no hay token regresa a Login
        'Requiere credenciales, debe loguearse para continuar',()=>{
          navigate("/loginAdmin");
        }); 
    }

  },[dispatch,navigate])

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="adminContainer">
      {loading && <Loading />}
      {tokenSet&&<Sidebar />}
    </div>
  );
}

export default Admin;

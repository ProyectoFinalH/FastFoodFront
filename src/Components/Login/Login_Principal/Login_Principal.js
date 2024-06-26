import React, { useState, useEffect } from "react";
import "./Login_Principal.css";
//import Carrucel from "../Carrucel/Carrucel";
import LoginIngreso from "../Login_Ingreso/Login_Ingreso";
import Recuperarkey from "../Login_Recuperar/Login_Recuperar_key";
import Registrarse from "../Login_Registrarse/Login_Registrarse";
import Loading from "../../loading/Loading";
import LoginInvitado from "../Login_invitado/Login_invitado";
import RegistrarseEmpresa from "../Login_RegistrarseEm/Login_RegistrarseEm";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login_user_localstorag } from "../../../Redux/actions";
import {
  obtenerEstatusUsuario,
  obtenerCorreoUsuario,
  obtenerNombreUsuario,
  obtenerIdUsuario,

  
} from "../Login_Ingreso/LocalStorange_user/LocalStorange_user";

const LoginPrincipal = () => {
  const [logueo, setLogueo] = useState("login");
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const email = obtenerCorreoUsuario();
    if (email) {
      const tem_Users = {
        state: obtenerEstatusUsuario(),
        id: obtenerIdUsuario(),
        email: email,
        name: obtenerNombreUsuario(),
      };
      dispatch(login_user_localstorag(tem_Users));
      navigate('/home');
    }else{
      navigate('/')
    }
  }, [dispatch, navigate]);

  return (
    <div>
      {loading && <Loading />}
      <div className="BodyLogin">
        <div className="izquierdaGeneral">
          {
            // <Carrucel className="carrucel" />
          }
        </div>
        <div className="derechaGeneral">
          {logueo === "login" && <LoginIngreso setView={setLogueo} />}
          {logueo === "recuperarkey" && <Recuperarkey setView={setLogueo} />}
          {logueo === "registro" && <Registrarse setView={setLogueo} />}
          {logueo === "registroEmpresa" && <RegistrarseEmpresa setView={setLogueo} />}
          {logueo === "null" && <LoginInvitado setView={setLogueo} />}
        </div>
      </div>
    </div>
  );
};

export default LoginPrincipal;

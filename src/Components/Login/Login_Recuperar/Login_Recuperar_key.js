import React  from "react";
import "./Login_Recuperar_key.css";
import imagen from "../Login_imagenes/logo.png";
//import icono_usuario from "../Login_imagenes/iconos/usuario.png";
//import validationRigistro from "./Validar_Login_ingreso";
//import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
import "alertifyjs/build/css/themes/default.css";

const Recuperarkey = ({ setView }) => {



/*
  useEffect(() => {
    const validationErrors = validationRigistro(userData);
    setErrors(validationErrors);
    setIsButtonEnabled(Object.keys(validationErrors).length === 0);
  }, [userData]);
*/
  return (
    <div className="bodyIngreso">
      <img src={imagen} alt="Logo Fast Foot" className="imageningreso" />
      <p>
        hola, si tienes inconvenientes con el acceso a tu cuenta, comunicate con nosotros en el siguieten correo electronico:
        
        <br/><label className="Correo-foot">fastfoodapp2024@gmail.com</label>
      </p>
      <div className="contenedoringreso">
        
        

        <div className="Grupoingreso">
          <div
            className="Registrate"
            onClick={() => {
              setView("login");
            }}
          >



            
            Regresa al inicio
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recuperarkey;

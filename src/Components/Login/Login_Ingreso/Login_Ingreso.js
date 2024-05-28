import './Login_ingreso.css'
import {useState} from 'react'



import imagen from '../Login_imagenes/food_sin_fondosi.png'
import icono_usuario from '../Login_imagenes/iconos/usuario.png'
import icono_key from '../Login_imagenes/iconos/contrasena.png'
import icono_ver from '../Login_imagenes/iconos/cerrar-ojo-black.png'
import icono_google from '../Login_imagenes/iconos/icons8-google-48.png'
import icono_ocultar from '../Login_imagenes/iconos/ojo-con-pestanas-black.png'

import validationIngreso from './Validar_Login_ingreso'
const LoginIngreso = ({ setView }) => {
    const [keyver,setKeyver] = useState(false);
    const [errors, setErrors] = useState({});
    const [userData, setUserData]=useState({
        name:'',
        pass:'',
    });
    const handlever = () =>{
        //  alert("ingreso");
     
              setKeyver(!keyver)
         
          
      }

    const handlChange = (event) =>{
       
        //  const { name, value } = event.target;
       
          setUserData({
              ...userData,
              [event.target.name]:event.target.value
          })
          setErrors(validationIngreso({
              ...userData,
              [event.target.name]:event.target.value
          }))
        
  
      }
    return (
        <div className="bodyIngreso">
        <img src={imagen} alt='Logo Fast Foot' className='imageningreso'/> 
        <div className="contenedoringreso">
            <div className="Grupoingreso">
                <div className="centrarlogogoogle">
                <img src={icono_google} alt="icono ingreso"/><div> ingresar con google</div>
                </div>
            </div>
            <div className="Grupoinput">
                <img src={icono_usuario} alt="icono ingreso"/>
                <input type="text"
                name="name" 
                value={userData.name}
                onChange={handlChange}
                maxLength={100}
                placeholder="Celular/Correo"
                title='No Puede ser mayor a 100 caracteres'/>
            </div>
            <div className="Grupoinput">
                <img src={icono_key} alt="icono ingreso"/>
                <input type={!keyver ? "password" : "text"}
                 name="pass" 
                 value={userData.pass}
                 onChange={handlChange}
                 maxLength={15}
                 placeholder="Password"
                 title='No Puede ser mayor a 15 caracteres'/>
                <img src={keyver ? icono_ocultar : icono_ver}alt='Mostrar/Ocultar'  onClick={handlever} className='ver'/>
            </div>
            <div className="Registrate" onClick={()=>{setView('recuperarkey')}}>¿Olvidaste tu Contraseña?</div>
            <div className="espacioError">
                {
                    //aqui van los errores 
                    errors.name
                }
            </div>
            <div className="ov-btn-grow-box ">Ingresar</div>
            <div className="Registrate .olvidastekey" onClick={()=>{setView('registro')}}>Registrarse</div>
            <div className="seleccion">o</div>
            <div className="Registrate"  onClick={()=>{setView('invitado')}}>Ingresa como Invitado</div>
        </div>
        </div>
        ) 
        

    }

export default LoginIngreso
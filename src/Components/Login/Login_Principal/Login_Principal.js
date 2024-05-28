import './Login_Principal.css';
import Carrucel from '../Carrucel/Carrucel';
import LoginIngreso from '../Login_Ingreso/Login_Ingreso';
import Recuperarkey from '../Login_Recuperar/Login_Recuperar_key';
import { useState } from 'react';

const LoginPrincipal = () => {
    const [logueo, setLogueo] = useState('login');
    return (
        <div className='BodyLogin'>
            <div className='izquierdaGeneral'>
                
                   <Carrucel className="carrucel"/>
                    
            </div>
            <div className='derechaGeneral'>
               
                    {logueo === 'login' && <LoginIngreso setView={setLogueo} />}
                    {logueo === 'recuperarkey' && <Recuperarkey setView={setLogueo} />}
                    
                  
                    
            </div>
        </div>
    );
}

export default LoginPrincipal;

import './Login_Principal.css';
import Carrucel from '../Carrucel/Carrucel';
import LoginIngreso from '../Login_Ingreso/Login_Ingreso';
import Recuperarkey from '../Login_Recuperar/Login_Recuperar_key';
import { useEffect, useState } from 'react';
import Loading from '../../loading/Loading';

const LoginPrincipal = () => {
    const [logueo, setLogueo] = useState('login');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 10000); // 5 segundos en milisegundos

        return () => clearTimeout(timer); // Limpiar el temporizador cuando el componente se desmonte
    }, []);

    return (
        <div>
            {loading && <Loading />}
        <div className='BodyLogin'>
              
            <div className='izquierdaGeneral'>
                
                   <Carrucel className="carrucel"/>
                    
            </div>
            <div className='derechaGeneral'>
                  
                    {logueo === 'login' && <LoginIngreso setView={setLogueo} />}
                    {logueo === 'recuperarkey' && <Recuperarkey setView={setLogueo} />}
                    
                  
                    
            </div>
        </div>
        </div>
    );
}

export default LoginPrincipal;

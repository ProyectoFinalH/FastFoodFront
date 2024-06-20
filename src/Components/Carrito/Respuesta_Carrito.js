import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css'; // Importa los estilos de alertify
import 'alertifyjs/build/css/themes/default.css'; 


import Navbar from '../navbar/navbar';
import Loading from '../loading/Loading';
import { useEffect, useState } from 'react';

const RespuestaCarr = () => {
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  
    return (
      <div>{
        loading
        ?<Loading/>
        :alertify.alert("Tu pago a sido Aprovado ", "GRacias por tu compra ")
        }
        
        <Navbar/>
        
      </div>
    );
  }
export default RespuestaCarr;

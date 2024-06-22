import React, { useEffect, useState } from 'react';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css'; // Importa los estilos de alertify
import 'alertifyjs/build/css/themes/default.css'; 
import '@fortawesome/fontawesome-free/css/all.min.css';

import Navbar from '../navbar/navbar';
import Loading from '../loading/Loading';
import { useNavigate } from 'react-router-dom';

const RespuestaCarr = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      // Mostrar el alert cuando el loading termina
      alertify.alert('Tu pago ha sido Aprobado', '<i class="fas fa-check-circle" style="color: green; font-size: 48px;"></i><br/>Gracias por tu compra',
        function() {
          alertify.success('Continua Disfrutando');
          navigate('/home')
        }
      );
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div>
      {loading ? <Loading/> : null}
      <Navbar/>
    </div>
  );
};

export default RespuestaCarr;

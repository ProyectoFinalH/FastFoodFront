import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Loading from '../loading/Loading';

const RespuestaCarr = () => {
    const location = useLocation();
    const navigate = useNavigate();
  
    useEffect(() => {
      const searchParams = new URLSearchParams(location.search);
  
      const collectionId = searchParams.get('collection_id');
      const collectionStatus = searchParams.get('collection_status');
      const paymentId = searchParams.get('payment_id');
      const status = searchParams.get('status');
      const externalReference = searchParams.get('external_reference');
      const paymentType = searchParams.get('payment_type');
      const merchantOrderId = searchParams.get('merchant_order_id');
      const preferenceId = searchParams.get('preference_id');
      const siteId = searchParams.get('site_id');
      const processingMode = searchParams.get('processing_mode');
      const merchantAccountId = searchParams.get('merchant_account_id');
  
      // Aquí puedes manejar la respuesta y realizar cualquier acción necesaria
      console.log({
        collectionId,
        collectionStatus,
        paymentId,
        status,
        externalReference,
        paymentType,
        merchantOrderId,
        preferenceId,
        siteId,
        processingMode,
        merchantAccountId,
      });
  
      // Ejemplo de redirección después de procesar la información
      if (status === 'approved') {
        alert('Pago aprobado. Redirigiendo al menú...');
        navigate('/menu');
      } else {
        alert('Pago no aprobado. Por favor, verifica tu información.');
        navigate('/menu');
      }
    }, [location, navigate]);
  
    return (
      <div>
        <Loading />
        <p>Procesando respuesta del carrito...</p>
      </div>
    );
};

export default RespuestaCarr;

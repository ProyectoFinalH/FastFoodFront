import React, { useEffect, useState } from 'react';
import './Respuesta_Carrito.css';
import imgfastfoot from '../Login/Login_imagenes/food_sin_fondosi.png';
import imgaprovado from './img/bolsa-de-la-compra.png';
import imgrechasado from './img/reprobaso.png';
import { useLocation } from 'react-router-dom';

import { obtenerItemsCarrito, resetearCarrito, getOrder, removeOrder } from '../localStorage-car/LocalStorageCar';
import { obtenerNombreUsuario, 
  obtenerCorreoUsuario, 
  obtenerEstatusUsuario, 
  obtenerIdUsuario } from '../Login/Login_Ingreso/LocalStorange_user/LocalStorange_user';



import { login_user_localstorag, Actualizar_Orden_Compra_MP  } from '../../Redux/actions';
import Navbar from '../navbar/navbar';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../loading/Loading';

const RespuestaCarrito = () => {
  const location = useLocation();
  const [estadocompra, setEstadoCompra] = useState(true);
  const user = useSelector((state) => state.USER);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  

  const query = new URLSearchParams(location.search);

  const collectionId = query.get('collection_id');
  const collectionStatus = query.get('collection_status');
  //const paymentId = query.get('payment_id');
  //const paymentType = query.get('payment_type');
  const merchantOrderId = query.get('merchant_order_id');
  const preferenceId = query.get('preference_id');

  const itemsCarrito = obtenerItemsCarrito();

  const costoTotal = itemsCarrito.reduce((total, item) => {
    return total + parseFloat(item.price) * item.cont;
  }, 0);

  const URLFRONT="https://fast-food-front-deploy.vercel.app";


  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);



  
  useEffect(() => {
   // alert(JSON.stringify(getToken()))
    const email = obtenerCorreoUsuario();
    if (email) {
      const tem_Users = {
        state: obtenerEstatusUsuario(),
        id: obtenerIdUsuario(),
        email: email,
        name: obtenerNombreUsuario(),
      };
      dispatch(login_user_localstorag(tem_Users));
     
    }
  }, [dispatch]);

  useEffect(() => {
    if (collectionStatus === "approved") {
      setEstadoCompra(true);
      
      dispatch(Actualizar_Orden_Compra_MP(getOrder(), "2"))
    } else {
      setEstadoCompra(false);
      dispatch(Actualizar_Orden_Compra_MP(getOrder(), "3"))
    }
  }, [collectionStatus, dispatch]);

  const handeComprar = ()=>{
    removeOrder() 
    resetearCarrito(); 
   
    window.location.replace(URLFRONT+'/home')
  }

  
  const handeRegresar=()=>{
    window.location.replace(URLFRONT+'/home')
  }

  
  return (
    
    <div className='div-general'>
        {loading && <Loading />}
      <Navbar />
      <div className="respuesta-carrito-container">
        <h1>Detalle de la Compra</h1>
        <div className="info-compra">
          <img src={estadocompra ? imgaprovado : imgrechasado} alt='Imagen de contexto' className="Approved-imagen" />
          <img src={imgfastfoot} alt='Imagen de contexto' className="firma-imagen" />
          <div>ID de referencia de compra: {getOrder()}</div>
          <div>Número de Operación Mercado Pago: {collectionId}</div>
          <div className={collectionStatus === 'approved' ? "texto-approved" : "texto-No-approved"}>
            Estado de la Compra: {collectionStatus === 'approved' ? "Aprobado" : "No Aprobado"}
          </div>
          <div>Orden de Pago Mercado Pago: {merchantOrderId}</div>
          <div>ID de Preferencia: {preferenceId}</div>
          
          {user && user.email ? (
            <>
              <div>Correo Usuario: {user.email}</div>
              <div>Nombre Usuario: {user.name}</div>
            </>
          ) : (
            <div>Usuario no autenticado</div>
          )}
          <div className='Costo-Total'>Costo Pagado: ${costoTotal.toFixed(2)}</div>
        </div>

        <h2>Productos en el Carrito</h2>
        <table className="tabla-productos">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio Unitario</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {itemsCarrito.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.cont}</td>
                <td>${item.price}</td>
                <td>${(parseFloat(item.price) * item.cont).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {
              collectionStatus === 'approved' 
              ? <div className='login-button-respuesta' onClick={handeComprar}>Compra Exitosa ahora continua comprando</div>
              :<div className='negate-div'><label>El estado de la compra no fue aprovado ahora continua con tu proceso ya que todo esta guadado en tu carrito</label>
                <div className="btn-reprovado" onClick={handeRegresar}> clic para continuar </div>
              </div> 
              
        }
        
      </div>
    </div>
  );
};

export default RespuestaCarrito;
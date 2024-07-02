import React, { useEffect, useState } from "react";
import imgfastfoot from "../Login/Login_imagenes/food_sin_fondosi.png";
import imgaprovado from "./img/bolsa-de-la-compra.png";
import imgrechasado from "./img/reprobaso.png";
import { useLocation } from "react-router-dom";

import {
  obtenerItemsCarrito,
  resetearCarrito,
  getOrder,
  removeOrder,
} from "../localStorage-car/LocalStorageCar";
import {
  obtenerNombreUsuario,
  obtenerCorreoUsuario,
  obtenerEstatusUsuario,
  obtenerIdUsuario,
} from "../Login/Login_Ingreso/LocalStorange_user/LocalStorange_user";

import {
  login_user_localstorag,
  Actualizar_Orden_Compra_MP,
} from "../../Redux/actions";
import Navbar from "../navbar/navbar";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../loading/Loading";

const RespuestaCarrito = () => {
  const location = useLocation();
  const [estadocompra, setEstadoCompra] = useState(true);
  const user = useSelector((state) => state.USER);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const query = new URLSearchParams(location.search);

  const collectionId = query.get("collection_id");
  const collectionStatus = query.get("collection_status");
  //const paymentId = query.get('payment_id');
  //const paymentType = query.get('payment_type');
  const merchantOrderId = query.get("merchant_order_id");
  const preferenceId = query.get("preference_id");

  const itemsCarrito = obtenerItemsCarrito();

  const costoTotal = itemsCarrito.reduce((total, item) => {
    return total + parseFloat(item.price) * item.cont;
  }, 0);

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

      dispatch(Actualizar_Orden_Compra_MP(getOrder(), "2"));
    } else {
      setEstadoCompra(false);
      dispatch(Actualizar_Orden_Compra_MP(getOrder(), "3"));
    }
  }, [collectionStatus, dispatch]);

  const handeComprar = () => {
    removeOrder();
    resetearCarrito();

    window.location.replace("http://localhost:3000/home");
  };

  const handeRegresar = () => {
    window.location.replace("http://localhost:3000/home");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="div-general h-full">
        {loading && <Loading />}
        <Navbar />
        <div className="respuesta-carrito-container max-w-2xl mx-auto px-4 py-6 bg-white rounded-lg shadow-md mt-10 mb-20">
          <h1 className="text-2xl font-bold mb-6">Detalle de la Compra</h1>
          <div className="info-compra">
            <img
              src={estadocompra ? imgaprovado : imgrechasado}
              alt="Imagen de contexto"
              className="Approved-imagen absolute top-2 left-2 w-24"
            />
            <img
              src={imgfastfoot}
              alt="Imagen de contexto"
              className="firma-imagen absolute top-2 right-2 w-24"
            />
            <div>ID de referencia de compra: {getOrder()}</div>
            <div>Número de Operación Mercado Pago: {collectionId}</div>
            <div
              className={
                collectionStatus === "approved"
                  ? "texto-approved"
                  : "texto-No-approved"
              }
            >
              Estado de la Compra:{" "}
              {collectionStatus === "approved" ? "Aprobado" : "No Aprobado"}
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
            <div className="Costo-Total font-bold mt-4">
              Costo Pagado: ${costoTotal.toFixed(2)}
            </div>
          </div>
          <h2 className="text-xl font-bold mt-8 mb-4">
            Productos en el Carrito
          </h2>
          <table className="tabla-productos w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4">Producto</th>
                <th className="py-2 px-4">Cantidad</th>
                <th className="py-2 px-4">Precio Unitario</th>
                <th className="py-2 px-4">Total</th>
              </tr>
            </thead>
            <tbody>
              {itemsCarrito.map((item, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                >
                  <td className="py-2 px-4">{item.name}</td>
                  <td className="py-2 px-4">{item.cont}</td>
                  <td className="py-2 px-4">${item.price}</td>
                  <td className="py-2 px-4">
                    ${(parseFloat(item.price) * item.cont).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {collectionStatus === "approved" ? (
            <div
              className="login-button-respuesta mt-6 py-2 px-4 bg-gradient-to-r from-red-500 to-yellow-500 text-white rounded-md text-center cursor-pointer hover:bg-red-600 transition-all duration-300 "
              onClick={handeComprar}
            >
              Compra Exitosa ahora continua comprando
            </div>
          ) : (
            <div className="negate-div mt-6 p-4 bg-red-200 rounded-md text-center">
              <label className="block mb-2">
                El estado de la compra no fue aprobado ahora continua con tu
                proceso ya que todo está guardado en tu carrito
              </label>
              <div
                className="btn-reprovado py-2 px-4 bg-red-500 text-white rounded-md cursor-pointer hover:bg-red-600 transition-all duration-300"
                onClick={handeRegresar}
              >
                Clic para continuar
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RespuestaCarrito;

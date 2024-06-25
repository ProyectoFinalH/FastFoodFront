import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Listado_Orders_Usuario } from "../../Redux/actions";

import "./Order_User.css";

const OrderUsers = () => {
  const Listado = useSelector((state) => state.ListaOrderUser);
  const [loading, setLoading] = useState(true);
  const userId = useSelector((state) => state.USER.id);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        await dispatch(Listado_Orders_Usuario(userId));
      } catch (error) {
        console.error("Error al obtener las órdenes:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchOrders();
    }
  }, [userId, dispatch]);

  if (loading) {
    return <div>Cargando órdenes...</div>;
  }

  return (
    <div className="order-container">
      <h1>Tus Compras</h1>
      {Listado && Listado.length > 0 ? (
        <div className="order-table">
          <table>
            <thead>
              <tr>
                <th>
                  <div className="Cetrado-textos">Número de Ordenes</div>
                </th>
                <th>Restaurante</th>
                <th>Items</th>
                <th>Estado</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {Listado.map((order) => (
                <tr
                  key={order.id}
                  className={
                    order.status_order === "Registrada"
                      ? "Clas-order-Registrada"
                      : order.status_order === "Pago aceptado"
                      ? "Clas-order-Aceptado"
                      : "Clas-order-Reprobado"
                  }
                >
                  <td>
                    {" "}
                    <div className="Cetrado-textos">{order.id}</div>
                  </td>
                  <td>{order.restaurant_name}</td>
                  <td>
                    <ul>
                      {Array.isArray(order.items)
                        ? order.items.map((item, index) => (
                            <li key={index}>
                              {item.name} - {item.price} x {item.cont || 1}
                            </li>
                          ))
                        : JSON.parse(order.items).map((item, index) => (
                            <li key={index}>
                              {item.name} - {item.price} x {item.cont || 1}
                            </li>
                          ))}
                    </ul>
                  </td>
                  <td>{order.status_order}</td>
                  <td>${order.total_price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !loading && <p>No hay órdenes disponibles.</p>
      )}
    </div>
  );
};

export default OrderUsers;

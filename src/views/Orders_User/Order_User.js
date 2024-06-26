import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Listado_Orders_Usuario } from "../../Redux/actions";

import FormRating from "../../Components/rating/formRating/formRating";
import "./Order_User.css";

const OrderUsers = () => {
  const Listado = useSelector((state) => state.ListaOrderUser);
  const userId = useSelector((state) => state.USER.id);
  const dispatch = useDispatch();
  const restaurants = useSelector((state) => state.allRestaurants);
  const [loading, setLoading] = useState(true);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [restaurantId, setRestaurantId] = useState(null);



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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, dispatch]);

  const handleOpenRating = (orderId, restaurantId) => {
    setSelectedOrderId(orderId);
    setRestaurantId(restaurantId);
  };

  const handleCloseRating = () => {
    setSelectedOrderId(null);
    setRestaurantId(null);
  };

  if (loading) {
    return <div>Cargando órdenes...</div>;
  }

  console.log("Listado de órdenes:", Listado);
  console.log("ID de orden seleccionada:", selectedOrderId);
  console.log("ID de restaurantId:", restaurantId);
  console.log("ID de restaurants:", restaurants);


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
                <th>Opinar</th>
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
                  <td>
                    <div className="botonOpinion">

                  <button  onClick={() => handleOpenRating(order.id, order.restaurant_id)}>
                      Opinar
                    </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !loading && <p>No hay órdenes disponibles.</p>
      )}

{selectedOrderId !== null && restaurantId !== null && (
        <div className="form-rating-container">
          <h2>Calificar Orden</h2>
    
          
          <FormRating
            userId={userId}
            Listado={Listado}
            restaurantId={restaurantId}
            orderId={selectedOrderId}
            onClose={handleCloseRating}
          />
        </div>
      )}
    </div>
  );
};

export default OrderUsers;

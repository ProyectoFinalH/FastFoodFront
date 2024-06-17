import { useEffect, useState } from "react";
import "./ordenesAdmin.css"

import NavbarAdmin from "../navbarAdmin/navbarAdmin";

function OrdersAdmin({allOrdersAdmin}) {
  const [orders, setOrders] = useState([]);
  
  
  useEffect(() => {
    setOrders(allOrdersAdmin);
  }, [allOrdersAdmin]);

console.log("orden:",orders)
  return (
    <div>
         <NavbarAdmin/>
      <div className="OrdersAdminContainer">
        <div className="OrderAdminContainer">

      <table>
        <thead>
          <tr>
            <th>Order</th>
            <th>Nombre Usuario</th>
            <th>Restaurante</th>
            <th>Productos</th>
            <th>Cantidad</th>
            <th>Precio Unidad</th>
            <th>Fecha</th>
            <th>Estado Compra</th>
            <th>Costo Total</th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((order) => (
            <tr key={order?.id}>
              <td>{order?.id}</td>
              <td>{order?.user_name}</td>
              <td>{order?.restaurant_name}</td>
              <td>
                {order?.items?.map((item, index) => (
                  <div key={index}>
                    <p>{item?.name_item}</p>
                  </div>
                ))}
              </td>
              <td>
                {order?.items?.map((item, index) => (
                  <div key={index}>
                    <p>{item?.quantity}</p>
                  </div>
                ))}
              </td>
              <td>
                {order?.items?.map((item, index) => (
                  <div key={index}>
                    <p>{item?.partial_price}</p>
                  </div>
                ))}
              </td>
              <td>Dia: {order?.order_date?.slice(0, 19).replace("T"," Hora: ")}</td>
              <td>{order?.status_order}</td>
              <td>{order?.total_price}</td>
            </tr>
          ))}
        </tbody>
      </table>
        </div>
       
      </div>
     </div>
  )
}

export default OrdersAdmin
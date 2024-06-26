import React, { useState } from "react";
import OrderUsers from "../../Orders_User/Order_User";

const LatestOrders = () => {
  const [orders, setOrders] = useState(false);

  return (
    <div>
      <div onClick={() => setOrders(!orders)}>Últimas órdenes</div>
      {orders && <OrderUsers />}
    </div>
  );
};

export default LatestOrders;

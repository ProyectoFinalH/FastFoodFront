import { useEffect, useState} from "react";
import "./ordenesAdmin.css"

import NavbarAdmin from "../navbarAdmin/navbarAdmin";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersAdmin } from "../../../Redux/actions";
import deshacer from "../../../images/deshacer.png"

function OrdersAdmin() {
 
  
  const allOrdersAdmin = useSelector((state)=> state.allOrdersAdmin)
  const dispatch = useDispatch()
  const [filterOrder, setFilterOrder] = useState([]);
  const [searchOrder, setSearchOrder] = useState("");
  const [selectOrderPriceOrder, setSelectOrderPriceOrder] = useState("");
  const [noResults, setNoResults] = useState(false)
  const [selectOrderNameOrder, setSelectOrderNameOrder] = useState("");
  const [selectOrderNameResOrder, setSelectOrderNameResOrder] = useState("");
  
  
  
  useEffect(() => {
    dispatch(getOrdersAdmin());
  }, [dispatch]);



  useEffect(() => {
    let filteredOrders = [...allOrdersAdmin];
    if (searchOrder.trim() !== "") {
      filteredOrders = filteredOrders.filter(
        (order) =>
          order.restaurant_name.toLowerCase().includes(searchOrder.toLowerCase())||
        order.user_name.toLowerCase().includes(searchOrder.toLowerCase())
          
      );
    }

    if (selectOrderNameOrder !== "") {
      filteredOrders.sort((a, b) =>
        selectOrderNameOrder  === "asc"
          ? a.restaurant_name.localeCompare(b.restaurant_name)
          : b.restaurant_name.localeCompare(a.restaurant_name)
      );
    }
  
    setFilterOrder (filteredOrders);
    setNoResults(filteredOrders?.length===0)
  }, [
    allOrdersAdmin,
    selectOrderNameOrder,
    searchOrder
  ]);

  useEffect(() => {
    let filteredOrders = [...allOrdersAdmin];
    if (searchOrder.trim() !== "") {
      filteredOrders = filteredOrders.filter(
        (order) =>
          order.restaurant_name.toLowerCase().includes(searchOrder.toLowerCase())||
        order.user_name.toLowerCase().includes(searchOrder.toLowerCase())
          
      );
    }

    if (selectOrderNameResOrder !== "") {
      filteredOrders.sort((a, b) =>
        selectOrderNameResOrder  === "asc"
          ? a.user_name.localeCompare(b.user_name)
          : b.user_name.localeCompare(a.user_name)
      );
    }
  
    setFilterOrder (filteredOrders);
    setNoResults(filteredOrders?.length===0)
  }, [
    allOrdersAdmin,
    selectOrderNameResOrder,
    searchOrder
  ]);




  useEffect(() => {
    let filteredOrders = [...allOrdersAdmin];
    if (searchOrder.trim() !== "") {
      filteredOrders = filteredOrders.filter(
        (order) =>
          order.restaurant_name.toLowerCase().includes(searchOrder.toLowerCase())||
        order.user_name.toLowerCase().includes(searchOrder.toLowerCase())
          
      );
    }

    if (selectOrderPriceOrder  === "menor") {
      filteredOrders  = filteredOrders?.sort((a, b) => a.total_price - b.total_price);
    } else if (selectOrderPriceOrder === "mayor") {
      filteredOrders  = filteredOrders?.sort((a, b) => b.total_price - a.total_price);
    }
    setFilterOrder (filteredOrders);
    setNoResults(filteredOrders?.length===0)
  }, [
    allOrdersAdmin,
    selectOrderPriceOrder,
    searchOrder
  ]);

  
  const handleSearchOrderChange = (e) => {
    setSearchOrder(e.target.value);
  };


  const handleOrderNameOrderChange = (e) => {
   
    setSelectOrderNameOrder(e.target.value);
  };


  const handleOrderPriceOrderChange = (e) => {
    setSelectOrderPriceOrder(e.target.value);
  
  }
  const handleOrderNameOrderResChange = (e) => {
    setSelectOrderNameResOrder(e.target.value);
  
  }
  
  const handleClearFilter = (e) => {
    setSearchOrder("")
    setSelectOrderNameOrder("")
    setSelectOrderPriceOrder("")
    setSelectOrderNameResOrder("")
  }

  
  return (
    <div>
         <NavbarAdmin/>
         <div className="restaurantH2">
          <h2>Ordenes</h2>
         </div>
      <div className="OrdersAdminContainer">
        <div className="OrderAdminContainer">
      <div className="SearchRestAdmin">
        <div className="inputSearchResAdmin">
          <input
            type="search"
            placeholder="Usuario o Restaurante.."
            value={searchOrder}
            onChange={handleSearchOrderChange}
          />
          <div className="buttonSearchAdmin">
            <button>🔍︎</button>
          </div>
        </div>
        <div className="selectsAdmin">
          <div className="SelectsContainerAdmin">
          <label>Por Restaurante:</label>
            <select
              className="selectAdmin"
              value={selectOrderNameOrder}
              onChange={handleOrderNameOrderChange}
            >
              <option className="optionAdmin" value="">
              Seleccionar orden...
              </option>
              <option className="optionAdmin" value="asc">
                Ascendente
              </option>
              <option className="optionAdmin" value="des">
                Descendente
              </option>
            </select>
          </div>
          <div className="SelectsContainerAdmin">
          <label>Por Usuario:</label>
            <select
              className="selectAdmin"
              value={selectOrderNameResOrder}
              onChange={handleOrderNameOrderResChange}
            >
              <option className="optionAdmin" value="">
              Seleccionar orden...
              </option>
              <option className="optionAdmin" value="asc">
                Ascendente
              </option>
              <option className="optionAdmin" value="des">
                Descendente
              </option>
            </select>
          </div>
          <div className="SelectsContainerAdmin">
            <label>Por Precio:</label>
            <select
              className="selectAdmin"
              value={selectOrderPriceOrder}
              onChange={handleOrderPriceOrderChange}
            >
              <option className="optionAdmin" value="">
              Seleccionar orden...
              </option>
              <option className="optionAdmin" value="mayor">
                Descendente
              </option>
              <option className="optionAdmin" value="menor">
                Ascendente
              </option>
            
            </select>
          </div>
            <div>
            <button title="Deshacer filtros" className="buttonDesOrder"><img src={deshacer} alt="deshacer" onClick={handleClearFilter}/></button>
              </div>
        </div>
      </div>
      

          

      <table>
        <thead>
          <tr>
            <th>Order</th>
            <th>Nombre Usuario</th>
            <th>Restaurante</th>
            <th>Productos</th>
           
            <th>Fecha</th>
            <th>Estado Compra</th>
            <th>Costo Total</th>
          </tr>
        </thead>
        <tbody>
        {noResults ? (
        <div className="noResultsMessage">
          <p>No se encontraron resultados.</p>
        </div>
      ) : (
          filterOrder?.map((order) => (
            <tr key={order?.id}>
              <td>{order?.id}</td>
              <td>{order?.user_name}</td>
              <td>{order?.restaurant_name}</td>
              <td>
              {Array.isArray(order.items) ? order.items.map((item, index) => (
                    <div key={index}>
                      {item.quantity || item.cont} x {item.name_item || item.name} (${item.partial_price || item.price})
                    </div>
                  )) : 'No items'}
              </td>
           
              <td>Dia: {order?.order_date?.slice(0, 19).replace("T"," Hora: ")}</td>
              <td>{order?.status_order}</td>
              <td>{order?.total_price}</td>
            </tr>
          )))}
        </tbody>
      </table>
        </div>
       
      </div>
     </div>
  )
}

export default OrdersAdmin
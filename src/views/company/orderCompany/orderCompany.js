import React, { useEffect, useState } from 'react';
import './orderCompany.css';
import { useSelector } from 'react-redux';
import eliminar from './image/eliminar.png';
import modificar from './image/escribir.png';
import guardar from './image/actualizar.png';
import cancelar from'./image/cancelar.png'

 

function OrderCompany() {
  const Order_List_Company = useSelector((state) => state.Order_List_Company || []);

  const [activeId, setActiveId] = useState('');
  const [formData, setFormData] = useState({
    id: '',
    user_id: '',
    restaurant_id: '',
    order_date: '',
    active: false,
    total_price: ''
  });
  const [datosArray, setDatosArray] = useState([]);

 // const dispatch = useDispatch();

  useEffect(() => {
    // Puedes agregar lógica aquí si necesitas hacer algo cuando el componente se monta o actualiza
  }, []);

  const handleEliminar = (id) => {
    alert("Eliminar id: " + id);
   // dispatch(Actualizar_Datos_Order(id));
  //  dispatch(Eliminar_Order(id));
  };

  const handleModificar = (id) => {
    setActiveId(id);
    const selectedOrder = Order_List_Company.find(order => order.id === id);
    if (selectedOrder) {
      setFormData({
        id: selectedOrder.id,
        user_id: selectedOrder.user_id,
        restaurant_id: selectedOrder.restaurant_id,
        order_date: selectedOrder.order_date,
        active: selectedOrder.active, // Se mantiene true/false directamente
        total_price: selectedOrder.total_price ? `$${selectedOrder.total_price}` : 'N/A'
      });
    }
   // dispatch(Actualizar_Datos_Order(formData))
  };
  
  const handleCancelar = () => {
    setActiveId('');
  };

  const handleGuardar = (id) => {
    alert("Guardar id: " + id);
    setDatosArray([...datosArray, formData]);
    setActiveId('');
    setFormData({
      id: '',
      user_id: '',
      restaurant_id: '',
      order_date: '',
      active: false, // Se establece como false por defecto
      total_price: ''
    });
  //  dispatch(Actualizar_Datos_Order(formData));
  };

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: checked
    }));
  };

  return (
    <div>
      <h1>OrderCompany</h1>
      <div className="container">
        <table className="styled-table">
          <thead>
            <tr>
              <th>Order</th>
              <th>Nombre</th>
              <th>Producto</th>
              <th>Fecha</th>
              <th>Estado Compra</th>
              <th>Costo Total</th>
              <th>Eliminar</th>
              <th>Modificar</th>
            </tr>
          </thead>
          <tbody>
            {Order_List_Company.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.user_id}</td>
                <td>
                  {activeId === order.id ? (
                    <input
                      type="text"
                      name="restaurant_id"
                      value={formData.restaurant_id}
                      onChange={handleChange}
                      className='text-edit-order'
                    />
                  ) : (
                    order.restaurant_id
                  )}
                </td>
                <td>
                  {activeId === order.id ? (
                    <input
                      type="text"
                      name="order_date"
                      value={formData.order_date}
                      onChange={handleChange}
                      className='text-edit-order'
                    />
                  ) : (
                    order.order_date.substr(0, 19)
                  )}
                </td>
                <td>
                  {activeId === order.id ? (
                    <input
                      type="checkbox"
                      name="active"
                      checked={formData.active}
                      onChange={handleChange}
                      className='checkbox-edit-order'
                    />
                  ) : (
                    <span>{order.active.toString()}</span>
                  )}
                </td>
                <td>
                  {activeId === order.id ? (
                    <input
                      type="text"
                      name="total_price"
                      value={formData.total_price}
                      onChange={handleChange}
                      className='text-edit-order'
                    />
                  ) : (
                    order.total_price ? `$${order.total_price}` : 'N/A'
                  )}
                </td>
                <td>
                  <div className="btn btn-delete" onClick={() => handleEliminar(order.id)}>
                    <img src={eliminar} alt='Eliminar order' className='img_List_Order' />
                  </div>
                </td>
                <td>
                  <div className={activeId === order.id ? "btn btn-edit" : "btn btn-modify"}>
                    {activeId === order.id ? (
                      <>
                        <div className="btn btn-Guardar">
                          <img src={modificar} alt='Guardar order' className='img_List_Order' onClick={() => handleGuardar(order.id)} />
                        </div>
                        <div className='btn btn-cancelar'>
                          <img src={cancelar} alt='Cancelar order' className='img_Cancelar-Order' onClick={handleCancelar} />
                        </div>
                      </>
                    ) : (
                      <img src={guardar} alt='Modificar order' className='img_List_Order' onClick={() => handleModificar(order.id)} />
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderCompany;

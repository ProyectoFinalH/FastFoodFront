import React from "react";
import "./Carrito.css";
import venta from "../../images/image3.jpg";
import Eliminarproducto from "../../images/eliminar.png"

function Carrito({ onClose }) {
  return (
    <div className="CarritoBody">
      <div className="carCarrito">
        <div className="carCarritoHeader">
          <h1>Pagos    </h1>
          <div className="closeButton"  onClick={onClose}>X</div>
        </div>
        <div className="carCarritoContent">
        
        <div className="cardProducto">
            <input type="checkbox" />
            <img src={venta} alt="imgproducto" />
            <div>
              <label>Nombre del producto</label>
              <label>Costo</label>
            </div>
            <div className="signos">
            <img src={Eliminarproducto} alt="Elimnar comida"/>

            </div>
            <div>
              <input type="text" 
              maxLength={100} 
              value={1}disabled/>
              
              </div>
            <div className="signos">+</div>
            <div>
              <label>Costo Total</label>
              <label>$10000</label>
            </div>
          </div>

         


          <div className="cardProducto">
            <input type="checkbox" />
            <img src={venta} alt="imgproducto" />
            <div>
              <label>Nombre del producto</label>
              <label>Costo</label>
            </div>
            <div className="signos">-</div>
            <div><input type="text" maxLength={100} 
            value={1}disabled/></div>
            <div className="signos">+</div>
            <div>
              <label>Costo Total</label>
              <label>$10000</label>
            </div>
          </div>






          <div className="cardProducto">
            <input type="checkbox" />
            <img src={venta} alt="imgproducto" />
            <div>
              <label>Nombre del producto</label>
              <label>Costo</label>
            </div>
            <div className="signos">-</div>
            <div><input type="text" maxLength={100} 
            value={1}disabled/></div>
            <div className="signos">+</div>
            <div>
              <label>Costo Total</label>
              <label>$10000</label>
            </div>
          </div>




          <div className="cardProducto">
            <input type="checkbox" />
            <img src={venta} alt="imgproducto" />
            <div>
              <label>Nombre del producto</label>
              <label>Costo</label>
            </div>
            <div className="signos">-</div>
            <div><input type="text" maxLength={100} 
            value={1}disabled/></div>
            <div className="signos">+</div>
            <div>
              <label>Costo Total</label>
              <label>$10000</label>
            </div>
          </div>






        </div>

        {/* Sección de pago */}
        <div className="Pagarproductos">
          <input type="checkbox" />
          <label className="pagolabel">Seleccionar todo</label>
          <div>
            <label className="pagolabel">Costo Total</label>
            <label className="pagolabel">$10000</label>
          </div>
          <button>Pagar</button>
        </div>
      </div>
    </div>
  );
}

export default Carrito;

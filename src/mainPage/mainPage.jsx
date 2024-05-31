import './mainPage.css';
import React, { useState } from 'react';
import StarRating from '../components/starRating/starRating.jsx';
import { filterFoodByType } from '../components/filter/Filter.jsx';

function MainPage() {
  const [rating, setRating] = useState(0);

  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);

  };

  return (
    <div className="App">
      <header className="App-header">
        <input type="text" placeholder="Busca tu restaurante" />
        <h1>Fast Food</h1>
        <button onClick={() => console.log('Cerrar sesión')}>Cerrar sesión</button>
      </header>
      <main>
        <section className="promo-banner">
          <h2>¡Regístrate y obtiene todos nuestros beneficios!</h2>
          <button onClick={() => console.log('Conoce más')}>Conoce más</button>
        </section>
        <section className="restaurant-options">
          <div className="restaurant">
            <h3>El Corral</h3>
            <StarRating rating={rating} onStarClick={handleStarClick} />
            <button onClick={() => console.log('Ver MENÚ')}>Ver MENÚ</button>
          </div>
          <div className="welcome-text">
            <h2>Bienvenido! ¿Qué elegirás hoy?</h2>
          <div className='options'>
            <div className="payment-methods">
              <h3>Medios de pago</h3>
              {/* Agregar métodos de pago aquí */}
            </div>
            <div className="reviews">
              <h3>Opiniones</h3>
              {/* Agregar sección de opiniones aquí */}
            </div>
          </div>
          </div>
        </section>
      </main>
      <footer>
        <button className="chat-button">Chat</button>
      </footer>
    </div>
  );
}

export default MainPage;
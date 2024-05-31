import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Filter = () => {
  const [types, setTypes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/'); // Cambia la URL de la API según tu configuración
        const data = response.data;
        const uniqueTypes = [...new Set(data.map(item => item.type))]; // Extrae tipos únicos
        setTypes(uniqueTypes);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Tipos de platos:</h2>
      <ul>
        {types.map(type => (
          <li key={type}>{type}</li>
        ))}
      </ul>
    </div>
  );
};

export default Filter;
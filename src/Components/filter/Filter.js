// import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { filter_hamburguer } from '../../Redux/actions';
import { useDispatch, useSelector } from 'react-redux';


const Filter = () => {
  const dispatch = useDispatch(); // Obtiene la función dispatch
  const hamburguers = useSelector((state) => state.hamburguers);
  const [selectedCategory, setSelectedCategory] = useState('');

  const filteredHamburguers = hamburguers.filter((hamburguer) => {
    return hamburguer.category === selectedCategory;
  });

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    dispatch(filter_hamburguer(category))
  };


  return (
    <div>
      <select onChange={handleCategoryChange}>
        <option value="">Selecciona una categoría</option>
        <option value="hamburguesa">Hamburguesa</option>
      </select>

      <ul>
        {filteredHamburguers.map((hamburguer) => (
          <li key={hamburguer.id}>{hamburguer.name}</li>
        ))}
      </ul>
    </div>
  );

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:5000/'); // Cambia la URL de la API según tu configuración
  //       const data = response.data;
  //       const uniqueTypes = [...new Set(data.map(item => item.type))]; // Extrae tipos únicos
  //       setTypes(uniqueTypes);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  
};

export default Filter;
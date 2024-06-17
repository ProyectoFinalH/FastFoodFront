import {
    getAllCategoriesAdmin
} from "../../../Redux/actions";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function CategoriesCompany() {
    const dispatch = useDispatch();
    const allCategories = useSelector((state) => state.allCategoriesAdmin);
    const [, setIsRestored] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        dispatch(getAllCategoriesAdmin());
    }, [dispatch]);

    useEffect(() => {
        const fetchMenuState = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/categories/${id}`);
                setIsRestored(response.data.active);
            } catch (error) {
                console.error('Error al cargar el estado del menú', error);
            }
        };

        fetchMenuState();
    }, [id]);

    const toggleItemState = async (menu) => {
        try {
            const url = menu.active
            ? `http://localhost:5000/menus/delete/${menu.id}`
            : `http://localhost:5000/menus/restore/${menu.id}`;

            await axios.put(url);
    const updatedMenus = allCategories.map((item) => {
      if (item.id === menu.id) {
        return { ...item, active: !item.active }; 
      }
      return item;
    });
    dispatch(getAllCategoriesAdmin(updatedMenus)); 
        } catch (error) {
            console.error('Hubo un error al realizar la solicitud', error);
        }
    };



    return (
        <div className="mainContainer">
            <div className="linktocreate">
            <Link to="/menu/create">
                <button>Crear Categoría</button>
            </Link>
            </div>
            <div className="menusContainer">
                {allCategories.map((menu) => (
                    <div className="menuCardsCompany" key={menu.id}>
                        {menu.name}
                        <div className={menu.active ? 'button-show' : 'button-hide'} onClick={() => toggleItemState(menu)}>
                            {menu.active ? '👁 Ocultar' : '👁 Mostrar'}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CategoriesCompany
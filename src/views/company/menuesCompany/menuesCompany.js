import {
    getAllMenusAdmin
} from "../../../Redux/actions";
import "./menuesCompany.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ReactModal from 'react-modal';
import CreateMenuForm from "../../../Components/createMenu/createMenu";
function MenuesCompany() {
    const dispatch = useDispatch();
    const allMenus = useSelector((state) => state.allMenusAdmin);
    const [, setIsRestored] = useState(false);
    const { id } = useParams();    
    const [showCreateCategoryModal, setShowCreateCategoryModal] = useState(false);

    useEffect(() => {
        dispatch(getAllMenusAdmin());
    }, [dispatch]);

    useEffect(() => {
        const fetchMenuState = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/menuitems/${id}`);
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
            const updatedMenus = allMenus.map((item) => {
                if (item.id === menu.id) {
                    return { ...item, active: !item.active };
                }
                return item;
            });
            dispatch(getAllMenusAdmin(updatedMenus));
        } catch (error) {
            console.error('Hubo un error al realizar la solicitud', error);
        }
    };



    return (
        <div className="mainContainerMenues">
            <div className="linktocreate2">
                <ReactModal
                    isOpen={showCreateCategoryModal}
                    onRequestClose={() => setShowCreateCategoryModal(false)}
                    className="custom-modal"
                >
                    <CreateMenuForm />
                    <button className="custom-modal-button2" onClick={() => setShowCreateCategoryModal(false)}>X</button>
                </ReactModal>
                <button onClick={() => setShowCreateCategoryModal(true)}>Crear Menu</button>
            </div>
            <div className="menusContainer">
                {allMenus.map((menu) => (
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

export default MenuesCompany
import {
    getAllMenusCompany
} from "../../../Redux/actions";
import "./menuesCompany.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ReactModal from 'react-modal';
import CreateMenuForm from "../../../Components/createMenu/createMenu";
import { axiosInstance, configureAxios } from "../../../AuthContext/axiosInstance";
function MenuesCompany() {
    const dispatch = useDispatch();
    const allMenus = useSelector((state) => state.menusCompany);
    const [, setIsRestored] = useState(false);
    const { id } = useParams();    
    const [showCreateCategoryModal, setShowCreateCategoryModal] = useState(false);
    const token = useSelector((state)=> state.token.data);
    const URLBACK="https://fastfoodback3-production.up.railway.app";

    useEffect(() => {
        dispatch(getAllMenusCompany());
    }, [dispatch]);

    useEffect(() => {
        const fetchMenuState = async () => {
            try {
                const response = await axios.get(URLBACK+`/menuitems/${id}`);
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
                ? URLBACK+`/menus/delete/${menu.id}`
                : URLBACK+`/menus/restore/${menu.id}`;

                configureAxios(token);

            await axiosInstance.put(url);
            const updatedMenus = allMenus.map((item) => {
                if (item.id === menu.id) {
                    return { ...item, active: !item.active };
                }
                return item;
            });
            dispatch(getAllMenusCompany(updatedMenus));
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
                        {menu.name.charAt(0).toUpperCase() + menu.name.slice(1)}
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
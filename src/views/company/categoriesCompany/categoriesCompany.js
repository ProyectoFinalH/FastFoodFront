import {
    getAllCategoriesCompany
} from "../../../Redux/actions";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import CreateCategories from "../../../Components/createMenu/createCategories";
import ReactModal from 'react-modal';
import "./categoriesCompany.css"
import { axiosInstance, configureAxios } from "../../../AuthContext/axiosInstance";

function CategoriesCompany() {
    const dispatch = useDispatch();
    const allCategories = useSelector((state) => state.categoriesCompany);
    const [, setIsRestored] = useState(false);
    const { id } = useParams();
    const [showCreateCategoryModal, setShowCreateCategoryModal] = useState(false);
    ReactModal.setAppElement('#root');
    const token = useSelector((state) => state.token.data)
    const URLBACK="https://fastfoodback3-production.up.railway.app";


    useEffect(() => {
        dispatch(getAllCategoriesCompany());
    }, [dispatch]);

    useEffect(() => {
        const fetchMenuState = async () => {
            try {
                const response = await axios.get(URLBACK+`/categories/${id}`);
                setIsRestored(response.data.active);
            } catch (error) {
                console.error('Error al cargar el estado del menú', error);
            }
        };

        fetchMenuState();
    }, [id]);

    const toggleItemState = async (categories) => {
        try {
            const url = categories.active
                ? URLBACK+`/categories/delete/${categories.id}`
                : URLBACK+`/categories/restore/${categories.id}`;

            configureAxios(token);
            await axiosInstance.put(url);
            const updatedMenus = allCategories.map((item) => {
                if (item.id === categories.id) {
                    return { ...item, active: !item.active };
                }
                return item;
            });
            dispatch(getAllCategoriesCompany(updatedMenus));
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
                    <CreateCategories />
                    <button className="custom-modal-button3" onClick={() => setShowCreateCategoryModal(false)}>X</button>
                </ReactModal>
                <button onClick={() => setShowCreateCategoryModal(true)}>Crear Categoría</button>
            </div>
            <div className="menusContainer">
                {allCategories.map((menu) => (
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

export default CategoriesCompany
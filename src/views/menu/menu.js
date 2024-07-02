import {
  getAllMenuitems,
  getAllMenus,
  getMenuItemsByName,
  getAllCategories,
  getAllRestaurants,
} from "../../Redux/actions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import CardsMenuItem from "../../Components/cards/cardsMenuItems/cardsMenuItems";
import NavbarMenu from "../../Components/navbarMenu/navbarMenu";
import CardsMenus from "../../Components/cards/cardsMenus/cardsMenus";
import Navbar from "../../Components/navbar/navbar";
import Detail from "../detail/detail";

import { useLocalStorage } from "../../Components/localStorage/useLocalStorage";
import { login_user_localstorag } from "../../Redux/actions";

import { removeOrder } from "../../Components/localStorage-car/LocalStorageCar";
import {
  obtenerEstatusUsuario,
  obtenerCorreoUsuario,
  obtenerNombreUsuario,
  obtenerIdUsuario,
  getSelctRestaurantapp,
} from "../../Components/Login/Login_Ingreso/LocalStorange_user/LocalStorange_user";
import Loading from "../../Components/loading/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Rating from "../../Components/rating/rating";

function Menu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const allRestaurants = useSelector((state) => state.allRestaurants);
  const allMenus = useSelector((state) => state.allMenus);
  const allMenuitems = useSelector((state) => state.allMenuItems);
  const allCategories = useSelector((state) => state.allCategories);

  const [selectMenuItem, setSelectMenuItem] = useLocalStorage(
    "selectMenuItem",
    null
  );
  const [selectedRestaurantId, setSelectedRestaurant] = useState();
  const [searchString, setSearchString] = useLocalStorage("searchString", "");
  const [sortBy, setSortBy] = useLocalStorage("sortBy", null);
  const [priceRange, setPriceRange] = useLocalStorage("priceRange", "");
  const [selectedMenuItemId, setSelectedMenuItemId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [ratings, setRatings] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const email = obtenerCorreoUsuario();
    const rest = getSelctRestaurantapp();
    setSelectedRestaurant(rest);

    if (email) {
      const tem_Users = {
        state: obtenerEstatusUsuario(),
        id: obtenerIdUsuario(),
        email: email,
        name: obtenerNombreUsuario(),
      };
      dispatch(login_user_localstorag(tem_Users));

      if (selectedRestaurantId) {
        navigate(`/menu/${selectedRestaurantId}`);
      } else {
        navigate("/menu");
      }
    } else {
      navigate("/");
    }
  }, [dispatch, navigate, selectedRestaurantId]);

  useEffect(() => {
    dispatch(getAllMenus());
    dispatch(getAllMenuitems());
    dispatch(getAllCategories());
    dispatch(getAllRestaurants());
  }, [dispatch]);

  const restaurant1 = allRestaurants?.find(
    (restaurant) => restaurant?.id === selectedRestaurantId
  );

  const handleCategoryFilter = (category) => {
    setSelectedCategory(Number(category));
  };

  const applyPriceRangeFilter = (menuItems, range) => {
    if (!range || typeof range !== "string") {
      return menuItems;
    }

    const [min, max] = range.split("-").map(Number);
    return menuItems?.filter((menu) => menu.price >= min && menu?.price <= max);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getMenuItemsByName(searchString));
  };

  const clearFilters = () => {
    setSearchString("");
    setSortBy("");
    setPriceRange("");
    setSelectMenuItem(null);
    setSelectedCategory("");
  };

  let filteredMenuItems = [...allMenuitems];

  const handleSelectMenu = (menuItem) => {
    try {
      setSelectMenuItem((prevId) => {
        const newId = prevId === menuItem ? null : menuItem;
        window.localStorage.setItem("selectMenuItem", JSON.stringify(newId));
        return newId;
      });
    } catch (error) {
      console.error(error);
    }
  };

  if (selectMenuItem) {
    filteredMenuItems = filteredMenuItems?.filter(
      (menu) => menu?.menu_id === selectMenuItem
    );
  }

  if (selectedCategory) {
    filteredMenuItems = filteredMenuItems?.filter(
      (menuItem) => menuItem?.category_id === selectedCategory
    );
  }

  if (sortBy === "menorPrecio") {
    filteredMenuItems = filteredMenuItems?.sort((a, b) => a.price - b.price);
  } else if (sortBy === "mayorPrecio") {
    filteredMenuItems = filteredMenuItems?.sort((a, b) => b.price - a.price);
  }

  if (priceRange && filteredMenuItems?.length > 0) {
    filteredMenuItems = applyPriceRangeFilter(filteredMenuItems, priceRange);
  }

  if (searchString.trim() !== "") {
    filteredMenuItems = filteredMenuItems?.filter((menuItem) =>
      menuItem?.name?.toLowerCase().includes(searchString.toLowerCase())
    );
  }

  const handleGoBack = () => {
    removeOrder();
    navigate("/home");
  };

  const handleOpenRating = () => {
    setRatings(true);
  };

  const handleCloseRating = () => {
    setRatings(false);
  };

  console.log("allmenu", allMenus);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {loading && <Loading />}
      <Navbar />
      <div className="flex flex-1 overflow-auto">
        <div className="w-72 bg-white bg-opacity-95 p-4 flex flex-col gap-4 sticky top-0">
          <button
            className="bg-red-500 text-white border-none py-2 px-4 rounded-md shadow-md hover:shadow-lg transform hover:translate-y-0.5 transition-transform"
            onClick={handleGoBack}
          >
            Volver
          </button>
          <div className="flex flex-col items-center gap-2">
            <img
              src={restaurant1?.image_url}
              alt="logoRest"
              className="w-40 h-40 rounded-full"
            />
            <h2 className="text-xl font-bold text-gray-700">
              {restaurant1?.name}
            </h2>
          </div>
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={handleOpenRating}
          >
            <p className="text-gray-700">Opiniones</p>
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
              <span className="text-gray-700">
                {parseInt(restaurant1?.rating)}
              </span>
            </div>
          </div>
          {ratings && (
            <Rating
              onClose={handleCloseRating}
              restaurantId={restaurant1?.id}
            />
          )}
          <div className="flex flex-col gap-4">
            <div className="overflow-y-auto max-h-80">
              <CardsMenus
                AllMenus={allMenus.filter(
                  (menu) => menu.restaurant_id === selectedRestaurantId
                )}
                handleSelectMenu={handleSelectMenu}
              />
            </div>
            <div className="flex flex-col gap-4">
              <NavbarMenu
                searchString={searchString}
                setSearchString={setSearchString}
                handleSubmit={handleSubmit}
                handleSort={setSortBy}
                handlePriceRange={setPriceRange}
                clearFilter={clearFilters}
                handleCategoryFilter={handleCategoryFilter}
                allCategories={allCategories.filter(
                  (category) => category.restaurant_id === selectedRestaurantId
                )}
                sortBy={sortBy}
                applyPriceRangeFilter={applyPriceRangeFilter}
                priceRange={priceRange}
              />
            </div>
          </div>
        </div>
        <div className="flex-1 p-4 flex flex-col gap-4">
          {allMenus?.map((menu) => {
            const menuItems = filteredMenuItems?.filter(
              (menuItem) =>
                menuItem?.restaurant_id === selectedRestaurantId &&
                menuItem?.menu_id === menu.id
            );

            if (menuItems?.length > 0) {
              return (
                <div
                  key={menu.id}
                  className="bg-white rounded-lg shadow-md p-4"
                >
                  <h1 className="text-3xl font-bold text-gray-800 mb-4">
                    {menu.name}
                  </h1>
                  <CardsMenuItem
                    AllMenuitems={menuItems}
                    handleSelectMenuItem={(id) => setSelectedMenuItemId(id)}
                  />
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>
      {selectedMenuItemId && (
        <Detail
          isOpen
          handleCloseModal={() => setSelectedMenuItemId(null)}
          menuItemId={selectedMenuItemId}
        />
      )}
    </div>
  );
}

export default Menu;

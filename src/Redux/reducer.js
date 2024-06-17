import {
  REGISTERUSER,
  REGISTERBUSINESS,
  RECOVERYKEY,
  USERLOGIN,
  USERLOGINGOOGLE,
  GET_MENUS,
  GET_MENUS_ADMIN,
  GET_MENUITEMS,
  GET_MENUITEMS_ADMIN,
  GET_MENUITEMS_BYNAME,
  SORTER_ASC,
  CREATE_MENU,
  CREATE_MENU_ITEMS,
  GET_RESTAURANTS,
  UPDATE_USER,
  LOGOUT_USER,
  GET_RESTAURANTS_ALL,
  CREATE_CATEGORIES,
  GET_CATEGORIES,
  CREATECOMPRA,
  GET_USERS_ALL,
  GET_ORDERS_ADMIN,
  CREATELISTAORDERSCOMPANY,
  CANCELARCOMPRAUSER, // CArrito deshabilitar datos
  IDCARRITOMERCADOPAGO, //hacer la verificaicon de compra
  GET_CATEGORIES_ADMIN,
} from "../Redux/action-types";

const initialState = {
  USER: null,
  Carrito: null,
  ListaOrderCompany: null, //create lista order company
  Compra_Inabilitada: null,
  allUsersAdmin: [],
  allRestaurantsAdmin: [],
  Venta: null,
  allOrdersAdmin:[],
  RegisterUserData: null,
  RegisterBusiness: null,
  allRestaurants: [],
  allMenuItems: [],
  getAllMenuitemsAdmin: [],
  allMenus: [],
  allMenusAdmin: [],
  allCategories: [],  
  allCategoriesAdmin: [],
  createMenu: null,
  createMenuItems: null,
  createCategories: null,
  User_Actualizado: null,
};

const reducer = (state = initialState, { type, payload }) => {
  // console.log("entro al reducer la informacion" + payload);

  switch (type) {
    case REGISTERUSER:
      return {
        ...state,
        RegisterUserData: payload,
      };
    case REGISTERBUSINESS:
      return {
        ...state,
        RegisterBusiness: payload,
      };
    case RECOVERYKEY:
      return {
        ...state,
        Registrado: payload,
      };
    case USERLOGIN:
      return {
        ...state,
        USER: payload,
      };
    case USERLOGINGOOGLE:
      return {
        ...state,
        USER: payload,
      };
    case GET_MENUS:
      return {
        ...state,
        allMenus: payload,
      };
    case GET_MENUITEMS:
      return {
        ...state,
        allMenuItems: payload,
      };
    // case GET_CATEGORIES:
    //   return {
    //     ...state,
    //     allCountries: action.payload,
    //   };

    case GET_MENUITEMS_BYNAME:
      return {
        ...state,
        allMenuItems: payload,
      };
    case SORTER_ASC:
      return {
        ...state,
        allMenuItems: payload,
      };
   
        case CREATE_MENU:
          return {
            ...state,
            createMenu: payload
          };
          case CREATE_MENU_ITEMS:
          return {
            ...state,
            createMenuItems: payload
          };

          case GET_RESTAURANTS:
            return{
              ...state,
              allRestaurants: payload,
            };

          case UPDATE_USER:
            return {
              ...state,
              User_Actualizado: payload,
            };
          case LOGOUT_USER:
            return {
              ...state,
              USER: null,
            };
            case CREATE_CATEGORIES:
              return {
                ...state,
                createCategories: payload,
              }
            case GET_CATEGORIES:
              return {
                ...state,
                allCategories: payload,
              }
            case CREATECOMPRA:
              return{
                ...state,
                Carrito: payload,
              }
              case CREATELISTAORDERSCOMPANY:
                return{
                  ...state,
                ListaOrderCompany: payload,
                }
          case CANCELARCOMPRAUSER:
            return{
              ...state,
              Compra_Inabilitada: payload,
            }
            case IDCARRITOMERCADOPAGO:
            return{
              ...state,
              Venta: payload
            }


    case GET_MENUITEMS_ADMIN:
      return {
        ...state,
        getAllMenuitemsAdmin: payload,
      };
    case GET_MENUS_ADMIN:
      return {
        ...state,
        allMenusAdmin: payload,
      };
    case GET_RESTAURANTS_ALL:
      return {
        ...state,
        allRestaurantsAdmin: payload,
      };
    case GET_USERS_ALL:
      return {
        ...state,
        allUsersAdmin: payload,
      };
      case GET_ORDERS_ADMIN:
        return {
          ...state,
          allOrdersAdmin: payload,
        };
        case GET_CATEGORIES_ADMIN:
        return {
          ...state,
          allCategoriesAdmin: payload,
        }
    default:
      return { ...state };
  }
};

export default reducer;

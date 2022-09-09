import axios from "axios";
import Swal from "sweetalert2";

export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_CATEGORIES = "GET_CATEGORIES";
export const GET_PRODUCTS_ID = "GET_PRODUCTS_ID";
export const GET_PRODUCTS_NAME = "GET_PRODUCTS_NAME";
export const SORT_PRODUCTS_BY_NAME = "SORT_PRODUCTS_BY_NAME";
export const SORT_PRODUCTS_BY_RATING = "SORT_PRODUCTS_BY_RATING";
export const FILTER_PRODUCTS = "FILTER_PRODUCTS";
export const CLEAR_DETAIL = "CLEAR_DETAIL";
export const GET_REVIEWS_PRODUCT = "GET_REVIEWS_PRODUCT";
export const GET_ALL_USERS = "GET_ALL_USERS";
export const GET_USER_BY_ID = "GET_USER_BY_ID";
export const ADD_ITEM_TO_CART = "ADD_ITEM_TO_CART";
export const REMOVE_ITEM_FROM_CART = "REMOVE_ITEM_FROM_CART";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_CATEGORY = "CREATE_CATEGORY";
export const GET_USERS_REVIEW = "GET_USERS_REVIEW";
export const GET_ORDERS_FROM_DB = "GET_ORDERS_FROM_DB";
export const SET_ORDER_CHECKOUT = "SET_ORDER_CHECKOUT";
export const CONFIRM_ORDER_CHECKOUT = "CONFIRM_ORDER_CHECKOUT";
export const RESET_CART = "RESET_CART";
export const RESET_ORDER = "RESET_ORDER";
export const UPDATE_ORDER = "UPDATE_ORDER";
export const GET_USERS_BY_EMAIL = "GET_USERS_BY_EMAIL";
export const ADD_ITEM_TO_CART_STORAGE = "ADD_ITEM_TO_CART_STORAGE";
export const REMOVE_ITEM_TO_CART_STORAGE = "REMOVE_ITEM_TO_CART_STORAGE";
export const ADD_COUNTER_LOCAL_STORAGE = "ADD_COUNTER_LOCAL_STORAGE";
export const FIRST_SET_COUNT = "FIRST_SET_COUNT";
export const POST_USER = "POST_USER";
export const ADD_SHIPPING_STORAGE = "ADD_SHIPPING_STORAGE";
export const IS_AUTHENTICATED = "IS_AUTHENTICATED";
export const EDIT_CATEOGRY = "EDIT_CATEOGRY";
export const ADD_ITEM_TO_FAVS = "ADD_ITEM_TO_FAVS";

export function getProducts() {
  return async function (dispatch) {
    try {
      const productsDb = await axios.get("/api/products");

      return dispatch({
        type: GET_PRODUCTS,
        payload: productsDb.data.results,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getCategories() {
  return async function (dispatch) {
    const json = await axios.get("/api/categories");
    return dispatch({
      type: GET_CATEGORIES,
      payload: json.data.results,
    });
  };
}

export function getProductsById(id) {
  return async (dispatch) => {
    if (id) {
      try {
        const json = await axios.get(`/api/products/detail/${id}`);
        return dispatch({
          type: GET_PRODUCTS_ID,
          payload: json.data.results,
        });
      } catch (error) {
        console.log(error);
      }
    }
    return {
      type: GET_PRODUCTS_ID,
      payload: [],
    };
  };
}
export function getProductsByName(payload) {
  return async function (dispatch) {
    try {
      const json = await axios.get(`/api/products?nameProduct=${payload}`);
      return dispatch({
        type: GET_PRODUCTS_NAME,
        payload: json.data.results,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Sorry!",
        text: "This product does not exist for now, reload the page",
        confirmButtonText: "Ok",
      });
      // alert("No existe el producto, recarga la pagina");
    }
  };
}

export function sortByName(payload) {
  return function (dispatch) {
    try {
      return dispatch({
        type: SORT_PRODUCTS_BY_NAME,
        payload: payload,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function sortByRating(payload) {
  return function (dispatch) {
    try {
      return dispatch({
        type: SORT_PRODUCTS_BY_RATING,
        payload: payload,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function filters(payload) {
  return async function (dispatch) {
    const json = await axios.get(
      `/api/products/filter?categoryName=${payload.category}&min=${payload.min}&max=${payload.max}`
    );
    try {
      return dispatch({
        type: FILTER_PRODUCTS,
        payload: json.data.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function postProduct(payload) {
  return async function (dispatch) {
    const json = await axios.post("/api/products/createProduct", payload);

    try {
      console.log(json);
      return json;
    } catch (error) {
      console.log(error);
    }
  };
}

export function clearDetail() {
  return {
    type: CLEAR_DETAIL,
  };
}

export function getReviewsProduct(payload) {
  return async function (dispatch) {
    try {
      const users = await axios.get("/api/users");
      const { data } = await axios.get("/api/reviews/product");

      return dispatch({
        type: GET_REVIEWS_PRODUCT,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function addItemToCart(payload) {
  return {
    type: ADD_ITEM_TO_CART,
    payload: payload,
  };
}
export function addItemToCartLocalStorage() {
  return {
    type: ADD_ITEM_TO_CART_STORAGE,
  };
}
export function removeItemToCartLocalStorage() {
  return {
    type: REMOVE_ITEM_TO_CART_STORAGE,
  };
}

export function removeItemFromCart(payload) {
  return {
    type: REMOVE_ITEM_FROM_CART,
    payload: payload,
  };
}

//obtener todos los usuarios de la db
export function getAllUsers() {
  return async function (dispatch) {
    const json = await axios.get("/api/users");
    return dispatch({
      type: GET_ALL_USERS,
      payload: json.data.results,
    });
  };
}

export function addCounterLocalStorage() {
  return {
    type: ADD_COUNTER_LOCAL_STORAGE,
  };
}
export function firstSetCount() {
  return {
    type: FIRST_SET_COUNT,
  };
}
export function getUserById(idUser) {
  return async function (dispatch) {
    const json = await axios.get(`/api/users/${idUser}`);
    return dispatch({
      type: GET_USER_BY_ID,
      payload: json.data.results,
    });
  };
}

export function postReview(payload) {
  return async function () {
    try {
      const json = await axios.post("/api/reviews/", payload);

      console.log(json);
      return json;
    } catch (error) {
      console.log(error);
    }
  };
}

export function updateProduct(product) {
  return async function () {
    const json = await axios.put(`/api/products/${product.id}`, product);
    return {
      type: UPDATE_PRODUCT,
      payload: json.data.results,
    };
  };
}

export function getUsersReview() {
  return async function (dispatch) {
    try {
      const user = await axios.get("/api/users");

      return dispatch({
        type: GET_USERS_REVIEW,
        payload: user.data.results,
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function getOrdersFromDb() {
  return async function (dispatch) {
    const json = await axios.get(`/api/orders`);
    return dispatch({
      type: GET_ORDERS_FROM_DB,
      payload: json.data.results,
    });
  };
}

export function setOrderCheckout(payload) {
  return async function (dispatch) {
    console.log(payload);
    const json = await axios.post("/api/orders", payload);

    return dispatch({
      type: SET_ORDER_CHECKOUT,
      payload: json.data.results,
    });
  };
}

export function confirmOrderCheckout(id, payload) {
  return async function (dispatch) {
    const json = await axios.put(`/api/orders/${id}`, payload);
    return dispatch({
      type: CONFIRM_ORDER_CHECKOUT,
      payload: json.data.results,
    });
  };
}

export function resetCart() {
  return {
    type: RESET_CART,
  };
}

export function resetOrder() {
  return {
    type: RESET_ORDER,
  };
}

export function deleteProduct(idProduct) {
  return async function () {
    const json = await axios.delete(`/api/products/${idProduct}`);
    return {
      type: DELETE_PRODUCT,
      payload: json.data.results,
    };
  };
}

export function createCategory(payload) {
  return async function () {
    const json = await axios.post(`/api/categories`, payload);
    return {
      type: CREATE_CATEGORY,
      payload: json.data.results,
    };
  };
}

export function updateOrder(payload) {
  return async function () {
    const json = await axios.put(`/api/orders/${payload.id}`, payload);
    return {
      type: UPDATE_ORDER,
      payload: json.data.results,
    };
  };
}

export function getUsersByEmail(emailUser) {
  return async function (dispatch) {
    try {
      const { data } = await axios.get("/api/users");
      const usuarioFiltrado = data.results.filter(
        (el) => el.email === emailUser
      );

      return dispatch({
        type: GET_USERS_BY_EMAIL,
        payload: usuarioFiltrado[0].id,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
// esto fue lo que acabe de hacer Danilo.
export function postUser(payload) {
  return async function (dispatch) {
    const { data } = await axios.post("/api/users/created", payload);
    try {
      return dispatch({
        type: GET_USERS_BY_EMAIL,
        payload: data.results[0].id,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
/* export function postUser(payload) {
  return async function (dispatch) {
    const json = await axios.post("/api/users/created", payload);
    try {
      console.log("soy la accion y esto me llego del front ", json);

      return json;
    } catch (error) {
      console.log(error);
    }
}
} */
export function updateUser(payload) {
  return async function () {
    console.log(
      "soy lo que llega cuando disparan la accion updateUser ",
      payload
    );
    const json = await axios.put(
      "/api/users/editarUser",
      payload
    );
    return {
      type: "UPDATE_USER",
      payload: json.data.results,
    };
  };
}

export function addShippingStorage(payload) {
  return {
    type: ADD_SHIPPING_STORAGE,
    payload: payload,
  };
}

export function authenticatedReact() {
  return {
    type: IS_AUTHENTICATED,
  };
}

export function editCategory(payload) {
  return async function (dispatch) {
    const { data } = await axios.put("/api/categories", payload);
    return dispatch({
      type: EDIT_CATEOGRY,
    });
  };
}

export function addItemToFavs(payload) {
  return {
    type: ADD_ITEM_TO_FAVS,
    payload: payload,
  };
}

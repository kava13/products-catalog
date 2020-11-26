import { combineReducers } from "redux";
import { handleActions } from "redux-actions";
import * as actions from "../actions/index";

const sections = handleActions(
  {
    [actions.fetchSectionsSuccess](
      state,
      { payload: { sectionsById, allSectionsIds } }
    ) 
    {
      console.log('sss', sectionsById);
      return {
        ...state,
        fullSectionsById: { ...sectionsById },
        sectionsById: { ...sectionsById },
        allIds: [...allSectionsIds],
      };
    },
  },
  { fullSectionsById: {}, sectionsById: {}, allIds: [] }
);

const products = handleActions(
  {
    [actions.fetchProductsSuccess](
      state,
      { payload: { productsById, allProductsIds } }
    ) {
      console.log("fullllllllllllllllllllllllllll", productsById);

      return {
        ...state,
        fullProductsById: productsById,
        productsById: productsById,
        allIds: allProductsIds,
      };
    },
    [actions.setFilterId](state, { payload: { id } }) {
      return {
        ...state,
        filterId: id,
      };
    },
    [actions.setSortedName](state, { payload: { sortedName } }) {
      console.log("Hello from reducers", sortedName);
      return {
        ...state,
        sortedName: sortedName,
      };
    },
    [actions.toggleOnFavoritesState](state, { payload: { id } }) {
      console.log("А вот и дошли досюда", id);
      console.log("А вот и дошли досюда2", state.productsById[id]);
      const prevStateFavorites = state.fullProductsById[id].on_favorites;

      return {
        ...state,
        fullProductsById: {
          ...state.fullProductsById,
          [id]: {
            ...state.fullProductsById[id],
            on_favorites:
              prevStateFavorites === true ? false : true,
          },
        },
        productsById: {
          ...state.productsById,
          [id]: {
            ...state.productsById[id],
            on_favorites:
            prevStateFavorites === true ? false : true,
          },
        },
      };
    },
    [actions.toggleOnBasketState](state, { payload: { id } }) {
      console.log("А вот и дошли досюда", id);
      console.log("А вот и дошли досюда2", state.productsById[id]);
      const prevStateBasket = state.fullProductsById[id].on_basket;
      return {
        ...state,
        fullProductsById: {
          ...state.fullProductsById,
          [id]: {
            ...state.fullProductsById[id],
            on_basket:
            prevStateBasket === true ? false : true,
          },
        },
        productsById: {
          ...state.productsById,
          [id]: {
            ...state.productsById[id],
            on_basket: prevStateBasket === true ? false : true,
          },
        },
      };
    },
    [actions.getProductsCatalog](state) {
      return {
        ...state,
        productsById: state.fullProductsById,
        filterId: null,
        sortedName: null,
      };
    },
  },
  {
    fullProductsById: {},
    productsById: {},
    allIds: [],
    filterId: null,
    sortedName: null,
  }
);

const pagination = handleActions(
  {
    [actions.setCurrentPage](state, { payload: { page } }) {
      return {
        currentPage: page,
      };
    },
    [actions.setFilterId](state) {
      return {
        currentPage: 1,
      };
    },
    [actions.getProductsCatalog](state) {
      return {
        currentPage: 1,
      };
    },
  },
  { currentPage: 1 }
);

export default combineReducers({
  sections,
  products,
  pagination,
});

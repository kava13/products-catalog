import { createAction } from "redux-actions";
import axios from "axios";
import { reduce } from "lodash";

export const fetchSectionsSuccess = createAction("SECTIONS_GET");
export const fetchProductsSuccess = createAction("PRODUCTS_GET");
export const setFilterId = createAction("PRODUCTS_FILTER_SET");
export const setSortedName = createAction("PRODUCTS_SORTED_SET");
export const setCurrentPage = createAction("PAGINATION_SET_PAGE");

export const toggleOnFavoritesState = createAction(
  "PRODUCTS_ON_FAVORITES_STATE"
);
export const toggleOnBasketState = createAction("PRODUCTS_ON_BASKET_STATE");

export const getProductsCatalog = createAction("PRODUCTS_GET_CATALOG");

export const fetchData = () => async (dispatch) => {
  const sectionsData = await axios.get("./data/api/sections.json");

  const productsData = await axios.get("./data/api/products.json");

  const sections = sectionsData.data;
  const products = productsData.data;

  const sectionsById = sections.reduce((acc, item) => {
    let partsOfSection = sections.reduce((acc, elem) => {
      return elem.parent === item.id ? [...acc, elem.id] : [...acc];
    }, []);

    partsOfSection = partsOfSection.length === 0 ? undefined : partsOfSection;

    return { ...acc, [item.id]: { ...item, parts: partsOfSection } };
  }, {});

  const productsById = products.reduce((acc, item) => {
    return {
      ...acc,
      [item.id]: { ...item, on_favorites: false, on_basket: false },
    };
  }, {});

  const allSectionsIds = Object.keys(sectionsById);

  const allProductsIds = Object.keys(productsById);

  dispatch(fetchSectionsSuccess({ sectionsById, allSectionsIds }));
  dispatch(fetchProductsSuccess({ productsById, allProductsIds }));
};

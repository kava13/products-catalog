import { createSelector } from "reselect";

export const getFullSectionsById = (state) => state.sections.fullSectionsById;
export const getSectionsBydId = (state) => state.sections.sectionsById;
export const getSectionsIds = (state) => state.sections.allIds;

export const getFullProductsById = (state) => state.products.fullProductsById;
export const getProductsById = (state) => state.products.productsById;
export const getProductsIds = (state) => state.products.allIds;
export const getCurrentPage = (state) => state.pagination.currentPage;

export const getProductsFilterId = (state) => state.products.filterId;
export const getProductsSortedName = (state) => state.products.sortedName;

export const sectionsSelector = createSelector(
  [getSectionsBydId, getSectionsIds],
  (sectionsById, allIds) => {
    // console.log('gggggggggggggggggggg', sectionsById);
    return allIds.map((id) => sectionsById[id]);
  }
);

export const productsSelector = createSelector(
  [getProductsById, getProductsIds],
  (productsById, allIds) => {
    return allIds.map((id) => productsById[id]);
  }
);

export const fullProductsSelector = createSelector(
  [getFullProductsById, getProductsIds],
  (fullProductsById, allIds) => {
    return allIds.map((id) => fullProductsById[id]);
  }
);

export const filteredProductsSelector = createSelector(
  [productsSelector, getProductsFilterId],
  (products, filterId) => {
    if (!filterId) return products;

    return products.filter((p) => p.section === filterId);
  }
);

// export const filteredProductsSelector = createSelector(
//     [getProducts, getFilterId],
//     (products, filterId) => {
//         console.log('ALLproducts ', products);
//         console.log('CURRENTFilterId ', filterId);

//         let filteredProducts = [];

//         if (filterId) {
//             filteredProducts = products.filter((item) => {
//             return item.section === filterId;
//             })
//         } else {
//             filteredProducts = products;
//         }

//         return filteredProducts;
//     }
// );

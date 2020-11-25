import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions/index.js";
import {
  filteredProductsSelector,
  getProductsSortedName,
  getCurrentPage,
  getProductsFilterId,
  getFullSectionsById,
} from "../selectors/index.js";
import _ from "lodash";
import formatWeight from "../utils/formatWeight";
import formatPrice from "../utils/formatPrice";
import calculateQuantity from "../utils/calculateQuantity";

import "../css/products.css";
import "../css/pagination.css";

const mapStateToProps = (state) => {
  const props = {
    sectionsById: getFullSectionsById(state),
    products: filteredProductsSelector(state),
    sortedName: getProductsSortedName(state),
    page: getCurrentPage(state),
    filterId: getProductsFilterId(state),
  };
  return props;
};

const actionCreators = {
  setSortedName: actions.setSortedName,
  toggleOnFavoritesState: actions.toggleOnFavoritesState,
  toggleOnBasketState: actions.toggleOnBasketState,
  setCurrentPage: actions.setCurrentPage,
};

const ITEMS_ON_PAGE = 15;

class Products extends React.Component {
  handleSetSortedName = (event) => {
    const { setSortedName } = this.props;
    setSortedName({ sortedName: event.target.value });
  };

  sortProducts = (products) => {
    const { sortedName } = this.props;

    switch (sortedName) {
      case "priceASC":
        products = _.orderBy(products, ["price"], ["asc"]);
        break;
      case "priceDESC":
        products = _.orderBy(products, ["price"], ["desc"]);
        break;
      case "nameASC":
        products = _.orderBy(products, ["name"], ["asc"]);
        break;
      default:
        products = products;
    }
    return products;
  };

  toggleOnFavoritesState = (id) => {
    const { toggleOnFavoritesState } = this.props;
    toggleOnFavoritesState({ id });
  };

  toggleOnBasketState = (id) => {
    const { toggleOnBasketState } = this.props;
    toggleOnBasketState({ id });
  };

  render() {
    const { products, filterId, page, sectionsById } = this.props;

    const sortedProducts = this.sortProducts(products);

    const parent = filterId ? sectionsById[filterId].parent : null;

    return (
      <div className="products-block">
        <h1 className="products-title">
          {filterId ? (
            <span>
              {sectionsById[parent].name +
                " " +
                sectionsById[filterId].name.toLowerCase()}
            </span>
          ) : (
            "Все продукты"
          )}
        </h1>
        <select
          className="products-select"
          onChange={(event) => this.handleSetSortedName(event)}
        >
          <option>Выберите</option>
          <option value="priceASC">По возрастанию цены</option>
          <option value="priceDESC">По убыванию цены</option>
          <option value="nameASC">По алфавиту</option>
        </select>

        <div className="products-wrapper">
          {products &&
            sortedProducts
              .slice((page - 1) * ITEMS_ON_PAGE, page * ITEMS_ON_PAGE)
              .map((item) => {
                let checkIcon =
                  item.on_basket === true ? (
                    <img
                      className="products-check"
                      src="/data/images/other/check.png"
                    />
                  ) : (
                    ""
                  );
                return (
                  <div className="products-card" key={item.id}>
                    <div className="products-info">
                      <div className="products-img">
                        <img src={`/data/images/${item.photo}`} />
                      </div>
                      <div className="products-name">{item.name}</div>
                      <div className="products-weight">
                        {formatWeight(item.weight)}
                      </div>
                      <div className="products-price">
                        {formatPrice(item.price)}
                      </div>
                      <div className="products-amount">
                        {calculateQuantity(item.quantity)}
                      </div>
                      <div className="products-buttons">
                        <button
                          style={{
                            backgroundColor:
                              item.on_basket === true ? "#26b04d" : "",
                          }}
                          className="products-button"
                          onClick={() => this.toggleOnBasketState(item.id)}
                        >
                          {checkIcon} <span>В корзину</span>
                        </button>
                        <button
                          className="products-favorites"
                          onClick={() => this.toggleOnFavoritesState(item.id)}
                        >
                          <img
                            src={
                              item.on_favorites === true
                                ? `/data/images/other/favorites-active.png`
                                : `/data/images/other/favorites.png`
                            }
                          ></img>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(Products);

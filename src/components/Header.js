import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions/index.js";
import { fullProductsSelector } from "../selectors/index.js";
import _ from "lodash";

import "../css/header.css";

const mapStateToProps = (state) => {
  const props = {
    fullProducts: fullProductsSelector(state),
  };
  return props;
};

const actionCreators = {
  getProductsCatalog: actions.getProductsCatalog,
};

class Header extends React.Component {
  getProductsCatalog = () => {
    const { getProductsCatalog } = this.props;
    getProductsCatalog();
  };

  render() {
    const { fullProducts } = this.props;

    const countFavorites = fullProducts.filter((p) => p.on_favorites === true)
      .length;
    const countBasket = fullProducts.filter((p) => p.on_basket === true).length;
    const sumBasket = fullProducts
      .filter((p) => p.on_basket === true)
      .reduce((acc, item) => {
        return acc + item.price;
      }, 0);

    return (
      <header className="header">
        <div className="container">
          <div className="header-block">
            <div className="header-info">
              <div className="header-logo">
                <img src="/data/images/other/logo.png" />
              </div>
              <div className="header-catalog" onClick={this.getProductsCatalog}>
                <div className="header-menu"></div>
                <span>Каталог</span>
              </div>
            </div>
            <div className="header-buttons">
              <div className="header-button header-favorites">
                <img
                  src={
                    countFavorites === 0
                      ? "/data/images/other/favorites.png"
                      : "/data/images/other/favorites-active.png"
                  }
                />
                <div className="header-count">{countFavorites}</div>
              </div>
              <div className="header-button header-basket">
                <img
                  src={
                    countBasket === 0
                      ? "/data/images/other/basket.png"
                      : "/data/images/other/basket-active.png"
                  }
                />
                <div className="header-count">{countBasket}</div>
                <span className="header-sum">{sumBasket} ₽</span>
              </div>
              
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(Header);

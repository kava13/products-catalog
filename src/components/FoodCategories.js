import React from "react";
import { connect } from "react-redux";
import {
  getFullSectionsById,
  getProductsFilterId,
} from "../selectors/index.js";
import _ from "lodash";

import "../css/categories.css";

const mapStateToProps = (state) => {
  const props = {
    fullSectionsById: getFullSectionsById(state),
    filterId: getProductsFilterId(state),
  };
  return props;
};

class FoodCategories extends React.Component {
  renderPath = (parent, child) => {
    return (
      <span>
        {" "}
        Все продукты
        <img
          className="categories-img"
          src="/data/images/other/arrow-right.png"
        />{" "}
        {parent.name}{" "}
        <img
          className="categories-img"
          src="/data/images/other/arrow-right.png"
        />{" "}
        {child.name}
      </span>
    );
  };

  render() {
    const { fullSectionsById, filterId } = this.props;

    const parent = filterId ? fullSectionsById[filterId].parent : null;

    return (
      <section className="categories">
        <div className="container">
          <div className="categories-block">
            <p className="categories-list">
              {filterId
                ? this.renderPath(
                    fullSectionsById[parent],
                    fullSectionsById[filterId]
                  )
                : "Все продукты"}{" "}
            </p>
          </div>
        </div>
      </section>
    );
  }
}

export default connect(mapStateToProps, null)(FoodCategories);

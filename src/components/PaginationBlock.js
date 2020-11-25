import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions/index.js";
import {
  filteredProductsSelector,
  getCurrentPage,
} from "../selectors/index.js";
import _ from "lodash";
import { Pagination } from "@material-ui/lab";

import "../css/products.css";
import "../css/pagination.css";

const mapStateToProps = (state) => {
  const props = {
    products: filteredProductsSelector(state),
    page: getCurrentPage(state),
  };
  return props;
};

const actionCreators = {
  // setSortedName: actions.setSortedName,
  // toggleOnFavoritesState: actions.toggleOnFavoritesState,
  // toggleOnBasketState: actions.toggleOnBasketState,
  setCurrentPage: actions.setCurrentPage,
};

class PaginationBlock extends React.Component {
  handleSetPage = (event, page) => {
    const { setCurrentPage } = this.props;
    setCurrentPage({ page });
  };

  render() {
    const { page, products } = this.props;
    // const { page } = this.state;

    return (
      <div className="pagination-block">
        <Pagination
          page={page}
          onChange={this.handleSetPage}
          count={Math.ceil(products.length / 15)}
          variant="outlined"
          shape="rounded"
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(PaginationBlock);

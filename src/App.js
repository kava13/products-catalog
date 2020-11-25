import "./App.css";
import React from "react";

import Header from "./components/Header";
import Sections from "./components/Sections";
import Products from "./components/Products";
import PaginationBlock from "./components/PaginationBlock";

import "./css/normalize.css";
import "./css/interface.css";
import FoodCategories from "./components/FoodCategories";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header />
        <FoodCategories />
        <section className="main">
          <div className="container">
            <div className="main-block">
              <Sections />
              <Products />
            </div>
            <PaginationBlock />
          </div>
        </section>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Layout from './Layout';
import Product from './productlist';
import Category from './Category';
import NoPage from './NoPage';
import Home from './Home';

export default class App1 extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    //return <p>Test</p>;
    return (
      <Router>
        <div className="App">
          <ul className="App-header">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/product">Products</Link>
            </li>
            <li>
              <Link to="/category">category</Link>
            </li>
          </ul>
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/product" element={<Product />}></Route>
            <Route exact path="/category" element={<Category />}></Route>
          </Routes>
        </div>
      </Router>
    );
  }
}

const appDiv = document.getElementById('app');
render(<App1 />, appDiv);

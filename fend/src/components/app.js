import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Layout from './Layout';
import ProductList from './plist';
import Category from './Category';
import NoPage from './NoPage';
import Home from './Home';

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    //return <p>Test</p>;
    return (
      <Router>
        <Routes>
          <Route path="/pyrods/react" element={<ProductList />}></Route>
          <Route path="/pyrods/cat" element={<Category />}></Route>
          <Route path="*" element={<Home />}></Route>
        </Routes>
      </Router>
    );
  }
}

const appDiv = document.getElementById('app');
render(<App />, appDiv);

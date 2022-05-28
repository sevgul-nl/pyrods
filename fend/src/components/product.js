import React, { Component } from 'react';
import axios from 'axios';
import ProductUpdate from './pupdate';

export default class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flagShowProduct: false,
    };

    this.updateProduct = this.updateProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
  }

  updateProduct() {
    this.setState({ flagShowProduct: true });
  }
  deleteProduct(delurl) {
    console.log(delurl);
    axios
      .delete(delurl)
      .then((response) => {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const prod = this.props.prod;
    //console.log('prod');
    //console.log(prod);
    return (
      <div style={{ color: 'gray', border: '1px solid gray' }}>
        <h5>
          {prod.id}, {prod.name}, {prod.describe}, {prod.created}, {prod.edited}
          , {prod.update}, {prod.delete}
        </h5>
        <button
          style={{ backgroundColor: 'white' }}
          onClick={() => this.updateProduct()}
        >
          Update
        </button>
        <button
          style={{ backgroundColor: 'white' }}
          onClick={() => this.deleteProduct(prod.delete)}
        >
          Delete
        </button>
        {this.state.flagShowProduct ? (
          <ProductUpdate productUpdate={prod} />
        ) : null}
      </div>
    );
  }
}

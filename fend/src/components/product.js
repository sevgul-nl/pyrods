import React, { Component } from 'react';
import axios from 'axios';
import ProductUpdate from './pupdate';
import ProductDelete from './pdelete';
import ProductList from './plist';

export default class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flagShowProductU: false,
      flagShowProductD: false,
    };

    this.updateProduct = this.updateProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
  }

  updateProduct() {
    this.setState({ flagShowProductU: true });
  }
  deleteProduct() {
    this.setState({ flagShowProductD: true });
  }

  render() {
    const prod = this.props.prod;
    //console.log('prod');
    //console.log(prod);
    return (
      <div style={{ color: 'gray', border: '1px solid gray' }}>
        <br />
        <span class="text-info">Name: </span> <span>{prod.name}</span>
        <br />
        <span class="text-info">Description: </span>
        <span>{prod.describe}</span>
        <br />
        <span class="text-info">Id: </span>
        <span>{prod.id}</span>
        <br />
        <span>{'   '}</span>
        <a
          class="btn btn-primary btn-sm active"
          role="button"
          onClick={() => this.updateProduct()}
        >
          update
        </a>
        <span>{'   '}</span>
        <a
          class="btn btn-primary btn-sm active"
          role="button"
          onClick={() => this.deleteProduct()}
        >
          delete
        </a>
        {this.state.flagShowProductU ? (
          <ProductUpdate productUpdate={prod} />
        ) : null}
        {this.state.flagShowProductD ? (
          <ProductDelete productDelete={prod} />
        ) : null}
      </div>
    );
  }
}

import React, { Component } from 'react';
import axios from 'axios';
import Product from './product';
import ProductForm from './pform';

export default class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      describe: '',
      prods: [],
      prod: {},
      flagShowDetails: false,
    };
    this.fetchProdDetail = this.fetchProdDetail.bind(this);
    this.prodDetail = this.prodDetail.bind(this);
  }

  prodDetail(item) {
    this.fetchProdDetail(item);
    this.setState({ flagShowDetails: true });
  }

  fetchProdDetail(item) {
    //console.log('axios');
    axios
      .get(item.purl)
      .then((response) => {
        this.setState({ prod: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  componentDidMount() {
    //console.log('axios');
    axios
      .get('/pyrods/api/prods')
      //.then((response) => console.log(response))
      .then((response) => {
        //console.log(response.data);
        this.setState({ prods: response.data });
      });
  }

  render() {
    return (
      <div className="container">
        <div>
          <ProductForm />
        </div>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {this.state.prods.map((item) => {
              return (
                <tr key={item.name}>
                  <td>
                    <span key={item.id} onClick={() => this.prodDetail(item)}>
                      {item.name}
                    </span>
                  </td>
                  <td>
                    <span key={item.id} onClick={() => this.prodDetail(item)}>
                      {item.describe}
                    </span>
                  </td>
                  <td>
                    <a
                      class="btn btn-primary btn-sm active"
                      role="button"
                      onClick={() => this.prodDetail(item)}
                    >
                      detail
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {this.state.flagShowDetails ? <Product prod={this.state.prod} /> : null}
      </div>
    );
  }

  componentDidMount1() {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      //headers: { 'Content-Type': 'text/plain' },
      //body: JSON.stringify({}),
    };
    fetch('/pyrods/api/prods', requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data));
  }
  componentDidMount_axios() {
    console.log('axios');
    axios
      .get('/pyrods/api/prods')
      //.then((response) => console.log(response))
      .then((response) => {
        console.log(response.data);
        this.setState({ data: response.data });
      });
  }

  componentDidMount_fetch() {
    //console.log('fetch');
    fetch('/pyrods/api/prods')
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        this.setState({ prods: data });
      });
  }

  fetchProdDetail_fetch(item) {
    fetch(item.absolute_url)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ prod: data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

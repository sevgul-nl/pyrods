import React, { Component } from 'react';
import axios from 'axios';
import ProductUpdate from './pupdate';

export default class ProductForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ' ',
      describe: ' ',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit_fetch() {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: this.state.name,
        describe: this.state.describe,
      }),
    };
    fetch('/pyrods/api/new', requestOptions)
      .then((response) => response.json())
      .then((data) => this.props.history.push('/pyrods/prod'));
  }

  handleSubmit(event) {
    event.preventDefault();

    axios
      .post('/pyrods/api/new/', {
        name: this.state.name,
        describe: this.state.describe,
      })
      .then((response) => {
        console.log(response);
        this.props.history.push('/pyrods/react/');
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { name, describe } = this.state;

    return (
      <form class="form-inline my-2 my-lg-0" onSubmit={this.handleSubmit}>
        <input
          class="form-control mr-sm-2"
          type="text"
          placeholder="name"
          aria-label="name"
          name="name"
          value={name}
          onChange={this.handleChange}
        />
        <input
          class="form-control mr-sm-2"
          type="text"
          placeholder="describe"
          aria-label="describe"
          name="describe"
          value={describe}
          onChange={this.handleChange}
        />
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
          New Product
        </button>
      </form>
    );
  }
}

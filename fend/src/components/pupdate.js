import React, { Component } from 'react';
import axios from 'axios';

export default class ProductUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      obj_to_update: this.props.productUpdate,
      name: this.props.productUpdate.name,
      describe: this.props.productUpdate.describe,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    // this.setState({ value: event.target.value });
    this.setState({ [event.target.name]: event.target.value });
  }
  handleSubmit(event) {
    //event.preventDefault();
    axios
      .patch(this.state.obj_to_update.update, {
        name: this.state.name,
        describe: this.state.describe,
      })
      .then((response) => {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    const { name, describe } = this.state;
    return (
      <div style={{ color: 'red', border: '1px solid red' }}>
        <form onSubmit={this.handleSubmit}>
          <div>
            <input
              class="form-control mr-sm-2"
              type="text"
              placeholder="name"
              aria-label="name"
              name="name"
              defaultValue={name}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <input
              class="form-control mr-sm-2"
              type="text"
              placeholder="describe"
              aria-label="describe"
              defaultValue={describe}
              name="describe"
              onChange={this.handleChange}
            />
          </div>
          <input
            style={{ backgroundColor: 'white' }}
            type="submit"
            value="Submit"
          />
        </form>
      </div>
    );
  }
}

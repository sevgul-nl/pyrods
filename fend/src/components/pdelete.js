import React, { Component } from 'react';
import axios from 'axios';

export default class ProductDelete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      obj_to_delete: this.props.productDelete,
      id: this.props.productDelete.id,
      name: this.props.productDelete.name,
      describe: this.props.productDelete.describe,
      delurl: this.props.productDelete.delete,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    console.log(this.state.delurl);
    axios
      .delete(this.state.delurl)
      .then((response) => {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    const { name, describe, id } = this.state;
    return (
      <div style={{ color: 'red', border: '1px solid red' }}>
        <form onSubmit={this.handleSubmit}>
          <div class="container">
            <div class="row">
              <span class="text-info">Confirm to delete {id} ?</span>
            </div>
            <div class="row">
              <span class="text-info">Name: </span> <span>{name}</span>
            </div>
            <div class="row">
              <span class="text-info">Description: </span>
              <span>{describe}</span>
            </div>
            <div class="row">
              <button
                class="btn btn-outline-success my-2 my-sm-0"
                type="submit"
              >
                Confirm
              </button>
            </div>
            <br />
          </div>
        </form>
      </div>
    );
  }
}

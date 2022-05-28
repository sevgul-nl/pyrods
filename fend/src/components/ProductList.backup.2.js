import React, { Component } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import { Link } from 'react-router-dom';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import axios from 'axios';

export default class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      describe: '',
    };

    this.editProdButtonPressed = this.editProdButtonPressed.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescribeChange = this.handleDescribeChange.bind(this);
  }

  handleNameChange(e) {
    this.setState({
      name: e.target.value,
    });
  }

  handleDescribeChange(e) {
    this.setState({
      describe: e.target.value,
    });
  }

  editProdButtonPressed() {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      //headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({
        name: this.state.name,
        describe: this.state.describe,
      }),
    };

    fetch('/pyrods/api/prod/edit', requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data));
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
  componentDidMount2() {
    console.log('axios');
    axios.get('/pyrods/api/prods').then((response) => console.log(response));
  }

  componentDidMount() {
    console.log('fetch');
    fetch('/pyrods/api/prods')
      .then((response) => response.json())
      .then((data) => console.log(data));
  }
  render() {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Typography component="h5" variant="h5">
            Edit Product
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <FormControl component="fieldset">
            <TextField
              required={true}
              type="text"
              onChange={this.handleNameChange}
              inputProps={{
                min: 1,
                max: 16,
                style: { textAlign: 'left' },
              }}
            />
            <FormHelperText>
              <div align="center">name</div>
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} align="center">
          <FormControl component="fieldset">
            <TextField
              required={true}
              multiline
              maxRows={4}
              onChange={this.handleDescribeChange}
            />
            <FormHelperText>
              <div align="center">description</div>
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} align="center">
          <Button
            color="primary"
            variant="contained"
            onClick={() => this.editProdButtonPressed()}
          >
            Create A Product
          </Button>
        </Grid>
        <Grid item xs={12} align="center">
          <Button color="secondary" variant="contained" to="/" component={Link}>
            Back
          </Button>
        </Grid>
      </Grid>
    );
  }
}

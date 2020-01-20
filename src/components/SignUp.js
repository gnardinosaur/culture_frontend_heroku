import React from 'react';
import { connect } from 'react-redux';
import { Container, Button, Form, Modal } from 'semantic-ui-react'

class SignUp extends React.Component {

  state = {
    user: {
      username: "",
      password: "",
      f_name: "",
      l_name: "",
      email: "",
      phone: ""
    },
    showModal: false
  }

  handleChange = (e) => {
    this.setState({ 
      user: {
        ...this.state.user, 
        [e.target.name]: e.target.value 
      }
    })
  }

  createUser = (e) => {
    e.preventDefault()
    let user_attributes = this.state.user;
    fetch('http://localhost:3000/api/v1/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        user: user_attributes
      })
    })
    .then(resp => resp.json().then(data => ({ status: resp.status, body: data })))
    .then(responseData => {
      if (responseData.status === 201) {
        this.handleResponse(responseData)
      } else {
        this.setState({ showModal: true })
      }
    })
  }

  handleResponse = (responseData) => {
    this.setState({ 
      user: {
        username: "",
        password: "",
        f_name: "",
        l_name: "",
        email: "",
        phone: ""
      }
    })
    this.props.setUser(responseData.body)
    this.redirect()
  }

  redirect = () => {
    if (this.props.havePathValue) {
      this.props.history.push("/email")
    } else {
    this.props.history.push("/profile")
    }
  }

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal })
  }

  render() {
    return (
      <div>
        <Container className="sign-in-container">
          <h1>Sign Up</h1>
          <br />
          <Form onSubmit={this.createUser}>
            <Form.Field onChange={this.handleChange}>
              <label align="left">Username -</label>
              <input name="username" placeholder="username..." />
            </Form.Field>
            <Form.Field onChange={this.handleChange}>
              <label align="left">Password -</label>
              <input name="password" type="password" placeholder="password..." />
            </Form.Field>
            <Form.Field onChange={this.handleChange}>
              <label align="left">First Name -</label>
              <input name="f_name" placeholder="first name..." />
            </Form.Field>
            <Form.Field onChange={this.handleChange}>
              <label align="left">Last Name -</label>
              <input name="l_name" placeholder="last name..." />
            </Form.Field>
            <Form.Field onChange={this.handleChange}>
              <label align="left">Email Address -</label>
              <input name="email" placeholder="email@..." />
            </Form.Field>
            <Form.Field onChange={this.handleChange}>
              <label align="left">Phone # -</label>
              <input name="phone" placeholder="555.555.5555..." />
            </Form.Field>
            <br />
            <Button className="create-acct-btn" type='submit'>Sign Up</Button>
          </Form>
        </Container>

        <Modal onClick={this.toggleModal} open={this.state.showModal} basic>
          <Modal.Header>Username Already Exists, Please Try Another.</Modal.Header>
        </Modal>
      </div>
    )
  }
};

function msp(state){
  const { havePathValue } = state.searchResultReducer
  return { havePathValue }
}

function mdp(dispatch){
  return {
    setUser: (userData) => {
      dispatch({
        type: "SET_USER",
        payload: userData
      })
    }
  }
}

export default connect(msp, mdp)(SignUp);
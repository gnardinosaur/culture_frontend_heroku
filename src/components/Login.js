import React from 'react';
import { connect } from 'react-redux'
import { Container, Button, Form, Modal } from 'semantic-ui-react'


class Login extends React.Component {

  state = {
    user: {
      username: "",
      password: ""
    },
    showFailedLoginModal: false
  }

  handleChange = (e) => {
    this.setState({ 
      user: {
        ...this.state.user, 
        [e.target.name]: e.target.value 
      }
    })
  }

  toggleFailedModal = () => {
    this.setState({ showFailedLoginModal: !this.state.showFailedLoginModal })
  }

  verifyUser = () => {
    let user_attributes = this.state.user
    fetch('http://localhost:3000/api/v1/login', {
      method: "POST",
      headers: {
        'Content-Type' : 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        user: user_attributes
      })
    })
    .then(resp => resp.json().then(data => ({ status: resp.status, body: data })))
    .then(responseData => {
      if (responseData.status === 202) {
        localStorage.token = responseData.body.jwt
        this.props.setUser(responseData.body)
        if (this.props.path === "/art") {
          this.props.history.push("/email")
        } else {
          this.props.history.push("/")
        }
      } else {
        this.setState({ showFailedLoginModal: true })
      }
    })
  }

  render(){
    return (
    <div>
      <Container className="sign-in-container">
        <h1>Sign Into Your Account</h1>
        <br />
        <Form onSubmit={this.verifyUser}>
          <Form.Field onChange={this.handleChange}>
            <label align="left" >Username -</label>
            <input name="username" placeholder="username..." />
          </Form.Field>
          <Form.Field onChange={this.handleChange}>
            <label align="left">Password -</label>
            <input name="password" type="password" placeholder="password..." />
          </Form.Field>
          <Button className="sign-in-btn" type='submit'>Sign In</Button>
        </Form>
        <br />
        <br />
        <h1>Sign Up</h1>
        <br />
        <Button onClick={() => this.props.history.push("/sign_up")}className="create-acct-btn" type='submit'>Create Your Account</Button>
      </Container>

      <Modal onClick={this.props.closeLoginModal} open={this.props.havePathValue} basic>
          <Modal.Header>Log In or Create Account to save searches and receive a daily email of interesting art.</Modal.Header>
      </Modal>

      <Modal onClick={this.toggleFailedModal} open={this.state.showFailedLoginModal} basic>
          <Modal.Header>Invalid Username or Password.</Modal.Header>
      </Modal>
    </div>
    )
  }
};

function mdp(dispatch){
  return {
    //this action lives in searchResultReducer.js
    closeLoginModal: () => {
      dispatch({
        type: "CLOSE_LOGIN_MODAL",
      })
    },
    //this action lives in userReducer.js
    setUser: (userData) => {
      dispatch({
        type: "SET_USER",
        payload: userData
      })
    }
  }
}

function msp(state){
  const { path, havePathValue } = state.searchResultReducer;
  return { path, havePathValue }
}

export default connect(msp, mdp)(Login);
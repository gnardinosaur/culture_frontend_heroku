import React from 'react';
import { Container, Button, Form } from 'semantic-ui-react'

function Login(props){
  return (
    <div>
      <Container className="sign-in-container">
        <h1>Sign Into Your Account</h1>
        <br />
        <Form>
          <Form.Field>
            <label align="left" >Username -</label>
            <input placeholder="username..." />
          </Form.Field>
          <Form.Field>
            <label align="left">Password -</label>
            <input type="password" placeholder="password..." />
          </Form.Field>
          <Button className="sign-in-btn" type='submit'>Sign In</Button>
        </Form>
        <br />
        <br />
        <h1>Sign Up</h1>
        <br />
        <Button onClick={() => props.history.push("/sign_up")}className="create-acct-btn" type='submit'>Create Your Account</Button>
      </Container>
    </div>
  )
};

export default Login;
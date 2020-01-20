import React from 'react';
import { connect } from 'react-redux';
import { Container, Segment } from 'semantic-ui-react';


function Profile(props) {
  return (
    <Container textAlign="left">
      <h2>{props.user.f_name}'s Profile</h2>
      <Segment secondary raised textAlign="left">Username - <em>{props.user.username}</em></Segment>
      <Segment secondary raised textAlign="left">First Name - <em>{props.user.f_name}</em></Segment>
      <Segment secondary raised textAlign="left">Last Name - <em>{props.user.l_name}</em></Segment>
      <Segment secondary raised textAlign="left">Email - <em>{props.user.email}</em></Segment>
      <Segment secondary raised textAlign="left">Phone # - <em>{props.user.phone}</em></Segment>
    </Container>
  )
}

function msp(state){
  const { user } = state.userReducer
  return { user }
}

export default connect(msp)(Profile);
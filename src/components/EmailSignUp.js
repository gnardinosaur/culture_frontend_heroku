import React from 'react';
import { connect } from 'react-redux';
import { departmentOptions } from '../constants/searchOptions';
import { Container, Grid, Header, Segment } from 'semantic-ui-react';


function EmailSignUp(props) {

  function getDepartmentName(props){
    let deptArr = departmentOptions.filter(obj => obj.key === props.departmentId);
    return deptArr[0].text  
  }

  return (
    <Container>
      <Segment>
        <Grid columns={3}>
          <Grid.Column>
            <Header as="h3">Department -</Header> 
            {props.departmentId !== "*" ? getDepartmentName(props) : ""}
          </Grid.Column>
          <Grid.Column>
            <Header as="h3">Dates -</Header> 
            {props.dates}
          </Grid.Column>
          <Grid.Column>
            <Header as="h3">Collection Highlights?</Header> 
            {props.isHighlight ? "Yes" : "No"}
          </Grid.Column>
        </Grid>
        {/* 7/14/30 days */}
        {/* time of day select */}
        {/* confirm email field */}
      </Segment>
      <Header id="email-h1" as="h1" textAlign="left">To see similar pieces of art sign up for a daily email:</Header>
    </Container>
  )  
};

function msp(state){
  const { departmentId, dates, isHighlight } = state.searchReducer;
  return { departmentId, dates, isHighlight }
}

export default connect(msp)(EmailSignUp);
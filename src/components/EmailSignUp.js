import React from 'react';
import { connect } from 'react-redux';
import { departmentOptions } from '../constants/searchOptions';
import { Container, Grid, Header, Segment, Dropdown, Button, Form } from 'semantic-ui-react';
import { dayOptions, timeOptions } from '../constants/emailOptions';
import { fetchArtObjects } from '../helperFunctions';

class EmailSignUp extends React.Component {

  state = {
    numDays: "",
    time: "",
    email: "",
  }

  getDeptName = () => {
    let deptArr = departmentOptions.filter(obj => obj.key === this.props.departmentId);
    return deptArr[0].text  
  }

  handleChange = (e, data) => {
    this.setState({ ...this.state, [data.name]: data.value })
  }

  handleEmailForm = (e) => {
    this.setState({ email: e.target.value })
  }

  createEmail = () => {
    fetchArtObjects(this.props.departmentId, this.props.dateBegin, this.props.dateEnd, this.props.isHighlight, this.state.numDays, this.postScheduleToRails);    
  }

  postScheduleToRails = (artObjects) => {
    let userEmail = this.state.email ? this.state.email : this.props.email;
    let department = this.props.departmentId === "*" ? "No Department Selected" : this.getDeptName();

    //give artObjects to Rails API 
    fetch("http://localhost:3000/api/v1/schedules", {
      method: "POST",
      headers: {
        'Content-Type' : 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.props.jwt}`
      },
      body: JSON.stringify({
        userID: this.props.id,
        email: userEmail,
        art: artObjects,
        department: department,
        highlight: this.props.isHighlight,
        dates: this.props.dates,
        days: this.state.numDays,
        time: this.state.time
      })
    })
    .then(this.props.history.push("/scheduled_emails"))
  }

  render(){
    return (
      <Container>
        <Segment secondary>
          <Grid columns={3}>
            <Grid.Column>
              <Header as="h3">Department -</Header> 
              {this.props.departmentId !== "*" ? 
                <p style={{ color: "rgb(1, 175, 123)", fontWeight: "bold" }}>{this.getDeptName()}</p>
              : 
                <p style={{ color: "red", fontWeight: "bold" }}>No Department Selected</p>
              }
            </Grid.Column>
            <Grid.Column>
              <Header as="h3">Dates -</Header> 
              {this.props.dates ? 
                <p style={{ color: "rgb(1, 175, 123)", fontWeight: "bold" }}>{this.props.dates}</p>
              : 
                <p style={{ color: "red", fontWeight: "bold" }}>No Dates Selected</p>
              }
            </Grid.Column>
            <Grid.Column>
              <Header as="h3">Collection Highlights?</Header> 
              {this.props.isHighlight ? 
                <p style={{ color: "rgb(1, 175, 123)", fontWeight: "bold" }}>Yes</p>
                : 
                <p style={{ color: "red", fontWeight: "bold" }}>No</p>
                }
            </Grid.Column>
          </Grid>
        </Segment>
        <Header id="email-h1" as="h1" textAlign="left">To see similar pieces of art sign up for a daily email:</Header>
        <br />
        <br />
        <Grid columns={3}>
          <Grid.Column>
            <h3>Number of Days -</h3>
            <Dropdown onChange={(e, data) => this.handleChange(e, data)} clearable options={dayOptions} selection name="numDays" placeholder="How Many Days?" />
          </Grid.Column>
          <Grid.Column>
            <h3>Time -</h3>
            <Dropdown onChange={(e, data) => this.handleChange(e, data)} clearable options={timeOptions} selection name="time" placeholder="Time Of Day?" />
          </Grid.Column>
        <Grid.Column>
          <h3>Confirm Email -</h3>
          <Form>
            <Form.Field>
              <input onChange={(e) => this.handleEmailForm(e)} placeholder={this.props.email} />
            </Form.Field>
          </Form>
        </Grid.Column>
        </Grid>
        <Container>
          <Button onClick={this.createEmail} className="email-btn" content="Send Me Emails!" />
      </Container>
      </Container>
    )
  }  
};


function msp(state){
  const { departmentId, dates, isHighlight, dateBegin, dateEnd } = state.searchReducer;
  const { email, id } = state.userReducer.user
  const { jwt } = state.userReducer
  return { departmentId, dates, isHighlight, dateBegin, dateEnd, email, id, jwt }
}

export default connect(msp)(EmailSignUp);
import React from 'react';
import { connect } from 'react-redux';
import { Container, Segment, Icon, Header } from 'semantic-ui-react';

class ScheduledEmail extends React.Component {

  state = {
    scheduledEmails: []
  }

  componentDidMount(){
    fetch(`http://localhost:3000/api/v1/users/${this.props.id}/scheduled_emails`, {
      method: "GET",
      headers: {
        'Content-Type' : 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.props.jwt}`
      }
    })
    .then(resp => resp.json())
    .then(scheduledEmails => this.setState({ scheduledEmails }))
  }

  deleteScheduledEmail = (e) => {  
    fetch(`http://localhost:3000/api/v1/schedules/${e.target.parentNode.id}`, {
      method: "DELETE",
      headers: {
        'Content-Type' : 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.props.jwt}`
      }
    })
    .then(this.hideNode(e.target.parentNode))
  }

  hideNode = (node) => {
    node.style.display = "none"
  }

  render(){
    let content = this.state.scheduledEmails.map(email => {
    
    return (
      <Segment key={email.id} secondary raised textAlign="left" id={email.id}>
        <Icon onClick={(e) => this.deleteScheduledEmail(e)} id="delete-email" name="x" color="red"/>
        <Header as="h5">Department -</Header>
          {email.department !== "No Department Selected" ? <p style={{ color: "rgb(1, 175, 123)", fontWeight: "bold" }}>{email.department}</p> : <p style={{ color: "red", fontWeight: "bold" }}>No Department Selected</p>}
        <Header as="h5">Dates -</Header>
          {email.dates ? <p style={{ color: "rgb(1, 175, 123)", fontWeight: "bold" }}>{email.dates}</p> : <p style={{ color: "red", fontWeight: "bold" }}>No Dates Selected</p>}
        <Header as="h5">Collection Highlights?</Header>
          {email.highlight ? <p style={{ color: "rgb(1, 175, 123)", fontWeight: "bold" }}>Yes</p> : <p style={{ color: "red", fontWeight: "bold" }}>No</p>}  
        <Header as="h5">Time -</Header>
          <p style={{ color: "rgb(1, 175, 123)", fontWeight: "bold" }}>{email.time} a.m.</p>
        {/* <Header as="h5">Currently Active?</Header>
          {this.isActive(email.created_at, email.days) ? <p style={{ color: "rgb(1, 175, 123)", fontWeight: "bold" }}>Yes</p> : <p style={{ color: "red", fontWeight: "bold" }}>No</p>}   */}
      </Segment>
    )
  })

  return (
    <Container textAlign="left">
      <h2>Scheduled Emails -</h2>
      {content}
    </Container>
    )
  }
};

function msp(state){
  const { id } = state.userReducer.user;
  const { jwt } = state.userReducer
  return { id, jwt }
}

export default connect(msp)(ScheduledEmail);
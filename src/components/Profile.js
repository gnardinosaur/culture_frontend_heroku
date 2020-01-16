import React from 'react';

function Profile(props) {
  console.log(props.history.location.pathname)
  return (
    <div>
      profile page
    </div>
  )
}


export default Profile;
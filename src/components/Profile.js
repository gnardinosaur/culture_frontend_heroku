import React from 'react';

function Profile(props) {
  console.log(props.history.location.pathname)
  return (
    <div>
      profile page
      {/* make this a welcome/thanks for singin up page */}
    </div>
  )
}


export default Profile;
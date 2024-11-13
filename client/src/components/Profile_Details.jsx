import React from 'react'
import propTypes from "prop-types";

const Profile_Details = React.memo(({data}) => {
  return (
    <div className='container pt-3 pb-3 ps-auto pe-auto'>
        <div className="card">
        <div className="card-header">
    profile details
  </div>
  <div className="card-body">
    <p>
        <strong>
            name: 
        </strong>
        <span> {data?.success?.name}</span>
    </p>
    <strong>address:</strong>
    <p>{data?.success?.address}</p>
    <p>
    <strong>email:</strong> <span style={{textTransform:'none'}}>{data?.success?.email}</span>
    </p>
    <p>
    <strong>mobile number:</strong> <span>+91-{data?.success?.mobile}</span>
    </p>
  </div>
  <div className="card-footer">
    <button type="button" className='btn btn-warning' data-bs-toggle="modal" data-bs-target="#profileModal">edit</button>
  </div>
</div>
    </div>
  )
})

Profile_Details.displayName = 'Profile_Details'
Profile_Details.propTypes={
  data:propTypes.any
}
export default Profile_Details
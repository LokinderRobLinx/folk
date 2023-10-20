import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const InviteeData = () => {
    const { name } = useParams();

    const navigate = useNavigate();

  return (
    <>
    <div className="invitee-data">
       <i style={{ cursor: "pointer" }} title='Back To InviteeList' onClick={() => {navigate(`/invitees`);}} className="fa fa-arrow-left" />
      <div className="div-wrapper">
        <h2 className="text-wrapper">{name.toUpperCase()}</h2>
      </div>
      <div className="div">
        {/* <i style={{ cursor: "pointer" }} className="fa fa-plus" /> */}
        <i style={{ cursor: "pointer" }} className="far fa-trash-alt add-btn"/>
      </div>
    </div>

     
    </>
  )
}

export default InviteeData
import { collection, onSnapshot, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { db } from './firebase';

const InviteeData = () => {
    const { name } = useParams();
    const [customers, setCustomers] = useState([]);

    const navigate = useNavigate();

    // Read customers from firebase
  useEffect(() => {
    const q = query(collection(db, "customers"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let custArr = [];
      querySnapshot.forEach((doc) => {
        custArr.push({ ...doc.data(), id: doc.id });
      });
      setCustomers(custArr);
      //   console.log(users);
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
    <div className="invitee-data">
       <i style={{ cursor: "pointer" }} title='Back To InviteeList' onClick={() => {navigate(`/invitees`);}} className="fa fa-arrow-left" />
      <div className="div-wrapper">
        <h2 className="text-wrapper">{name.toUpperCase()}</h2>
      </div>
      <div className="div">
        {/* <i style={{ cursor: "pointer" }} className="fa fa-plus" /> */}
        <i style={{ cursor: "pointer" }} className="fa fa-edit"/>
      </div>
    </div>

    <div className="inviteeframe">
      <div className="frame-wrapper">
        <div className="div">
          <h3 >Total Pass</h3>
          <p>08</p>
        </div>
      </div>
      <div className="div-2">
        <div className="div-3">
          <div className="div-4">
            <h4 >Passes Given By</h4>
            <p >Jignesh Patel</p>
          </div>
          <div className="div-4">
            <h4 >Number of Pass</h4>
            <p>05</p>
          </div>
        </div>
        <div className="div-5">
          <div className="div-wrapper">
            <p>001</p>
          </div>
          <div className="div-wrapper">
            <p>002</p>
          </div>
          <div className="div-wrapper">
            <p>003</p>
          </div>
          <div className="div-wrapper">
            <p>004</p>
          </div>
          <div className="div-wrapper">
            <p>005</p>
          </div>
          
        </div> 
      </div>

      <hr className="line"/>
      
      <div className="div-2">
        <div className="frame-wrapper-3">
          <div className="div-3">
            <div className="div-4">
              <h4>Passes Given By</h4>
              <p>Prakash Sheth</p>
            </div>
            <div className="div-4">
              <h4>Number of Pass</h4>
              <p>03</p>
            </div>
          </div>
        </div>
        <div className="div-5">
          <div className="div-wrapper">
            <div className="text-wrapper-6">091</div>
          </div>
          <div className="div-wrapper">
            <div className="text-wrapper-6">092</div>
          </div>
          <div className="div-wrapper">
            <div className="text-wrapper-6">093</div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default InviteeData
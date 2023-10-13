import React from 'react'
import "./cardl1.css"

const CardL1 = () => {
  return (
    <>
     <div className="main">
      <div className="container">
        <div className="header">
          <div className="title">Card List</div>
        </div>
        <div className="search">
          <input
            type="text"
            placeholder="Search Card or Name ...."
            className="search-input"
          />
        </div>
        <div className="filters">
          <div className="filter">All (6)</div>
          <div className="filter">Arrived (0)</div>
          <div className="filter">Not Arrived (0)</div>
        </div>
        <div className="table">
          <div className="row">
            <div className="cell">Card Name</div>
            <div className="cell">Customer Name</div>
          </div>
          <div className="row">
            <div className="cell">Viettel</div>
            <div className="cell">Wade Warren</div>
          </div>
          <div className="row">
            <div className="cell">Social 2.0</div>
            <div className="cell">Jane Cooper</div>
          </div>
          <div className="row">
            <div className="cell">Company News</div>
            <div className="cell">Jerome Bell</div>
          </div>
          <div className="row">
            <div className="cell">Annoucement 3.2</div>
            <div className="cell">Dianne Russell</div>
          </div>
          <div className="row">
            <div className="cell">Test 1</div>
            <div className="cell">Devon Lane</div>
          </div>
          <div className="row">
            <div className="cell">Company News</div>
            <div className="cell">Darrell Steward</div>
          </div>
        </div>
        <div className="pagination">
          <div className="page">1</div>
          <div className="page">2</div>
          <div className="page">3</div>
        </div>
      </div>
    </div>
    </>
  )
}

export default CardL1
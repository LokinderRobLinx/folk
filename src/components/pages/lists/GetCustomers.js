import React, { useState } from "react";
import "../card/cardlist.css";

const GetCustomers = () => {
  const [search, setSearch] = useState("");
  // const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [data, setData] = useState([
    { cards: "3", customer: "a", arrived: true },
    { cards: "5", customer: "b", arrived: false },
    { cards: "3", customer: "c", arrived: false },
    { cards: "2", customer: "d", arrived: false },
    { cards: "7", customer: "e", arrived: false },
    { cards: "2", customer: "f", arrived: false },
  ]);

  const searchKeys = [ "customer"];
  const handleSearch = (e) => {
    e.preventDefault(); // Prevent form submission
    console.log(`You Search for ${search} in CustomerList`)
  };

  // get  customers all cards from firebase
  const checkCards = async (selectedCustomer) => {
    console.log("selectedCustomer:", selectedCustomer);
    // await updateDoc(doc(db, "customers", selectedCustomer.id), {
    //   arrived: !selectedCard.arrived,
    // });
  };


  const [currentPage, setCurrentPage] = useState(1);
  const recordePerPage = 4;
  const lastIndex = currentPage * recordePerPage;
  const firstIndex = lastIndex - recordePerPage;
  const records = data
    .filter((item) =>
      searchKeys.some((key) =>
        item[key].toLowerCase().includes(search.toLowerCase())
      )
    )
    .slice(firstIndex, lastIndex);
  const npage = Math.ceil(data.length / recordePerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);


  return (
    <>
      <div className="container-list">
        <h1 className="header-list">Customer List</h1>

        <div className="content">
          <div className="search">
            <div className="s1">
              <form className="addItems" onSubmit={handleSearch}>
                <input
                  className="search-input"
                  type="text"
                  name="text"
                  placeholder="✍ Search Customer..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  required
                />
                <i
                  className="fa fa-search add-btn"
                  title="Reset Search"
                  onClick={() => setSearch("")}
                />
              </form>
            </div>
          </div>

          <div className="table">
          <div className="row">
            <h3 className="cell-h">Customer Name</h3>
            <h3 className="cell-h">Cards</h3>
          </div>
          {records.map((item, index) => (
        <div className="row" key={index}>
          <div className="cell">{item.customer}</div>
          <div className="cell" onClick={() => checkCards(item)}>{item.cards}</div>
        </div>
      ))}
          </div>

          <div className="pagination-container">
            <ul className="pagination-list">
              <li className="page-item">
                <i
                  className="page-link fa-solid fa-backward"
                  title="Previous"
                  onClick={prePage}
                />
              </li>
              {numbers.map((n, i) => (
                <li
                  className={`page-item ${currentPage === n ? "active" : ""}`}
                  key={i}
                >
                  <i className="page-link" onClick={() => changeCPage(n)}>
                    {" "}
                    {n}{" "}
                  </i>
                </li>
              ))}
              <li className="">
                <i
                  className="page-link fa-solid fa-forward"
                  title="Next"
                  onClick={nextPage}
                />
              </li>
            </ul>
          </div>


        </div>
      </div>
    </>
  );

  function prePage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function changeCPage(id) {
    setCurrentPage(id);
  }

  function nextPage() {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  }

};

export default GetCustomers;

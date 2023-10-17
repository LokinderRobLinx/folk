import { collection, onSnapshot, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import "./list.css";

const GetCards = () => {
  const [cards, setCards] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const searchKeys = ["cardno", "customer"];
  const handleSearch = (e) => {
    e.preventDefault(); // Prevent form submission
    console.log(`You Search for ${search} in CardList`);
  };

  // Read cards from firebase
  useEffect(() => {
    const q = query(collection(db, "allcards"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let cardsArr = [];
      querySnapshot.forEach((doc) => {
        cardsArr.push({ ...doc.data(), id: doc.id });
      });
      setCards(cardsArr);
      //   console.log(users);
    });
    return () => unsubscribe();
  }, []);

  const filteredItems = cards.filter((card) => {
    if (filter === "arrived") {
      return card.arrived;
      // &&
      // const comp = card.arrived.length
      // setComp(card.arrived);
    } else if (filter === "not-arrived") {
      return !card.arrived;
    } else {
      return true;
    }
  });
  const filteredCards = cards.filter((card) => {
    if (filter === "assigned") {
      return card.customer;
    } else if (filter === "not-assigned") {
      return !card.customer;
    } else {
      return true;
    }
  });

  const [currentPage, setCurrentPage] = useState(1);
  const recordePerPage = 4;
  const lastIndex = currentPage * recordePerPage;
  const firstIndex = lastIndex - recordePerPage;
  const records = filteredCards
    .filter((item) =>
      searchKeys.some((key) =>
        item[key]?.toLowerCase()?.includes(search.toLowerCase())
      )
    )
    .slice(firstIndex, lastIndex);
  const npage = Math.ceil(filteredCards.length / recordePerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  return (
    <>
      <div className="container-list">
        <h1 className="header-list">Card List</h1>

        <div className="content">
          <div className="search">
            <div className="s1">
              <form className="addItems" onSubmit={handleSearch}>
                <input
                  className="search-input"
                  type="text"
                  name="text"
                  placeholder="✍ Search Card or Customer..."
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

          {/* <div className="filters">
            <label className="m-2">
              <input
                type="radio"
                name="filter"
                value="all"
                checked={filter === "all"}
                onChange={() => setFilter("all")}
              />{" "}
              All ({cards.length})
            </label>
            <label className="m-2">
              <input
                type="radio"
                name="filter"
                value="arrived"
                checked={filter === "arrived"}
                onChange={() => setFilter("arrived")}
              />{" "}
              Arrived ({filter === "arrived" ? filteredItems.length : 0})
            </label>
            <label className="m-2">
              <input
                type="radio"
                name="filter"
                value="not-arrived"
                checked={filter === "not-arrived"}
                onChange={() => setFilter("not-arrived")}
              />{" "}
              Not Arrived ({filter === "not-arrived" ? filteredItems.length : 0}
              )
            </label>
          </div> */}

          <div className="filters">
            <label className="m-2">
              <input
                type="radio"
                name="filter"
                value="all"
                checked={filter === "all"}
                onChange={() => setFilter("all")}
              />{" "}
              All ({cards.length})
            </label>
            <label className="m-2">
              <input
                type="radio"
                name="filter"
                value="assigned"
                checked={filter === "assigned"}
                onChange={() => setFilter("assigned")}
              />{" "}
              Assigned ({filter === "assigned" ? filteredCards.length : 0})
            </label>
            <label className="m-2">
              <input
                type="radio"
                name="filter"
                value="not-assigned"
                checked={filter === "not-assigned"}
                onChange={() => setFilter("not-assigned")}
              />{" "}
              Not Assigned (
              {filter === "not-assigned" ? filteredCards.length : 0})
            </label>
          </div>

          <div className="table">
            <div className="row">
              <h3 className="cell-h">Card</h3>
              <h3 className="cell-h">Customer Name</h3>
            </div>
            {records.map((card, index) => (
              <div
                className={card.arrived ? "arrived row" : " row"}
                key={index}
              >
                <div className="cell">{card.cardno}</div>
                <div className="cell">{card.customer}</div>
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

export default GetCards;

import { collection, onSnapshot, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../cards/firebase";
import todo from "../../assets/todo_list.jpg";

const GetCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  // console.log(search);
  const searchKeys = ["name"];

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

  // Read cards from firebase
  // useEffect(() => {
  //   const q = query(collection(db, "allcards"));
  //   const unsubscribe = onSnapshot(q, (querySnapshot) => {
  //     let cardsArr = [];
  //     querySnapshot.forEach((doc) => {
  //       cardsArr.push({ ...doc.data(), id: doc.id });
  //     });
  //     setCards(cardsArr);
  //     // console.log(cards);
  //   });
  //   return () => unsubscribe();
  // }, []);

  const filteredItems = customers.filter((cust) => {
    if (filter === "arrived") {
      return cust.arrived;
      // &&
      // const comp = cust.arrived.length
      // setComp(cust.arrived);
    } else if (filter === "not-arrived") {
      return !cust.arrived;
    } else {
      return true;
    }
  });

  const [currentPage, setCurrentPage] = useState(1);
  const recordePerPage = 4;
  const lastIndex = currentPage * recordePerPage;
  const firstIndex = lastIndex - recordePerPage;
  const records = filteredItems
    .filter((item) =>
      searchKeys.some((key) =>
        item[key].toLowerCase().includes(search.toLowerCase())
      )
    )
    .slice(firstIndex, lastIndex);
  const npage = Math.ceil(filteredItems.length / recordePerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  return (
    <div className="justify-content-center w-100">
      <h1 className="mb-4 text-success">Customers List</h1>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src={todo} alt="todologo" />
            <figcaption>Check The Customers Here ✌</figcaption>
          </figure>
          {customers.length < 1 ? null : (
            <p>{`There are ${customers.length} customers in the list`}</p>
          )}

          <div>
            <label className="m-2">
              <input
                type="radio"
                name="filter"
                value="all"
                checked={filter === "all"}
                onChange={() => setFilter("all")}
              />{" "}
              All ({customers.length})
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
          </div>

          <form
            className="addItems"
            // onSubmit={(event) => {
            //     event.preventDefault();
            //     addItem(event.target.elements.text.value);
            //     event.target.reset();
            // }}
          >
            <input
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
            {/* <i
            className="fa fa-search add-btn"
            title="Search Card"
            type="submit"
          /> */}
          </form>

          <ul className="showItems">
            {records.map((cust, index) => {
              return (
                <div
                  className={
                    cust.arrived
                      ? "eachItem2 justify-content-center"
                      : "eachItem justify-content-center"
                  }
                  key={index}
                >
                  {/* <input
                    onChange={() => updateAllCards(cust)}
                    type="checkbox"
                    checked={cust.arrived ? "checked" : ""}
                  /> */}
                  <>
                    <h3
                      style={{
                        // textDecoration: cust.arrived ? 'line-through' : 'none',
                        color: cust.arrived ? "black" : "white",
                        // paddingLeft: '1rem'
                      }}
                    >
                      {cust.name.toUpperCase()} --- ({cust.cards.length} Cards)
                    </h3>
                  </>
                </div>
              );
            })}
          </ul>

          <div className="d-flex justify-content-center">
            <ul className="pagination m-2">
              <li className="page-link">
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
              <li className="page-link">
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
    </div>
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

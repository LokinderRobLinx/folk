import { collection, onSnapshot, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../cards/firebase";
import todo from "../../assets/todo_list.jpg";

const GetCards = () => {
  const [cards, setCards] = useState([]);
  const [comp, setComp] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [displayedItems, setDisplayedItems] = useState(4);
  const [selectedName, setSelectedName] = useState("");
  const [selectedUserCard, setSelectedUserCard] = useState("");

  const searchKeys = ["cardno", "name"];

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

  // useEffect(() => {
  //     // Find the selected user and update the selectedUserCards state
  //     const selectedUser = cards.find((card) => card.name === selectedName);
  //     if (selectedUser) {
  //       setSelectedUserCard(selectedUser.cardno || "");
  //     } else {
  //       setSelectedUserCard("");
  //     }
  //   }, [selectedName, cards]);

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
      <h1 className=" mb-4 text-success">Card List</h1>

      <div className="main-div ">
        <div className="child-div">
          <figure>
            <img src={todo} alt="todologo" />
            <figcaption>View Card List Here ✌</figcaption>
          </figure>
          {cards.length < 1 ? null : (
            <p>{`There are ${cards.length} cards in the list`}</p>
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
              {/* ({cards.arrived ? cards.arrived.length : 0}) */}
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
              placeholder="✍ Search Card or Name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              required
            />
            <i
              className="fa fa-search"
              title="Reset Search"
              onClick={() => setSearch('')}
            />
          </form>

          <ul className="showItems">
            {records.map((card, index) => {
              return (
                <div
                  className={
                    card.arrived
                      ? "eachItem2 justify-content-center"
                      : "eachItem justify-content-center"
                  }
                  key={index}
                >
                  <h3
                    style={{
                      // textDecoration: card.arrived ? 'line-through' : 'none',
                      color: card.arrived ? "black" : "white",
                      // paddingLeft: '1rem'
                    }}
                    // onClick={() => updateAllCards(card)}
                  >
                    {card.cardno} --- {card.name}
                  </h3>
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

export default GetCards;

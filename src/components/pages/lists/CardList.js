import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import "./list.css";
import "../card/cardl1.css";
import "../card/cardlist.css";
import EditPopup from "./EditPopup";

const CardList = () => {
  const [cards, setCards] = useState([]);
  // const [data, setData] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

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

  // Update allcards in firebase
  const updateAllCards = async (selectedCard) => {
    console.log("selectedCard:", selectedCard.cardno, selectedCard.id);
    // await updateDoc(doc(db, "allcards", selectedCard.id), {
    //   arrived: !selectedCard.arrived,
    // });
    if (selectedCard.customer) {
      // Customer name is not empty, proceed with the update
      await updateDoc(doc(db, "allcards", selectedCard.id), {
        arrived: !selectedCard.arrived,
      });
    } else {
      // Customer name is empty, show a message
      console.log("Please Enter Customer Name");
      alert("Please Enter Customer Name");
    }
  };

  // Delete cards in firebase
  const deleteCard = async (card) => {
    await deleteDoc(doc(db, "allcards", card.id));
  };

  // Delete customer from the allcards & customers in firebase
  const deleteCust = async (card) => {
    await updateDoc(doc(db, "allcards", card.id), {
      customer: null,
    });
  };

  // Function to open the edit popup
  const openEditPopup = (card) => {
    setSelectedCard(card);
    setIsEditing(true);
  };

  // Function to close the edit popup
  const closeEditPopup = () => {
    setSelectedCard(null);
    setIsEditing(false);
  };

  //Function to update the card data in Firebase
  const updateCardInFirebase = async (cardId, newName) => {
    console.log("editing", cardId, cardId.cardno);
    await updateDoc(doc(db, "allcards", cardId), {
      customer: newName,
    });
    //  Add customer in customers database
    // 1. Retrieve the card by its ID
    const cardSnapshot = await getDoc(doc(db, "allcards", cardId));
    if (cardSnapshot.exists()) {
      const cardData = cardSnapshot.data();

      // 2. Add the customer in the customers collection
      await addDoc(collection(db, "customers"), {
        name: newName,
        cards: cardData.cardno,
      });
      console.log("Customer added from cardList successfully.");
    }

    setSelectedCard(null);
    setIsEditing(false);
  };

  // const checkAssigned = async (e) => {
  //   e.preventDefault(e);
  //   setData(filteredCards)
  // }
  // const checkArrived = async (e) => {
  //   e.preventDefault(e);
  //    setData(filteredItems)
  // }

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
                  placeholder="✍ Search Card or Invitee..."
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

          {/* <button className="btn" onClick={checkAssigned}>Assigned</button>
          <button className="btn" onClick={checkArrived}>Arrived</button> */}

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
              <h3 className="cell-h">Invitee Name</h3>
            </div>
            {records.map((card, index) => (
              <div
                className={card.arrived ? "arrived row" : " row"}
                key={index}
              >
                <div className="cell">{card.cardno}</div>
                <div onClick={() => updateAllCards(card)} className="cell">
                  {card.customer}
                </div>
                {card.customer ? (
                  <div className="cell">
                    <i
                      className="far fa-edit"
                      title="Edit card"
                      onClick={() => openEditPopup(card)}
                    ></i>
                    <i
                      className="far fa-trash-alt add-btn"
                      title="Delete Customer"
                      onClick={() => deleteCust(card)}
                    ></i>
                    {/* <i
                      className="far fa-delete-left add-btn"
                      title="Delete Card"
                      onClick={() => deleteCard(card)}
                    ></i> */}
                  </div>
                ) : 
                <div className="cell">
                   
                    <i
                      className="far fa-delete-left add-btn"
                      title="Delete Card"
                      onClick={() => deleteCard(card)}
                    ></i>
                  </div>
                }
              </div>
            ))}
          </div>

          {/* Render the edit popup when editing is enabled */}
          {isEditing && (
            <EditPopup
              card={selectedCard}
              onUpdate={updateCardInFirebase}
              onCancel={closeEditPopup}
            />
          )}

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

export default CardList;

import React, { useEffect, useState } from "react";
import "../card/cardlist.css";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./firebase";
import EditCust from "./EditCust";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const [editCust, setEditCust] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const [selectedCust, setSelectedCust] = useState("");
  const [selectedCustCards, setSelectedCustCards] = useState([]);

  // console.log(search);
  const searchKeys = ["name"];
  const handleSearch = (e) => {
    e.preventDefault(); // Prevent form submission
    console.log(`You Search for ${search} in CustomerList`);
  };

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

  // Show the popup of selectedCustomer's cards
  const showCards = async (selectedName) => {
    console.log("selectedCust:", selectedName.id, selectedName.name);

    // setShow(!show)

    // Find the selected customer and update the selectedCustCards state
    const selectedCustomer = customers.find(
      (cust) => cust.name === selectedName
    );
    setSelectedCust(selectedName.name);
    console.log(selectedName.name);
    // setSelectedCust(customers.find((cust) => cust.name === selectedName));
    if (selectedName) {
      setSelectedCustCards(selectedName.cards || []);
    } else {
      setSelectedCustCards([]);
    }
  };

  // Delete customers in firebase
  const deleteCust = async (cust) => {
    await deleteDoc(doc(db, "customers", cust.id));
  };

  // Define a function to open the edit popup
  const openEditPopup = (cust) => {
    setEditCust(cust);
    setIsEditing(true);
  };

  // Define a function to close the edit popup
  const closeEditPopup = () => {
    setSelectedCust(null);
    setIsEditing(false);
  };

  // Update customers in firebase
  const updateCustInFirebase = async (custId, custName, newName) => {
    console.log("editing", custId, custName, newName);
    await updateDoc(doc(db, "customers", custId), {
      name: newName,
    });

    // Query the 'allcards' collection where 'customer' is equal to 'custName'
    const cardsQuery = query(
      collection(db, "allcards"),
      where("customer", "==", custName)
    );
    const querySnapshot = await getDocs(cardsQuery);

    // Array to store card IDs that match the query
    const cardIdsToUpdate = [];

    querySnapshot.forEach((cardDoc) => {
      const cardId = cardDoc.id;
      cardIdsToUpdate.push(cardId);
    });

    // Iterate through the card IDs and update the 'customer' field for each one
    for (const cardId of cardIdsToUpdate) {
      await updateDoc(doc(db, "allcards", cardId), {
        customer: newName,
      });

      console.log(`Updated customer name for card with ID: ${cardId}`);
    }

    setSelectedCust(null);
    setIsEditing(false);
  };

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
    <>
      <div className="container-list">
        <h1 className="header-list">Customer List</h1>

        {customers.length < 1 ? null : (
          <p>{`There are ${customers.length} customers in the list`}</p>
        )}

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
            {records.map((cust, index) => (
              <div className="row" key={index}>
                <div className="cell">{cust.name}</div>
                <div
                  style={{ cursor: "pointer" }}
                  title="Check Cards"
                  className="cell"
                  onClick={() => showCards(cust)}
                >
                  {cust.cards.length}
                </div>
                <div className="cell">
                  <i
                    className="far fa-edit"
                    title="Edit cust"
                    onClick={() => openEditPopup(cust)}
                  ></i>
                  {cust.cards.length === 0 ? (
                    <i
                      className="far fa-trash-alt add-btn"
                      title="Delete cust"
                      onClick={() => deleteCust(cust)}
                    ></i>
                  ) : null}
                </div>
              </div>
            ))}
          </div>

          {/* Render the edit popup when editing is enabled */}
          {isEditing && (
            <EditCust
              cust={editCust}
              onUpdate={updateCustInFirebase}
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

          {selectedCust ? (
            <div>
              <h2>
                {selectedCust.toUpperCase()} have {selectedCustCards.length}{" "}
                Cards
                <span
                  onClick={() => setSelectedCust("")}
                  title="Hide cards"
                  style={{
                    cursor: "pointer",
                    color: "red",
                    fontWeight: "bold",
                  }}
                >
                  {" "}
                  X
                </span>
              </h2>

              <ul className="showItems">
                {selectedCustCards.map((card, index) => {
                  return (
                    <div className="row" key={index}>
                      <div className="cell">{card}</div>
                    </div>
                  );
                })}
              </ul>
            </div>
          ) : null}
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

export default CustomerList;

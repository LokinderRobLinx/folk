import { collection, onSnapshot, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from './firebase';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");

    const [selectedUser, setSelectedUser] = useState("");
  const [selectedUserCards, setSelectedUserCards] = useState([]);
    
    const searchKeys = [ "name"];
    const handleSearch = (e) => {
      e.preventDefault(); // Prevent form submission
    console.log(`You Search for ${search} in UserList`)
    };

     // Read users from firebase
  useEffect(() => {
    const q = query(collection(db, "users"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let usersArr = [];
      querySnapshot.forEach((doc) => {
        usersArr.push({ ...doc.data(), id: doc.id });
      });
      setUsers(usersArr);
      //   console.log(users);
    });
    return () => unsubscribe();
  }, []);

   // Show the popup of selectedUser's cards
   const showCards = async (selectedName) => {
    console.log("selectedCust:", selectedName.id, selectedName.name);

    // setShow(!show)

    // Find the selected customer and update the selectedCustCards state
    const selectedUser = users.find(
      (user) => user.name === selectedName
    );
    setSelectedUser(selectedName.name);
    console.log(selectedName.name);
    // setSelectedCust(customers.find((cust) => cust.name === selectedName));
    if (selectedName) {
      setSelectedUserCards(selectedName.cards || []);
    } else {
      setSelectedUserCards([]);
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const recordePerPage = 4;
  const lastIndex = currentPage * recordePerPage;
  const firstIndex = lastIndex - recordePerPage;
  const records = users
    .filter((item) =>
      searchKeys.some((key) =>
        item[key].toLowerCase().includes(search.toLowerCase())
      )
    )
    .slice(firstIndex, lastIndex);
  const npage = Math.ceil(users.length / recordePerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);


  return (
    <>
    <div className="container-list">
      <h1 className="header-list">User List</h1>

      <div className="content">
        <div className="search">
          <div className="s1">
            <form className="addItems" onSubmit={handleSearch}>
              <input
                className="search-input"
                type="text"
                name="text"
                placeholder="✍ Search User..."
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
            <h3 className="cell-h">User Name</h3>
            <h3 className="cell-h">Cards</h3>
          </div>
          {records.map((user, index) => (
        <div className="row" key={index}>
          <div className="cell">{user.name}</div>
          <div
                  style={{ cursor: "pointer" }}
                  title="Check Cards"
                  className="cell"
                  onClick={() => showCards(user)}
                >
                  {user.cards.length}
                </div>
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

          {selectedUser ? (
            <div>
              <h2>
                {selectedUser.toUpperCase()} have {selectedUserCards.length}{" "}
                Cards
                <span
                  onClick={() => setSelectedUser("")}
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
                {selectedUserCards.map((card, index) => {
                  return (
                    <div className="row" key={index}>
                      <div className="cell">{card}</div>
                      <div className="cell">
                        <i
                          className="far fa-trash-alt add-btn"
                          title="Delete card"
                          // onClick={() => deleteCard(card)}
                        ></i>
                      </div>
                    </div>
                  );
                })}
              </ul>
            </div>
          ) : null}



      </div>
    </div>
  </>
  )

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

}

export default UserList
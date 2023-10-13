import React, { useEffect, useState } from 'react'
import todo from "../../assets/todo_list.jpg";
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../cards/firebase';

const GetUsers = () => {
  const [users, setUsers] = useState([]);
  const [cards, setCards] = useState([]);
  const [check, setCheck] = useState(false);

  const [userNames, setuserNames] = useState([]);
  // const [input, setInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [foundUsers, setFoundUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const [selectedName, setSelectedName] = useState("");
  const [selectedUserCards, setSelectedUserCards] = useState([]);

  const handleNameChange = (name) => {
    setSelectedName(name);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const recordePerPage = 4;
  const lastIndex = currentPage * recordePerPage;
  const firstIndex = lastIndex - recordePerPage;
  const records = users.slice(firstIndex, lastIndex);
  const npage = Math.ceil(users.length / recordePerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  // Search names
  const searchName = async (e) => {
    e.preventDefault(e);
    if (searchTerm === "") {
      alert("Please enter a valid name");
      return;
    }
    // await
    const result = users.find((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (result) {
      setFoundUsers(result);
      console.log(users);
      console.log(foundUsers);
    } else {
      setFoundUsers(null);
    }

    setSearchTerm("");
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
      setuserNames(users.name);
      // console.log(users);
    });
    return () => unsubscribe();
  }, []);

  // Read cards from firebase
  useEffect(() => {
    const q = query(collection(db, "allcards"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let cardsArr = [];
      querySnapshot.forEach((doc) => {
        cardsArr.push({ ...doc.data(), id: doc.id });
      });
      setCards(cardsArr);
      // console.log(cards);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Find the selected user and update the selectedUserCards state
    const selectedUser = users.find((user) => user.name === selectedName);
    if (selectedUser) {
      setSelectedUserCards(selectedUser.cards || []);
      console.log(selectedUserCards);
    } else {
      setSelectedUserCards([]);
    }
  }, [selectedName, users]);


  const checkIt = () => {
    setCheck(!check);
  };

  return (
    <div className="justify-content-center w-100">
    <h1 className="mb-4 text-success">Users List</h1>
    <div className="main-div">
      <div className="child-div">
        <figure>
          <img src={todo} alt="todologo" />
          <figcaption>Check The Customers Here ✌</figcaption>
        </figure>
        {users.length < 1 ? null : (
          <p>
            {`There are ${users.length} customers in the list `}
            <span
              onClick={checkIt}
              style={{ cursor: "pointer", color: "green", fontWeight:"bold" }}
            >
              Check It Now
            </span>
          </p>
        )}
        {check ? (
          <ul className="showItems">
            {users.map((user, index) => {
              return (
                <div className="eachItem" key={index}>
                  <h3>{user.name.toUpperCase()} -- ({user.cards.length} Cards)</h3>
                </div>
              );
            })}
          </ul>
        ) : null}

        <div>
          <h1>Select a Customer</h1>
          <select
            onChange={(e) => handleNameChange(e.target.value)}
            value={selectedName}
          >
            <option value="">Select a Customer</option>
            {users.map((u, i) => (
              <option key={i} value={u.name}>
                {u.name}
              </option>
            ))}
          </select>
          {selectedName && (
            <h2>
              Cards for {selectedName} = {selectedUserCards.length}
            </h2>
          )}
          <ul className="showItems">
            {selectedUserCards.map((card, index) => {
              return (
                <div className="eachItem justify-content-center" key={index}>
                  {/* <h3 onClick={() => handleCardClick(card)}>{card}</h3> */}
                  <h3>{card}</h3>
                </div>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  </div>
  )
}

export default GetUsers
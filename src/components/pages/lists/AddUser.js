import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebase";

function AddUser({ username }) {
  const [user, setUser] = useState("");
  const [inputValue, setInputValue] = useState('');
  const [cardNumber, setCardNumber] = useState([]);
  const [cards, setCards] = useState([]);


  const addCard = (text) => {
    // const newItems = [...cards, { text, arrived: false }];
    const newItems = [...cards, text];
    setCards(newItems);
  };
  const deleteCard = (index) => {
    const newItems = [...cards];
    newItems.splice(index, 1);
    setCards(newItems);
    // console.log(cards)
  };
  const formSubmit = (e) => {
    e.preventDefault();
    const numCards = parseInt(inputValue);

    if (!isNaN(numCards) && numCards > 0) {
      // Create an array of cards with numbers starting from 1
      const newCards = Array.from({ length: numCards }, (_, index) => (  user ? ` ${user}-${index + 1}` : ` ${username}-${index + 1}`) );
      setCards([...cards, ...newCards]);
      setInputValue('');
    }
  };


  //   const handleAddUser = async () => {
  //     try {
  //       await addUser(name, cardNumber);
  //       console.log('User data added to Firebase');

  //     } catch (error) {
  //       console.error('Error adding user data:', error);
  //     }
  //   };

  const checkUser = async (e) => {
    e.preventDefault(e);
    console.log(cards);
    console.log(user);
  };
  const resetForm = async (e) => {
    e.preventDefault(e);
    setUser("");
    setInputValue("");
    setCards([]);
  };

  const createUser = async (e) => {
    e.preventDefault(e);
    if (user === "") {
      alert("Please enter a valid name");
      return;
    } else if (cards.length === 0) {
      alert("Please enter cards details");
      return;
    }
    await addDoc(collection(db, "users"), {
      name: user,
      cards: cards,
    });
    await cards.map((n, i) =>
      addDoc(collection(db, "allcards"), {
        cardno: n,
        arrived: false,
        user: user,
        customer: null,
      })
    );

    setUser("");
    setCardNumber([]);
    setCards([]);
    alert("User data submitted");
  };

  const createCard = async (e) => {
    e.preventDefault(e);
    if (cards.length === 0) {
      alert("Please enter cards details");
      return;
    }
    await addDoc(collection(db, "users"), {
      name: username,
      cards: cards,
    });
    await cards.map((n, i) =>
      addDoc(collection(db, "allcards"), {
        cardno: n,
        arrived: false,
        user: username,
        customer: "",
      })
    );

    setUser("");
    setCardNumber([]);
    setCards([]);
    alert("Cards data submitted");
  };

  // const formSubmit = (e) => {
  //   e.preventDefault();
  //   addCard(e.target.elements.text.value);
  //   e.target.reset();
  // };


  return (
    <div className="justify-content-center">
      <h1 className="mb-4 text-success">Add User</h1>

      <form className="addItems" onSubmit={formSubmit}>
        <input
          type="text"
          placeholder="User Name"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          // required
        />
        <input
          type="number"
          name="text"
          placeholder="✍ Enter number of cards..."
          required
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit" title="Add Cards">
          <i className="fa fa-plus" />
        </button>
      </form>

       {/* <i className="fa fa-plus add-btn" title="Add Card" type="submit" /> */}
      {/* <form className="addItems" onSubmit={formSubmit}>
        <input type="text" name="text" placeholder="✍ Add cards..." required />
        <button type="submit" title="Add Card">
          <i className="fa fa-plus" />
        </button>
      </form> */}



      <ul className="showItems">
        {cards.map((item, index) => {
          return (
            <div
              className="row"
              key={index}
            >
              <h3>{item}</h3>
              <div className="todo-btn">
                <i
                  className="far fa-trash-alt add-btn"
                  title="Delete Item"
                  onClick={() => deleteCard(index)}
                ></i>
              </div>
            </div>
          );
        })}
      </ul>

      <button className="btn" onClick={createUser}>Add User</button>
      {/* <button onClick={checkUser}>Check User</button> */}
      <button className="btn" onClick={createCard}>Add Card</button>
      <button className="btn" onClick={resetForm}>Reset</button>

      {/* <ul className="showCards">
          {cardNumber.map((item, index) => (
            <span key={index} className="tag">
              <Cards card={item} />
              <button onClick={() => removeItem(index)}>x</button>
            </span>
          ))}
       </ul> */}

      {/* <li className="li">
        <div className="cardList">
          <h3>{cardNumber}</h3>
        </div>
      </li> */}
    </div>
  );
}

export default AddUser;

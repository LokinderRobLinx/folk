import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebase";

const AddCards = ({username}) => {
    const [user, setUser] = useState("");
    const [inputValue, setInputValue] = useState('');
    const [cardNumber, setCardNumber] = useState([]);
    const [cards, setCards] = useState([]);
  
  

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
  
  

    const resetForm = async (e) => {
      e.preventDefault(e);
      setUser("");
      setInputValue("");
      setCards([]);
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
          customer: null,
        })
      );
  
      setUser("");
      setCardNumber([]);
      setCards([]);
      alert("Cards data submitted");
    };


  return (
    <>
    <div className="frame">
      <h1 className="header-list">Add User</h1>

      <form className="addItems" onSubmit={formSubmit}>
        <div className="div">
          <div className="text-wrapper-2">User Name</div>
          <div className="div-2">
            <svg
              className="user icon-instance-node"
              fill="none"
              height="25"
              viewBox="0 0 24 25"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="path"
                d="M12 12.3794C14.7614 12.3794 17 10.1408 17 7.37939C17 4.61797 14.7614 2.37939 12 2.37939C9.23858 2.37939 7 4.61797 7 7.37939C7 10.1408 9.23858 12.3794 12 12.3794Z"
                fill="#020202"
              ></path>
              <path
                className="path"
                d="M12.0002 14.8794C6.99016 14.8794 2.91016 18.2394 2.91016 22.3794C2.91016 22.6594 3.13016 22.8794 3.41016 22.8794H20.5902C20.8702 22.8794 21.0902 22.6594 21.0902 22.3794C21.0902 18.2394 17.0102 14.8794 12.0002 14.8794Z"
                fill="#020202"
              ></path>
            </svg>
            <input
              type="text"
              placeholder="Enter user name"
              value={username}
              readOnly
            //   onChange={(e) => setUser(e.target.value)}
              required
            />
          </div>
          <div className="text-wrapper-4">Number Of Cards</div>
          <div className="div-2">
            <svg
              className="card-tick-2 icon-instance-node"
              fill="none"
              height="25"
              viewBox="0 0 24 25"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="path"
                d="M19 15.3794C16.79 15.3794 15 17.1694 15 19.3794C15 20.1294 15.21 20.8394 15.58 21.4394C16.27 22.5994 17.54 23.3794 19 23.3794C20.46 23.3794 21.73 22.5994 22.42 21.4394C22.79 20.8394 23 20.1294 23 19.3794C23 17.1694 21.21 15.3794 19 15.3794ZM21.07 18.9494L18.94 20.9194C18.8 21.0494 18.61 21.1194 18.43 21.1194C18.24 21.1194 18.05 21.0494 17.9 20.8994L16.91 19.9094C16.62 19.6194 16.62 19.1394 16.91 18.8494C17.2 18.5594 17.68 18.5594 17.97 18.8494L18.45 19.3294L20.05 17.8494C20.35 17.5694 20.83 17.5894 21.11 17.8894C21.39 18.1894 21.37 18.6594 21.07 18.9494Z"
                fill="#020202"
              ></path>
              <path
                className="path"
                d="M22 7.9293V8.3793C22 8.9293 21.55 9.3793 21 9.3793H3C2.45 9.3793 2 8.9293 2 8.3793V7.9193C2 5.6293 3.85 3.7793 6.14 3.7793H17.85C20.14 3.7793 22 5.6393 22 7.9293Z"
                fill="#020202"
              ></path>
              <path
                className="path"
                d="M2 11.8794V16.8394C2 19.1294 3.85 20.9794 6.14 20.9794H12.4C12.98 20.9794 13.48 20.4894 13.43 19.9094C13.29 18.3794 13.78 16.7194 15.14 15.3994C15.7 14.8494 16.39 14.4294 17.14 14.1894C18.39 13.7894 19.6 13.8394 20.67 14.1994C21.32 14.4194 22 13.9494 22 13.2594V11.8694C22 11.3194 21.55 10.8694 21 10.8694H3C2.45 10.8794 2 11.3294 2 11.8794ZM8 17.6294H6C5.59 17.6294 5.25 17.2894 5.25 16.8794C5.25 16.4694 5.59 16.1294 6 16.1294H8C8.41 16.1294 8.75 16.4694 8.75 16.8794C8.75 17.2894 8.41 17.6294 8 17.6294Z"
                fill="#020202"
              ></path>
            </svg>
            <input
              type="number"
              name="text"
              placeholder="✍ Enter Number of cards..."
              required
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button type="submit" title="Add Cards">
              <i className="fa fa-plus" />
            </button>
          </div>
        </div>
      </form>

      <ul className="showItems">
        {cards.map((item, index) => {
          return (
            <div className="row" key={index}>
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

      <div className="div-4">
        <button onClick={createCard} className="btn">
          Add Cards
        </button>
        <button onClick={resetForm} className="btn">
          Reset
        </button>
      </div>

    </div>
  </>
  )
}

export default AddCards
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import "./assignPass1.css";

const AssignPass = ({ username }) => {
  const [cust, setCust] = useState([]);
  const [cards, setCards] = useState([]);
  const [userPass, setUserPass] = useState([]);
  const [passLeft, setPassLeft] = useState([]);
  const [inputValue, setInputValue] = useState("");

  // Read cards from firebase
  const fetchCards = async () => {
    const cardsLeft = query(
      collection(db, "allcards"),
      where("user", "==", username),
      where("customer", "==", null)
    );

    const userCards = query(
      collection(db, "allcards"),
      where("user", "==", username)
    );

    try {
      const querySnapshot = await getDocs(cardsLeft);
      const cards = querySnapshot.docs.map((doc) => doc.data());

      // Now 'cards' contains an array of card objects where user is {username} and customer is null.
      console.log(cards);
      setPassLeft(cards);
      // You can set the 'cards' state or perform any other actions with the cards.
    } catch (error) {
      console.error("Error fetching cards:", error);
    }

    // total cards to user
    try {
      const querySnapshot = await getDocs(userCards);
      const cards = querySnapshot.docs.map((doc) => doc.data());

      // Now 'cards' contains an array of card objects where user is {username} and customer is null.
      console.log(cards);
      setUserPass(cards);
      // You can set the 'cards' state or perform any other actions with the cards.
    } catch (error) {
      console.error("Error fetching cards:", error);
    }
  };

  useEffect(() => {
    fetchCards();
  }, [cust, cards]);

  const formSubmit = async (e) => {
    e.preventDefault();
    const numCards = parseInt(inputValue);

    if (!isNaN(numCards) && numCards > 0) {
      // Fetch card details from allcards where customer is null
      const cardsQuery = query(
        collection(db, "allcards"),
        where("customer", "==", null),
        where("user", "==", username)
      );
      const querySnapshot = await getDocs(cardsQuery);

      // Create an array of cards
      // const newCards = Array.from({ length: numCards }, (_, index) => `${cust.slice(0, 4)}${index + 1}`);
      const newCards = [];

      // Loop through the query results and add the retrieved card data to newCards
      // querySnapshot.forEach((doc) => {
      //   newCards.push(doc.data().cardno);
      // });

      if (querySnapshot.docs.length < inputValue) {
        alert(
          ` ${querySnapshot.docs.length} Cards left, please contact Admin.`
        );
      } else {
        // Loop through the query results and add the first 3 retrieved card numbers to newCards
        for (let i = 0; i < querySnapshot.docs.length && i < inputValue; i++) {
          newCards.push(querySnapshot.docs[i].data().cardno);
        }
      }

      setCards(newCards);
      console.log(newCards);
      setInputValue("");
    }
  };

  const deleteCard = (index) => {
    const updatedCards = [...cards];
    updatedCards.splice(index, 1);
    setCards(updatedCards);
  };

  const checkCust = async (e) => {
    e.preventDefault(e);
    console.log(cards);
    console.log(cust);
  };
  const resetForm = async (e) => {
    e.preventDefault(e);
    setCust("");
    setInputValue("");
    setCards([]);
  };

  const createCust = async (e) => {
    e.preventDefault(e);
    if (cust === "") {
      alert("Please enter a valid name");
      return;
    } else if (cards.length === 0) {
      alert("Please enter cards details");
      return;
    }
    await addDoc(collection(db, "customers"), {
      name: cust,
      cards: cards,
    });

    cards.forEach(async (cardNo) => {
      const cardsQuery = query(
        collection(db, "allcards"),
        where("cardno", "==", cardNo)
      );
      const querySnapshot = await getDocs(cardsQuery);

      // Check if any matching card was found
      if (querySnapshot.docs.length > 0) {
        querySnapshot.forEach(async (doc) => {
          // Update the 'customer' field for each matching card
          await updateDoc(doc.ref, { customer: cust });
        });
      }
    });

    // await cards.map((n, i) =>
    //   addDoc(collection(db, "allcards"), {
    //     cardno: n,
    //     arrived: false,
    //     cust: cust,
    //     customer: "",
    //   })
    // );

    setCust("");
    // setCardNumber([]);
    setCards([]);
    alert("User data submitted");
  };

  return (
    <>
      <div className="frame">
        <h1 className="header-list">Assign Pass</h1>

        <form className="addItems" onSubmit={formSubmit}>
          <div className="div">
            <div className="text-wrapper-2">Invitee Name</div>
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
                placeholder="Enter Invitee name"
                value={cust}
                onChange={(e) => setCust(e.target.value)}
                required
              />
            </div>
            <div className="text-wrapper-4">Number Of Pass</div>
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
                placeholder="✍ Enter Number of Pass..."
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
          <button onClick={createCust} className="btn">
            Assign
          </button>
          <button onClick={resetForm} className="btn">
            Reset
          </button>
        </div>

        <div className="div-5">
          <div className="card">
            <div className="card-tick-wrapper">
              <svg
                className="card-tick card-tick"
                fill="none"
                height="37"
                viewBox="0 0 36 37"
                width="36"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className="path"
                  d="M28.5 23.1897C25.185 23.1897 22.5 25.8747 22.5 29.1897C22.5 30.3147 22.815 31.3797 23.37 32.2797C24.405 34.0197 26.31 35.1897 28.5 35.1897C30.69 35.1897 32.595 34.0197 33.63 32.2797C34.185 31.3797 34.5 30.3147 34.5 29.1897C34.5 25.8747 31.815 23.1897 28.5 23.1897ZM31.605 28.5447L28.41 31.4997C28.2 31.6947 27.915 31.7997 27.645 31.7997C27.36 31.7997 27.075 31.6947 26.85 31.4697L25.365 29.9847C24.93 29.5497 24.93 28.8297 25.365 28.3947C25.8 27.9597 26.52 27.9597 26.955 28.3947L27.675 29.1147L30.075 26.8947C30.525 26.4747 31.245 26.5047 31.665 26.9547C32.085 27.4047 32.055 28.1097 31.605 28.5447Z"
                  fill="white"
                ></path>
                <path
                  className="path"
                  d="M33 12.0148V12.6898C33 13.5148 32.325 14.1898 31.5 14.1898H4.5C3.675 14.1898 3 13.5148 3 12.6898V11.9998C3 8.56479 5.775 5.78979 9.21 5.78979H26.775C30.21 5.78979 33 8.5798 33 12.0148Z"
                  fill="white"
                ></path>
                <path
                  className="path"
                  d="M3 17.9398V25.3798C3 28.8148 5.775 31.5898 9.21 31.5898H18.6C19.47 31.5898 20.22 30.8548 20.145 29.9848C19.935 27.6898 20.67 25.1998 22.71 23.2198C23.55 22.3948 24.585 21.7648 25.71 21.4048C27.585 20.8048 29.4 20.8798 31.005 21.4198C31.98 21.7498 33 21.0448 33 20.0098V17.9248C33 17.0998 32.325 16.4248 31.5 16.4248H4.5C3.675 16.4398 3 17.1148 3 17.9398ZM12 26.5648H9C8.385 26.5648 7.875 26.0548 7.875 25.4398C7.875 24.8248 8.385 24.3148 9 24.3148H12C12.615 24.3148 13.125 24.8248 13.125 25.4398C13.125 26.0548 12.615 26.5648 12 26.5648Z"
                  fill="white"
                ></path>
              </svg>
            </div>
            <div className="div-6">
              <h2 style={{fontSize: 30}}>{passLeft.length}</h2>
              <p style={{fontSize: 20}}>Remaining Pass</p>
            </div>
          </div>
          <div className="card">
            <div className="card-tick-wrapper">
              <svg
                className="card-tick card-tick"
                fill="none"
                height="37"
                viewBox="0 0 36 37"
                width="36"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className="path"
                  d="M28.5 23.1897C25.185 23.1897 22.5 25.8747 22.5 29.1897C22.5 30.3147 22.815 31.3797 23.37 32.2797C24.405 34.0197 26.31 35.1897 28.5 35.1897C30.69 35.1897 32.595 34.0197 33.63 32.2797C34.185 31.3797 34.5 30.3147 34.5 29.1897C34.5 25.8747 31.815 23.1897 28.5 23.1897ZM31.605 28.5447L28.41 31.4997C28.2 31.6947 27.915 31.7997 27.645 31.7997C27.36 31.7997 27.075 31.6947 26.85 31.4697L25.365 29.9847C24.93 29.5497 24.93 28.8297 25.365 28.3947C25.8 27.9597 26.52 27.9597 26.955 28.3947L27.675 29.1147L30.075 26.8947C30.525 26.4747 31.245 26.5047 31.665 26.9547C32.085 27.4047 32.055 28.1097 31.605 28.5447Z"
                  fill="white"
                ></path>
                <path
                  className="path"
                  d="M33 12.0148V12.6898C33 13.5148 32.325 14.1898 31.5 14.1898H4.5C3.675 14.1898 3 13.5148 3 12.6898V11.9998C3 8.56479 5.775 5.78979 9.21 5.78979H26.775C30.21 5.78979 33 8.5798 33 12.0148Z"
                  fill="white"
                ></path>
                <path
                  className="path"
                  d="M3 17.9398V25.3798C3 28.8148 5.775 31.5898 9.21 31.5898H18.6C19.47 31.5898 20.22 30.8548 20.145 29.9848C19.935 27.6898 20.67 25.1998 22.71 23.2198C23.55 22.3948 24.585 21.7648 25.71 21.4048C27.585 20.8048 29.4 20.8798 31.005 21.4198C31.98 21.7498 33 21.0448 33 20.0098V17.9248C33 17.0998 32.325 16.4248 31.5 16.4248H4.5C3.675 16.4398 3 17.1148 3 17.9398ZM12 26.5648H9C8.385 26.5648 7.875 26.0548 7.875 25.4398C7.875 24.8248 8.385 24.3148 9 24.3148H12C12.615 24.3148 13.125 24.8248 13.125 25.4398C13.125 26.0548 12.615 26.5648 12 26.5648Z"
                  fill="white"
                ></path>
              </svg>
            </div>
            <div className="div-6">
              <h2 style={{fontSize: 30}} >{userPass.length}</h2>
              <p style={{fontSize: 20}} >Total Pass</p>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default AssignPass;

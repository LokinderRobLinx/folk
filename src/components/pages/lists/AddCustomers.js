import { addDoc, collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import React, { useState } from 'react';
import { db } from './firebase';

const AddCustomers = () => {
  const [cust, setCust] = useState([]);
  const [cards, setCards] = useState([]);
  const [passLeft, setPassLeft] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const formSubmitA = (e) => {
    e.preventDefault();
    const numCards = parseInt(inputValue);

    if (!isNaN(numCards) && numCards > 0) {
      // Create an array of cards with numbers starting from 1 with first 4 leters of cust name
      const newCards = Array.from({ length: numCards }, (_, index) => `${cust.slice(0, 4)}${index + 1}`);
      setCards([...cards, ...newCards]);
      setInputValue('');
    }
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    const numCards = parseInt(inputValue);
  
    if (!isNaN(numCards) && numCards > 0) {
      // Fetch card details from allcards where customer is null
      const cardsQuery = query(collection(db, 'allcards'), where('customer', '==', null));
      const querySnapshot = await getDocs(cardsQuery);
      setPassLeft(querySnapshot.docs)
      
      // Create an array of cards
      // const newCards = Array.from({ length: numCards }, (_, index) => `${cust.slice(0, 4)}${index + 1}`);
         const newCards = [];
  
      // Loop through the query results and add the retrieved card data to newCards
      // querySnapshot.forEach((doc) => {
      //   newCards.push(doc.data().cardno);
      // });

      if (querySnapshot.docs.length < inputValue) {
        alert(` ${querySnapshot.docs.length} Cards left, please contact Admin.`);
      } else {
            
        // Loop through the query results and add the first 3 retrieved card numbers to newCards
        for (let i = 0; i < querySnapshot.docs.length && i < inputValue; i++) {
          newCards.push(querySnapshot.docs[i].data().cardno);
        }
      }

  
      setCards(newCards);
      console.log(newCards)
      setInputValue('');
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
      const cardsQuery = query(collection(db, 'allcards'), where('cardno', '==', cardNo));
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
    <div className="justify-content-center">
      <h1 className="mb-4 text-success">Add Customer</h1>

      <form className="addItems" onSubmit={formSubmit}>
        <input
          type="text"
          placeholder="Customer Name"
          value={cust}
          onChange={(e) => setCust(e.target.value)}
          required
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

      <button className="btn" onClick={createCust}>Add Customer</button>
      {/* <button onClick={checkCust}>Check Data</button> */}
      <button className="btn" onClick={resetForm}>Reset</button>

    </div>
  );
};

export default AddCustomers;
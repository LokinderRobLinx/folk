import { collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "./firebase";

const EditCust = ({ cust, onUpdate, onCancel }) => {
  const [newName, setNewName] = useState('');
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const initialCards = cust.cards;
    setCards(initialCards);
  }, [cust.name]);

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleChangeName = (e) => {
    e.preventDefault();
    if (newName === "") {
       alert("Fill The Customer Name If Whant to change it")
    } else {
      onUpdate(cust.id, cust.name, newName);
    }
  };

  // Delete customers card in firebase
  // const deleteCard = async (card) => {
  //   console.log(`cardid ${card} ${cust.id} ${cust.cards} `)
  //   await deleteDoc(doc(db, "customers", card));
  // };

  const deleteCard = async (card) => {
    try {
      // 1. Fetch the Firestore document containing the cust data
      const custDocRef = doc(db, "customers", cust.id);
      const custDocSnapshot = await getDoc(custDocRef);

      if (custDocSnapshot.exists()) {
        // 2. Modify the cust.cards array to remove "card3"
        const updatedCards = custDocSnapshot
          .data()
          .cards.filter((c) => c !== card);

        // 3. Update the Firestore customers document with the modified data
        await updateDoc(custDocRef, { cards: updatedCards });

        // 4. Update the Firestore allcards document with the modified data
        const cardsQuery = query(collection(db, 'allcards'), where('cardno', '==', card));
      const querySnapshot = await getDocs(cardsQuery); 

      if (!querySnapshot.empty) {
        // Assuming there's only one matching card, otherwise, you might need to loop through results.
        const cardDoc = querySnapshot.docs[0];
        const cardId = cardDoc.id;
  
        // await deleteDoc(doc(db, 'allcards', cardId));
        await updateDoc(doc(db, "allcards", cardId), {
          customer: null
        });
  
        console.log('Card deleted successfully.');
      } else {
        console.log('Card not found.');
      }

        console.log(`Deleted card: ${card}`);
        setCards(updatedCards);
      } else {
        console.log("Document not found.");
      }
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <form>
          <h2>Edit Customer - {cust.name}</h2>
          <input
            type="text"
            value={newName}
            onChange={handleNameChange}
            placeholder={cust.name}
            required
          />
          <ul className="showItems">
            {cards.map((card, index) => {
              return (
                <div className="row" key={index}>
                  <div className="cell">{card}</div>
                  <div className="cell">
                    <i
                      className="far fa-trash-alt add-btn"
                      title="Delete card"
                      onClick={() => deleteCard(card)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </ul>
          <div className="popup-buttons">
            <button onClick={handleChangeName}>Change Name</button>
            <button onClick={onCancel}>Out</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCust;

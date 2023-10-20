import React, { useEffect, useState } from "react";
import "./inviteeList.css";
import img from "../../assets/inviteeImg.png";
// import img1 from "../../assets/inviteeImg1.png"
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
import { useNavigate } from "react-router-dom";

const InviteeList = () => {
  const [customers, setCustomers] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const [editCust, setEditCust] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const [selectedCust, setSelectedCust] = useState("");
  const [selectedCustCards, setSelectedCustCards] = useState([]);

  const navigate = useNavigate();

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
      <div className="invitee-list">
        <h1 className="header-list">Invitee List</h1>

        <div className="content">
          <div className="search">
            <div className="s1">
              <form className="addItems" onSubmit={handleSearch}>
                <input
                  className="search-input"
                  type="text"
                  name="text"
                  placeholder="✍ Search Invitee..."
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

          <div className="list">
            {records.map((cust, index) => (
              <div className="card">
                <div className="state-layer">
                  <div className="leading-element">
                    <img style={{ width: 46, height: 46 }} src={img} />
                  </div>
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      navigate(`/invitee-data/${cust.name}`);
                    }}
                  >
                    <h3>{cust.name.toUpperCase()}</h3>
                    <p>{cust.cards.length} pass</p>
                  </div>
                </div>
              </div>
            ))}
          </div>


        </div>
      </div>
    </>
  );
};

export default InviteeList;

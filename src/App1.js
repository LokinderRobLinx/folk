import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./components/stylesheets/layout.css";

import Navbar from "./components/layout/Navbar1";
import Footer from "./components/layout/Footer";

import Home from "./components/pages/Home";
import Home2 from "./components/pages/Home2";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";

import Errorpage from "./components/pages/Errorpage";

import CardList from "./components/pages/lists/CardList";
import UserList from "./components/pages/lists/UserList";
import CustomerList from "./components/pages/lists/CustomerList";
import QRCodeScanner from "./components/pages/scan/QRCodeScanner1";

import Register from "./components/layout/Register";
import Login from "./components/layout/Login";
import GetCards from "./components/pages/lists/GetCards";
import GetUsers from "./components/pages/lists/GetUsers";
import GetCustomers from "./components/pages/lists/GetCustomers";
import AddUser from "./components/pages/lists/AddUser";
import AddCustomers from "./components/pages/lists/AddCustomers";
// import AddUser from "./components/projects/card/AddUser";
// import GetUser from "./components/projects/card/GetUser";

function App() {
  const [user, setUser] = useState(null);
  // const [login, setLogin] = useState(null);

  const handleLogin = (username) => {
    setUser(username.slice(0, 5));
    // (user == "lokin" ? setLogin("Admin") : setLogin("User"))
    // const first6Letters = username.slice(0, 6);
  };

  const handleLogout = () => {
    // Clear the user state to log out
    setUser(null);
    // setLogin(null)
  };

  return (
    <Router>
      <>
        <Navbar username={user} onLogout={handleLogout} />
        <div className="main">
        {user === "lokin" ? (
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home username={user} />} />
          <Route path="/1" element={<Home2 username={user} />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/add-user" element={<AddUser username={user} />} />
          <Route path="/add-cust" element={<AddCustomers />} />
          <Route path="/scan" element={<QRCodeScanner />} />
          <Route path="/cards" element={<CardList />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/customers" element={<CustomerList />} />

          <Route path="*" element={<Errorpage />} />
        </Routes>
      ) : user === "viraj" ? (
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />    
          <Route path="/" element={<Home username={user} />} />
          <Route path="/1" element={<Home2 username={user} />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/scan" element={<QRCodeScanner />} />
          <Route path="/get-cards" element={<GetCards />} />
          <Route path="/get-users" element={<GetUsers />} />
          <Route path="/get-customers" element={<GetCustomers />} />
          <Route path="/customers" element={<CustomerList />} />
          <Route path="/add-cust" element={<AddCustomers />} />

          <Route path="*" element={<Errorpage />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/" element={<Home />} />
          <Route path="/1" element={<Home2 />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Errorpage />} />
        </Routes>
      )}
        </div>
        {/* <Footer /> */}
      </>
    </Router>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { useState } from "react";
import '../src/components/stylesheets/layout.css';
import Errorpage from './components/pages/Errorpage';
import Home from './components/pages/Home';
import Home1 from './components/pages/Home2';
import Login from "./components/layout/Login";
import CardList from "./components/pages/lists/CardList";
import CardL1 from "./components/pages/card/CardL1";
import CustomerList from "./components/pages/lists/CustomerList";
import UserList from "./components/pages/lists/UserList";
import Navbar from "./components/layout/Navbar1";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <Router>
    <>
      <Navbar/>
      <div className="main">
      <Routes>
             
             <Route path="/" exact element={<Home/>} />
             <Route path="/1" exact element={<Home1/>} />
             {/* <Route path="/2" exact element={<Home2/>} /> */}
             <Route path="/login" exact element={<Login/>} />
             {/* <Route path="/login1" exact element={<Login1/>} /> */}

             <Route path="/card-list" exact element={<CardList/>} />
             <Route path="/customer-list" exact element={<CustomerList/>} />
             <Route path="/user-list" exact element={<UserList/>} />

             {/* <Route path="/cardl1" exact element={<CardL1/>} /> */}
             {/* <Route path="/add" exact element={<AddCustomers />} />
 
             <Route path="/about" exact element={<About />} />
             <Route path="/contact" exact element={<Contact />} />
 
             <Route path="/scan" exact element={<QRCodeScanner />} />
             <Route path="/add-user" exact element={<AddUser username={user} />} />
             <Route path="/cards" exact element={<CardList />} />
             <Route path="/users" exact element={<UserList />} /> */}
 
 
             <Route path="*" element={<Errorpage />} />
           </Routes>
      </div>
      <Footer/>
    </>
    </Router>
  );
}

export default App;

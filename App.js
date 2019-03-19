import React from 'react';
import './App.css';
import {useState, useEffect} from "react";
import { Router, Link } from "@reach/router"
import firebase from 'firebase';
import './firebase'; 
import {PAGES} from "./constants/routes.js";
import Nav from "./comps/navigation.js";
import Home from "./comps/home.js";
import ToDoApp from "./comps/to-do.js";
import SignUp from "./comps/sign-up.js";
import SignIn from "./comps/sign-in.js";
import Account from "./comps/account.js";
import ErrorPage from "./comps/error.js";



export const UserContext = React.createContext();
const appStyle = {
  margin: "auto",
};



function App() {
  const [user, setUser] = useState("");

  useEffect(() => { firebase.auth().onAuthStateChanged((currUser) => currUser ? setUser(currUser) : setUser(""))}, []);

  return (
    <div className="App" style={appStyle}>

    <UserContext.Provider value={{user, setUser}}>
      <Nav />

      <Router>
        <Home path="/" />
        <ToDoApp path={PAGES.APP.link} />
        <SignUp path={PAGES.SIGN_UP.link} />
        <SignIn path={PAGES.SIGN_IN.link} />
        <Account path={PAGES.ACCOUNT.link} />
        <ErrorPage default />
      </Router>

      {/* { window.location.href === ("http://localhost:3000/") ?
        <Home /> :
      window.location.href === `http://localhost:3000${PAGES.APP.link}` ?
        <ToDoApp /> :
      window.location.href === `http://localhost:3000${PAGES.SIGN_UP.link}` ?
        <SignUp />  :
      window.location.href === `http://localhost:3000${PAGES.SIGN_IN.link}` ?
        <SignIn />  :
      window.location.href === `http://localhost:3000${PAGES.ACCOUNT.link}` ?
        <Account /> :
        <ErrorPage />} */}

    </UserContext.Provider>

    </div>
  );
};

export default App;

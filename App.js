import React, { Component } from 'react';
import './App.css';
import {useState, useEffect, useReducer, useContext} from "react";
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

  useEffect(() => { firebase.auth().onAuthStateChanged((user) => user ? setUser(user) : setUser(""))}, []);

  return (
    <div className="App" style={appStyle}>

    <UserContext.Provider value={{user, setUser}}>
      <Nav />

      { window.location.href === ("http://localhost:3000/") ?
        <Home /> :
      window.location.href === `http://localhost:3000${PAGES.APP.link}` ?
        <ToDoApp /> :
      window.location.href === `http://localhost:3000${PAGES.SIGN_UP.link}` ?
        <SignUp />  :
      window.location.href === `http://localhost:3000${PAGES.SIGN_IN.link}` ?
        <SignIn />  :
      window.location.href === `http://localhost:3000${PAGES.ACCOUNT.link}` ?
        <Account /> :
        <ErrorPage />}

        <p>You are logged in as: {user.displayName || "-Anon-"}</p>

    </UserContext.Provider>

    </div>
  );
};

export default App;

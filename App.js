import React, { Component } from 'react';
import './App.css';
import {useState, useEffect, useReducer, useContext} from "react";
import './firebase'; 
import {Nav} from "./comps/navigation.js";
import {PAGES} from "./constants/routes.js";
import {APP} from "./constants/routes.js";
import {HOME} from "./constants/routes.js";
import {SIGN_UP} from "./constants/routes.js";
import {SIGN_IN} from "./constants/routes.js";
import {ACCOUNT} from "./constants/routes.js";
import {Home} from "./comps/home.js";
import {ToDoApp} from "./comps/to-do.js";
import {SignUp} from "./comps/sign-up.js";
import {SignIn} from "./comps/sign-in.js";
import {Account} from "./comps/account.js";

// to-do-b8576

const appStyle = {
  margin: "auto",
};



function App() {

  // useEffect(() => {
  //   list.map(l => {
  //     localStorage.setItem(l.task, l.active);
  //   });
  // });

  // useEffect(() => {
  //   let localList = {...localStorage},
  //       newList = Object.keys(localList).map(k => ({task: k, active: localList[k] === "true"}));
  //   setList(newList);
  // }, []);

  return (
    <div className="App" style={appStyle}>

      <Nav />

      {/* <ToDoApp /> */}
      
      { window.location.href === "http://localhost:3000/" ?
          <Home /> :
        window.location.href === `http://localhost:3000${APP.link}` ?
          <ToDoApp /> :
          <SignUp />  }

      {/* <FunctionContext.Provider value={{input, list, display, setList, handleInput, submitTask, setDisplay, clearCompleted}}>
        <div id="mainApp" style={{maxWidth:660, margin:"24px auto", border:"thin solid black"}}>
          <Title />
          <InputBox selectAll={selectAll} />
          <List />
          <Options />
        </div>
      </FunctionContext.Provider> */}

    </div>
  );
};

export default App;

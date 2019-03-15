import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from "react";


const appStyle = {
  maxWidth: 660,
  margin: "auto",
  border: "1px solid black",
};
const titleStyle = {
  
};
const listStyle = {

};
const listItemStyle = {
  borderTop: "1px solid black",
  borderBottom: "1px solid black",
  width: "100%",
};
const optionsStyle = {
  display: "flex",
};
const filterStyle = {
  flex: 1,
  alignSelf: "center",
  justifySelf: "center,"
};

const Title = () => <div><h1>Don't Forget:</h1></div>;

function InputBox(props) {
  return (
    <div>
      <input type="text" value={props.input} onChange={props.handleInput} onKeyDown={props.submitTask} placeholder="Enter task..." />
    </div>
  );
}



function List(props) {
  return (
    <div>
      {props.list.map(i => <div key={i} style={listItemStyle}><p>{i}</p></div>)}
    </div>
  );
}



function Options(props) {
  return (
    <div style={optionsStyle}>
      <div style={{flex: 1}}><p>{props.list.length} tasks remaining</p></div>
      <div style={{display: "flex"}}>
        <div style={filterStyle}><button>All</button></div>
        <div style={filterStyle}><button>Active</button></div>
        <div style={filterStyle}><button>Completed</button></div>
      </div>
      <div style={{flex: 1, alignSelf: "center", justifySelf: "center"}}><button>Clear completed</button></div>
    </div>
  );
}



function App() {
  const [input, setInput] = useState("");
  const [list, setList] = useState(["run", "walk", "saunter"]);
  
  function handleInput(event) {
    setInput(event.target.value);
  }

  function submitTask(event) {
    if (event.key === "Enter") {
      list.push(input);
      // setList(list.push(input)); This transforms the list to the list.length. Is it bad to not use this second parameter to set the state?
      setInput("");
    };
  }

  return (
    <div className="App" style={appStyle}>
      
      <Title />
      <div id="mainCont">
        <InputBox input={input} handleInput={handleInput} submitTask={submitTask}/>
        <List list={list}/>
        <Options list={list}/>
      </div>

    </div>
  );
};

export default App;

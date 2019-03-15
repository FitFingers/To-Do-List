import React, { Component } from 'react';
import './App.css';
import {useState, useEffect} from "react";

function Title() {
  return (
    <div>
      <h1>Don't Forget:</h1>
    </div>
  );
}

// function MainCont() {
//   return (
//     <div>
//       <InputBox />
      
//     </div>
//   );
// }

function InputBox() {
  const [input, setInput] = useState("");
}

function List(props) {
  return (
    <div>
      {this.props.list.map(i => <div><p>{i}</p></div>)}
    </div>
  );
}

function Options(props) {
  return (
    <div>
      <p>Num i left</p>
      <div>
        <button>All</button>
        <button>Active</button>
        <button>Completed</button>
      </div>
      <button>Clear completed</button>
    </div>
  );
}

// function ListItem() {
//   const 
// }

const App = () => {
  const [list, setList] = useState([]);
  return (
    <div className="App">
      
      <Title />

      <div id="mainCont">
        <InputBox />
        <List />
        <Options />
      </div>

    </div>
  );
};

export default App;

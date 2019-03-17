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
  listStyle: "none",
  borderTop: "1px solid black",
  borderBottom: "1px solid black",
  textAlign: "left",
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
    <div style={{marginBottom: 12}}>
      <button onClick={props.selectAll}>Select All</button>
      <input type="text" value={props.input} onChange={props.handleInput} onKeyDown={props.submitTask} placeholder="Enter task..." />
    </div>
  );
}



function List(props) {
  const LIST = props.display === "active" ?
          props.list.filter(i => i.active === true) :
          props.display === "completed" ?
          props.list.filter(i => i.active === false) :
          props.list;
  return (
    <div style={listStyle}>
      {LIST.map(i => <ListItem key={i.task} i={i} list={props.list} setList={props.setList} />)}
    </div>
  );
}



function ListItem(props) {
  function handleCheck(event) {
    const newList = props.list.map(l => l.task === event.target.value ? {task: l.task, active: !l.active} : l);
    props.setList(newList);
  }
  return (
    <li style={listItemStyle} >
      <label>
        <input value={props.i.task} type="checkbox" onChange={handleCheck} checked={!props.i.active} />
        {props.i.active === false ?
          <p style={{display: "inline-block", textDecoration: "line-through"}}>{ props.i.task }</p> :
          <p style={{display: "inline-block", textDecoration: "none"}}> {props.i.task} </p>}
      </label>
    </li>
  );
}



function Options(props) {
  return (
    <div style={optionsStyle}>
      <div style={{flex: 1}}><p style={{fontSize: "0.7em"}}>{props.list.filter(i => i.active === true).length} tasks remaining</p></div>

      <div style={{display: "flex"}}>
        <div style={filterStyle}><button onClick={() => props.setDisplay("all")}>All</button></div>
        <div style={filterStyle}><button onClick={() => props.setDisplay("active")}>Active</button></div>
        <div style={filterStyle}><button onClick={() => props.setDisplay("completed")}>Completed</button></div>
      </div>

      {props.list.filter(l => l.active === false).length >= 1 ?
        <div style={{flex: 1, alignSelf: "center", justifySelf: "center"}}><button onClick={props.clearCompleted}>Clear completed</button></div> :
        <div style={{flex: 1}}></div>
        }
    </div>
  );
}



function App() {
  const [input, setInput] = useState("");
  // const [list, setList] = useState([{task: "sleep", active: true}, {task: "eat dinner", active: true}, {task: "walk the dog", active: true}]);
  const [list, setList] = useState([]);
  const [display, setDisplay] = useState("all");
  
  function handleInput(event) {
    setInput(event.target.value);
  }

  function submitTask(event) {
    if (event.key === "Enter") {
      list.push({
        task: input,
        active: true
      });
      setInput("");
    };
  }

  function selectAll() {
    list.map(l => l.active).includes(true) ? 
    setList(list.map(l => ({task: l.task, active: false}))) :
    setList(list.map(l => ({task: l.task, active: true})));
  }

  function clearCompleted() {
    list.map(l => {
      if (l.active === false) localStorage.removeItem(l.task);
    });
    setList(list.filter(l => l.active === true));
  }

  // function handleLocalStorage() {
  //   list.map(l => {
  //     localStorage.setItem(l.task, l.active);
  //   });
  //   let localList = {...localStorage},
  //       newList = Object.keys(localList).map(k => ({[k]: localList[k] === "true"}));
  //   // setList(newList);
  //   console.log(newList);
  // }

  // On every render update
  useEffect(() => {
    list.map(l => {
      localStorage.setItem(l.task, l.active);
    });
  });

  // Only on mount (extra array parameter)
  useEffect(() => {
    let localList = {...localStorage},
        newList = Object.keys(localList).map(k => ({task: k, active: localList[k] === "true"}));
    setList(newList);
    console.log(newList);
  }, []);

  return (
    <div className="App" style={appStyle}>
      
      <Title />
      <div id="mainCont">
        <InputBox input={input} handleInput={handleInput} submitTask={submitTask} selectAll={selectAll} />
        <List list={list} setList={setList} display={display} />
        <Options list={list} setDisplay={setDisplay} clearCompleted={clearCompleted} />
      </div>

    </div>
  );
};

export default App;

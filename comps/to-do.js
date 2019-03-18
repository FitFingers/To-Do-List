import React, { Component } from 'react';
import '../App.css';
import {useState, useEffect, useReducer, useContext} from "react";
import firebase from 'firebase';

window.firebase = firebase;

const listStyle = {

};
const listItemStyle = {
  listStyle: "none",
  marginTop: "-2px",
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



const FunctionContext = React.createContext();
const db = firebase.firestore();



const Title = () => <div><h1>Don't Forget:</h1></div>;


function InputBox(props) {
  const func = useContext(FunctionContext);
  return (
    <div style={{marginBottom: 12}}>
      <button onClick={props.selectAll}>Select All</button>
      <input type="text" value={func.input} onChange={func.handleInput} onKeyDown={func.submitTask} placeholder="Enter task..." />
    </div>
  );
}



function List() {
  const func = useContext(FunctionContext),
        LIST =  func.display === "active" ?
                func.list.filter(i => i.active === true) :
                func.display === "completed" ?
                func.list.filter(i => i.active === false) :
                func.list;
  return (
    <div style={listStyle}>
      {LIST.map(i => <ListItem key={i.task} i={i} />)}
    </div>
  );
}



function ListItem(props) {
  const func = useContext(FunctionContext);
  function handleCheck(event) {
    const newList = func.list.map(l => l.task === event.target.value ? {task: l.task, active: !l.active, id: l.id} : l);
    func.setList(newList);
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



function Options() {
  const func = useContext(FunctionContext);
  return (
    <div style={optionsStyle}>
      <div style={{flex: 1}}><p style={{fontSize: "0.7em"}}>{func.list.filter(i => i.active === true).length} tasks remaining</p></div>

      <div style={{display: "flex"}}>
        <div style={filterStyle}><button onClick={() => func.setDisplay("all")}>All</button></div>
        <div style={filterStyle}><button onClick={() => func.setDisplay("active")}>Active</button></div>
        <div style={filterStyle}><button onClick={() => func.setDisplay("completed")}>Completed</button></div>
      </div>

      {func.list.filter(l => l.active === false).length >= 1 ?
        <div style={{flex: 1, alignSelf: "center", justifySelf: "center"}}><button onClick={func.clearCompleted}>Clear completed</button></div> :
        <div style={{flex: 1}}></div>
        }
    </div>
  );
}



export function ToDoApp() {
  const [input, setInput] = useState("");
  const [list, setList] = useState([]);
  const [display, setDisplay] = useState("all");
  
  function handleInput(event) {
    setInput(event.target.value);
  }

  function submitTask(event) {
      // Write locally to session>list.
    // if (event.key === "Enter") {
    //   list.push({
    //     task: input,
    //     active: true
    //   });
    //   setInput("");
    // };

    // Write directly to DB and store list and write data locally
    if (event.key === "Enter") {
      db.collection("user1").add({
        task: input,
        active: true
      })
      .then((docRef) => setList(list.concat({task: input, active: true, id: docRef.id, online: true})))
      .catch((error) => setList(list.concat({task: input, active: true, id: null, online: false, error: error})));
      setInput("");
    };
  }

  function selectAll() {
    list.map(l => l.active).includes(true) ? 
      setList(list.map(l => ({task: l.task, active: false, id: l.id}))) :
      setList(list.map(l => ({task: l.task, active: true, id: l.id})));
  }

  function clearCompleted() {
    list.map(l => {
    //   if (l.active === false) localStorage.removeItem(l.task);
        if (l.active === false) db.collection("user1").doc(l.id).delete().then(() => console.log("Task successfully removed: " + l.id)).catch((error) => console.log("Error removing document: " + error));
    });
    setList(list.filter(l => l.active === true));
  }

    async function initialisePage() {
        const dataList = await db.collection("user1").get().then((qSnap) => qSnap.docs.map(d => ({task: d.data().task, active: d.data().active, id:d.id})));
        setList(dataList);
    }

    useEffect(() => {
        initialisePage();
    }, []);

    return (
        <div>
            <FunctionContext.Provider value={{input, list, display, setList, handleInput, submitTask, setDisplay, clearCompleted}}>
                <div id="mainApp" style={{maxWidth:660, margin:"auto", border:"thin solid black"}}>
                <Title />
                <InputBox selectAll={selectAll} />
                <List />
                <Options />
                </div>
            </FunctionContext.Provider>
        </div>
    );
}

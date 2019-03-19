import React from "react";
import {useState, useContext} from "react";
import {handleSubmit} from "../funcs/submit.js";
import firebase from "firebase";
// import {UserContext} from "../App.js";

function SignIn() {
    const inputStyle = {display: "block", margin: "6px auto"};
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [passwd, setPasswd] = useState("");
    // const User = useContext(UserContext);

    function handleInput(event) {
        event.target.name === "email" ? 
            setEmail(event.target.value) :
        event.target.name === "passwd" ?
            setPasswd(event.target.value) :
            setName(event.target.value);
    }

    // Actually, the form is totally unnecessary.
    function handleSignIn(event) {
        firebase.auth().signInWithEmailAndPassword(email, passwd)
        .then(() => { setEmail(""); setPasswd("")})
        .catch((error) => alert("Error: " + error));
        event.preventDefault();
    }

    return (
        <div>
            <h2>Good to see you again!</h2>
            <form onSubmit={handleSignIn}>
                <input name="name" value={name} onChange={handleInput} style={inputStyle} type="text" placeholder="Enter username..." required />
                <input name="email" value={email} onChange={handleInput} style={inputStyle} type="email" pattern=".+@.+\.\w+" placeholder="Enter email..." required />
                <input name="passwd" value={passwd} onChange={handleInput} style={inputStyle} type="password" placeholder="Enter password..."  required />
                <button name="submit" type="submit">Log in</button>
            </form>
        </div>
    );
}

export default SignIn;

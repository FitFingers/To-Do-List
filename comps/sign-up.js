import React from "react";
import {useState} from "react";
import firebase from 'firebase';

function SignUp() {
    const inputStyle = {display: "block", margin: "6px auto"};
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [passwd, setPasswd] = useState("");

    function handleInput(event) {
        event.target.name === "email" ? 
            setEmail(event.target.value) :
        event.target.name === "passwd" ? 
            setPasswd(event.target.value) :
            setName(event.target.value);
    }

    function handleSignUp(event) {
        firebase.auth().createUserWithEmailAndPassword(email, passwd)
        .then(() => firebase.auth().currentUser.updateProfile({displayName: name}))
        .then(() => alert("Account created for " + email))
        .then(() => { setEmail(""); setPasswd(""); setName("") })
        .catch((error) => alert("Error: " + error));
        event.preventDefault();
    }

    return (
        <div>
            <h2>Happy to have you on board!</h2>
            <form onSubmit={handleSignUp}>
                <input name="name" value={name} onChange={handleInput} style={inputStyle} type="text" placeholder="Enter username..." required />
                <input name="email" value={email} onChange={handleInput} style={inputStyle} type="email" pattern=".+@.+\.\w+" placeholder="Enter email..." required />
                <input name="passwd" value={passwd} onChange={handleInput} style={inputStyle} type="password" placeholder="Enter password..." required />
                <button name="submit" type="submit">Submit</button>
            </form>
        </div>
    );
}

export default SignUp;

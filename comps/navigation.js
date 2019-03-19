import React, {useContext} from "react";
import {PAGES} from "../constants/routes.js";
import {UserContext} from "../App.js";
import firebase from "firebase";
import { Router, Link } from "@reach/router"

function Nav() {
    const User = useContext(UserContext);

    function logout () {
        firebase.auth().signOut()
        .then(() => console.log("You have logged out."))
        .catch((error) => "Error signing out: " + error);
    }

    return(
        <div style={{margin:"24px auto", borderBottom:"thin solid black"}}>
            <ul style={{listStyle:"none", paddingLeft:0, position:"relative"}}>
                { User.user.uid ?
                    Object.values(PAGES).filter(p => p.hideSignIn !== true).map(p => <Link to={p.link} key={p.text + "-link"} style={{display:"inline-block", textDecoration:"none", margin:"auto 8px"}}>{p.text}</Link>)
                    :
                    Object.values(PAGES).map(p => <Link to={p.link} key={p.text + "-link"} style={{display:"inline-block", textDecoration:"none", margin:"auto 8px"}}>{p.text}</Link>)
                }
                
                {User.user.displayName ? (
                <div style={{position:"absolute", right:6, top: -18}}>
                    <span style={{fontSize:"0.7em"}}>Welcome, {User.user.displayName}.</span>
                    <button onClick={logout} style={{display:"block", margin:"4px auto"}}>Sign out</button>
                </div>
                ) : (
                <div style={{position:"absolute", top:-2, right: 6, fontSize: "0.7em"}}>
                    <span>Please sign in.</span>
                </div>
                )}
            </ul>
        </div>
    );
}

export default Nav;

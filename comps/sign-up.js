import React from "react";
import {useState} from "react";

export function SignUp() {
    const inputStyle = {display: "block", margin: "6px auto"};
    const [email, setEmail] = useState("");
    const [passwd, setPasswd] = useState("");

    function handleInput(event) {
        event.target.name === "email" ? 
            setEmail(event.target.value) :
            setPasswd(event.target.value);
        console.log(email, passwd);
    }

    return (
        <div>
            <form action="">
                <input name="email" value={email} onChange={handleInput} style={inputStyle} type="email" pattern=".+@.+\.\w+" placeholder="Enter email..." required />
                <input name="passwd" value={passwd} onChange={handleInput} style={inputStyle} type="password" placeholder="Enter password..." required />
                <button type="submit" value="submit">Submit</button>
            </form>
        </div>
    );
}

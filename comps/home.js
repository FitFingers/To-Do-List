import React, {useContext} from "react";
import {UserContext} from "../App.js";

function Home() {
    const User = useContext(UserContext);

    return (
        <div>
            <h1>Welcome to the To-Do App</h1>
            <p style={{fontSize: "0.7em"}}>Please click a link to continue</p>

            <p style={{fontSize:"0.7em"}}>Your User ID is: {User.user.uid}</p>
        </div>
    );
}

export default Home;

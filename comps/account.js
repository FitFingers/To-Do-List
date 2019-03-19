import React, {useContext} from "react";
import { UserContext } from "../App";

function Account() {
    const User = useContext(UserContext);
    return (
        <div>
            <h1>Hello, {User.user.displayName}</h1>
            <p>You have been logged in.</p>
        </div>
    );
}

export default Account;

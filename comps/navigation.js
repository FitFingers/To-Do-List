import React from "react";
import {PAGES} from "../constants/routes.js";

export function Nav() {
    return(
        <div style={{margin:"24px auto", borderBottom:"thin solid black"}}>
            <ul style={{listStyle:"none", paddingLeft:0}}>
                {PAGES.map(p => <a key={p.text} href={p.link}><li style={{display:"inline-block", margin:"auto 8px"}}>{p.text}</li></a>)}
            </ul>
        </div>
    );
}

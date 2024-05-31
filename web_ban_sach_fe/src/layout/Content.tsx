import React from "react";
import {LAYOUT_COLOR} from "../colors";

export default function Content() {
    return (
        <div className={"content d-flex justify-content-center align-items-center"}
             style={{minHeight: "100vh", backgroundColor: LAYOUT_COLOR}}>
            <span>THIS IS CONTENT WEBSITE</span>
        </div>
    )
}
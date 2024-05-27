import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/chatcardstyle.css"
import boy from "../images/boy.png"

// This is a function which renders the friends in the friends list
export function ChatCard(props) {
  return (
    <div className="card_outer"   onClick={() => {
          props.getMessages(props.publicKey);
        }}>
      <div className="image_outer_box">
        <img src={boy} alt="" className="userimg"/>
      </div>
      <div className="usernametitle">
          <h5>{props.name}</h5>
          {" "}
            {props.publicKey.length > 20
              ? props.publicKey.substring(0, 20) + " ..."
              : props.publicKey}{" "}
      </div>
      <div className="lastmessaged">
        <h6>1hr</h6>
      </div>
      <div>

      </div>
    </div>
  );
}
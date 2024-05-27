import React from "react";
import '../css/header.css'
import Gamer from '../images/gamer.png'
// This component renders the Navbar of our application
export function NavBar(props) {
  return (
    <div>
      <div className="header-outer-box">
        <div className="lefthandside">
          <h1><span className="spancontent">Pre</span>Chat</h1>
        </div>
        <div className="centerdata">

        </div>
        <div className="righthandside">
          <img src={Gamer} alt="" className="imageavatar"/>
          <h2 className="usernameprobs">{props.username}</h2>
        </div>
      </div>
    </div>
  );
}






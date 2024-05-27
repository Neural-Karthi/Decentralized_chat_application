import React from "react";
import { useState } from "react";
import { ethers } from "ethers";
import '../css/starting.css'
import { abi } from "../abi";
import {useNavigate} from "react-router-dom";
import img1 from '../images/front_images/1.png'
import img3 from '../images/front_images/3.png'
import img4 from '../images/front_images/4.png'
import img5 from '../images/front_images/5.png'
import img8 from '../images/front_images/8.png'
import img6 from '../images/front_images/6.png'
// Add the contract address inside the quotes
const CONTRACT_ADDRESS = "0x6afdc6b4c22adee1c47e15e0a6e5f284ae25958d";

export default function Loginpage(props) {
  const navigate = useNavigate();
  const [myName, setMyName] = useState(null);
  const [myPublicKey, setMyPublicKey] = useState(null);
  const [showConnectButton, setShowConnectButton] = useState("block");
  const [myContract, setMyContract] = useState(null);
  // Save the contents of abi in a variable
  const contractABI = abi;
  let provider;
  let signer;
  // Login to Metamask and check the if the user exists else creates one
  async function login() {
    let res = await connectToMetamask();
    if (res === true) {
      provider = new ethers.providers.Web3Provider(window.ethereum);
      signer = provider.getSigner();
      try {
        const contract = new ethers.Contract(
          CONTRACT_ADDRESS,
          contractABI,
          signer
        );
        const address = await signer.getAddress();
        let present = await contract.checkUserExists(address);
        let username;
        if (present) username = await contract.getUsername(address);
        else {
          username = prompt("Enter a username", "Guest");
          if (username === "") username = "Guest";
          await contract.createAccount(username);
        }
        localStorage.setItem('username', username);
        localStorage.setItem('address',address);
        alert("Successfully Login");
        navigate('Home')
      } catch (err) {
        alert("CONTRACT_ADDRESS not set properly!");
      }
    } else {
      alert("Couldn't connect to Metamask");
    }
  }
  // Check if the Metamask connects
  async function connectToMetamask() {
    try {
      await window.ethereum.enable();
      return true;
    } catch (err) {
      return false;
    }
  }
  return (
    <div><br></br><br></br>
    <center>
        <div className='start_background'>
          <div className="application_title">
             <h1><span className="spancontent">Pre</span>Chat</h1>
          </div>
            <div className='title_content'>
                <h3 className='h1title'>Message privately</h3><br></br><br></br><br></br>
                <p className='ptitle'>
                    "Global messaging, secure and private, without central servers, decentralized communication network."
                </p>
            </div>
            <div className="textdataicons">
              <img src={img1} className="image1" id="img1" alt=""/>
              <img src={img3} className="image1" id="img2" alt=""/>
              <img src={img4} className="image2" id="img3" alt=""/>
              <img src={img5} className="image1" id="img4" alt=""/>
              <img src={img6} className="image2" id="img5" alt=""/>
              <img src={img8} className="image2" id="img6" alt=""/>
            </div>
            <button className='loginbtn' onClick={login}>Login using MetaMask </button>
        </div>
       
    </center>
</div>
  );
}
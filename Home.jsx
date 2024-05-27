import React from "react";
import { useState, useEffect } from "react";
import '../css/homepage.css'
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import {  NavBar,ChatCard, Message, AddNewChat } from "./components.js";
import { ethers } from "ethers";
import { abi } from "../abi";
import menu from '../images/menu.png'
import refresh from '../images/refresh.png'
const CONTRACT_ADDRESS = "0x6afdc6b4c22adee1c47e15e0a6e5f284ae25958d";

export default function Home(params) {
  const [friends, setFriends] = useState(null);
  const [myName, setMyName] = useState(null);
  const [myPublicKey, setMyPublicKey] = useState(null);
  const [activeChat, setActiveChat] = useState({
    friendname: null,
    publicKey: null,
  });
  const [activeChatMessages, setActiveChatMessages] = useState(null);
  const [showConnectButton, setShowConnectButton] = useState("block");
  const [myContract, setMyContract] = useState(null);

  const username = localStorage.getItem('username');
  const address = localStorage.getItem('address');

  const contractABI = abi;

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    try {
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        contractABI,
        signer
      );
      setMyContract(contract);
      setMyName(username);
      setMyPublicKey(address);
      setShowConnectButton("none");
    } catch (err) {
      alert("CONTRACT_ADDRESS not set properly!");
    }
  }, [username, address, contractABI]);

  async function addChat(name, publicKey) {
    try {
      let present = await myContract.checkUserExists(publicKey);
      if (!present) {
        alert("Address not found: Ask them to join the app :)");
        return;
      }
      try {
        await myContract.addFriend(publicKey, name);
        const frnd = { name: name, publicKey: publicKey };
        setFriends(friends.concat(frnd));
      } catch (err) {
        alert(
          "Friend already added! You can't be friends with the same person twice ;P"
        );
      }
    } catch (err) {
      alert("Invalid address!");
    }
  }

  async function sendMessage(data) {
    if (!(activeChat && activeChat.publicKey)) return;
    const recieverAddress = activeChat.publicKey;
    await myContract.sendMessage(recieverAddress, data);
  }

  async function getMessage(friendsPublicKey) {
    let nickname;
    let messages = [];
    friends.forEach((item) => {
      if (item.publicKey === friendsPublicKey) nickname = item.name;
    });
    const data = await myContract.readMessage(friendsPublicKey);
    data.forEach((item) => {
      const timestamp = new Date(1000 * item[1].toNumber()).toUTCString();
      messages.push({
        publicKey: item[0],
        timeStamp: timestamp,
        data: item[2],
      });
    });
    setActiveChat({ friendname: nickname, publicKey: friendsPublicKey });
    setActiveChatMessages(messages);
  }

  useEffect(() => {
    async function loadFriends() {
      let friendList = [];
      try {
        const data = await myContract.getMyFriendList();
        data.forEach((item) => {
          friendList.push({ publicKey: item[0], name: item[1] });
        });
      } catch (err) {
        friendList = null;
      }
      setFriends(friendList);
    }
    loadFriends();
  }, [myPublicKey, myContract]);

  const Messages = activeChatMessages
    ? activeChatMessages.map((message) => {
        let margin = "5%";
        let sender = activeChat.friendname;
        if (message.publicKey === myPublicKey) {
          margin = "55%";
        }
        return (
          <Message
            marginLeft={margin}
            sender={sender}
            data={message.data}
            timeStamp={message.timeStamp}
          />
        );
      })
    : null;

  const chats = friends
    ? friends.map((friend) => {
        return (
          <ChatCard
            publicKey={friend.publicKey}
            name={friend.name}
            getMessages={(key) => getMessage(key)}
          />
        );
      })
    : null;

    const handleClick = () => {
      if (activeChat && activeChat.publicKey) {
        getMessage(activeChat.publicKey);
      }
    };

  return (
    <>
    <NavBar username={myName}/>
    <center>
    <div className="main_box_content">
        <div className="message_side">
            <div className="title_box">
                <h3>Messages</h3>
            </div>
            <div className="friendslist">
            {chats}
            </div>
            <AddNewChat
              myContract={myContract}
              addHandler={(name, publicKey) => addChat(name, publicKey)}/>
        </div>
        <div className="chart_side">
           <div className="header_messages">
              <div className="usernametitle">
                  <h4 className="usernamecontent">{activeChat.friendname}</h4>
                  <p className="userkeydata">Public Key - {activeChat.publicKey}</p>
              </div>
              <div className="icon_container">
                   <div className="maincontainer">
                      <img src={refresh} className="menubtn" alt=""  onClick={() => {
                      if (activeChat && activeChat.publicKey)
                        getMessage(activeChat.publicKey);
                    }}/>
                      <img src={menu} className="menubtn" alt=""/>
                   </div>
              </div>
           </div>
           <div className="mainmessagebox">
           {Messages}
           </div>
           <div className="SendMessage">
           <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage(document.getElementById("messageData").value);
                  document.getElementById("messageData").value = "";
                }}
              >
                <Form.Row className="align-items-center">
                  <Col xs={9}>
                    <input type="text"
                      id="messageData"
                      className="messagedata"
                      placeholder="Send Message"
                    />
                  </Col>
                  <Col>
                    <Button
                      className="sendbtn"
                      style={{ float: "left" }}
                      onClick={() => {
                        sendMessage(
                          document.getElementById("messageData").value
                        );
                        document.getElementById("messageData").value = "";
                      }}
                    >
                      Send
                    </Button>
                  </Col>
                </Form.Row>
              </Form>
            </div>
        </div>
    </div>
    </center>
    </>
  );
}

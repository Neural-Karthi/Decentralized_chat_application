import React from "react";
import { useState } from "react";
import '../css/addnewfriends.css'
import { Modal, Form } from "react-bootstrap";
import more from '../images/more.png'
// This Modal help Add a new friend
export function AddNewChat(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="AddNewChat">
      <button  className="addbtn" onClick={handleShow}>
      <img src={more} alt="" className="addimg"/>
      <p className="newtext">New Connection</p>
      </button>
      <Modal  show={show} onHide={handleClose} className="addfriendform">
          <div>
            <h4 className="innertitle">Add New Friend</h4>
          </div>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              required
              id="addPublicKey"
              size="text"
              type="text"
              placeholder="Enter Friends Public Key"
              className="inputdata"
            />
            <br />
            <Form.Control
              required
              id="addName"
              size="text"
              type="text"
              className="inputdata"
              placeholder="Name"
            />
            <br />
          </Form.Group>
       
       
          <button  onClick={handleClose} id="closebtn" className="interactionbtn">
            Close
          </button>
          <button
          className="interactionbtn"
          id="addbtn"
            onClick={() => {
              props.addHandler(
                document.getElementById("addName").value,
                document.getElementById("addPublicKey").value
              );
              handleClose();
            }}
          >
            Add Friend
          </button>
          </Modal.Body>
      </Modal>
    </div>
  );
}

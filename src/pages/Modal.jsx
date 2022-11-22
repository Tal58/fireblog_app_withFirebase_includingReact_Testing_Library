import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import images from "../assets/comment.gif"
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import { commentDB } from "../firebase/firebaseDatabase";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Comment({setCommentNumber, setProfile,
  setController,
  setCardController,
  setCardDetails}) {
    const { userData, currentUser, displayName, photoURL } = useSelector(
        (state) => state.auth
      );

      console.log(userData);
  const [show, setShow] = useState(false);
  const [comment, setComment] = useState()
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate()
  const save =()=>{
    setShow(false)
        if (userData?.[1]?.comment){
        commentDB(userData[0], userData[1].currentUser, userData[1].title, userData[1].content, userData[1].url,userData[1].country, userData[1].flag, userData[1].date, userData[1].likeNumber,[...userData[1].comment,[currentUser,comment,photoURL]])
        setCommentNumber(userData?.[1]?.comment.length+1)
      }else{
        commentDB(userData[0], userData[1].currentUser, userData[1].title, userData[1].content, userData[1].url,userData[1].country, userData[1].flag, userData[1].date, userData[1].likeNumber,[[currentUser,comment, photoURL]])
        setCommentNumber(1)
      }
      setProfile(false);
      setController(false);
      setCardController(false);
      setCardDetails(false);
     
  }
  return (
    <>
   
          <IconButton  onClick={handleShow} >   
              <CardMedia
            component="img"
            height="50"
            sx={{ objectFit: "contain" }}
            image={images}
          />
            </IconButton>  

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Control as="textarea" rows={3} onChange={(e)=> setComment(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={save}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

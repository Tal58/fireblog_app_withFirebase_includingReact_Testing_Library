import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { red } from "@mui/material/colors";
import { Button, CardActions } from "@mui/material";
import { useSelector } from "react-redux";
import { Box } from "@mui/system";
import { toastErrorNotify } from "../helper/ToastNotify";
import { removeDB, updateDB, likesDB } from "../firebase/firebaseDatabase";
import { useState } from "react";
import heart from "../assets/heart.gif";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Comment from "./Modal";

export default function CardDetails({
  setProfile,
  setController,
  setCardController,
  setCardDetails,
  cardDetails,
}) {
  const { userData, currentUser, displayName, photoURL } = useSelector(
    (state) => state.auth
  );
  const [title, setTitle] = useState(userData[1].title);
  const [content, setContent] = useState(userData[1].content);
  const [url, setUrl] = useState(userData[1].url);
  const [likeControl, setLikeControl] = useState(false);
  const [likeNumber, setLikeNumber] = useState(Number(userData[1].likeNumber));
  const [commentNumber, setCommentNumber] = useState(Number(userData[1].comment?.length) || 0)
  

  console.log(userData);
  console.log(cardDetails);
  setProfile(false);
  setController(false);
  setCardController(true);
  setCardDetails(true);

  const turnBack = () => {
    setProfile(false);
    setController(false);
    setCardController(false);
    setCardDetails(false);
  };

  const likes = () => {
    if (!likeControl) {
      setLikeControl(!likeControl);
      removeDB(userData[0]);
      let number = likeNumber + 1;
      setLikeNumber(likeNumber + 1);
      console.log(likeNumber);
      likesDB(
        userData[0],
        userData[1].currentUser,
        title,
        content,
        url,
        userData[1].country,
        userData[1].flag,
        userData[1].date,
        number
      );
    }
  };


  const removeDatabase = () => {
    if (currentUser === userData[1].currentUser) {
      if (window.confirm("The Post will be erased. Are you sure?")) {
        removeDB(userData[0]);
        turnBack();
      }
    } else {
      toastErrorNotify(
        "This is not your post!!! You can not erase other users post..."
      );
    }
  };
  const updateDatabase = () => {
    if (currentUser === userData[1].currentUser) {
      const date = new Date();
      removeDB(userData[0]);
      updateDB(
        userData[0],
        currentUser,
        title,
        content,
        url,
        userData[1].country,
        userData[1].flag,
        String(date).slice(0, 15),
        likeNumber
      );
      turnBack();
    } else {
      toastErrorNotify(
        "This is not your post!!! You can not erase other users post..."
      );
    }
  };
  return (
    <Box data-testid={"trial"}
      flexWrap="wrap"
      sx={{ display: "flex", display: "flex", justifyContent: "space-evenly" }}
    >
      <Box>
        <Card
          key={userData[0]}
          sx={{
            maxWidth: 600,
            maxHeight: 600,
            mx: "auto",
            overflow: "auto",
            mt: 4,
            border: "1vw solid #f3e0be",
          }}
        >
          <CardHeader
            avatar={
              <Avatar
                src={userData?.[1].flag}
                sx={{ bgcolor: red[500] }}
                aria-label="recipe"
              >
                R
              </Avatar>
            }
            title={userData?.[1].title}
            subheader={userData?.[1].date}
          />

          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {userData?.[1].country}
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            height="200"
            sx={{ objectFit: "contain" }}
            image={userData?.[1].url}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              <b>Content:</b> {userData?.[1].content}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites" onClick={likes}>
              <CardMedia
                component="img"
                height="40"
                sx={{ objectFit: "contain" }}
                image={heart}
              />{" "}
              {likeNumber !== 0 ? likeNumber : ""}
            </IconButton>
            <Comment setCommentNumber={setCommentNumber} cardDetails={cardDetails} setProfile={setProfile} setController={setController} setCardController={setCardController} setCardDetails={setCardDetails} />
            {commentNumber !== 0 ? commentNumber : ""}
          </CardActions>
        </Card>
        <Box sx={{ mt: 4, textAlign: "center" }}>
          {currentUser === userData[1].currentUser && (
            <Button sx={{ margin: 1 }} variant="outlined">
              UPDATE
            </Button>
          )}
          {currentUser === userData[1].currentUser && (
            <Button
              onClick={removeDatabase}
              sx={{ margin: 1 }}
              variant="outlined"
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          )}
          <Button onClick={turnBack} variant="outlined">
            Back{" "}
          </Button>
        </Box>
      </Box>
      {currentUser === userData[1].currentUser && (
        <Box
          sx={{
            width: 350,
            maxWidth: 450,
            maxHeight: 600,
            mt: 4,
            textAlign: "center",
          }}
        >
          <div className="col-md-12 mx-auto mt-4">
            <Form onSubmit={updateDatabase}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  maxLength="15"
                />
                <Form.Text className="text-muted">
                  Enter title of your post.
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Url</Form.Label>
                <Form.Control
                  type="text"
                  value={url}
                  placeholder="Enter URL of your image"
                  onChange={(e) => setUrl(e.target.value)}
                />
                <Form.Text className="text-muted">
                  Enter Url of your post.
                </Form.Text>
              </Form.Group>
              <Form.Label>Content</Form.Label>
              <FloatingLabel
                controlId="floatingTextarea2"
                label="Leave a comment here..."
              >
                <Form.Control
                  as="textarea"
                  style={{ height: "100px" }}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  maxLength="300"
                />
              </FloatingLabel>

              <Button
                sx={{ margin: 1 }}
                variant="outlined"
                onClick={updateDatabase}
              >
                UPDATE
              </Button>
            </Form>
          </div>
        </Box>
      )}
      {userData?.[1]?.comment && (
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper", marginTop:5 }}
        >
          {userData?.[1]?.comment.map((user,key) => (
            <Box key={key}>
              <Divider variant="inset" component="li" />
              <ListItem  alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt={user[2]} src={user[2]} />
                </ListItemAvatar>
                <ListItemText
                  primary={user[0]}
                  secondary={
                    <React.Fragment >
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      ></Typography>
                      {user[1]}
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider  variant="inset" component="li" />
            </Box>
          ))}
        </List>
      )}
    </Box>
  );
}

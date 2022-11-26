import * as React from "react";
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { getDatabase, ref, child, get } from "firebase/database";
import { Box } from "@mui/material";
import CardDetails from "./CardDetails";
import { setuserData } from "../features/authSlice";
import { useDispatch } from "react-redux";
import { toastErrorNotify } from "../helper/ToastNotify";
import images from "../assets/comment.gif"
import heart from "../assets/heart.gif"
import { useSelector } from "react-redux";
import CircularColor from "./CircularProgress"
export default function Cards({
  setProfile,
  setController,
  setCardController,
  setCardDetails,
  cardDetails,
}) {
  const [UserdataBase, setUserdataBase] = useState();
  const dispatch = useDispatch();
  const { userData } = useSelector(
    (state) => state.auth
  );
  //read database
  function Read() {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          // console.log(snapshot.val());
          const db = snapshot.val();
          let data = Object.entries(db);
          setUserdataBase(Object.entries(db));
          // console.log(data);
          let data2 = [];
          data.map((item) => data2.push(item[0]));
          data2 = data2.sort();
          let finaldata = [];
          data2.map((item) => {
            return data.map((x) => {
              if (x[0] === item) {
                let a = [`${item}`, x[1]];
                finaldata.push(a);
              }
            });
          });
        } else {
          console.log("No data available");
          toastErrorNotify("No data available. Please write new Post");
          setUserdataBase();
          return "No data available";
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  useEffect(() => {
    Read();
  }, []);
  const handleCard = (user) => {
    console.log(user);
    dispatch(setuserData(user));
    setProfile(false);
    setController(false);
    setCardController(true);
    setCardDetails(true);
  };
  return (
    <Box data-testid={"trial"}
      flexWrap="wrap"
      style={{
        padding: 35,
        display: "flex",
        justifyContent: "space-around",
        textOverflow: "ellipsis",
        overflow: "hidden",
      }}
    >
      {UserdataBase?.length ? (UserdataBase?.map((user, index) => (
        <Card data-testid={`follower-item-${index}`}
          key={user[0]}
          className={user[0]}
          sx={{
            position: "relative",
            textAlign: "center",
            maxWidth: 300,
            maxHeight: 415,
            "&:hover": {
              background: "rgba(0, 0, 0, 0.4)",
              transform: "scale(105%)",
            },
          }}
          style={{ margin: 10, border: "1vw solid #f3e0be" }}
          onClick={() => handleCard(user)}
        >
          <CardHeader
          sx={{paddingBottom:0}}
            avatar={
              <Avatar src={user?.[1].flag} aria-label="recipe">
                R
              </Avatar>
            }
            title={user?.[1].title}
            subheader={user?.[1].date}
          />

          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {user?.[1].country}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <b>User:</b> {user?.[1].currentUser}
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            height="140"
            sx={{ objectFit: "contain" }}
            image={user?.[1].url}
          />
          <CardContent>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: "2",
                WebkitBoxOrient: "vertical",
                marginBottom: 5,
              }}
            >
              <b>Content:</b> {user?.[1].content}
            </Typography>
          </CardContent>
          <CardActions disableSpacing sx={{position: "absolute", bottom: 0 }}>
            <IconButton aria-label="add to favorites">
              <CardMedia
            component="img"
            height="30"
            sx={{ objectFit: "contain" }}
            image={heart}
          />{" "}
              {user?.[1].likeNumber === 0 ? "" : user?.[1].likeNumber}
              <CardMedia
            component="img"
            height="30"
            sx={{ objectFit: "contain" }}
            image={images}
          />
          {user?.[1].comment?.length === 0 ? "" : user?.[1].comment?.length}
            </IconButton>
          </CardActions>
        </Card>
      ))) : (
        <CircularColor />
      ) }
      {cardDetails && (
        <CardDetails
          cardDetails={cardDetails}
          setProfile={setProfile}
          setController={setController}
          setCardController={setCardController}
          setCardDetails={setCardDetails}
        />
      )}
    </Box>
  );
}

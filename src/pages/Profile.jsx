import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import cat from "../assets/cat.gif";
import { Button, CardActionArea, CardActions } from '@mui/material';
import { useSelector } from 'react-redux';

export default function Profile({setProfile, setController, setCardController, setCardDetails}) {
    const { currentUser, displayName, photoURL } = useSelector((state) => state.auth);

    setProfile(true)
    setCardController(true)
    setController(false)
    
    const turnBack = ()=>{
      setProfile(false)
      setController(false)
      setCardController(false)
      setCardDetails(false)
    }
  return (
    <Card sx={{ maxWidth: 345, textAlign: 'center',  mx: 'auto', mt: 5,  border: "0.8vw solid #f3e0be" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={photoURL || cat}
          sx={{width:1/2, mx:"auto", height: "auto"}}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {displayName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
          {currentUser}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions  >
        <Button size="small" color="primary" sx={{mx:"auto", backgroundColor: "#f3e0be"}} onClick={turnBack}>
          Back
        </Button>
      </CardActions>
    </Card>
  );
}
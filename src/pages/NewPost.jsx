import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import {IoHomeSharp} from "react-icons/io"
import { writeUserData } from '../firebase/firebaseDatabase';
import {toastSuccessNotify,toastErrorNotify } from "../helper/ToastNotify";

function NewPost({setProfile, setController, setCardController, setCardDetails}) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [url, setUrl] = useState("")
  const [countryData, setCountryData] = useState();
  const [country, setCountry] = useState();
  const [ListOfCountry, setListOfCountry] = useState();
  const { userData, currentUser, displayName, photoURL } = useSelector(
    (state) => state.auth
  );

  setController(true)
  setProfile(false)
  setCardController(true)

  const turnBack = ()=>{
    setProfile(false)
    setController(false)
    setCardController(false)
    setCardDetails(false)
  }
  const handleSubmit =(e)=>{
    e.preventDefault()
    const selectedCountryData = countryData?.filter(
      (item) => item.name.common === country
    );
    console.log(selectedCountryData[0]?.flags.png);
    const date = new Date()
    console.log(String(date).slice(0,15))
    const userId = new Date().getTime()
    writeUserData(userId, currentUser, title, content, url, country, selectedCountryData[0]?.flags.png,String(date).slice(0,15), 0 )
    setTitle("")
    setContent("")
    setUrl("")
    setCountry()
    turnBack()
  }
  //fetch all country from restcountries.com
  const fetchAllCountry = async () => {
    const url = `https://restcountries.com/v3.1/all`;
    await fetch(url)
      .then((res) => {
        if (!res.ok) {
          alert(`Something went wrong: ${res.status}`);
          throw new Error();
        }
        return res.json();
      })
      .then((data) => {
        setCountryData(data);
        return data;
      })
      .then((data) => selectcountry(data))
      .then((item) => setListOfCountry(item))
      .catch((err) =>{
        toastErrorNotify(err)
        console.log(err)
      });
  };

  //to create all options according to the data and sort it
  const selectcountry = (Countries) => {
    // console.log(Countries);
    let countryList = [];
    let countryListId = {};
    //sort the list of countries and collect id of all countries
    for (let i = 0; i < Countries.length; i++) {
      countryList.push(Countries[i].name.common);
      countryListId[Countries[i].name.common] = i;
    }
    // console.log(countryListId);
    //to sort it alphabetically
    countryList = countryList.sort();
    // console.log(countryList);
    return countryList;
  };

  useEffect(() => {
    fetchAllCountry();
    console.log("deneme");
  },[]);
  console.log(ListOfCountry);
  return (
    <div className='col-md-6 mx-auto mt-4'>
    <Form onSubmit={handleSubmit}>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Title</Form.Label>
      <Form.Control type="text" maxLength ="15" placeholder="Enter title" onChange={(e)=>setTitle(e.target.value)}/>
      <Form.Text className="text-muted">
        Enter title of your post.
      </Form.Text>
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Url</Form.Label>
      <Form.Control type="text" placeholder="Enter URL of your image"  onChange={(e)=>setUrl(e.target.value)}/>
      <Form.Text className="text-muted">
      Enter Url of your post.
    </Form.Text>
    </Form.Group>
    <h6>Country</h6>
    <Form.Select required onClick={(e) => setCountry(e.target.value)}>
      {ListOfCountry?.map((country, key) => (
        <option key={key}>{country}</option>
      ))}
    </Form.Select>
    <Form.Label>Content</Form.Label>
    <FloatingLabel controlId="floatingTextarea2" label="Leave a comment here...">
        <Form.Control
          as="textarea"
          style={{ height: '100px' }}
          onChange={(e)=>setContent(e.target.value)}
          maxLength ="300"
        />
      </FloatingLabel>

    <div className='mt-3 d-flex justify-content-center'>
    <Button className="mx-1" variant="primary" type="submit" onClick={handleSubmit}>
      Submit
    </Button>
    <Button className="mx-1" variant="success" onClick={turnBack}>Back</Button>
    </div>
    
  </Form>
    </div>
   
  );
}

export default NewPost;

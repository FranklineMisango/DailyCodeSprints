/* eslint-disable no-unused-vars */
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, InputGroup , FormControl, Button, Row, Card} from 'react-bootstrap'
import { useEffect, useState } from 'react';

const CLIENT_ID = "bd06528514ec44b9a70a43e27d21e466";
const CLIENT_SECRET = "21907bceb0cc4dfcaa2670cde7717e4e";


function App(){
  const[searchInput, setSearchInput] = useState("");

  useEffect(() => {
    //API Access Token
    var authParameters = {
      method:'POST',
      headers: {
        'Content-Type':'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
    }
    fetch('https://accounts.spotify.com/api/token', authParameters)
    .then(result => result.json())
    .then(data => console.log(data))
  }, [])


  return(
    <div className='App'>
    <Container>
      <InputGroup className='mb-3' size='lg'>
        <FormControl
          placeholder='Search for Artist' 
          type='input'
          onKeyPress={event=> {
            if(event.key == "Enter"){
              console.log("Pressed Enter")
            }
          }}
          onChange = {event => setSearchInput(event.target.value)}
        />
        <Button onClick={event => {console.log("Clicked Button")}}>
          Search
        </Button>
      </InputGroup>
    </Container>
    <Container>
      <Row className = "mx-2 row row-cols-4">
      <Card>
        <Card.Img src = "#"/>
        <Card.Body>
          <Card.Title>Album name here</Card.Title>
        </Card.Body>
      </Card>
      </Row>
    </Container>
    </div>
  );
}

export default App;

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
  const[accessToken, setAccessToken] = useState("");
  const[albums, setAlbums] = useState([]);
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
    .then(data => setAccessToken(data.access_token))
  }, [])


  // search

  async function search() {
    console.log("Searching for " + searchInput); //Ascertain we are searching for the required artist
    
    //Get request using search to get the Artist ID
    var searchParameters = {
      method:'GET',
      headers: {
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    }
    var artistID = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist', searchParameters)
      .then(response => response.json())
      .then(data => {return data.artists.items[0].id})
    console.log("Artist ID is " + artistID)

    //With Artist ID and grab all the albums from that artist

    var ret = await fetch ('https://api.spotify.com/v1/artists/' + artistID + '/albums' + '?include_groups=album&market=US&limit=50', searchParameters)
      .then(response => response.json())
      .then(data => {console.log(data);
      });
    //Display all those albums to the user
  
  
  }

  return(
    <div className='App'>
    <Container>
      <InputGroup className='mb-3' size='lg'>
        <FormControl
          placeholder='Search for Artist' 
          type='input'
          onKeyPress={event=> {
            if(event.key == "Enter"){
              search()
            }
          }}
          onChange = {event => setSearchInput(event.target.value)}
        />
        <Button onClick={search}>
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

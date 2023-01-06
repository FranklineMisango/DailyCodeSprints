import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, InputGroup, FormControl , Button , Row , Card, Form} from 'react-bootstrap' ;
import  {useState , useEffect} from 'react';

const CLIENT_ID = "bd06528514ec44b9a70a43e27d21e466";
const CLIENT_SECRET = "21907bceb0cc4dfcaa2670cde7717e4e";


function App() {
  const [SearchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [albums , setAlbums] = useState([]);

  useEffect (() => {
    //API access token from spotify
    var authParameters = {
      method : 'POST',
      headers : {
        'Content-Type' : 'application/x-www-form-urlencoded' 
      },
      body: 'grant_type = client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
    }
    fetch('https://accounts.spotify.com/api/token', authParameters )
      .then(result => result.json())
      .then(data => setAccessToken(data.access_token))
  }, [])

  //Search button for the artist

  async function search() {
    console.log("Search for " + SearchInput); //Kendrick lamar etc

    //Get request using search to get the Artist ID
    var searchParameters = {
      method : 'GET',
      headers: {
        'Content-Type' : 'application/json',
        'Authorization' : 'Bearer '+ accessToken
      }
    }
    var artistID = await fetch('https://api.spotify.com/v1/search?q=' + SearchInput + '&type=artist' , searchParameters)
      .then(response => response.json())
      .then(data => {return data.artists.items[0].id })
    //Get request Artist ID grab all the albums from that artist
    var returnedAlbums = await fetch ('https://api.spotify.com/v1/artists/' + artistID + '/albums' + '?include_groups=album&market=US&limit=50')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setAlbums(data.items);
      })
    //Display those albums to the user


  }
console.log(albums);
  return (
    <div className="App">
      <Container>
        <InputGroup className='mb-3' size= 'lg'>
          <FormControl
            placeholder = "Search For Artist"
            type = "Input"
            onKeyPress={event =>
            {
              if (event.key === "Enter")
              {
                search();
              }
            }}
            onChange = {event => setSearchInput(event.target.value)}
          />
          <Button onClick = {search}>
            Search
          </Button>
        </InputGroup>
      </Container>
      <Container>
        <Row className='mx-2 row row-cols-4'>
          {albums.map( (album, i) => {
            return (
             <Card>
             <Card.Img src = "#" />
             <Card.Body>
               <Card.Title>Album Name here</Card.Title>
             </Card.Body>
           </Card>
            )
        })}     
      </Row>      
    </Container>

  </div>
  );
}

export default App;
import MetaData from './MetaData';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import FetchData from './FetchData';
import { Link } from 'react-router-dom';
import {GoogleLogin, GoogleLogout} from 'react-google-login';
import {useState} from "react";
import Signin from './signin';


function App() {
  const [login, Setlogin] = useState("loggedout");

  function responseGoogle(response){
    console.log(response);
    console.log(response.profileObj);
    Setlogin('loggedin');
  }
  function responseGoogle1(response){
  console.log(response);
  console.log(response.profileObj);
  Setlogin("loggedout");
  } 

  return (
     <Router>
      <div className="App">
        <div>
          <MetaData />
          <nav className="navbar">
            <h1>The Weather App</h1>
            {/* <div className="links">
                <Link to="/">Home</Link>
                <Link to="/"><GoogleLogin clientId='295176366885-fal4t3aguo3aeki47lc95ti1scu5uru2.apps.googleusercontent.com' 
                    buttonText="Login with BITS mail" onSuccess={responseGoogle} onFailure={responseGoogle1} hostedDomain="hyderabad.bits-pilani.ac.in"
                    cookiePolicy={'single_host_origin'}></GoogleLogin></Link>
            </div> */}
          </nav>
            {login=="loggedout" && <Route exact path="/" component={Signin}>
              <Signin />
              </Route>}
            {login=="loggedin" && <Route exact path="/" component={FetchData}>
              <FetchData />
            </Route>}
        </div>
        <footer />
      </div>
     </Router>
  );
}

export default App;

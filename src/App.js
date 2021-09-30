import MetaData from './MetaData';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import FetchData from './FetchData';
// import firebase from "firebase";
// import { StyledFirebaseAuth } from "react-firebaseui";

function App() {
  //state = {isSignedIn: false}
  return (
    <Router>
      <div className="App">
        <div>
          <MetaData />
          {/* {this.state.isSignedIn ? 
            <Text>Signed in</Text>
          :
            <Text>Not Signed in!</Text>
          } */}
          <FetchData />
          <footer />
        </div>
      </div>
    </Router>
  );
}

export default App;

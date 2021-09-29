import MetaData from './MetaData';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Body from './Body.js';
import FetchData from './FetchData';

function App() {
  return (
    <Router>
      <div className="App">
        <div>
          <MetaData />
          <FetchData />
          <footer />
        </div>
      </div>
    </Router>
  );
}

export default App;

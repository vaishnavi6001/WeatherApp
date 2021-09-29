import SearchBar from './SearchBar';
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
          <SearchBar />
          <FetchData />
          <footer />
        </div>
      </div>
    </Router>
  );
}

export default App;

const SearchBar = () => {
    return ( 
        <header>
          <datalist id="pastSearches">
            <option value />
            <option value />
            <option value />
            <option value />
            <option value />
          </datalist>
          <p>Enter city name  <input id="city" type="text" name="city" list="pastSearches" />  <button id="search">Search</button></p>
          <p id="error" />
        </header>
    );
}
 
export default SearchBar;
import React, { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import  { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import MapboxAutocomplete from 'react-mapbox-autocomplete';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore"; 
require('dotenv').config();

let latitude = 0;
let longitude = 0;

const FetchData = () => {
    const [placeName, setPlaceName] = useState('');
    const mapboxAPIkey = process.env.REACT_APP_MAPBOX_API_KEY;
    console.log(mapboxAPIkey);

    const APIkey = process.env.REACT_APP_API_KEY;
    const firebaseConfig = {
        apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
        authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
        storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
        appId: process.env.REACT_APP_FIREBASE_APP_ID,
        measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
      };
    const app = initializeApp(firebaseConfig);
    require("firebase/firestore");
    const db = getFirestore();

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    const alldays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayshort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
    const today = new Date();
    let year = today.getFullYear(), month = today.getMonth(), date = today.getDate(), day = today.getDay();
    let days = [];
    for(let i=0; i<4; i++){
        if(day === 6)
        {
            day = 0;
        }
        days.push(day);
        day++;
    }
    const [City, setCity] = useState('Hyderabad');
    const [urlWeather, setURLWeather] = useState(`https://api.openweathermap.org/data/2.5/forecast?q=${City}&appid=${APIkey}`);
    const [Temp,setTemp] = useState('');
    const [description,setDescription] = useState('');
    const [icon,setIcon] = useState('');
    const [country, setCountry] = useState('');
    const [precipitation, setPrecipitation] = useState('');
    const [humidity, setHumidity] = useState('');
    const [windspeed, setWindspeed] = useState('');

    let city1 = '';

    function round(num){
        return num.toPrecision(3);
    }

    function getMyLocation(){
        navigator.geolocation.getCurrentPosition(showPosition);
    }

    function showPosition(position){
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        setURLWeather(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${APIkey}`);
    }

    async function showPosition1(position){
        latitude = await position.coords.latitude;
        longitude = await position.coords.longitude;
        console.log(latitude, longitude);
            try {
              fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${mapboxAPIkey}`)
              .then(response => response.json())
              .then(data => {
                console.log(data);
                setPlaceName(data.features[0].place_name);
                console.log(placeName);
              });
                const docRef = await addDoc(collection(db, "users"), {
                  LastSearch: city1,
                  UserCity: placeName,
                  UserLocationLatitude: latitude,
                  UserLocationLongitude: longitude,
                });
                console.log("Document written with ID: ", docRef.id);
              } catch (e) {
                console.error("Error adding document: ", e);
              }
    }

    async function storeData(){
        navigator.geolocation.getCurrentPosition(showPosition1);
    }

    function _suggestionSelect(result, lat, lng, text) {
      console.log(result, lat, lng, text);
      setURLWeather(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=${APIkey}`);
    }
    

    useEffect(()=> {
    fetch(urlWeather)
    .then(res=>res.json())
    .then(data=>{
        console.log(data);
        setTemp([Math.round(parseFloat(data.list[0].main.temp)-273.15), Math.round(parseFloat(data.list[8].main.temp)-273.15), Math.round(parseFloat(data.list[16].main.temp)-273.15), Math.round(parseFloat(data.list[24].main.temp)-273.15)]);
        setDescription(data.list[0].weather[0].description);
        setCity(data.city.name);
        city1 = data.city.name;
        setCountry(data.city.country);
        setIcon([`http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`, `http://openweathermap.org/img/wn/${data.list[8].weather[0].icon}@2x.png`, `http://openweathermap.org/img/wn/${data.list[16].weather[0].icon}@2x.png`, `http://openweathermap.org/img/wn/${data.list[24].weather[0].icon}@2x.png`]);
        setPrecipitation(round(parseFloat(data.list[0].pop)*100));
        setHumidity(data.list[0].main.humidity);
        setWindspeed(round(parseFloat(data.list[0].wind.speed)*18/5));
        storeData();
    })
    .catch(e=>{
      document.getElementById('error').value = e.message;
    })
    },[urlWeather])

return (
    <div>
        <header>
          <p id='entername'>Enter city name <MapboxAutocomplete 
                    publicKey={mapboxAPIkey}
                    inputClass='form-control search'
                    onSuggestionSelect={_suggestionSelect}
                    resetSearch={true}/></p>
          <p id="error" />
        </header>
        <div className="main">
          <div className="box1">
            <h1 id="day" className="topspace">{alldays[days[0]]}</h1>
            <p id="date">{date + " " + months[month] + " " + year}</p>
            <p /><p id="location"><FontAwesomeIcon icon={faMapMarkerAlt} /> {City + ", " + country}</p><p />
            <div className="b1bottom">
              <p id="icon"><img src={`${icon[0]}`} alt="present-day-icon" style={{height:"140px", width:"140px"}} /></p>
              <h1 id="temp">{Temp[0]} &deg;C</h1>
              <h2 id="description">{description}</h2>
            </div>
          </div>
          <div className="box2">
            <div className="prop">
              <span><p className="topspace"><b>PRECIPITATION</b></p><p id="precipitation" className="topspace">{precipitation + " %"}</p></span>
              <span><p><b>HUMIDITY</b></p><p id="humidity">{humidity + " %"}</p></span>
              <span><p><b>WIND</b></p><p id="windspeed">{windspeed + " km/h"}</p></span>
            </div>
            <div className="columns">
              <p id="col1"><span><img src={`${icon[0]}`} alt="present-day-icon" /></span><span>{dayshort[days[0]]}</span><span><b>{Temp[0]} &deg;C</b></span></p>
              <p id="col2"><span><img src={`${icon[1]}`} alt="present-day+1-icon" /></span><span>{dayshort[days[1]]}</span><span><b>{Temp[1]} &deg;C</b></span></p>
              <p id="col3"><span><img src={`${icon[2]}`} alt="present-day+2-icon" /></span><span>{dayshort[days[2]]}</span><span><b>{Temp[2]} &deg;C</b></span></p>
              <p id="col4"><span><img src={`${icon[3]}`} alt="present-day+3-icon" /></span><span>{dayshort[days[3]]}</span><span><b>{Temp[3]} &deg;C</b></span></p>
            </div>
            <div className="loc">
              <button id="changeloc" onClick={getMyLocation}>Get weather at my location</button>
            </div>
          </div>
        </div>
    </div>
)}
 
export default FetchData;
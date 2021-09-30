import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import  { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadString} from "firebase/storage";
// import { GoogleAuthProvider } from "firebase/auth";
// import { getAuth, signInWithPopup } from "firebase/auth";



const FetchData = () => {
    const APIkey = 'fb86174eff0d7d1c441ae13cf5cfa154';
    const firebaseConfig = {
        apiKey: "AIzaSyA-ELe2Fwwm2v52SPR7WlFaW61CRKsBjEI",
        authDomain: "weather-app-c5b0f.firebaseapp.com",
        projectId: "weather-app-c5b0f",
        storageBucket: "weather-app-c5b0f.appspot.com",
        messagingSenderId: "733075646066",
        appId: "1:733075646066:web:559d69c655e69f67f344eb",
        measurementId: "G-96FD2HLL2G"
      };

    const app = initializeApp(firebaseConfig);
    const storage = getStorage();
    // const provider = new GoogleAuthProvider();
    // const auth = getAuth();
    // auth.languageCode = 'it';
    // provider.setCustomParameters({
    //     'login_hint': 'user@campus_name.bits-pilani.ac.in'
    //   });
    //   signInWithPopup(auth, provider)
    //   .then((result) => {
    //     // This gives you a Google Access Token. You can use it to access the Google API.
    //     const credential = provider.credentialFromResult(result);
    //     const token = credential.accessToken;
    //     // The signed-in user info.
    //     const user = result.user;
    //     // ...
    //   }).catch((error) => {
    //     // Handle Errors here.
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     // The email of the user's account used.
    //     const email = error.email;
    //     // The AuthCredential type that was used.
    //     // const credential = provider.credentialFromError(error);
    //     // ...
    //   });

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
    const [cityname, setCityName] = useState('Paris');
    const [url, setURL] = useState(`https://api.openweathermap.org/data/2.5/forecast?q=${cityname}&appid=${APIkey}`);
    const [Temp,setTemp] = useState('');
    const [description,setDescription] = useState('');
    const [icon,setIcon] = useState('');
    const [City, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [precipitation, setPrecipitation] = useState('');
    const [humidity, setHumidity] = useState('');
    const [windspeed, setWindspeed] = useState('');

    function round(num){
        return num.toPrecision(3);
    }

    function getMyLocation(){
        navigator.geolocation.getCurrentPosition(showPosition);
        document.getElementById('city').value = '';
    }

    function showPosition(position){
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setURL(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${APIkey}`);
    }

    function changeLocation(){
        setURL(`https://api.openweathermap.org/data/2.5/forecast?q=${document.getElementById('city').value}&appid=${APIkey}`);
    }

    function storeData(){
        console.log(document.getElementById('city').value);
        if(document.getElementById('city').value == ''){
            const storageRef = ref(storage, cityname);
            uploadString(storageRef, cityname + `\nUser's location:- latitude:{latitude}, longitude:{longitude},`)
            .then((see) => {
                console.log("uploaded name! "+ cityname);
            });
        }
        else{
            const storageRef = ref(storage, document.getElementById('city').value);
            uploadString(storageRef, document.getElementById('city').value + `\nUser's location:- latitude:{latitude}, longitude:{longitude},`)
            .then((see) => {
                console.log("uploaded name! "+document.getElementById('city').value);
            });
        }
        
    }

    useEffect(()=> {
    fetch(url)
    .then(res=>res.json())
    .then(data=>{
        console.log(data);
        setCityName(document.getElementById('city').value);
        setTemp([Math.round(parseFloat(data.list[0].main.temp)-273.15), Math.round(parseFloat(data.list[8].main.temp)-273.15), Math.round(parseFloat(data.list[16].main.temp)-273.15), Math.round(parseFloat(data.list[24].main.temp)-273.15)]);
        setDescription(data.list[0].weather[0].description);
        setCity(data.city.name);
        setCountry(data.city.country);
        setIcon([`http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`, `http://openweathermap.org/img/wn/${data.list[8].weather[0].icon}@2x.png`, `http://openweathermap.org/img/wn/${data.list[16].weather[0].icon}@2x.png`, `http://openweathermap.org/img/wn/${data.list[24].weather[0].icon}@2x.png`]);
        setPrecipitation(round(parseFloat(data.list[0].pop)*100));
        setHumidity(data.list[0].main.humidity);
        setWindspeed(round(parseFloat(data.list[0].wind.speed)*18/5));
        storeData();
    });
    },[url])

return (
    <div>
        <header>
          <datalist id="pastSearches">
            <option value />
            <option value />
            <option value />
            <option value />
            <option value />
          </datalist>
          <p>Enter city name  <input id="city" type="text" name="city" list="pastSearches" />  <button id="search" onClick={changeLocation}>Search</button></p>
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
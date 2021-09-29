import React, { useState, useEffect } from "react";

const FetchData = (url) => {
    const APIkey = 'fb86174eff0d7d1c441ae13cf5cfa154';
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    const alldays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayshort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
    const today = new Date();
    let year = today.getFullYear(), month = today.getMonth(), date = today.getDate(), day = today.getDay();
    let days = [];
    let a = 1;
    let b=[];
    for(let i=0; i<4; i++){
        if(day == 6)
        {
            day = 0;
        }
        days.push(day);
        day++;
    }
    const [Temp,setTemp] = useState('');
    const [description,setDescription] = useState('');
    const [icon,setIcon] = useState('');
    const [cityname, setCityName] = useState('Paris');
    const [City, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [precipitation, setPrecipitation] = useState('');
    const [humidity, setHumidity] = useState('');
    const [windspeed, setWindspeed] = useState('');

    function round(num){
        return num.toPrecision(3);
    }

    useEffect(()=> {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityname}&appid=${APIkey}`)
    .then(res=>res.json())
    .then(data=>{
        console.log(data);
        setTemp([Math.round(parseFloat(data.list[0].main.temp)-273.15), Math.round(parseFloat(data.list[8].main.temp)-273.15), Math.round(parseFloat(data.list[16].main.temp)-273.15), Math.round(parseFloat(data.list[24].main.temp)-273.15)]);
        setDescription(data.list[0].weather[0].description);
        setCity(data.city.name);
        setCountry(data.city.country);
        setIcon([`http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`, `http://openweathermap.org/img/wn/${data.list[8].weather[0].icon}@2x.png`, `http://openweathermap.org/img/wn/${data.list[16].weather[0].icon}@2x.png`, `http://openweathermap.org/img/wn/${data.list[24].weather[0].icon}@2x.png`]);
        setPrecipitation(round(parseFloat(data.list[0].pop)*100));
        setHumidity(data.list[0].main.humidity);
        setWindspeed(round(parseFloat(data.list[0].wind.speed)*18/5));
    
    })
    },[cityname])

return (
    <div className="main">
          <div className="box1">
            <h1 id="day" className="topspace">{alldays[days[0]]}</h1>
            <p id="date">{date + " " + months[month] + " " + year}</p>
            <p /><p id="location"><React.Fragment><i className="fas fa-map-marker-alt" /> {`${<i className="fas fa-map-marker-alt"></i>} ` + City + ", " + country}</p><p />
            <div className="b1bottom">
              <p id="icon"><img src={`${icon[0]}`} style={{height:"140px", width:"140px"}} /></p>
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
              <p id="col1">present day</p>
              <p id="col2">present day+1</p>
              <p id="col3">present day+2</p>
              <p id="col4">present day+3</p>
            </div>
            <div className="loc">
              <button id="changeloc">Change location</button>
            </div>
          </div>
        </div>
)
}
 
export default FetchData;
import { useEffect, useState } from "react";
import FetchData from "./FetchData";

const Body = () => {
    const APIkey = '73f6549dc375e3ae906ab5ef5cc80452';
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

    const [cityname, setCityName] = useState('Paris');
    const [url, setURL] = useState(`http://api.openweathermap.org/data/2.5/forecast?q=${cityname}&appid=${APIkey}`);
    let data = FetchData();
    console.log(data);

    function round(num){
        return num.toPrecision(3);
    }

    function changeLocation(){
      setCityName('Delhi');
      setURL(`api.openweathermap.org/data/2.5/forecast?q=${cityname}&appid=${APIkey}`);
    }
    
    let celcius = [Math.round(parseFloat(data.list[0].main.temp)-273.15), Math.round(parseFloat(data.list[8].main.temp)-273.15), Math.round(parseFloat(data.list[16].main.temp)-273.15), Math.round(parseFloat(data.list[24].main.temp)-273.15)];
    let iconurl = [`http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`, `http://openweathermap.org/img/wn/${data.list[8].weather[0].icon}@2x.png`, `http://openweathermap.org/img/wn/${data.list[16].weather[0].icon}@2x.png`, `http://openweathermap.org/img/wn/${data.list[24].weather[0].icon}@2x.png`];
    let windspeed = round(parseFloat(data.list[0].wind.speed)*18/5);

    return ( 
        <div className="main">
          <div className="box1">
            <h1 id="day" className="topspace">{alldays[days[0]]}</h1>
            <p id="date">{date + " " + months[month] + " " + year}</p>
            <p /><p id="location"><i className="fas fa-map-marker-alt" /> {`<i class="fas fa-map-marker-alt"></i> ` + data.city.name + ", " + data.city.country}</p><p />
            <div className="b1bottom">
              <p id="icon">{`<img src="${iconurl[0]}" style="height:140px; width:140px">`}</p>
              <h1 id="temp">{celcius[0] + '&deg;C'}</h1>
              <h2 id="description">{data.list[0].weather[0].description}</h2>
            </div>
          </div>
          <div className="box2">
            <div className="prop">
              <span><p className="topspace"><b>PRECIPITATION</b></p><p id="precipitation" className="topspace">{round(parseFloat(data.list[0].pop)*100) + " %"}</p></span>
              <span><p><b>HUMIDITY</b></p><p id="humidity">{data.list[0].main.humidity + " %"}</p></span>
              <span><p><b>WIND</b></p><p id="windspeed">{windspeed + " km/h"}</p></span>
            </div>
            <div className="columns">
              <p id="col1">present day</p>
              <p id="col2">present day+1</p>
              <p id="col3">present day+2</p>
              <p id="col4">present day+3</p>
            </div>
            <div className="loc">
              <button id="changeloc" onClick={changeLocation}>Change location</button>
            </div>
          </div>
        </div>
    );
}
 
export default Body;
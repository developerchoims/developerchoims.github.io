import { useState, useEffect } from "react";

const Weather = () => {
    const [coords, saveCoords] = useState();
    const [temp, setTemp] = useState();
    const [weather, setWeather] = useState();
    const [weatherSecond, setWeatherSecond] = useState();
    const [weatherIcon, setWeatherIcon]= useState();
    const [weatherIconSecond, setWeatherIconSecond]= useState();
    const [weatherDisplay, setWeatherDisplay] = useState('');
    const [weatherStyle, setWeatherStyle] = useState("");
    const [weatherFont, setWeatherFont] = useState('');

    let api = process.env.REACT_APP_WEATHER_KEY; 

     function handleGeoSucc(position) {
      console.log(position);
      const latitude = position.coords.latitude;  // 경도  
      const longitude = position.coords.longitude;  // 위도
      const coordsObj = {
        latitude,
        longitude
      }
      saveCoords(coordsObj);
      getWeather(latitude, longitude);
    }
  
    function handleGeoErr(err) {
      console.log("geo err! " + err);
    }
  
    function requestCoords() {
      navigator.geolocation.getCurrentPosition(handleGeoSucc, handleGeoErr);
    }
  
    function getWeather(lat, lon) {
        
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api}&units=metric`)
            .then(res => res.json())
            .then(data => {
            const temp = data.main.temp;
            setTemp(temp);

            let weatherFirst = {};
            let weatherSecond = {};
            if(data.weather.length==1){
                weatherFirst = data.weather[data.weather.length - 1]
                switch(weatherFirst.id){
                    // Group 2xx: Thunderstorm
                    case 200: setWeather('약한 천둥 폭풍우'); break;
                    case 201: setWeather('천둥 폭풍우'); break;
                    case 202: setWeather('강한 천둥 폭풍우'); break;
                    case 210: setWeather('가벼운 천둥 폭풍우'); break;
                    case 211: setWeather('천둥 폭풍우'); break;
                    case 212: setWeather('강한 천둥 폭풍우'); break;
                    case 221: setWeather('불규칙한 천둥 폭풍우'); break;
                    case 230: setWeather('약한 이슬비와 천둥 폭풍우'); break;
                    case 231: setWeather('이슬비와 천둥 폭풍우'); break;
                    case 232: setWeather('강한 이슬비와 천둥 폭풍우'); break;

                    // Group 3xx: Drizzle
                    case 300: setWeather('약한 이슬비'); break;
                    case 301: setWeather('이슬비'); break;
                    case 302: setWeather('강한 이슬비'); break;
                    case 310: setWeather('가벼운 이슬비 비'); break;
                    case 311: setWeather('이슬비 비'); break;
                    case 312: setWeather('강한 이슬비 비'); break;
                    case 313: setWeather('소나기와 이슬비'); break;
                    case 314: setWeather('강한 소나기와 이슬비'); break;
                    case 321: setWeather('소나기 이슬비'); break;

                    // Group 5xx: Rain
                    case 500: setWeather('약한 비'); break;
                    case 501: setWeather('보통 비'); break;
                    case 502: setWeather('강한 비'); break;
                    case 503: setWeather('매우 강한 비'); break;
                    case 504: setWeather('극심한 비'); break;
                    case 511: setWeather('얼어붙는 비'); break;
                    case 520: setWeather('가벼운 소나기 비'); break;
                    case 521: setWeather('소나기 비'); break;
                    case 522: setWeather('강한 소나기 비'); break;
                    case 531: setWeather('불규칙한 소나기 비'); break;

                    // Group 6xx: Snow
                    case 600: setWeather('약한 눈'); break;
                    case 601: setWeather('눈'); break;
                    case 602: setWeather('강한 눈'); break;
                    case 611: setWeather('진눈깨비'); break;
                    case 612: setWeather('가벼운 소나기 진눈깨비'); break;
                    case 613: setWeather('소나기 진눈깨비'); break;
                    case 615: setWeather('가벼운 비와 눈'); break;
                    case 616: setWeather('비와 눈'); break;
                    case 620: setWeather('가벼운 소나기 눈'); break;
                    case 621: setWeather('소나기 눈'); break;
                    case 622: setWeather('강한 소나기 눈'); break;

                    // Group 7xx: Atmosphere
                    case 701: setWeather('안개'); break;
                    case 711: setWeather('연기'); break;
                    case 721: setWeather('연무'); break;
                    case 731: setWeather('모래/먼지 소용돌이'); break;
                    case 741: setWeather('안개'); break;
                    case 751: setWeather('모래'); break;
                    case 761: setWeather('먼지'); break;
                    case 762: setWeather('화산재'); break;
                    case 771: setWeather('돌풍'); break;
                    case 781: setWeather('토네이도'); break;

                    // Group 800: Clear
                    case 800: setWeather('맑음'); break;

                    // Group 80x: Clouds
                    case 801: setWeather('구름 조금'); break;
                    case 802: setWeather('구름 조금'); break;
                    case 803: setWeather('조금 많은 구름'); break;
                    case 804: setWeather('구름 많음'); break;
                    
                    default: setWeather('날씨 정보 없음'); break;
                }
                
                setWeatherIcon(weatherFirst.icon);
                setWeatherSecond(weatherFirst.main);
                setWeatherIconSecond(weatherFirst.icon);
                setWeatherDisplay('none');
                setWeatherStyle('8vw');
                setWeatherFont('50%');
            } else {
                weatherFirst = data.weather[data.weather.length - 2];
                weatherSecond = data.weather[data.weather.length - 1];
                switch(weatherFirst.id){
                    // Group 2xx: Thunderstorm
                    case 200: setWeather('약한 천둥 폭풍우'); break;
                    case 201: setWeather('천둥 폭풍우'); break;
                    case 202: setWeather('강한 천둥 폭풍우'); break;
                    case 210: setWeather('가벼운 천둥 폭풍우'); break;
                    case 211: setWeather('천둥 폭풍우'); break;
                    case 212: setWeather('강한 천둥 폭풍우'); break;
                    case 221: setWeather('불규칙한 천둥 폭풍우'); break;
                    case 230: setWeather('약한 이슬비와 천둥 폭풍우'); break;
                    case 231: setWeather('이슬비와 천둥 폭풍우'); break;
                    case 232: setWeather('강한 이슬비와 천둥 폭풍우'); break;

                    // Group 3xx: Drizzle
                    case 300: setWeather('약한 이슬비'); break;
                    case 301: setWeather('이슬비'); break;
                    case 302: setWeather('강한 이슬비'); break;
                    case 310: setWeather('가벼운 이슬비 비'); break;
                    case 311: setWeather('이슬비 비'); break;
                    case 312: setWeather('강한 이슬비 비'); break;
                    case 313: setWeather('소나기와 이슬비'); break;
                    case 314: setWeather('강한 소나기와 이슬비'); break;
                    case 321: setWeather('소나기 이슬비'); break;

                    // Group 5xx: Rain
                    case 500: setWeather('약한 비'); break;
                    case 501: setWeather('보통 비'); break;
                    case 502: setWeather('강한 비'); break;
                    case 503: setWeather('매우 강한 비'); break;
                    case 504: setWeather('극심한 비'); break;
                    case 511: setWeather('얼어붙는 비'); break;
                    case 520: setWeather('가벼운 소나기 비'); break;
                    case 521: setWeather('소나기 비'); break;
                    case 522: setWeather('강한 소나기 비'); break;
                    case 531: setWeather('불규칙한 소나기 비'); break;

                    // Group 6xx: Snow
                    case 600: setWeather('약한 눈'); break;
                    case 601: setWeather('눈'); break;
                    case 602: setWeather('강한 눈'); break;
                    case 611: setWeather('진눈깨비'); break;
                    case 612: setWeather('가벼운 소나기 진눈깨비'); break;
                    case 613: setWeather('소나기 진눈깨비'); break;
                    case 615: setWeather('가벼운 비와 눈'); break;
                    case 616: setWeather('비와 눈'); break;
                    case 620: setWeather('가벼운 소나기 눈'); break;
                    case 621: setWeather('소나기 눈'); break;
                    case 622: setWeather('강한 소나기 눈'); break;

                    // Group 7xx: Atmosphere
                    case 701: setWeather('안개'); break;
                    case 711: setWeather('연기'); break;
                    case 721: setWeather('연무'); break;
                    case 731: setWeather('모래/먼지 소용돌이'); break;
                    case 741: setWeather('안개'); break;
                    case 751: setWeather('모래'); break;
                    case 761: setWeather('먼지'); break;
                    case 762: setWeather('화산재'); break;
                    case 771: setWeather('돌풍'); break;
                    case 781: setWeather('토네이도'); break;

                    // Group 800: Clear
                    case 800: setWeather('맑음'); break;

                    // Group 80x: Clouds
                    case 801: setWeather('구름 조금: 11-25%'); break;
                    case 802: setWeather('구름 조각조각: 25-50%'); break;
                    case 803: setWeather('조금 흩어진 구름: 51-84%'); break;
                    case 804: setWeather('구름 많음: 85-100%'); break;
                    
                    default: setWeather('날씨 정보 없음'); break;
                }
                switch(weatherSecond.id){
                    // Group 2xx: Thunderstorm
                    case 200: setWeatherSecond('약한 천둥 폭풍우'); break;
                    case 201: setWeatherSecond('천둥 폭풍우'); break;
                    case 202: setWeatherSecond('강한 천둥 폭풍우'); break;
                    case 210: setWeatherSecond('가벼운 천둥 폭풍우'); break;
                    case 211: setWeatherSecond('천둥 폭풍우'); break;
                    case 212: setWeatherSecond('강한 천둥 폭풍우'); break;
                    case 221: setWeatherSecond('불규칙한 천둥 폭풍우'); break;
                    case 230: setWeatherSecond('약한 이슬비와 천둥 폭풍우'); break;
                    case 231: setWeatherSecond('이슬비와 천둥 폭풍우'); break;
                    case 232: setWeatherSecond('강한 이슬비와 천둥 폭풍우'); break;

                    // Group 3xx: Drizzle
                    case 300: setWeatherSecond('약한 이슬비'); break;
                    case 301: setWeatherSecond('이슬비'); break;
                    case 302: setWeatherSecond('강한 이슬비'); break;
                    case 310: setWeatherSecond('가벼운 이슬비 비'); break;
                    case 311: setWeatherSecond('이슬비 비'); break;
                    case 312: setWeatherSecond('강한 이슬비 비'); break;
                    case 313: setWeatherSecond('소나기와 이슬비'); break;
                    case 314: setWeatherSecond('강한 소나기와 이슬비'); break;
                    case 321: setWeatherSecond('소나기 이슬비'); break;

                    // Group 5xx: Rain
                    case 500: setWeatherSecond('약한 비'); break;
                    case 501: setWeatherSecond('보통 비'); break;
                    case 502: setWeatherSecond('강한 비'); break;
                    case 503: setWeatherSecond('매우 강한 비'); break;
                    case 504: setWeatherSecond('극심한 비'); break;
                    case 511: setWeatherSecond('얼어붙는 비'); break;
                    case 520: setWeatherSecond('가벼운 소나기 비'); break;
                    case 521: setWeatherSecond('소나기 비'); break;
                    case 522: setWeatherSecond('강한 소나기 비'); break;
                    case 531: setWeatherSecond('불규칙한 소나기 비'); break;

                    // Group 6xx: Snow
                    case 600: setWeatherSecond('약한 눈'); break;
                    case 601: setWeatherSecond('눈'); break;
                    case 602: setWeatherSecond('강한 눈'); break;
                    case 611: setWeatherSecond('진눈깨비'); break;
                    case 612: setWeatherSecond('가벼운 소나기 진눈깨비'); break;
                    case 613: setWeatherSecond('소나기 진눈깨비'); break;
                    case 615: setWeatherSecond('가벼운 비와 눈'); break;
                    case 616: setWeatherSecond('비와 눈'); break;
                    case 620: setWeatherSecond('가벼운 소나기 눈'); break;
                    case 621: setWeatherSecond('소나기 눈'); break;
                    case 622: setWeatherSecond('강한 소나기 눈'); break;

                    // Group 7xx: Atmosphere
                    case 701: setWeatherSecond('안개'); break;
                    case 711: setWeatherSecond('연기'); break;
                    case 721: setWeatherSecond('연무'); break;
                    case 731: setWeatherSecond('모래/먼지 소용돌이'); break;
                    case 741: setWeatherSecond('안개'); break;
                    case 751: setWeatherSecond('모래'); break;
                    case 761: setWeatherSecond('먼지'); break;
                    case 762: setWeatherSecond('화산재'); break;
                    case 771: setWeatherSecond('돌풍'); break;
                    case 781: setWeatherSecond('토네이도'); break;

                    // Group 800: Clear
                    case 800: setWeatherSecond('맑음'); break;

                    // Group 80x: Clouds
                    case 801: setWeatherSecond('구름 조금: 11-25%'); break;
                    case 802: setWeatherSecond('구름 조각조각: 25-50%'); break;
                    case 803: setWeatherSecond('조금 흩어진 구름: 51-84%'); break;
                    case 804: setWeatherSecond('구름 많음: 85-100%'); break;
                    
                    default: setWeatherSecond('날씨 정보 없음'); break;
                }
                setWeatherIcon(weatherFirst.icon);
                setWeatherIconSecond(weatherSecond.icon);
                setWeatherDisplay('block');
                setWeatherStyle('5.5vw');
                setWeatherFont('30%');
            }
            
            
            })
    }
  
    useEffect(() => {
      requestCoords();
    }, []);

    
    return(
        <>
        <div className="weather-info" style={{fontSize:weatherFont, margin:'auto'}}>
            <img style={{width:weatherStyle, display:'block'}} src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`}/>
            {weather}
        </div>
        <div className="weather-info" style={{display:weatherDisplay, fontSize:weatherFont, margin:'auto'}}>
            <img style={{width:weatherStyle, display:'block'}} src={`https://openweathermap.org/img/wn/${weatherIconSecond}@2x.png`}/>
            {weatherSecond}
        </div>
        </>
    );
}

export default Weather;
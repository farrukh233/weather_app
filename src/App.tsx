import { useState } from "react";
import "./App.css";

const api = {
  key: "79eded073c0de0123b3f79460fd869b7",
  base: "https://api.openweathermap.org/data/2.5/",
};

interface IWeather {
  main?: {
    temp: number;
  };
  name?: string;
  sys?: {
    country: string;
  };
  weather?: [
    {
      main: string;
    }
  ];
}

function App() {
  const [query, setQuery] = useState<string>("");
  const [weather, setWeather] = useState<IWeather>({});
  console.log(weather.name);

  const search = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setQuery("");
          setWeather(result);
        });
    }
  };
  const dateBuilder = (d: Date) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDay();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };
  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 20
            ? "App warm"
            : "App"
          : "App"
      }>
      <main>
        <div className='wrapper'>
          <div className='search-box'>
            <input
              type='text'
              className='search-bar'
              placeholder='Поиск...'
              onChange={e => setQuery(e.target.value)}
              value={query}
              onKeyPress={search}
            />
          </div>
        </div>
        {typeof weather.main != "undefined" ? (
          <div>
            <div className='location-box'>
              <div className='location'>
                {weather.name}, {weather.sys.country}
              </div>
              <div className='date'>{dateBuilder(new Date())}</div>
            </div>
            <div className='weather-box'>
              <div className='temp'>{Math.round(weather.main.temp)}°C</div>
              <div className='weather'>{weather.weather[0].main}</div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;

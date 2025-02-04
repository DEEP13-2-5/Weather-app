import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './SearchBox.css';
import InfoBox from './InfoBox';

export default function SearchBox() {
    const API_URL = "https://api.openweathermap.org/data/2.5/weather";
    const API_KEY = "485862806fa6e9a792d6df46c49d4b1d";

    const [city, setCity] = useState("");
    const [weatherData, setWeatherData] = useState(null);
    const [searchedCity, setSearchedCity] = useState("false");// To store the searched city
    const [err,seterr] = useState("");

    const getWeatherInfo = async (city) => {
        try {
            const response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
            if (!response.ok) throw new Error("City not found");
            const jsonResponse = await response.json();
            const result = {
                temp: jsonResponse.main.temp,
                tempMin: jsonResponse.main.temp_min,
                tempMax: jsonResponse.main.temp_max,
                humidity: jsonResponse.main.humidity,
                weather: jsonResponse.weather[0].description,
            };
            setWeatherData(result);
            setSearchedCity(city);
            console.log(result);
        } catch (error) {
            seterr(true);
        }
    };

    const handleChange = (evt) => {
        setCity(evt.target.value);
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (city.trim()) {
            getWeatherInfo(city);
            setCity(""); // Clear input after search
        }
    };

    return (
        <div className='SearchBox'>
            <h3>Search for the weather</h3>
            <form onSubmit={handleSubmit}>
                <TextField
                    id="city"
                    label="City name"
                    variant="outlined"
                    value={city}
                    required
                    onChange={handleChange}
                />
                <br />
                <Button variant="contained" size='large' type="submit">Search</Button>
            </form>
            {err && <p style={{color:"red"}}>No such place exist</p>}
            <InfoBox weatherData={weatherData} city={searchedCity} />
        </div>
    );
}

import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LightModeIcon from '@mui/icons-material/LightMode';

export default function InfoBox({ weatherData, city }) {
    const HOT_URL = "https://images.unsplash.com/photo-1504370805625-d32c54b16100?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    const COLD_URL = "https://images.unsplash.com/photo-1668531387310-9c3c2f272d52?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    const RAINY_URL = "https://images.unsplash.com/photo-1526281216101-e55f00f0db7a?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

    const getImageUrl = (humidity, temp) => {
        if (humidity > 60) return RAINY_URL;
        if (temp > 25) return HOT_URL;
        return COLD_URL;
    };

    const getIcon = (humidity, temp) => {
        if (humidity > 60) return <i className="fa-solid fa-umbrella"></i>; // Rainy icon
        if (temp > 25) return <LightModeIcon />; // Hot icon
        return <i className="fa-regular fa-snowflake"></i>; // Cold icon
    };

    return (
        <div>
            <h3>Weather info</h3>
            {weatherData ? (
                <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                        sx={{ height: 140 }}
                        image={getImageUrl(weatherData.humidity, weatherData.temp)}
                        title={`Weather in ${city}`}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Weather in {city}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            Temperature: {weatherData.temp}°C {getIcon(weatherData.humidity, weatherData.temp)}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            Min Temperature: {weatherData.tempMin}°C
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            Max Temperature: {weatherData.tempMax}°C
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            Humidity: {weatherData.humidity}%
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            Condition: {weatherData.weather}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Share</Button>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
            ) : (
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    No weather data available. Please search for a city.
                </Typography>
            )}
        </div>
    );
}

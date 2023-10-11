<template>
    <header>
        <router-link to="/" class="no-link-style">
            <h3>
                Weather
                <img src="/imgs/weather-head.png" alt="Weather Icon" style="width: 60px; height: 60px; margin-left: 5px;" />
            </h3>
        </router-link>
        <span>By Piriya Inkhan</span>
    </header>

    <div class="search-container mt-4 d-flex justify-content-center">
        <div class="input-group" style="max-width: 300px;">
            <input v-model="latitude" placeholder="Latitude" class="form-control rounded">
            <input v-model="longitude" placeholder="Longitude" class="form-control rounded">
            <div class="input-group-append">
                <button @click="searchWeather" class="btn btn-primary">ค้นหา</button>
            </div>
        </div>
    </div>

    <div class="container">
        <div class="weather">
            <div class="card" style="width: 70rem;">
                <div class="card-body">
                    <div class="weather-results">
                        <h4>สภาพอากาศ:</h4>
                        <p>{{ weatherDescription }}</p>
                        <h4>อุณหภูมิ:</h4>
                        <p>{{ temperature }}°C</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios';

export default {
    data() {
        return {
            latitude: '',
            longitude: '',
            weatherDescription: '',
            temperature: '',
        };
    },
    methods: {
        searchWeather() {
            const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${this.latitude}&lon=${this.longitude}&appid=264f08ebe173d6c08b7e05d256f9b714`;

            axios
                .get(url)
                .then((response) => {
                    const weatherData = response.data.list[0];
                    this.weatherDescription = weatherData.weather[0].description;
                    this.temperature = (weatherData.main.temp - 273.15).toFixed(2);
                })
                .catch((error) => {
                    console.error(error);
                });
        },
    },
};
</script>
  
<style scoped>
header {
    margin: 0;
    padding: 40px;
    background-color: #1B2631;
    width: 100%;
    height: 100%;
    color: white;
}
.container{
    margin-top: 180px;
}
.no-link-style {
    text-decoration: none;
    color: inherit;
}
.search-container {
    display: flex;
    justify-content: flex-end;
    margin-right: 20px;
    margin-top: 20px;
}
.search-container input {
    margin-right: 10px;
}
.weather-results {
    margin: 20px;
}</style>
  
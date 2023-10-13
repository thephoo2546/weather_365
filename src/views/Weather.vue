<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { RouterLink } from 'vue-router';

const items = ref([]);
const url = "https://api.openweathermap.org/data/2.5/forecast?lat=37.731376&lon=-122.397935&appid=264f08ebe173d6c08b7e05d256f9b714";

function WeatherData() {
  axios
    .get(url)
    .then((response) => {
      items.value = response.data.list;
    })
    .catch((err) => {
      console.error(err);
    });
}

onMounted(() => {
  WeatherData();
});

function Time(dateTime) {
  const date = new Date(dateTime);
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };
  return date.toLocaleString('en-US', options);
}

function KtoC(Kalvin) {
  return (Kalvin - 273.15).toFixed(2);
}

const weatherIconMap = {
  "few clouds": "wi wi-cloud",
  "clear sky": "wi wi-day-sunny",
  "scattered clouds": "wi wi-day-cloudy",
  "broken clouds": "wi wi-day-cloudy",
  "light rain": "wi wi-rain",
  "overcast clouds": "wi wi-cloudy",
};

const weatherImages = {
  "few clouds": "/imgs/few.jpg",
  "clear sky": "/imgs/clear.jpg",
  "scattered clouds": "/imgs/scatand.jpg",
  "broken clouds": "/imgs/scatand.jpg",
  "light rain": "/imgs/rain.jpg",
  "overcast clouds": "/imgs/over.jpg",

};

</script>

<template>
  <header>
    <router-link to="/" class="no-link-style">
      <h3>
        Weather
        <img src="/imgs/weather-head.png" alt="Weather Icon" style="width: 60px; height: 60px; margin-left: 5px;" />
      </h3>
    </router-link>
    <span>By Piriya Inkhan</span>
    <router-link to="/search" class="no-link-style">
      <h3 style="text-align: right;">
        เช็คสภาพอากาศ
        <img src="/imgs/weather-icon.png" alt="Weather Icon" style="width: 24px; height: 24px; margin-left: 5px;" />
      </h3>
    </router-link>
  </header>
  <div class="headweather" style="margin-top: 20px;">พยากรณ์อากาศ 5 วัน ของ Sanfrancisco</div>
  <div class="container">
    <div class="weather" v-for="(item, index) in items" :key="index">
      <div class="card" style="width: 15rem;">
        <img :src="weatherImages[item.weather[0].description]" class="card-img-top" alt="Weather">
        <div class="card-body">
          <p class="card-text">{{ Time(item.dt_txt) }}</p>
          <div class="weather-info">
            <i :class="weatherIconMap[item.weather[0].description]"></i>
            <span>{{ item.weather[0].description }}</span>
          </div>
          <p class="card-text">{{ KtoC(item.main.temp) }}°C</p>
        </div>
      </div>
    </div>
  </div>
</template>
  
  
<style scoped>
header {
  margin: 0;
  padding: 40px;
  background-color: #1B2631;
  width: 100%;
  height: 100%;
  color: white;
}
.no-link-style {
  text-decoration: none;
  color: inherit;
}
.card-img-top {
  max-width: 100%;
  height: auto;
}
.headweather {
  text-align: center;
  font-size: 40px;
  padding: 10px;
  border-radius: 10px;
  color: white;
  background-color: #1B2631;
  width: 50%;
  margin: 0 auto;
}
.container {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  padding: 10px;
  margin-top: 20px;
}
.card {
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  margin: 5px;
}
.card:hover {
  transform: scale(1.03);
}
.card-body {
  padding: 20px;
}
.card-text {
  font-weight: bold;
  margin-top: 10px;
}

@media (max-width: 600px) {
  .container {
    grid-template-columns: repeat(2, 1fr);
    /* Display two cards per row on small screens */
  }

  /* Make the header responsive by reducing padding */
  header {
    padding: 20px;
  }
}
</style>
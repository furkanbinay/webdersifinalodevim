import React, { Component } from 'react';
import './App.css';
import Titles from "./components/Titles";
import Form from "./components/Form";
import Weather from "./components/Weather";

const API_KEY = "BNJGMJ29VY29Y3C45A9RECQEQ"; // Visual Crossing API Key

class App extends Component {
  state = {
    temperature: undefined,
    city: undefined,
    humidity: undefined,
    conditions: undefined,
    error: undefined
  }

  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;

    if (city) {
      try {
        const api_call = await fetch(
            `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${API_KEY}&contentType=json&lang=tr`
        );
        const data = await api_call.json();

        if (data && data.currentConditions) {
          this.setState({
            temperature: data.currentConditions.temp,
            city: data.resolvedAddress,
            humidity: data.currentConditions.humidity,
            conditions: data.currentConditions.conditions, // Düzeltme: conditions değerini olduğu gibi alıyoruz
            error: ""
          });

          // Arkaplanı hava durumuna göre güncelle
          const conditions = data.currentConditions.conditions;
          const wrapper = document.getElementById("wrapper");
          if (conditions.includes("Güneşli") || conditions.includes("Açık")) {
            wrapper.style.background = "url('./images/clear.jpeg') no-repeat center center/cover"; // Açık hava
          }
          else if (conditions.includes("Yağmur, Parçalı Bulutlu")) {
            wrapper.style.background = "url('./images/partly_rainy.jpeg') no-repeat center center/cover"; // Yağmurlu, parçalı bulutlu
          }
          else if (conditions.includes("Parçalı") || conditions.includes("Bulutlu")) {
            wrapper.style.background = "url('./images/partly_cloudy.jpeg') no-repeat center center/cover"; // Yağmurlu
          } else if (conditions.includes("Bulutlu") || conditions.includes("Kapalı")) {
            wrapper.style.background = "url('./images/couldy.jpeg') no-repeat center center/cover"; // Bulutlu
          }
          else if (conditions.includes("Yağmur") || conditions.includes("Bulutlu")) {
            wrapper.style.background = "url('./images/rainy.jpeg') no-repeat center center/cover"; // Bulutlu
          }
          else if (conditions.includes("Bulutlu")){
            wrapper.style.background = "url('./images/couldy.jpeg') no-repeat center center/cover";
          }
          else if (conditions.includes("Overcast")){
            wrapper.style.background = "url('./images/cloudy.jpeg') no-repeat center center/cover";
          }
         else if (conditions.includes("Parçalı Bulutlu")) {
            wrapper.style.background = "url('./images/partly_cloudy.jpeg') no-repeat center center/cover"; // Parçalı bulutlu
          } else {
            wrapper.style.background = "url('./images/default.jpg') no-repeat center center/cover"; // Varsayılan
          }
        } else {
          this.setState({
            temperature: undefined,
            city: undefined,
            humidity: undefined,
            conditions: undefined,
            error: "Hava durumu bilgisi alınamadı."
          });
        }
      } catch (error) {
        this.setState({
          temperature: undefined,
          city: undefined,
          humidity: undefined,
          conditions: undefined,
          error: "API bağlantısı sırasında bir hata oluştu."
        });
      }
    } else {
      this.setState({
        temperature: undefined,
        city: undefined,
        humidity: undefined,
        conditions: undefined,
        error: "Lütfen bir şehir adı giriniz."
      });
    }
  }

  render() {
    return (
        <div>
          <div id="wrapper" className="wrapper">
            <div className="main">
              <div className="container">
                <div className="row">
                  <div className="title-container">
                    <Titles />
                    <div className="col-xs-6 form-container">
                      <Form getWeather={this.getWeather} />
                      <Weather
                          temperature={this.state.temperature}
                          humidity={this.state.humidity}
                          city={this.state.city}
                          conditions={this.state.conditions}
                          error={this.state.error}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
};

export default App;

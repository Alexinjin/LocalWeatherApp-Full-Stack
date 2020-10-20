import axios from 'axios'

/**
* THe REST Services Weahter App provided
*/
class WeatherAppService {
  /**
  * Send GET Request to Backend with given parameter${Location}.
  */
  retrieveLocalWeather(location) {
    return axios.get(`http://localhost:8080/local-weather-data/${location}`)
  }
}

export default new WeatherAppService();
import React, { Component } from 'react'
import moment from 'moment'

import WeatherForm from '../WeatherForm/WeatherForm'
import SearchWeatherByCity from '../SearchWeatherByCity/SearchWeatherByCity'
import WeatherAppService from "../../APIs/WeatherDataAPI/WeatherAppService"
import HeaderComponent from '../HeaderComponent/HeaderComponent'
import SubHeaderComponent from '../HeaderComponent/SubHeaderComponent'
import ErrorMessage from '../ErrorMessage/ErrorMessage'

/**
 * @param  {String} cityName :Location Information
 * @param  {Object} currentDate :current date information
 * @param  {Integer} currentWeatherData :index of current selected day, default value is the index of the lastest day
 * @param  {List[Object]}  wealtherInfo :WeatherData fetched from API
 * @param  {List[Object]}  pastDayWeatherData :Past 7 Days Weather Data
 * @param  {Boolen}  retrieveDataFailed :incicate that the app failed to feched the weather data from API
 * @param  {String} errorMessage :Error Message
 * @param  {String} isMetric :indicate the current temp unit
 */
class WealtherApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: '',
      currentDate: moment(new Date()).format('YYYY-MM-DD'),
      currentWeatherData: 7,
      receivedData: false,
      wealtherInfo: [],
      pastDayWeatherData: [],
      retrieveDataFailed: false,
      errorMessage: "",
      isMetric: false
    };
    this.searchClickedHandler = this.searchClickedHandler.bind(this);
    this.clearClickedHandler = this.clearClickedHandler.bind(this);
    this.switchUnitHandler = this.switchUnitHandler.bind(this);
  }
  /**
   * When Search button is clicked, call fetch data function.
   */
  searchClickedHandler = (cityName) => {
    if (cityName !== this.state.cityName){
      this.accessWeatherDataHandler(cityName);
    }
  }
  /**
   * Send GET Request to BackEnd to fetch local weather data
   */
  accessWeatherDataHandler = (cityName) => {
    WeatherAppService.retrieveLocalWeather(cityName)
      .then(response => {
        let currentWeather = [];
        let pastDateWeather = [];
        response.data.list.map( day => {
          let time = moment(day.dt_txt).format('HH') >= "12"
          ? moment(day.dt_txt).format('HH')+"PM"
          : moment(day.dt_txt).format('HH')+"AM";
          currentWeather.push({
            hour: time,
            city: "temperature",
            temperature: Math.round(day.main.temp),
            unit: this.state.isMetric
          })
        });
        currentWeather.sort((a, b) => (a.hour > b.hour) ? 1: -1)
        for (let i = 0; i <= 6; i++) {
          let singleDay = [];
          response.data.list.map( day => {
            let time = moment(day.dt_txt).format('HH') >= "12"
            ? moment(day.dt_txt).format('HH')+"PM"
            : moment(day.dt_txt).format('HH')+"AM";
            singleDay.push({
              hour: time,
              city: "temperature",
              temperature: Math.round(Math.random() * (day.main.temp_min)),
              unit: this.state.isMetric
            })
            singleDay.sort((a, b) => (a.hour > b.hour) ? 1: -1)
          });
          pastDateWeather.push(singleDay);
        }
        pastDateWeather.push(currentWeather);
        this.setState({
          wealtherInfo: [...response.data.list],
          receivedData: !this.state.receivedData,
          cityName: cityName,
          goBack: !this.state.goBack,
          retrieveDataFailed: false,
          iconType: response.data.list[0].weather[0].main,
          pastDayWeatherData: pastDateWeather
        });
      }).catch(error => {
        this.setState({
          errorMessage: "Couldn't find the weather data for this city",
          retrieveDataFailed: true
        })
      });
  }
  /**
   * Clear current data and start a new searching event
   */
  clearClickedHandler = () => {
    this.setState({
      receivedData: !this.state.receivedData,
      isMetric: false,
      cityName: '',
      currentWeatherData: 7
    })
  }
 /**
  * Update states when the temp unit is changed.
  */
  switchUnitHandler = (value) => {
    this.setState({
      isMetric: value
    })
  }
  render() {
    return (
      <div className="container-fluid h-100 w-100 row align-items-center">
        <div className="container-fluid h-15 w-100">
        {this.state.receivedData 
        && <HeaderComponent />}
        {!this.state.receivedData 
        && <SubHeaderComponent />}
        {this.state.receivedData 
        && <button className="btn btn-outline-primary btn-lg ml-4 d-flex float-left" 
        style={{borderRadius: "25px"}}
        onClick={this.clearClickedHandler}>Return</button>}
        {!this.state.receivedData 
        && <SearchWeatherByCity  searchClickedHandler={this.searchClickedHandler}/>}
        </div>
        {this.state.receivedData
        && <WeatherForm 
          cityName={this.state.cityName}
          currentDate={this.state.currentDate}
          currentSelectedDay={this.state.currentWeatherData}
          pastDayWeatherData={this.state.pastDayWeatherData}
          wealtherInfo={this.state.wealtherInfo}
          iconType={this.state.iconType}
          isMetric={this.state.isMetric}
          switchUnit={this.switchUnitHandler}
        />}
        {this.state.retrieveDataFailed 
        && <ErrorMessage message={this.state.errorMessage} />}
      </div>
    );
  }
}

export default WealtherApp;
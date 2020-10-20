import React, { Component } from 'react'
import { Chart, Line, Axis } from 'bizcharts';
import ForCastComponent from '../WeatherForeCast/ForeCastComponent/ForCastComponent'
import WeatherIcon from "../WeatherIcon/WeatherIcon";
import * as styles from './WeatherForm.module.css'
import { max } from 'moment';

/**
 * Weahter From Component that contains: 
 * 1. Location & Date Infomatioin
 * 2. The hourly temp chart of a selected date
 * 3. The group button of the past 7 days
 * 4. Weather Icon
 * @param  {this.props.cityName} String :the location given by user
 * @param  {this.props.wealtherInfo} Object wealtherInfo that fetched from API
 * @param  {this.props.currentDate} Date :currentDate
 * @param  {this.props.currentSelectedDay} Int selected index of day to display
 */
class WeatherForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: this.props.cityName,
      wealtherInfo: this.props.wealtherInfo,
      currentDate: this.props.currentDate,
      currentSelectedDay: this.props.currentSelectedDay,
      currentHighestTemp: Math.round(this.props.wealtherInfo[3].main.temp),
      currentWeatherData: this.props.pastDayWeatherData[this.props.currentSelectedDay],
      iconType: this.props.iconType,
      pastDays: [-7, -6, -5, -4, -3, -2, -1, 0],
      pastDayWeatherData:this.props.pastDayWeatherData,
      isMetric: this.props.isMetric,
      unitSymbol: '\u00b0C'
    };
    this.tempUnitHandler = this.tempUnitHandler.bind(this);
    this.tempChartHandler = this.tempChartHandler.bind(this);
    this.switchButtonToMetric = this.switchButtonToMetric.bind(this);
    this.switchButtonToFahrenheit = this.switchButtonToFahrenheit.bind(this);
    this.selectedDay = this.selectedDay.bind(this);
  }
  /**
   * recalcuate the value of temp when the temp unit is changed.
   */
  tempUnitHandler = (isMetric) => {
    if (isMetric === this.state.currentWeatherData[0].unit) {
      return;
    }
    if (!isMetric) {
      this.setState({
        currentHighestTemp:Math.round((this.state.currentHighestTemp - 32) * 5/9)
    })} else {
      this.setState({
        currentHighestTemp:Math.round(this.state.currentHighestTemp * 9/5 + 32)})
    };
  }
   /**
   * recalcuate the value of temp chart when the temp unit is changed.
   */
  tempChartHandler = (isMetric) => {
    let newTempChart = [];
    this.state.currentWeatherData.map(data => {
      if (isMetric != data.unit) {
        let temp = data.temperature
        if (isMetric) {
          temp = Math.round((data.temperature * 9/5) + 32);
        } else {
          temp = Math.round((data.temperature - 32) * 5/9);  
        }
        newTempChart.push({
          hour: data.hour,
          city: data.city,
          temperature: temp,
          unit: isMetric
        })
      }
    })
    if (newTempChart.length !== 0) {
      this.setState({currentWeatherData: [...newTempChart]});
    }
  }
  /**
  * Update states when the temp unit is switching to Cesium.
  */
  switchButtonToMetric = () => {
    if (!this.state.isMetric) {
      this.setState({
        isMetric: true,
        unitSymbol: '\u00b0F'
      })
      this.tempChartHandler(true);
      this.tempUnitHandler(true);
      this.props.switchUnit(true);
    }
  }
  /**
  * Update states when the temp unit is switching to Fahrenheit.
  */
  switchButtonToFahrenheit = () => {
    if (this.state.isMetric) {
      this.setState({
        isMetric: false,
        unitSymbol: '\u00b0C'
      })
      this.tempChartHandler(false);
      this.tempUnitHandler(false);
      this.props.switchUnit(false);
    }
  }
  /**
  * Update states when the selected day is changed.
  */
  selectedDay = (indexDay) => {
    let newSelected = indexDay + 7;
    if (newSelected !== this.state.currentSelectedDay) {
      this.setState({
        currentSelectedDay: newSelected,
        currentWeatherData: this.state.pastDayWeatherData[newSelected],
        currentHighestTemp: this.state.pastDayWeatherData[newSelected][3].temperature,
        unitSymbol: '\u00b0C',
        isMetric: false
      });
    }
  }
  render() {
    return (
      <div className="container-fluid mx-1 h-75 w-100">
        <div className="container-fluid">
          <h1 className="display-2 text-left text-light">
            {this.state.cityName}</h1>
          <h2 className="display-5 text-left text-light">
            {this.state.currentDate}</h2>
          <button id="one" className="btn btn-primary float-left" 
            style={{borderRadius:"25px 0px 0px 25px"}}
            onClick={this.switchButtonToMetric}>Fahrenheit</button>
          <button className="btn btn-info float-left"
            style={{borderRadius:"0px 25px 25px 0px"}}
            onClick={this.switchButtonToFahrenheit}>Cesium</button>
        </div>
        <div className={styles.currentWeatherWrapper}>
          <WeatherIcon iconType={this.state.iconType} iconSize="h-100"/>
          <h1 className={styles.currentTempature}>
            {this.state.currentHighestTemp}{this.state.unitSymbol} 
          </h1>
          <span className={styles.weatherTable}>
            <Chart scale={{temperature: {min: 0}}} 
              padding={[30,20,50,40]} 
              autoFit 
              height={320} 
              data={this.state.currentWeatherData}>
              <Line shape="smooth" 
                position="hour*temperature" 
                color="temperature" 
                label="temperature"/>
            </Chart>
          </span>
        </div>
        <div className="container-fluid w-100 ml-3 py-4 d-flex">
          {this.state.pastDays.map( day => {
            let maxTemp = this.state.wealtherInfo[day+7].main.temp_max;
            let iconType = this.state.wealtherInfo[day+7].weather[0].main;
            if (day == 0) {
              maxTemp = this.state.currentHighestTemp;
              iconType = this.state.iconType;
            }
            return (
            <ForCastComponent 
              key={day} 
              pastDay={day} 
              iconType={iconType} iconSize="card-img-top" 
              maxTemp={maxTemp}
              unitSimbol={this.state.unitSymbol}
              isMetric={this.state.isMetric}
              selectedDay={this.selectedDay}
            />);
          })}
        </div>
      </div>
    );
  }
}

export default WeatherForm;
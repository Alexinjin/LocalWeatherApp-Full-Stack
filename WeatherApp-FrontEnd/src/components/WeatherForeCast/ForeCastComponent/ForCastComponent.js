import React, { Component } from 'react'
import moment from 'moment'
import logo from '../../../logo.svg'
import WeatherIcon from '../../WeatherIcon/WeatherIcon'
/**
 * Component that display the forecast button compnent
 * @param  {this.props.pastDay} List :contains the index of past 7 days
 * @param  {this.props.iconType} String :Weather Data that indicates icon type
 * @param  {this.props.iconSize} String :icon style parameter
 * @param  {this.props.maxTemp} Float :Weather Data, the max temperature
 * @param  {this.props.unitSimbol} String :indicated the current unit Simbol
 * @param  {this.props.isMetric} Boolean :indicated the current temp unit
 */
class ForCastComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pastDay: this.props.pastDay,
      iconType: this.props.iconType,
      iconSize: this.props.iconSize,
      maxTemp: this.props.maxTemp,
      unitSimbol: this.props.unitSimbol,
      isMetric: this.props.isMetric,
      selectedDay: this.props.selectedDay
    };
    this.selectedHandler = this.selectedHandler.bind(this);
    this.tempSwitchHanlder = this.tempSwitchHanlder.bind(this);
  }
  componentDidUpdate = (prevProps) => {
    if (prevProps.unitSimbol !== this.props.unitSimbol) {
      this.setState({
        unitSimbol: this.props.unitSimbol
      })
    }
    if (prevProps.isMetric !== this.props.isMetric) {
      this.setState({
        isMetric: this.props.isMetric
      })
      this.tempSwitchHanlder(this.props.isMetric);
    }
  }
  /**
   * button event handler, recalcuate the value of temp when the temp unit is changed.
   */
  tempSwitchHanlder = (isMetric) => {
    if (isMetric) {
      this.setState({
        maxTemp:Math.round(this.state.maxTemp * 9/5 + 32)
    })} else {
      this.setState({
        maxTemp:Math.round((this.state.maxTemp - 32) * 5/9)
      })
    };
  }
  /**
   * Update the selected day to display
   */
  selectedHandler = () => {
    this.props.selectedDay(this.state.pastDay);
  }
  render() {
    return (
      <button className="btn btn-light active  mx-1" 
        style={{width: "12.5rem", borderRadius: "10px"}} 
        onClick={this.selectedHandler}>
          <WeatherIcon iconType={this.state.iconType} 
            iconSize={this.state.iconSize}/>
          <p className="card-text">
            {moment().add(this.state.pastDay,'days').format('dddd') + ", " 
            +moment().add(this.state.pastDay,'days').format('MMM Do')}
          </p>
          <p>{Math.round(this.state.maxTemp)}{this.state.unitSimbol}</p>
      </button> 
    );
  }
}

export default ForCastComponent;
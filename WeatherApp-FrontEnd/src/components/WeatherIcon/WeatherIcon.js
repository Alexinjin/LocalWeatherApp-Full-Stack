import React, { Component } from 'react'
import {
  sun,
  rain, 
  cloud,
  thunder,
  snow,
  drizzle
} from '../../assets/images/weatherIcons'
/**
 * Weather Icon Component that will return Icon Image based
 * on the given weather type
 * @param  {this.props.iconType} String :represents the weather type
 * @param  {iconName} String :incated the type of icon image
 * @param  {this.props.iconSize} Strnig :represents parameters of image style
 * @returns this
 */
class WeatherIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      iconType: this.props.iconType,
      iconName: null,
      size: this.props.iconSize
    };
  }
  componentDidMount = () => {
    switch(this.state.iconType) {
      case "Clear":
        this.setState({iconName: sun});
        break;
      case "Rain":
        this.setState({iconName: rain});
        break;
      case "Clouds":
        this.setState({iconName: cloud});
        break;
      case "Drizzle":
        this.setState({iconName: drizzle});
        break;
      case "Snow":
        this.setState({iconName: snow});
        break;
      case "Thunderstorm":
        this.setState({iconName: thunder});
        break;
      default:
        this.setState({iconName: sun});
    }
  }
  render() {
    return (
      <img src={this.state.iconName} className={this.state.size} />
    );
  }
}

export default WeatherIcon;
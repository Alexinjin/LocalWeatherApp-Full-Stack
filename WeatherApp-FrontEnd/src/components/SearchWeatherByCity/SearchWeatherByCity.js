import React, { Component } from 'react'
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import * as styles from './SearchWeatherByCity.module.css';

/**
 * Search Component that promp uses to input location
 * @param  {String} this.state.cityName :Location Name given by users
 * @param  {[Object]} currentWeatherData :weather data currently displayed
 * @param  {[Object]} weatherDater :Weahter Data that fetched from API
 * @param  {String} error :Error Message
 * @param  {Boolean} goback :indicate to return to the searching page
 * @returns true
 */
class SearchWeatherByCity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: "",
      currentWeatherData: [],
      weatherDater:[],
      error: null,
      goback: true
    };
    this.searchCityHandler = this.searchCityHandler.bind(this);
    this.searchClickedHandler = this.searchClickedHandler.bind(this);
    this.validateInputHandler = this.validateInputHandler.bind(this);
  }
  /**
  * Update the input value
  */
  searchCityHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  /**
  * Validate whether the user imput is empty.
  */
  validateInputHandler = () => {
    if (this.state.cityName.length === 0) {
      return false;
    }
    return true;
  }
  /**
  * Update the location infomation
  */
  searchClickedHandler = () => {
    if ( !this.validateInputHandler() ) {
        this.setState({error: "The city name cannot be emtpy"});
        return;
    } 
    else {
      this.props.searchClickedHandler(this.state.cityName);
    }
  }
  render() {
    return (
      <>
        <input type="text" 
          name="cityName" 
          className={styles.search}
          value={this.state.cityName} 
          placeholder="Enter a City Name:"
          onChange={this.searchCityHandler} />
        <button 
          className={styles.button} 
          onClick={this.searchClickedHandler}>Search
        </button>
        {this.state.error != null 
        && <ErrorMessage message={this.state.error}/>}
      </>
    );
  }
}

export default SearchWeatherByCity;
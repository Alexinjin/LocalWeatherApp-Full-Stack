package com.localweatherapp.rest.webservice.restfulwebservices;

import org.springframework.web.client.RestTemplate;

public class LocalWeatherData {

    private RestTemplate restTemplate;
    private String location;
    	
	public LocalWeatherData(String location) {
		super();
		this.location = location;
		this.restTemplate = new RestTemplate();
	}
	// send get request to access public weather API
	//return the local weather data of give location
	public String getLocalWeatherData() {
		//Need to replace it with a real API-Key
		String uri = "https://api.openweathermap.org/data/2.5/forecast?q="
					+this.location
					+"&cnt=8&appid={API-Keys}&units=metric";
		 
		return restTemplate.getForObject(uri, String.class);
	}
    
}

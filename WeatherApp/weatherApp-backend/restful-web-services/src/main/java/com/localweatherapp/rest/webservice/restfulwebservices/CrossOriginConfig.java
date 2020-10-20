package com.localweatherapp.rest.webservice.restfulwebservices;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
 
/**
 * Allow CORS GET
 */
@Configuration
public class CrossOriginConfig extends WebMvcConfigurerAdapter {
    static final String ORIGINS[] = new String[] {"GET"};
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**").allowedOrigins("*").allowCredentials(true).allowedMethods(ORIGINS).maxAge(3600);
    }
}
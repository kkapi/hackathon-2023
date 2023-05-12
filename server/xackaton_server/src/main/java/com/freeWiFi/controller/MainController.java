package com.freeWiFi.controller;

import com.freeWiFi.domain.WiFi;
import com.freeWiFi.service.FreeWiFiApiService;
import com.freeWiFi.service.WiFiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class MainController {
    @Autowired
    WiFiService wiFiService;

    @CrossOrigin
    @GetMapping("/main")
    public String getHello() {
        wiFiService.updateBaseDate();
        return "hello";
    }

    @CrossOrigin
    @GetMapping("/getWiFi")
    public List<WiFi> getHello(@RequestParam double lon, @RequestParam double lat, @RequestParam double radius) {
        List<WiFi> wiFiList = wiFiService.getPointInsideCircle(lon, lat, radius);
        return wiFiService.getPointInsideCircle(lon, lat, radius);
    }
}

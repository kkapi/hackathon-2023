package com.freeWiFi.controller;

import com.freeWiFi.domain.WiFi;
import com.freeWiFi.service.WiFiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @author nair irgalin
 * данный контроллер содержит запросы связанные с wifi
 */
@RestController
public class WiFiController {
    @Autowired
    WiFiService wiFiService;

    /**
     * Данные метод возвращает набор wifi точек находящихся в
     * определенном радиусе от заданных координат
     * @param lon - долгота
     * @param lat - широта
     * @param radius - радиус
     * @return - набор wifi точек
     */
    @CrossOrigin
    @GetMapping("/getWiFi")
    public List<WiFi> getWiFi(@RequestParam double lon, @RequestParam double lat, @RequestParam double radius) {
        List<WiFi> wiFiList = wiFiService.getPointInsideCircle(lon, lat, radius);
        return wiFiList;
    }

    /**
     * Данные метод возвращает ближайшую к заданными координатам wifi точку
     * @param lon - долгота
     * @param lat - широта
     * @return wifi точка
     */
    @CrossOrigin
    @GetMapping("/getWiFiNear")
    public WiFi getWiFiNear(@RequestParam double lon, @RequestParam double lat) {
        WiFi wiFi = wiFiService.getPointInsideCircleNear(lon, lat);
        return wiFi;
    }
}

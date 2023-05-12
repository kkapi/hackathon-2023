package com.freeWiFi.controller;

import com.freeWiFi.domain.WiFi;
import com.freeWiFi.service.WiFiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.rmi.ServerException;
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
        return wiFiService.getPointInsideCircle(lon, lat, radius);
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
        return wiFiService.getPointNear(lon, lat);
    }

    /**
     * Данный метод возвращает набор точек находящихся в определенном радиусе от заданного адресса
     * @param address - адрес дома
     * @param radius - радиус поиска
     * @return - набор wifi точек
     * @throws ServerException - возникает в случае ввода неверного адресса
     */
    @CrossOrigin
    @GetMapping("/address/getWiFi")
    public List<WiFi> getWiFiFromAddress(@RequestParam String address, @RequestParam double radius) throws ServerException {
        return wiFiService.getPointInsideCircleFromAddress(address, radius);
    }

    /**
     * Данный метод возвращает ближайющую wifi точку к дому
     * @param address - адресс дома
     * @return - wifi точка
     * @throws ServerException - возникает в случае ввода неверного адресса
     */
    @CrossOrigin
    @GetMapping("/address/getWiFiNear")
    public WiFi getWiFiNearFromAddress(@RequestParam String address) throws ServerException {
        return wiFiService.getPointNearFromAddress(address);
    }
}

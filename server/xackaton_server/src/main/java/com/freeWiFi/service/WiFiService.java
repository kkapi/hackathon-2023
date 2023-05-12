package com.freeWiFi.service;

import com.freeWiFi.domain.ApiWiFi;
import com.freeWiFi.domain.WiFi;
import com.freeWiFi.repo.WiFiRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author nair irgalin
 * Данный сервис взаимодействует с таблицей wifi базы данных
 */
@Service
public class WiFiService {
    @Autowired
    WiFiRepo wiFiRepo;
    @Autowired
    FreeWiFiApiService freeWiFiApiService;

    /**
     * данный метод обновляет таблицу wifi в соответствии с актуальными данными
     */
    public void updateBaseDate() {
        ApiWiFi apiWiFi;
        WiFi[] wiFi;
        int page = 1;
        do {
            apiWiFi = freeWiFiApiService.getFreeWiFi(page);
            page++;
            wiFi = apiWiFi.getResults();
            for (WiFi i : wiFi) {
                i.outArray();
                wiFiRepo.save(i);
            }
        } while(apiWiFi.getNext() != null);
    }

    /**
     * Данный метод ищет wifi точки находящиеся в определенном радиусе от заданных координат,
     * данные отсортированы по возрастанию дальности от указанных координат
     * @param lon - долгота точки поиска
     * @param lat - широта точки поиска
     * @param radius - радиус поиска
     * @return список wifi точек в неоходимом радиусе
     */
    public List<WiFi> getPointInsideCircle(double lon, double lat, double radius){
        List<WiFi> wiFis= wiFiRepo.findNeedPoint(lon, lat, radius);
        for(WiFi wiFi : wiFis)
        {
            wiFi.inArray();
        }
        return wiFis;
    }

    /**
     * Данный метод ищет ближайщую wifi точку от заданных координат
     * @param lon - долгота точки поиска
     * @param lat - широта точки поиска
     * @return список wifi точек в неоходимом радиусе
     */
    public WiFi getPointInsideCircleNear(double lon, double lat) {
        List<WiFi> wiFis= wiFiRepo.findFirstNeedPoint(lon, lat);
        WiFi wiFi = null;
        if(wiFis.size() != 0) {
            wiFi = wiFis.get(0);
            wiFi.inArray();
        }
        return wiFi;
    }
}

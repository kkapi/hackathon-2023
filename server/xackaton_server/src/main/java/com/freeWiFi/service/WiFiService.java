package com.freeWiFi.service;

import com.freeWiFi.domain.ApiWiFi;
import com.freeWiFi.domain.WiFi;
import com.freeWiFi.repo.WiFiRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WiFiService {
    @Autowired
    WiFiRepo wiFiRepo;
    @Autowired
    FreeWiFiApiService freeWiFiApiService;

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

    public List<WiFi> getPointInsideCircle(double lon, double lat, double radius){
        List<WiFi> wiFis= wiFiRepo.findNeedPoint(lon, lat, radius);
        for(WiFi wiFi : wiFis)
        {
            wiFi.inArray();
        }
        return wiFis;
    }
}

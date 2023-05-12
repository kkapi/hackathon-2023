package com.freeWiFi.Timer;


import com.freeWiFi.service.WiFiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;

public class UpdateDataBaseTimer {
    @Autowired
    WiFiService wiFiService;

    @Scheduled(fixedDelay = 3600000)
    public void UpdateDataBase() {
        wiFiService.updateBaseDate();
    }
}

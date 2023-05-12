package com.freeWiFi.controller;

import com.freeWiFi.service.FreeWiFiApiService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MainController {

    @CrossOrigin
    @GetMapping("/main")
    public String getHello() {
        return "hello";
    }
}

package com.freeWiFi.repo;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface WiFi {
    @Query("SELECT t FROM WiFi t WHERE sqrt(((t.lat - :la)*111153)*((t.lat - :la)*111153) + ((t.lon - :lo)*62555)*((t.lon - :lo)*62555)) < :radius ")
    List<WiFi> findNeedPoint(@Param("lo") double lo,@Param("la") double la,@Param("radius") double radius);
}

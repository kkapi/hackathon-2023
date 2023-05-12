package com.freeWiFi.repo;

import com.freeWiFi.domain.WiFi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * @author nair irgalin
 * Данный интерфейс описывает запросы в базу данных
 */
public interface WiFiRepo extends JpaRepository<WiFi, Long> {
    /**
     * Данный метод ищет в базе данных точки в определенном радиусе от заданных координат
     * @param lo - долгота
     * @param la - широта
     * @param radius - радиус
     * @return набор wifi точек
     */
    @Query(value = "SELECT t " +
            "FROM WiFi t " +
            "WHERE sqrt(((t.lat - :la)*111153)*((t.lat - :la)*111153) + ((t.lon - :lo)*62555)*((t.lon - :lo)*62555)) < :radius " +
            "order by sqrt(((t.lat - :la)*111153)*((t.lat - :la)*111153) + ((t.lon - :lo)*62555)*((t.lon - :lo)*62555))")
    List<WiFi> findNeedPoint(@Param("lo") double lo, @Param("la") double la, @Param("radius") double radius);

    /**
     * Данный метод ищет ближайшую wifi точку к заданным координатам в базе данных
     * @param lo - долгота
     * @param la - широта
     * @return - wifi точка
     */
    @Query(value = "SELECT t " +
            "FROM WiFi t " +
            "order by sqrt(((t.lat - :la)*111153)*((t.lat - :la)*111153) + ((t.lon - :lo)*62555)*((t.lon - :lo)*62555))")
    List<WiFi> findFirstNeedPoint(@Param("lo") double lo, @Param("la") double la);
}

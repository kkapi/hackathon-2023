package com.freeWiFi.domain;

import io.hypersistence.utils.hibernate.type.array.StringArrayType;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Transient;
import org.hibernate.annotations.Type;

@Entity
public class WiFi{
    @Id
    private long number;
    private String address;
    private String district;
    private String name_wifi;
    private int coverage;
    private String status;

    @Transient
    private double[] coordinates;

    private double lat;
    private double lon;

    public void inArray(){
        this.coordinates = new double[2];
        coordinates[1] = lat;
        coordinates[2] = lon;
    }

    public void outArray(){
        lat = coordinates[1];
        lon = coordinates[2];
    }

    public WiFi(long number, String address, String district, String name_wifi, int coverage, String status) {
        this.number = number;
        this.address = address;
        this.district = district;
        this.name_wifi = name_wifi;
        this.coverage = coverage;
        this.status = status;
    }

    public WiFi() {
    }

    public long getNumber() {
        return number;
    }

    public void setNumber(long number) {
        this.number = number;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

    public String getName_wifi() {
        return name_wifi;
    }

    public void setName_wifi(String name_wifi) {
        this.name_wifi = name_wifi;
    }

    public int getCoverage() {
        return coverage;
    }

    public void setCoverage(int coverage) {
        this.coverage = coverage;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public double[] getCoordinates() {
        return coordinates;
    }

    public void setCoordinates(double[] coordinates) {
        this.coordinates = coordinates;
    }
}

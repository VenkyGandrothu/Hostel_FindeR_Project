package com.venky.hostel_finder_backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name="hostel")
public class Hostel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // BASIC
    private String name;
    private String location;
    private String type;
    private double price;
    private String description;

    // CONTACT
    private String ownerName;
    private String contactNumber;
    private String email;

    // ACCOMMODATION
    private int totalBeds;
    private String roomType;
    private boolean attachedBathroom;
    private boolean acAvailable;

    // FOOD & FACILITIES
    private boolean foodAvailable;
    private String mealType;
    private boolean wifiAvailable;
    private boolean laundryAvailable;
    private boolean waterFacility;

    // LOCATION
    private String address;
    private String googleMapLink;
    private String nearbyPlaces;

    // SAFETY
    private boolean cctv;
    private boolean securityGuard;
    private boolean fireSafety;

    // MEDIA (later store URLs)
    private String imageUrls;


    //Getters and Setters method
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getOwnerName() {
        return ownerName;
    }

    public void setOwnerName(String ownerName) {
        this.ownerName = ownerName;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getTotalBeds() {
        return totalBeds;
    }

    public void setTotalBeds(int totalBeds) {
        this.totalBeds = totalBeds;
    }

    public String getRoomType() {
        return roomType;
    }

    public void setRoomType(String roomType) {
        this.roomType = roomType;
    }

    public boolean isAttachedBathroom() {
        return attachedBathroom;
    }

    public void setAttachedBathroom(boolean attachedBathroom) {
        this.attachedBathroom = attachedBathroom;
    }

    public boolean isAcAvailable() {
        return acAvailable;
    }

    public void setAcAvailable(boolean acAvailable) {
        this.acAvailable = acAvailable;
    }

    public boolean isFoodAvailable() {
        return foodAvailable;
    }

    public void setFoodAvailable(boolean foodAvailable) {
        this.foodAvailable = foodAvailable;
    }

    public String getMealType() {
        return mealType;
    }

    public void setMealType(String mealType) {
        this.mealType = mealType;
    }

    public boolean isWifiAvailable() {
        return wifiAvailable;
    }

    public void setWifiAvailable(boolean wifiAvailable) {
        this.wifiAvailable = wifiAvailable;
    }

    public boolean isLaundryAvailable() {
        return laundryAvailable;
    }

    public void setLaundryAvailable(boolean laundryAvailable) {
        this.laundryAvailable = laundryAvailable;
    }

    public boolean isWaterFacility() {
        return waterFacility;
    }

    public void setWaterFacility(boolean waterFacility) {
        this.waterFacility = waterFacility;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getGoogleMapLink() {
        return googleMapLink;
    }

    public void setGoogleMapLink(String googleMapLink) {
        this.googleMapLink = googleMapLink;
    }

    public String getNearbyPlaces() {
        return nearbyPlaces;
    }

    public void setNearbyPlaces(String nearbyPlaces) {
        this.nearbyPlaces = nearbyPlaces;
    }

    public String getImageUrls() {
        return imageUrls;
    }

    public void setImageUrls(String imageUrls) {
        this.imageUrls = imageUrls;
    }

    public boolean isFireSafety() {
        return fireSafety;
    }

    public void setFireSafety(boolean fireSafety) {
        this.fireSafety = fireSafety;
    }

    public boolean isCctv() {
        return cctv;
    }

    public void setCctv(boolean cctv) {
        this.cctv = cctv;
    }

    public boolean isSecurityGuard() {
        return securityGuard;
    }

    public void setSecurityGuard(boolean securityGuard) {
        this.securityGuard = securityGuard;
    }


    //non-parameterized constructor
    public Hostel() {
    }

    //parameterized constructor
    public Hostel(String imageUrls, boolean fireSafety, boolean securityGuard, Long id, String name, String location, String type, double price, String description, String contactNumber, String ownerName, String email, int totalBeds, String roomType, boolean attachedBathroom, boolean acAvailable, boolean foodAvailable, String mealType, boolean wifiAvailable, boolean laundryAvailable, boolean waterFacility, String address, String googleMapLink, String nearbyPlaces, boolean cctv) {
        this.imageUrls = imageUrls;
        this.fireSafety = fireSafety;
        this.securityGuard = securityGuard;
        this.id = id;
        this.name = name;
        this.location = location;
        this.type = type;
        this.price = price;
        this.description = description;
        this.contactNumber = contactNumber;
        this.ownerName = ownerName;
        this.email = email;
        this.totalBeds = totalBeds;
        this.roomType = roomType;
        this.attachedBathroom = attachedBathroom;
        this.acAvailable = acAvailable;
        this.foodAvailable = foodAvailable;
        this.mealType = mealType;
        this.wifiAvailable = wifiAvailable;
        this.laundryAvailable = laundryAvailable;
        this.waterFacility = waterFacility;
        this.address = address;
        this.googleMapLink = googleMapLink;
        this.nearbyPlaces = nearbyPlaces;
        this.cctv = cctv;
    }
}
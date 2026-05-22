package com.venky.hostel_finder_backend.service;

import com.venky.hostel_finder_backend.entity.Hostel;
import com.venky.hostel_finder_backend.repository.HostelRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class HostelServiceImplementation implements HostelService{

    @Autowired
    private HostelRepo hostelRepo;

    @Override
    public Hostel saveHostel(Hostel hostel) {
        return hostelRepo.save(hostel);
    }

    @Override
    public Hostel getHostel(Long id) {
        return hostelRepo.findById(id).orElseThrow(() -> new RuntimeException("Hostel not found with id: " + id));
    }

    @Override
    public List<Hostel> getAllHostels() {
        return hostelRepo.findAll();
    }

    @Override
    public Hostel updateHostel(Long id, Hostel updatedHostel) {

        Hostel existing = hostelRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Hostel not found"));

        // BASIC
        existing.setName(updatedHostel.getName());
        existing.setLocation(updatedHostel.getLocation());
        existing.setType(updatedHostel.getType());
        existing.setPrice(updatedHostel.getPrice());
        existing.setDescription(updatedHostel.getDescription());

        // CONTACT
        existing.setOwnerName(updatedHostel.getOwnerName());
        existing.setContactNumber(updatedHostel.getContactNumber());
        existing.setEmail(updatedHostel.getEmail());

        // ACCOMMODATION
        existing.setTotalBeds(updatedHostel.getTotalBeds());
        existing.setRoomType(updatedHostel.getRoomType());
        existing.setAttachedBathroom(updatedHostel.isAttachedBathroom());
        existing.setAcAvailable(updatedHostel.isAcAvailable());

        // FOOD & FACILITIES
        existing.setFoodAvailable(updatedHostel.isFoodAvailable());
        existing.setMealType(updatedHostel.getMealType());
        existing.setWifiAvailable(updatedHostel.isWifiAvailable());
        existing.setLaundryAvailable(updatedHostel.isLaundryAvailable());
        existing.setWaterFacility(updatedHostel.isWaterFacility());

        // LOCATION
        existing.setAddress(updatedHostel.getAddress());
        existing.setGoogleMapLink(updatedHostel.getGoogleMapLink());
        existing.setNearbyPlaces(updatedHostel.getNearbyPlaces());

        // SAFETY
        existing.setCctv(updatedHostel.isCctv());
        existing.setSecurityGuard(updatedHostel.isSecurityGuard());
        existing.setFireSafety(updatedHostel.isFireSafety());

        // MEDIA
        existing.setImageUrls(updatedHostel.getImageUrls());

        return hostelRepo.save(existing);
    }

    @Override
    public Hostel patchHostel(Long id, Map<String, Object> updates) {

        Hostel hostel = hostelRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Hostel not found"));

        // BASIC
        if (updates.containsKey("name")) {
            hostel.setName((String) updates.get("name"));
        }

        if (updates.containsKey("price")) {
            hostel.setPrice(Double.parseDouble(updates.get("price").toString()));
        }

        if (updates.containsKey("location")) {
            hostel.setLocation((String) updates.get("location"));
        }

        // CONTACT
        if (updates.containsKey("contactNumber")) {
            hostel.setContactNumber((String) updates.get("contactNumber"));
        }

        if (updates.containsKey("email")) {
            hostel.setEmail((String) updates.get("email"));
        }

        // ACCOMMODATION
        if (updates.containsKey("totalBeds")) {
            hostel.setTotalBeds((Integer) updates.get("totalBeds"));
        }

        if (updates.containsKey("acAvailable")) {
            hostel.setAcAvailable((Boolean) updates.get("acAvailable"));
        }

        // FOOD & FACILITIES
        if (updates.containsKey("wifiAvailable")) {
            hostel.setWifiAvailable((Boolean) updates.get("wifiAvailable"));
        }

        if (updates.containsKey("foodAvailable")) {
            hostel.setFoodAvailable((Boolean) updates.get("foodAvailable"));
        }

        // LOCATION
        if (updates.containsKey("address")) {
            hostel.setAddress((String) updates.get("address"));
        }

        // SAFETY
        if (updates.containsKey("cctv")) {
            hostel.setCctv((Boolean) updates.get("cctv"));
        }

        if (updates.containsKey("fireSafety")) {
            hostel.setFireSafety((Boolean) updates.get("fireSafety"));
        }

        return hostelRepo.save(hostel);
    }
    @Override
    public void deleteHostel(Long id) {
        Hostel hostel = hostelRepo.findById(id).orElseThrow(() -> new RuntimeException("Hostel not found with id: " + id));
        hostelRepo.delete(hostel);
    }

    @Override
    public List<String> findLocations(String keyword) {
        return hostelRepo.findLocationByKeyword(keyword);
    }

    @Override
    public List<Hostel> findHostelByLocation(String location) {
        return hostelRepo.findHostelByLocation(location);
    }
}

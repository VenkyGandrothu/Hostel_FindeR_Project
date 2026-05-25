package com.venky.hostel_finder_backend.service;

import com.venky.hostel_finder_backend.entity.Hostel;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Map;

public interface HostelService {

    Hostel saveHostel(Hostel hostel);

    Hostel getHostel(Long id);

    List<Hostel> getAllHostels();

    Hostel updateHostel(Long id, Hostel hostel);

    Hostel patchHostel(Long id, Map<String, Object> updates);

    void deleteHostel(Long id);

    List<String> findLocations(String keyword);

    Page<Hostel> searchHostels(String location, String type, Double minPrice, Double maxPrice, Double rating, Integer beds, int page, int size);
}
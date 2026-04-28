package com.venky.hostel_finder_backend.service;

import com.venky.hostel_finder_backend.entity.Hostel;
import java.util.List;
import java.util.Map;

public interface HostelService {

    Hostel saveHostel(Hostel hostel);

    Hostel getHostel(Long id);

    List<Hostel> getAllHostels();

    Hostel updateHostel(Long id, Hostel hostel);

    Hostel patchHostel(Long id, Map<String, Object> updates);

    void deleteHostel(Long id);
}
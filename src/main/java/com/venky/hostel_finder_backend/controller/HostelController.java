package com.venky.hostel_finder_backend.controller;


import com.venky.hostel_finder_backend.entity.Hostel;
import com.venky.hostel_finder_backend.service.HostelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/hostels")
public class HostelController {

    @Autowired
    private HostelService hostelService;

    // CREATE
    @PostMapping("/add")
    public Hostel createHostel(@RequestBody Hostel hostel){
        return hostelService.saveHostel(hostel);
    }

    @GetMapping("/{id}")
    public Hostel getHostel(@PathVariable Long id){
        return hostelService.getHostel(id);
    }

    @GetMapping("/all")
    public List<Hostel> getAllHostel(){
        return hostelService.getAllHostels();
    }

    @PutMapping("/update/{id}")
    public Hostel updateFullHostel( @PathVariable Long id , @RequestBody Hostel hostel){
        return hostelService.updateHostel(id, hostel);
    }

    @PatchMapping("/updatespec/{id}")
    public Hostel updateHostel(@PathVariable Long id, @RequestBody Map<String, Object> updates) {
        return hostelService.patchHostel(id, updates);
    }
    @DeleteMapping("delete/{id}")
    public String deleteHostel(@PathVariable Long id){
        hostelService.deleteHostel(id);
        return "Hostel deleted successfully";
    }

    @GetMapping("search/location")
    public ResponseEntity<List<String>> searchLocation(@RequestParam String keyword){
        List<String> locations = hostelService.findLocations(keyword);
        return ResponseEntity.ok(locations);
    }

    @GetMapping("/search/by-location")
    public ResponseEntity<List<Hostel>> searchHostels(@RequestParam String location){
        List<Hostel> hostels = hostelService.findHostelByLocation(location);
        return new ResponseEntity<>(hostels , HttpStatus.OK);
    }
}

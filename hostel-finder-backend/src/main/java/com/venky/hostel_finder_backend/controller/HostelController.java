package com.venky.hostel_finder_backend.controller;


import com.venky.hostel_finder_backend.entity.Hostel;
import com.venky.hostel_finder_backend.service.HostelService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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
    public Hostel createHostel(@Valid @RequestBody Hostel hostel) {
        return hostelService.saveHostel(hostel);
    }

    @GetMapping("/{id}")
    public Hostel getHostel(@PathVariable Long id) {
        return hostelService.getHostel(id);
    }

    @GetMapping("/all")
    public List<Hostel> getAllHostel() {
        return hostelService.getAllHostels();
    }

    @PutMapping("/update/{id}")
    public Hostel updateFullHostel(@PathVariable Long id, @Valid @RequestBody Hostel hostel) {
        return hostelService.updateHostel(id, hostel);
    }

    @PatchMapping("/updatespec/{id}")
    public Hostel updateHostel(@PathVariable Long id, @RequestBody Map<String, Object> updates) {
        return hostelService.patchHostel(id, updates);
    }

    @DeleteMapping("delete/{id}")
    public String deleteHostel(@PathVariable Long id) {
        hostelService.deleteHostel(id);
        return "Hostel deleted successfully";
    }

    @GetMapping("search/location")
    public ResponseEntity<List<String>> searchLocation(@RequestParam @NotBlank String keyword) {
        List<String> locations = hostelService.findLocations(keyword);
        return ResponseEntity.ok(locations);
    }

    @GetMapping("/search")
    public ResponseEntity<Page<Hostel>> searchHostels(

            @RequestParam @NotBlank(message="Location is required") String location,

            @RequestParam(required = false) String type,

            @RequestParam(required = false) @Min(0) Double minPrice,

            @RequestParam(required = false) @Min(0) Double maxPrice,

            @RequestParam(required = false) @Min(1) @Max(5) Double rating,

            @RequestParam(required = false) @Min(1) Integer beds,

            @RequestParam(defaultValue = "0") @Min(0) int page,

            @RequestParam(defaultValue = "5") @Min(1) @Max(50) int size
    ) {

        return ResponseEntity.ok(
                hostelService.searchHostels(
                        location,
                        type,
                        minPrice,
                        maxPrice,
                        rating,
                        beds,
                        page,
                        size
                )
        );
    }
}
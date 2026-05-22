package com.venky.hostel_finder_backend.repository;

import com.venky.hostel_finder_backend.entity.Hostel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface HostelRepo extends JpaRepository<Hostel,Long> {

    @Query("""
       SELECT DISTINCT h.location
       FROM Hostel h
       WHERE LOWER(h.location)
       LIKE LOWER(CONCAT(:keyword, '%'))
       """)
    List<String> findLocationByKeyword(String keyword);

    @Query("""
    SELECT h FROM Hostel h
    WHERE LOWER(h.name) = LOWER(:keyword)
    """)
    List<Hostel> findHostelByLocation(String keyword);
}


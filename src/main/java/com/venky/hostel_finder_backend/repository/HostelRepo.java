package com.venky.hostel_finder_backend.repository;

import com.venky.hostel_finder_backend.entity.Hostel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
    WHERE LOWER(h.name)
    LIKE LOWER(CONCAT('%', :keyword, '%'))
    """)
    Page<Hostel> findHostelByLocation(
            String keyword,
            Pageable pageable
    );
}


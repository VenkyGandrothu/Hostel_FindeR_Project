package com.venky.hostel_finder_backend.repository;

import com.venky.hostel_finder_backend.entity.Hostel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface HostelRepo extends JpaRepository<Hostel,Long> {

}


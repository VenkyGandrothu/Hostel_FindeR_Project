package com.venky.hostel_finder_backend.config;

import com.venky.hostel_finder_backend.entity.Hostel;
import com.venky.hostel_finder_backend.repository.HostelRepo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;
import tools.jackson.core.type.TypeReference;
import tools.jackson.databind.json.JsonMapper;

import java.io.InputStream;
import java.util.List;

/**
 * Loads sample hostels from classpath JSON when the hostel table is empty.
 * Portable across machines: seed file ships with the project.
 */
@Component
public class HostelDataSeeder implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(HostelDataSeeder.class);

    private final HostelRepo hostelRepo;
    private final JsonMapper jsonMapper;

    public HostelDataSeeder(HostelRepo hostelRepo) {
        this.hostelRepo = hostelRepo;
        this.jsonMapper = JsonMapper.builder().build();
    }

    @Override
    public void run(String... args) throws Exception {
        long existing = hostelRepo.count();
        if (existing > 0) {
            log.info("Hostel data already present ({} rows). Skipping seed.", existing);
            return;
        }

        ClassPathResource resource = new ClassPathResource("data/hostels-seed.json");
        if (!resource.exists()) {
            log.warn("Seed file data/hostels-seed.json not found. Skipping hostel seed.");
            return;
        }

        try (InputStream inputStream = resource.getInputStream()) {
            List<Hostel> hostels = jsonMapper.readValue(inputStream, new TypeReference<>() {});
            hostelRepo.saveAll(hostels);
            log.info("Seeded {} sample hostels into the database.", hostels.size());
        }
    }
}

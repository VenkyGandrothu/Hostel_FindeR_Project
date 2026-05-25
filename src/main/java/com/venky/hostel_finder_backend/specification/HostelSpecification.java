package com.venky.hostel_finder_backend.specification;

import com.venky.hostel_finder_backend.entity.Hostel;
import org.springframework.data.jpa.domain.Specification;

import jakarta.persistence.criteria.Predicate;

public class HostelSpecification {

    public static Specification<Hostel> filterHostels(

            String location,
            String type,
            Double minPrice,
            Double maxPrice,
            Double rating,
            Integer beds
    ) {

        return (root, query, cb) -> {

            Predicate predicate = cb.conjunction();

            // 🔍 LOCATION FILTER
            if (location != null && !location.isEmpty()) {
                predicate = cb.and(
                        predicate,
                        cb.like(
                                cb.lower(root.get("location")),
                                "%" + location.toLowerCase() + "%"
                        )
                );
            }

            // 🏠 TYPE FILTER (Boys/Girls/Co-living)
            if (type != null && !type.isEmpty()) {
                predicate = cb.and(
                        predicate,
                        cb.equal(
                                cb.lower(root.get("type")),
                                type.toLowerCase()
                        )
                );
            }

            // 💰 MIN PRICE
            if (minPrice != null) {
                predicate = cb.and(
                        predicate,
                        cb.greaterThanOrEqualTo(root.get("price"), minPrice)
                );
            }

            // 💰 MAX PRICE
            if (maxPrice != null) {
                predicate = cb.and(
                        predicate,
                        cb.lessThanOrEqualTo(root.get("price"), maxPrice)
                );
            }

            // ⭐ RATING
            if (rating != null) {
                predicate = cb.and(
                        predicate,
                        cb.greaterThanOrEqualTo(root.get("rating"), rating)
                );
            }

            // 🛏️ BEDS
            if (beds != null) {
                predicate = cb.and(
                        predicate,
                        cb.equal(root.get("beds"), beds)
                );
            }

            return predicate;
        };
    }
}
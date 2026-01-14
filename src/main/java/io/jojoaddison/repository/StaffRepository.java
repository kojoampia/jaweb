package io.jojoaddison.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import io.jojoaddison.domain.Staff;


/**
 * Spring Data MongoDB repository for the Staff entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StaffRepository extends MongoRepository<Staff, String> {

}

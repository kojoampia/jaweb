package io.jojoaddison.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import io.jojoaddison.domain.Career;


/**
 * Spring Data MongoDB repository for the Career entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CareerRepository extends MongoRepository<Career, String> {

}

package io.jojoaddison.repository;

import io.jojoaddison.domain.Career;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the Career entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CareerRepository extends MongoRepository<Career, String> {

}

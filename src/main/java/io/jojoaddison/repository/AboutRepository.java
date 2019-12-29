package io.jojoaddison.repository;

import io.jojoaddison.domain.About;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the About entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AboutRepository extends MongoRepository<About, String> {

}

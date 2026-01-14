package io.jojoaddison.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import io.jojoaddison.domain.About;


/**
 * Spring Data MongoDB repository for the About entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AboutRepository extends MongoRepository<About, String> {

}

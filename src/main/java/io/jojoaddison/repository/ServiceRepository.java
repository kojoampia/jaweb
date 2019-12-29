package io.jojoaddison.repository;

import io.jojoaddison.domain.Service;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the Service entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ServiceRepository extends MongoRepository<Service, String> {

}

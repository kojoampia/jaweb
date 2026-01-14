package io.jojoaddison.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import io.jojoaddison.domain.Service;


/**
 * Spring Data MongoDB repository for the Service entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ServiceRepository extends MongoRepository<Service, String> {

}

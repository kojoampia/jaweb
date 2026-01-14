package io.jojoaddison.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import io.jojoaddison.domain.Information;


/**
 * Spring Data MongoDB repository for the Information entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InformationRepository extends MongoRepository<Information, String> {

}

package io.jojoaddison.repository;

import io.jojoaddison.domain.Information;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the Information entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InformationRepository extends MongoRepository<Information, String> {

}

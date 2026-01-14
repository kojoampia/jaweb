package io.jojoaddison.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import io.jojoaddison.domain.Imprint;


/**
 * Spring Data MongoDB repository for the Imprint entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ImprintRepository extends MongoRepository<Imprint, String> {

}

package io.jojoaddison.repository;

import io.jojoaddison.domain.Imprint;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the Imprint entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ImprintRepository extends MongoRepository<Imprint, String> {

}

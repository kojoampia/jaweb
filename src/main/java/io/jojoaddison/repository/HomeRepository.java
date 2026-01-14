package io.jojoaddison.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import io.jojoaddison.domain.Home;


/**
 * Spring Data MongoDB repository for the Home entity.
 */
@SuppressWarnings("unused")
@Repository
public interface HomeRepository extends MongoRepository<Home, String> {

	Home findByCurrent(boolean b);

}

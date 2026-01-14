package io.jojoaddison.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import io.jojoaddison.domain.Portfolio;


/**
 * Spring Data MongoDB repository for the Portfolio entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PortfolioRepository extends MongoRepository<Portfolio, String> {

}

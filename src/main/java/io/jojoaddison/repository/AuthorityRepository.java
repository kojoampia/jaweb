package io.jojoaddison.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import io.jojoaddison.domain.Authority;

/**
 * Spring Data MongoDB repository for the Authority entity.
 */
public interface AuthorityRepository extends MongoRepository<Authority, String> {
}

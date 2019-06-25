package io.jojoaddison.repository;

import io.jojoaddison.domain.Version;
import org.springframework.data.mongodb.repository.Query;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the Version entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VersionRepository extends MongoRepository<Version, String> {
    Optional<Version> findByType(String type);
}
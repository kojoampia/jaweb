package io.jojoaddison.repository;

import io.jojoaddison.domain.Privilege;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the Privilege entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PrivilegeRepository extends MongoRepository<Privilege, String> {

}

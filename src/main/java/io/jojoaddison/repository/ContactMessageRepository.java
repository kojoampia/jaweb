package io.jojoaddison.repository;

import io.jojoaddison.domain.ContactMessage;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the ContactMessage entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ContactMessageRepository extends MongoRepository<ContactMessage, String> {

}

package io.jojoaddison.repository;

import io.jojoaddison.domain.Contact;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the Contact entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ContactRepository extends MongoRepository<Contact, String> {

}

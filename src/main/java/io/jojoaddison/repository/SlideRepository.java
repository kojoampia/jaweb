package io.jojoaddison.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import io.jojoaddison.domain.Slide;


/**
 * Spring Data MongoDB repository for the Slide entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SlideRepository extends MongoRepository<Slide, String> {

}

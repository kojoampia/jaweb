package io.jojoaddison.repository;

import io.jojoaddison.domain.Blog;
import org.springframework.data.mongodb.repository.Query;

import java.time.ZonedDateTime;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the Blog entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BlogRepository extends MongoRepository<Blog, String> {

	Page<Blog> findByModifiedDateAfter(ZonedDateTime recent, Pageable pageable);

}

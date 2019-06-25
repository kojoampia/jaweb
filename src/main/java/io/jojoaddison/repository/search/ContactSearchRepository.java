package io.jojoaddison.repository.search;

import io.jojoaddison.domain.Contact;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Contact entity.
 */
public interface ContactSearchRepository extends ElasticsearchRepository<Contact, String> {
}

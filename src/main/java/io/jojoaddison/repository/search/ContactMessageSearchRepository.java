package io.jojoaddison.repository.search;

import io.jojoaddison.domain.ContactMessage;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the ContactMessage entity.
 */
public interface ContactMessageSearchRepository extends ElasticsearchRepository<ContactMessage, String> {
}

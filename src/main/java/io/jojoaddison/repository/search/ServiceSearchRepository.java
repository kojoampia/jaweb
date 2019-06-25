package io.jojoaddison.repository.search;

import io.jojoaddison.domain.Service;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Service entity.
 */
public interface ServiceSearchRepository extends ElasticsearchRepository<Service, String> {
}

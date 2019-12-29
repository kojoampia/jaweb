package io.jojoaddison.repository.search;

import io.jojoaddison.domain.Information;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Information entity.
 */
public interface InformationSearchRepository extends ElasticsearchRepository<Information, String> {
}

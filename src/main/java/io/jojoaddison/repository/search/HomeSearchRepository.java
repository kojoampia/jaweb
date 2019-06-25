package io.jojoaddison.repository.search;

import io.jojoaddison.domain.Home;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Home entity.
 */
public interface HomeSearchRepository extends ElasticsearchRepository<Home, String> {
}

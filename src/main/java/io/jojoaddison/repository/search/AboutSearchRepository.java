package io.jojoaddison.repository.search;

import io.jojoaddison.domain.About;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the About entity.
 */
public interface AboutSearchRepository extends ElasticsearchRepository<About, String> {
}

package io.jojoaddison.repository.search;

import io.jojoaddison.domain.Portfolio;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Portfolio entity.
 */
public interface PortfolioSearchRepository extends ElasticsearchRepository<Portfolio, String> {
}

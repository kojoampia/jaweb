package io.jojoaddison.repository.search;

import io.jojoaddison.domain.Imprint;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Imprint entity.
 */
public interface ImprintSearchRepository extends ElasticsearchRepository<Imprint, String> {
}

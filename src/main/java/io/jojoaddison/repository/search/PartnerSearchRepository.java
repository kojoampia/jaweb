package io.jojoaddison.repository.search;

import io.jojoaddison.domain.Partner;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Partner entity.
 */
public interface PartnerSearchRepository extends ElasticsearchRepository<Partner, String> {
}

package io.jojoaddison.repository.search;

import io.jojoaddison.domain.Slide;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Slide entity.
 */
public interface SlideSearchRepository extends ElasticsearchRepository<Slide, String> {
}

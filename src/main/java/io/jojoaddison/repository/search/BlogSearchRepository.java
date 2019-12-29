package io.jojoaddison.repository.search;

import io.jojoaddison.domain.Blog;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Blog entity.
 */
public interface BlogSearchRepository extends ElasticsearchRepository<Blog, String> {
}

package io.jojoaddison.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of ImprintSearchRepository to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class ImprintSearchRepositoryMockConfiguration {

    @MockBean
    private ImprintSearchRepository mockImprintSearchRepository;

}

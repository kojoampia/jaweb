package io.jojoaddison.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of AboutSearchRepository to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class AboutSearchRepositoryMockConfiguration {

    @MockBean
    private AboutSearchRepository mockAboutSearchRepository;

}

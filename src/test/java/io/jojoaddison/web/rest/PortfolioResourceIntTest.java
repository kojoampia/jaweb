package io.jojoaddison.web.rest;

import io.jojoaddison.JojoaddisonApp;

import io.jojoaddison.domain.Portfolio;
import io.jojoaddison.repository.PortfolioRepository;
import io.jojoaddison.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.util.Base64Utils;
import org.springframework.validation.Validator;

import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.Collections;
import java.util.List;


import static io.jojoaddison.web.rest.TestUtil.sameInstant;
import static io.jojoaddison.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the PortfolioResource REST controller.
 *
 * @see PortfolioResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JojoaddisonApp.class)
public class PortfolioResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_URL = "AAAAAAAAAA";
    private static final String UPDATED_URL = "BBBBBBBBBB";

    private static final byte[] DEFAULT_PHOTO = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_PHOTO = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_PHOTO_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_PHOTO_CONTENT_TYPE = "image/png";

    private static final Boolean DEFAULT_STATUS = false;
    private static final Boolean UPDATED_STATUS = true;

    private static final ZonedDateTime DEFAULT_CREATED_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_CREATED_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_MODIFIED_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_MODIFIED_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_CREATED_BY = "AAAAAAAAAA";
    private static final String UPDATED_CREATED_BY = "BBBBBBBBBB";

    private static final String DEFAULT_MODIFIED_BY = "AAAAAAAAAA";
    private static final String UPDATED_MODIFIED_BY = "BBBBBBBBBB";

    @Autowired
    private PortfolioRepository portfolioRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restPortfolioMockMvc;

    private Portfolio portfolio;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PortfolioResource portfolioResource = new PortfolioResource(portfolioRepository);
        this.restPortfolioMockMvc = MockMvcBuilders.standaloneSetup(portfolioResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Portfolio createEntity() {
        Portfolio portfolio = new Portfolio()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION)
            .url(DEFAULT_URL)
            .photo(DEFAULT_PHOTO)
            .photoContentType(DEFAULT_PHOTO_CONTENT_TYPE)
            .status(DEFAULT_STATUS)
            .createdDate(DEFAULT_CREATED_DATE)
            .modifiedDate(DEFAULT_MODIFIED_DATE)
            .createdBy(DEFAULT_CREATED_BY)
            .modifiedBy(DEFAULT_MODIFIED_BY);
        return portfolio;
    }

    @Before
    public void initTest() {
        portfolioRepository.deleteAll();
        portfolio = createEntity();
    }

    @Test
    public void createPortfolio() throws Exception {
        int databaseSizeBeforeCreate = portfolioRepository.findAll().size();

        // Create the Portfolio
        restPortfolioMockMvc.perform(post("/api/portfolios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(portfolio)))
            .andExpect(status().isCreated());

        // Validate the Portfolio in the database
        List<Portfolio> portfolioList = portfolioRepository.findAll();
        assertThat(portfolioList).hasSize(databaseSizeBeforeCreate + 1);
        Portfolio testPortfolio = portfolioList.get(portfolioList.size() - 1);
        assertThat(testPortfolio.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testPortfolio.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testPortfolio.getUrl()).isEqualTo(DEFAULT_URL);
        assertThat(testPortfolio.getPhoto()).isEqualTo(DEFAULT_PHOTO);
        assertThat(testPortfolio.getPhotoContentType()).isEqualTo(DEFAULT_PHOTO_CONTENT_TYPE);
        assertThat(testPortfolio.isStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testPortfolio.getCreatedDate()).isEqualTo(DEFAULT_CREATED_DATE);
        assertThat(testPortfolio.getModifiedDate()).isEqualTo(DEFAULT_MODIFIED_DATE);
        assertThat(testPortfolio.getCreatedBy()).isEqualTo(DEFAULT_CREATED_BY);
        assertThat(testPortfolio.getModifiedBy()).isEqualTo(DEFAULT_MODIFIED_BY);

    }

    @Test
    public void createPortfolioWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = portfolioRepository.findAll().size();

        // Create the Portfolio with an existing ID
        portfolio.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restPortfolioMockMvc.perform(post("/api/portfolios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(portfolio)))
            .andExpect(status().isBadRequest());

        // Validate the Portfolio in the database
        List<Portfolio> portfolioList = portfolioRepository.findAll();
        assertThat(portfolioList).hasSize(databaseSizeBeforeCreate);

    }

    @Test
    public void getAllPortfolios() throws Exception {
        // Initialize the database
        portfolioRepository.save(portfolio);

        // Get all the portfolioList
        restPortfolioMockMvc.perform(get("/api/portfolios?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(portfolio.getId())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].url").value(hasItem(DEFAULT_URL.toString())))
            .andExpect(jsonPath("$.[*].photoContentType").value(hasItem(DEFAULT_PHOTO_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].photo").value(hasItem(Base64Utils.encodeToString(DEFAULT_PHOTO))))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.booleanValue())))
            .andExpect(jsonPath("$.[*].createdDate").value(hasItem(sameInstant(DEFAULT_CREATED_DATE))))
            .andExpect(jsonPath("$.[*].modifiedDate").value(hasItem(sameInstant(DEFAULT_MODIFIED_DATE))))
            .andExpect(jsonPath("$.[*].createdBy").value(hasItem(DEFAULT_CREATED_BY.toString())))
            .andExpect(jsonPath("$.[*].modifiedBy").value(hasItem(DEFAULT_MODIFIED_BY.toString())));
    }
    
    @Test
    public void getPortfolio() throws Exception {
        // Initialize the database
        portfolioRepository.save(portfolio);

        // Get the portfolio
        restPortfolioMockMvc.perform(get("/api/portfolios/{id}", portfolio.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(portfolio.getId()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.url").value(DEFAULT_URL.toString()))
            .andExpect(jsonPath("$.photoContentType").value(DEFAULT_PHOTO_CONTENT_TYPE))
            .andExpect(jsonPath("$.photo").value(Base64Utils.encodeToString(DEFAULT_PHOTO)))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.booleanValue()))
            .andExpect(jsonPath("$.createdDate").value(sameInstant(DEFAULT_CREATED_DATE)))
            .andExpect(jsonPath("$.modifiedDate").value(sameInstant(DEFAULT_MODIFIED_DATE)))
            .andExpect(jsonPath("$.createdBy").value(DEFAULT_CREATED_BY.toString()))
            .andExpect(jsonPath("$.modifiedBy").value(DEFAULT_MODIFIED_BY.toString()));
    }

    @Test
    public void getNonExistingPortfolio() throws Exception {
        // Get the portfolio
        restPortfolioMockMvc.perform(get("/api/portfolios/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updatePortfolio() throws Exception {
        // Initialize the database
        portfolioRepository.save(portfolio);

        int databaseSizeBeforeUpdate = portfolioRepository.findAll().size();

        // Update the portfolio
        Portfolio updatedPortfolio = portfolioRepository.findById(portfolio.getId()).get();
        updatedPortfolio
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .url(UPDATED_URL)
            .photo(UPDATED_PHOTO)
            .photoContentType(UPDATED_PHOTO_CONTENT_TYPE)
            .status(UPDATED_STATUS)
            .createdDate(UPDATED_CREATED_DATE)
            .modifiedDate(UPDATED_MODIFIED_DATE)
            .createdBy(UPDATED_CREATED_BY)
            .modifiedBy(UPDATED_MODIFIED_BY);

        restPortfolioMockMvc.perform(put("/api/portfolios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPortfolio)))
            .andExpect(status().isOk());

        // Validate the Portfolio in the database
        List<Portfolio> portfolioList = portfolioRepository.findAll();
        assertThat(portfolioList).hasSize(databaseSizeBeforeUpdate);
        Portfolio testPortfolio = portfolioList.get(portfolioList.size() - 1);
        assertThat(testPortfolio.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testPortfolio.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testPortfolio.getUrl()).isEqualTo(UPDATED_URL);
        assertThat(testPortfolio.getPhoto()).isEqualTo(UPDATED_PHOTO);
        assertThat(testPortfolio.getPhotoContentType()).isEqualTo(UPDATED_PHOTO_CONTENT_TYPE);
        assertThat(testPortfolio.isStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testPortfolio.getCreatedDate()).isEqualTo(UPDATED_CREATED_DATE);
        assertThat(testPortfolio.getModifiedDate()).isEqualTo(UPDATED_MODIFIED_DATE);
        assertThat(testPortfolio.getCreatedBy()).isEqualTo(UPDATED_CREATED_BY);
        assertThat(testPortfolio.getModifiedBy()).isEqualTo(UPDATED_MODIFIED_BY);

    }

    @Test
    public void updateNonExistingPortfolio() throws Exception {
        int databaseSizeBeforeUpdate = portfolioRepository.findAll().size();

        // Create the Portfolio

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPortfolioMockMvc.perform(put("/api/portfolios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(portfolio)))
            .andExpect(status().isBadRequest());

        // Validate the Portfolio in the database
        List<Portfolio> portfolioList = portfolioRepository.findAll();
        assertThat(portfolioList).hasSize(databaseSizeBeforeUpdate);

    }

    @Test
    public void deletePortfolio() throws Exception {
        // Initialize the database
        portfolioRepository.save(portfolio);

        int databaseSizeBeforeDelete = portfolioRepository.findAll().size();

        // Delete the portfolio
        restPortfolioMockMvc.perform(delete("/api/portfolios/{id}", portfolio.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Portfolio> portfolioList = portfolioRepository.findAll();
        assertThat(portfolioList).hasSize(databaseSizeBeforeDelete - 1);

    }


    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Portfolio.class);
        Portfolio portfolio1 = new Portfolio();
        portfolio1.setId("id1");
        Portfolio portfolio2 = new Portfolio();
        portfolio2.setId(portfolio1.getId());
        assertThat(portfolio1).isEqualTo(portfolio2);
        portfolio2.setId("id2");
        assertThat(portfolio1).isNotEqualTo(portfolio2);
        portfolio1.setId(null);
        assertThat(portfolio1).isNotEqualTo(portfolio2);
    }
}

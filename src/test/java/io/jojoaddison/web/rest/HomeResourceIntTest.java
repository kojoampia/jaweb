package io.jojoaddison.web.rest;

import io.jojoaddison.JojoaddisonApp;

import io.jojoaddison.domain.Home;
import io.jojoaddison.repository.HomeRepository;
import io.jojoaddison.repository.search.HomeSearchRepository;
import io.jojoaddison.service.HomeService;
import io.jojoaddison.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.validation.Validator;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Collections;
import java.util.List;


import static io.jojoaddison.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the HomeResource REST controller.
 *
 * @see HomeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JojoaddisonApp.class)
public class HomeResourceIntTest {

    private static final String DEFAULT_HEADER = "AAAAAAAAAA";
    private static final String UPDATED_HEADER = "BBBBBBBBBB";

    private static final Instant DEFAULT_CREATED_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_MODIFIED_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_MODIFIED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_CREATED_BY = "AAAAAAAAAA";
    private static final String UPDATED_CREATED_BY = "BBBBBBBBBB";

    private static final String DEFAULT_MODIFIED_BY = "AAAAAAAAAA";
    private static final String UPDATED_MODIFIED_BY = "BBBBBBBBBB";

    private static final Boolean DEFAULT_CURRENT = false;
    private static final Boolean UPDATED_CURRENT = true;

    private static final Integer DEFAULT_VERSION = 1;
    private static final Integer UPDATED_VERSION = 2;

    private static final String DEFAULT_INFORMATION = "AAAAAAAAAA";
    private static final String UPDATED_INFORMATION = "BBBBBBBBBB";

    @Autowired
    private HomeRepository homeRepository;

    @Autowired
    private HomeService homeService;

    /**
     * This repository is mocked in the io.jojoaddison.repository.search test package.
     *
     * @see io.jojoaddison.repository.search.HomeSearchRepositoryMockConfiguration
     */
    @Autowired
    private HomeSearchRepository mockHomeSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restHomeMockMvc;

    private Home home;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final HomeResource homeResource = new HomeResource(homeService);
        this.restHomeMockMvc = MockMvcBuilders.standaloneSetup(homeResource)
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
    public static Home createEntity() {
        Home home = new Home()
            .header(DEFAULT_HEADER)
            .createdDate(DEFAULT_CREATED_DATE)
            .modifiedDate(DEFAULT_MODIFIED_DATE)
            .createdBy(DEFAULT_CREATED_BY)
            .modifiedBy(DEFAULT_MODIFIED_BY)
            .current(DEFAULT_CURRENT)
            .version(DEFAULT_VERSION)
            .information(DEFAULT_INFORMATION);
        return home;
    }

    @Before
    public void initTest() {
        homeRepository.deleteAll();
        home = createEntity();
    }

    @Test
    public void createHome() throws Exception {
        int databaseSizeBeforeCreate = homeRepository.findAll().size();

        // Create the Home
        restHomeMockMvc.perform(post("/api/homes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(home)))
            .andExpect(status().isCreated());

        // Validate the Home in the database
        List<Home> homeList = homeRepository.findAll();
        assertThat(homeList).hasSize(databaseSizeBeforeCreate + 1);
        Home testHome = homeList.get(homeList.size() - 1);
        assertThat(testHome.getHeader()).isEqualTo(DEFAULT_HEADER);
        assertThat(testHome.getCreatedDate()).isEqualTo(DEFAULT_CREATED_DATE);
        assertThat(testHome.getModifiedDate()).isEqualTo(DEFAULT_MODIFIED_DATE);
        assertThat(testHome.getCreatedBy()).isEqualTo(DEFAULT_CREATED_BY);
        assertThat(testHome.getModifiedBy()).isEqualTo(DEFAULT_MODIFIED_BY);
        assertThat(testHome.isCurrent()).isEqualTo(DEFAULT_CURRENT);
        assertThat(testHome.getVersion()).isEqualTo(DEFAULT_VERSION);
        assertThat(testHome.getInformation()).isEqualTo(DEFAULT_INFORMATION);

        // Validate the Home in Elasticsearch
        verify(mockHomeSearchRepository, times(1)).save(testHome);
    }

    @Test
    public void createHomeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = homeRepository.findAll().size();

        // Create the Home with an existing ID
        home.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restHomeMockMvc.perform(post("/api/homes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(home)))
            .andExpect(status().isBadRequest());

        // Validate the Home in the database
        List<Home> homeList = homeRepository.findAll();
        assertThat(homeList).hasSize(databaseSizeBeforeCreate);

        // Validate the Home in Elasticsearch
        verify(mockHomeSearchRepository, times(0)).save(home);
    }

    @Test
    public void getAllHomes() throws Exception {
        // Initialize the database
        homeRepository.save(home);

        // Get all the homeList
        restHomeMockMvc.perform(get("/api/homes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(home.getId())))
            .andExpect(jsonPath("$.[*].header").value(hasItem(DEFAULT_HEADER.toString())))
            .andExpect(jsonPath("$.[*].createdDate").value(hasItem(DEFAULT_CREATED_DATE.toString())))
            .andExpect(jsonPath("$.[*].modifiedDate").value(hasItem(DEFAULT_MODIFIED_DATE.toString())))
            .andExpect(jsonPath("$.[*].createdBy").value(hasItem(DEFAULT_CREATED_BY.toString())))
            .andExpect(jsonPath("$.[*].modifiedBy").value(hasItem(DEFAULT_MODIFIED_BY.toString())))
            .andExpect(jsonPath("$.[*].current").value(hasItem(DEFAULT_CURRENT.booleanValue())))
            .andExpect(jsonPath("$.[*].version").value(hasItem(DEFAULT_VERSION)))
            .andExpect(jsonPath("$.[*].information").value(hasItem(DEFAULT_INFORMATION.toString())));
    }
    
    @Test
    public void getHome() throws Exception {
        // Initialize the database
        homeRepository.save(home);

        // Get the home
        restHomeMockMvc.perform(get("/api/homes/{id}", home.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(home.getId()))
            .andExpect(jsonPath("$.header").value(DEFAULT_HEADER.toString()))
            .andExpect(jsonPath("$.createdDate").value(DEFAULT_CREATED_DATE.toString()))
            .andExpect(jsonPath("$.modifiedDate").value(DEFAULT_MODIFIED_DATE.toString()))
            .andExpect(jsonPath("$.createdBy").value(DEFAULT_CREATED_BY.toString()))
            .andExpect(jsonPath("$.modifiedBy").value(DEFAULT_MODIFIED_BY.toString()))
            .andExpect(jsonPath("$.current").value(DEFAULT_CURRENT.booleanValue()))
            .andExpect(jsonPath("$.version").value(DEFAULT_VERSION))
            .andExpect(jsonPath("$.information").value(DEFAULT_INFORMATION.toString()));
    }

    @Test
    public void getNonExistingHome() throws Exception {
        // Get the home
        restHomeMockMvc.perform(get("/api/homes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateHome() throws Exception {
        // Initialize the database
        homeService.save(home);
        // As the test used the service layer, reset the Elasticsearch mock repository
        reset(mockHomeSearchRepository);

        int databaseSizeBeforeUpdate = homeRepository.findAll().size();

        // Update the home
        Home updatedHome = homeRepository.findById(home.getId()).get();
        updatedHome
            .header(UPDATED_HEADER)
            .createdDate(UPDATED_CREATED_DATE)
            .modifiedDate(UPDATED_MODIFIED_DATE)
            .createdBy(UPDATED_CREATED_BY)
            .modifiedBy(UPDATED_MODIFIED_BY)
            .current(UPDATED_CURRENT)
            .version(UPDATED_VERSION)
            .information(UPDATED_INFORMATION);

        restHomeMockMvc.perform(put("/api/homes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedHome)))
            .andExpect(status().isOk());

        // Validate the Home in the database
        List<Home> homeList = homeRepository.findAll();
        assertThat(homeList).hasSize(databaseSizeBeforeUpdate);
        Home testHome = homeList.get(homeList.size() - 1);
        assertThat(testHome.getHeader()).isEqualTo(UPDATED_HEADER);
        assertThat(testHome.getCreatedDate()).isEqualTo(UPDATED_CREATED_DATE);
        assertThat(testHome.getModifiedDate()).isEqualTo(UPDATED_MODIFIED_DATE);
        assertThat(testHome.getCreatedBy()).isEqualTo(UPDATED_CREATED_BY);
        assertThat(testHome.getModifiedBy()).isEqualTo(UPDATED_MODIFIED_BY);
        assertThat(testHome.isCurrent()).isEqualTo(UPDATED_CURRENT);
        assertThat(testHome.getVersion()).isEqualTo(UPDATED_VERSION);
        assertThat(testHome.getInformation()).isEqualTo(UPDATED_INFORMATION);

        // Validate the Home in Elasticsearch
        verify(mockHomeSearchRepository, times(1)).save(testHome);
    }

    @Test
    public void updateNonExistingHome() throws Exception {
        int databaseSizeBeforeUpdate = homeRepository.findAll().size();

        // Create the Home

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restHomeMockMvc.perform(put("/api/homes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(home)))
            .andExpect(status().isBadRequest());

        // Validate the Home in the database
        List<Home> homeList = homeRepository.findAll();
        assertThat(homeList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Home in Elasticsearch
        verify(mockHomeSearchRepository, times(0)).save(home);
    }

    @Test
    public void deleteHome() throws Exception {
        // Initialize the database
        homeService.save(home);

        int databaseSizeBeforeDelete = homeRepository.findAll().size();

        // Delete the home
        restHomeMockMvc.perform(delete("/api/homes/{id}", home.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Home> homeList = homeRepository.findAll();
        assertThat(homeList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Home in Elasticsearch
        verify(mockHomeSearchRepository, times(1)).deleteById(home.getId());
    }

    @Test
    public void searchHome() throws Exception {
        // Initialize the database
        homeService.save(home);
        when(mockHomeSearchRepository.search(queryStringQuery("id:" + home.getId())))
            .thenReturn(Collections.singletonList(home));
        // Search the home
        restHomeMockMvc.perform(get("/api/_search/homes?query=id:" + home.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(home.getId())))
            .andExpect(jsonPath("$.[*].header").value(hasItem(DEFAULT_HEADER)))
            .andExpect(jsonPath("$.[*].createdDate").value(hasItem(DEFAULT_CREATED_DATE.toString())))
            .andExpect(jsonPath("$.[*].modifiedDate").value(hasItem(DEFAULT_MODIFIED_DATE.toString())))
            .andExpect(jsonPath("$.[*].createdBy").value(hasItem(DEFAULT_CREATED_BY)))
            .andExpect(jsonPath("$.[*].modifiedBy").value(hasItem(DEFAULT_MODIFIED_BY)))
            .andExpect(jsonPath("$.[*].current").value(hasItem(DEFAULT_CURRENT.booleanValue())))
            .andExpect(jsonPath("$.[*].version").value(hasItem(DEFAULT_VERSION)))
            .andExpect(jsonPath("$.[*].information").value(hasItem(DEFAULT_INFORMATION)));
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Home.class);
        Home home1 = new Home();
        home1.setId("id1");
        Home home2 = new Home();
        home2.setId(home1.getId());
        assertThat(home1).isEqualTo(home2);
        home2.setId("id2");
        assertThat(home1).isNotEqualTo(home2);
        home1.setId(null);
        assertThat(home1).isNotEqualTo(home2);
    }
}

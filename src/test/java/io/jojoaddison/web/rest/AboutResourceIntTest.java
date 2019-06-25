package io.jojoaddison.web.rest;

import io.jojoaddison.JojoaddisonApp;

import io.jojoaddison.domain.About;
import io.jojoaddison.repository.AboutRepository;
import io.jojoaddison.repository.search.AboutSearchRepository;
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
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the AboutResource REST controller.
 *
 * @see AboutResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JojoaddisonApp.class)
public class AboutResourceIntTest {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_CONTENT = "AAAAAAAAAA";
    private static final String UPDATED_CONTENT = "BBBBBBBBBB";

    private static final String DEFAULT_LANGUAGE = "AAAAAAAAAA";
    private static final String UPDATED_LANGUAGE = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_CREATED_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_CREATED_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_MODIFIED_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_MODIFIED_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_LAST_MODIFIED_BY = "AAAAAAAAAA";
    private static final String UPDATED_LAST_MODIFIED_BY = "BBBBBBBBBB";

    @Autowired
    private AboutRepository aboutRepository;

    /**
     * This repository is mocked in the io.jojoaddison.repository.search test package.
     *
     * @see io.jojoaddison.repository.search.AboutSearchRepositoryMockConfiguration
     */
    @Autowired
    private AboutSearchRepository mockAboutSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restAboutMockMvc;

    private About about;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AboutResource aboutResource = new AboutResource(aboutRepository, mockAboutSearchRepository);
        this.restAboutMockMvc = MockMvcBuilders.standaloneSetup(aboutResource)
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
    public static About createEntity() {
        About about = new About()
            .title(DEFAULT_TITLE)
            .content(DEFAULT_CONTENT)
            .language(DEFAULT_LANGUAGE)
            .createdDate(DEFAULT_CREATED_DATE)
            .modifiedDate(DEFAULT_MODIFIED_DATE)
            .lastModifiedBy(DEFAULT_LAST_MODIFIED_BY);
        return about;
    }

    @Before
    public void initTest() {
        aboutRepository.deleteAll();
        about = createEntity();
    }

    @Test
    public void createAbout() throws Exception {
        int databaseSizeBeforeCreate = aboutRepository.findAll().size();

        // Create the About
        restAboutMockMvc.perform(post("/api/abouts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(about)))
            .andExpect(status().isCreated());

        // Validate the About in the database
        List<About> aboutList = aboutRepository.findAll();
        assertThat(aboutList).hasSize(databaseSizeBeforeCreate + 1);
        About testAbout = aboutList.get(aboutList.size() - 1);
        assertThat(testAbout.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testAbout.getContent()).isEqualTo(DEFAULT_CONTENT);
        assertThat(testAbout.getLanguage()).isEqualTo(DEFAULT_LANGUAGE);
        assertThat(testAbout.getCreatedDate()).isEqualTo(DEFAULT_CREATED_DATE);
        assertThat(testAbout.getModifiedDate()).isEqualTo(DEFAULT_MODIFIED_DATE);
        assertThat(testAbout.getLastModifiedBy()).isEqualTo(DEFAULT_LAST_MODIFIED_BY);

        // Validate the About in Elasticsearch
        verify(mockAboutSearchRepository, times(1)).save(testAbout);
    }

    @Test
    public void createAboutWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = aboutRepository.findAll().size();

        // Create the About with an existing ID
        about.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restAboutMockMvc.perform(post("/api/abouts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(about)))
            .andExpect(status().isBadRequest());

        // Validate the About in the database
        List<About> aboutList = aboutRepository.findAll();
        assertThat(aboutList).hasSize(databaseSizeBeforeCreate);

        // Validate the About in Elasticsearch
        verify(mockAboutSearchRepository, times(0)).save(about);
    }

    @Test
    public void getAllAbouts() throws Exception {
        // Initialize the database
        aboutRepository.save(about);

        // Get all the aboutList
        restAboutMockMvc.perform(get("/api/abouts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(about.getId())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
            .andExpect(jsonPath("$.[*].content").value(hasItem(DEFAULT_CONTENT.toString())))
            .andExpect(jsonPath("$.[*].language").value(hasItem(DEFAULT_LANGUAGE.toString())))
            .andExpect(jsonPath("$.[*].createdDate").value(hasItem(sameInstant(DEFAULT_CREATED_DATE))))
            .andExpect(jsonPath("$.[*].modifiedDate").value(hasItem(sameInstant(DEFAULT_MODIFIED_DATE))))
            .andExpect(jsonPath("$.[*].lastModifiedBy").value(hasItem(DEFAULT_LAST_MODIFIED_BY.toString())));
    }
    
    @Test
    public void getAbout() throws Exception {
        // Initialize the database
        aboutRepository.save(about);

        // Get the about
        restAboutMockMvc.perform(get("/api/abouts/{id}", about.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(about.getId()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE.toString()))
            .andExpect(jsonPath("$.content").value(DEFAULT_CONTENT.toString()))
            .andExpect(jsonPath("$.language").value(DEFAULT_LANGUAGE.toString()))
            .andExpect(jsonPath("$.createdDate").value(sameInstant(DEFAULT_CREATED_DATE)))
            .andExpect(jsonPath("$.modifiedDate").value(sameInstant(DEFAULT_MODIFIED_DATE)))
            .andExpect(jsonPath("$.lastModifiedBy").value(DEFAULT_LAST_MODIFIED_BY.toString()));
    }

    @Test
    public void getNonExistingAbout() throws Exception {
        // Get the about
        restAboutMockMvc.perform(get("/api/abouts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateAbout() throws Exception {
        // Initialize the database
        aboutRepository.save(about);

        int databaseSizeBeforeUpdate = aboutRepository.findAll().size();

        // Update the about
        About updatedAbout = aboutRepository.findById(about.getId()).get();
        updatedAbout
            .title(UPDATED_TITLE)
            .content(UPDATED_CONTENT)
            .language(UPDATED_LANGUAGE)
            .createdDate(UPDATED_CREATED_DATE)
            .modifiedDate(UPDATED_MODIFIED_DATE)
            .lastModifiedBy(UPDATED_LAST_MODIFIED_BY);

        restAboutMockMvc.perform(put("/api/abouts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAbout)))
            .andExpect(status().isOk());

        // Validate the About in the database
        List<About> aboutList = aboutRepository.findAll();
        assertThat(aboutList).hasSize(databaseSizeBeforeUpdate);
        About testAbout = aboutList.get(aboutList.size() - 1);
        assertThat(testAbout.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testAbout.getContent()).isEqualTo(UPDATED_CONTENT);
        assertThat(testAbout.getLanguage()).isEqualTo(UPDATED_LANGUAGE);
        assertThat(testAbout.getCreatedDate()).isEqualTo(UPDATED_CREATED_DATE);
        assertThat(testAbout.getModifiedDate()).isEqualTo(UPDATED_MODIFIED_DATE);
        assertThat(testAbout.getLastModifiedBy()).isEqualTo(UPDATED_LAST_MODIFIED_BY);

        // Validate the About in Elasticsearch
        verify(mockAboutSearchRepository, times(1)).save(testAbout);
    }

    @Test
    public void updateNonExistingAbout() throws Exception {
        int databaseSizeBeforeUpdate = aboutRepository.findAll().size();

        // Create the About

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAboutMockMvc.perform(put("/api/abouts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(about)))
            .andExpect(status().isBadRequest());

        // Validate the About in the database
        List<About> aboutList = aboutRepository.findAll();
        assertThat(aboutList).hasSize(databaseSizeBeforeUpdate);

        // Validate the About in Elasticsearch
        verify(mockAboutSearchRepository, times(0)).save(about);
    }

    @Test
    public void deleteAbout() throws Exception {
        // Initialize the database
        aboutRepository.save(about);

        int databaseSizeBeforeDelete = aboutRepository.findAll().size();

        // Delete the about
        restAboutMockMvc.perform(delete("/api/abouts/{id}", about.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<About> aboutList = aboutRepository.findAll();
        assertThat(aboutList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the About in Elasticsearch
        verify(mockAboutSearchRepository, times(1)).deleteById(about.getId());
    }

    @Test
    public void searchAbout() throws Exception {
        // Initialize the database
        aboutRepository.save(about);
        when(mockAboutSearchRepository.search(queryStringQuery("id:" + about.getId()), PageRequest.of(0, 20)))
            .thenReturn(new PageImpl<>(Collections.singletonList(about), PageRequest.of(0, 1), 1));
        // Search the about
        restAboutMockMvc.perform(get("/api/_search/abouts?query=id:" + about.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(about.getId())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE)))
            .andExpect(jsonPath("$.[*].content").value(hasItem(DEFAULT_CONTENT)))
            .andExpect(jsonPath("$.[*].language").value(hasItem(DEFAULT_LANGUAGE)))
            .andExpect(jsonPath("$.[*].createdDate").value(hasItem(sameInstant(DEFAULT_CREATED_DATE))))
            .andExpect(jsonPath("$.[*].modifiedDate").value(hasItem(sameInstant(DEFAULT_MODIFIED_DATE))))
            .andExpect(jsonPath("$.[*].lastModifiedBy").value(hasItem(DEFAULT_LAST_MODIFIED_BY)));
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(About.class);
        About about1 = new About();
        about1.setId("id1");
        About about2 = new About();
        about2.setId(about1.getId());
        assertThat(about1).isEqualTo(about2);
        about2.setId("id2");
        assertThat(about1).isNotEqualTo(about2);
        about1.setId(null);
        assertThat(about1).isNotEqualTo(about2);
    }
}

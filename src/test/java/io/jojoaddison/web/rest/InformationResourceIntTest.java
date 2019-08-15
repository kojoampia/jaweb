package io.jojoaddison.web.rest;

import io.jojoaddison.JojoaddisonApp;

import io.jojoaddison.domain.Information;
import io.jojoaddison.repository.InformationRepository;
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

import java.util.Collections;
import java.util.List;


import static io.jojoaddison.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the InformationResource REST controller.
 *
 * @see InformationResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JojoaddisonApp.class)
public class InformationResourceIntTest {

    private static final String DEFAULT_CONTENT = "AAAAAAAAAA";
    private static final String UPDATED_CONTENT = "BBBBBBBBBB";

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_BRIEF = "AAAAAAAAAA";
    private static final String UPDATED_BRIEF = "BBBBBBBBBB";

    private static final String DEFAULT_LINK_TEXT = "AAAAAAAAAA";
    private static final String UPDATED_LINK_TEXT = "BBBBBBBBBB";

    @Autowired
    private InformationRepository informationRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restInformationMockMvc;

    private Information information;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final InformationResource informationResource = new InformationResource(informationRepository);
        this.restInformationMockMvc = MockMvcBuilders.standaloneSetup(informationResource)
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
    public static Information createEntity() {
        Information information = new Information()
            .content(DEFAULT_CONTENT)
            .title(DEFAULT_TITLE)
            .brief(DEFAULT_BRIEF)
            .linkText(DEFAULT_LINK_TEXT);
        return information;
    }

    @Before
    public void initTest() {
        informationRepository.deleteAll();
        information = createEntity();
    }

    @Test
    public void createInformation() throws Exception {
        int databaseSizeBeforeCreate = informationRepository.findAll().size();

        // Create the Information
        restInformationMockMvc.perform(post("/api/information")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(information)))
            .andExpect(status().isCreated());

        // Validate the Information in the database
        List<Information> informationList = informationRepository.findAll();
        assertThat(informationList).hasSize(databaseSizeBeforeCreate + 1);
        Information testInformation = informationList.get(informationList.size() - 1);
        assertThat(testInformation.getContent()).isEqualTo(DEFAULT_CONTENT);
        assertThat(testInformation.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testInformation.getBrief()).isEqualTo(DEFAULT_BRIEF);
        assertThat(testInformation.getLinkText()).isEqualTo(DEFAULT_LINK_TEXT);

    }

    @Test
    public void createInformationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = informationRepository.findAll().size();

        // Create the Information with an existing ID
        information.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restInformationMockMvc.perform(post("/api/information")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(information)))
            .andExpect(status().isBadRequest());

        // Validate the Information in the database
        List<Information> informationList = informationRepository.findAll();
        assertThat(informationList).hasSize(databaseSizeBeforeCreate);

    }

    @Test
    public void getAllInformation() throws Exception {
        // Initialize the database
        informationRepository.save(information);

        // Get all the informationList
        restInformationMockMvc.perform(get("/api/information?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(information.getId())))
            .andExpect(jsonPath("$.[*].content").value(hasItem(DEFAULT_CONTENT.toString())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
            .andExpect(jsonPath("$.[*].brief").value(hasItem(DEFAULT_BRIEF.toString())))
            .andExpect(jsonPath("$.[*].linkText").value(hasItem(DEFAULT_LINK_TEXT.toString())));
    }
    
    @Test
    public void getInformation() throws Exception {
        // Initialize the database
        informationRepository.save(information);

        // Get the information
        restInformationMockMvc.perform(get("/api/information/{id}", information.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(information.getId()))
            .andExpect(jsonPath("$.content").value(DEFAULT_CONTENT.toString()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE.toString()))
            .andExpect(jsonPath("$.brief").value(DEFAULT_BRIEF.toString()))
            .andExpect(jsonPath("$.linkText").value(DEFAULT_LINK_TEXT.toString()));
    }

    @Test
    public void getNonExistingInformation() throws Exception {
        // Get the information
        restInformationMockMvc.perform(get("/api/information/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateInformation() throws Exception {
        // Initialize the database
        informationRepository.save(information);

        int databaseSizeBeforeUpdate = informationRepository.findAll().size();

        // Update the information
        Information updatedInformation = informationRepository.findById(information.getId()).get();
        updatedInformation
            .content(UPDATED_CONTENT)
            .title(UPDATED_TITLE)
            .brief(UPDATED_BRIEF)
            .linkText(UPDATED_LINK_TEXT);

        restInformationMockMvc.perform(put("/api/information")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedInformation)))
            .andExpect(status().isOk());

        // Validate the Information in the database
        List<Information> informationList = informationRepository.findAll();
        assertThat(informationList).hasSize(databaseSizeBeforeUpdate);
        Information testInformation = informationList.get(informationList.size() - 1);
        assertThat(testInformation.getContent()).isEqualTo(UPDATED_CONTENT);
        assertThat(testInformation.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testInformation.getBrief()).isEqualTo(UPDATED_BRIEF);
        assertThat(testInformation.getLinkText()).isEqualTo(UPDATED_LINK_TEXT);

    }

    @Test
    public void updateNonExistingInformation() throws Exception {
        int databaseSizeBeforeUpdate = informationRepository.findAll().size();

        // Create the Information

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restInformationMockMvc.perform(put("/api/information")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(information)))
            .andExpect(status().isBadRequest());

        // Validate the Information in the database
        List<Information> informationList = informationRepository.findAll();
        assertThat(informationList).hasSize(databaseSizeBeforeUpdate);

    }

    @Test
    public void deleteInformation() throws Exception {
        // Initialize the database
        informationRepository.save(information);

        int databaseSizeBeforeDelete = informationRepository.findAll().size();

        // Delete the information
        restInformationMockMvc.perform(delete("/api/information/{id}", information.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Information> informationList = informationRepository.findAll();
        assertThat(informationList).hasSize(databaseSizeBeforeDelete - 1);

    }


    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Information.class);
        Information information1 = new Information();
        information1.setId("id1");
        Information information2 = new Information();
        information2.setId(information1.getId());
        assertThat(information1).isEqualTo(information2);
        information2.setId("id2");
        assertThat(information1).isNotEqualTo(information2);
        information1.setId(null);
        assertThat(information1).isNotEqualTo(information2);
    }
}

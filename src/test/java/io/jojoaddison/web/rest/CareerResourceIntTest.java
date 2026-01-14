package io.jojoaddison.web.rest;

import static io.jojoaddison.web.rest.TestUtil.createFormattingConversionService;
import static io.jojoaddison.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.time.Instant;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.util.List;

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

import io.jojoaddison.JojoaddisonApp;
import io.jojoaddison.domain.Career;
import io.jojoaddison.repository.CareerRepository;
import io.jojoaddison.web.rest.errors.ExceptionTranslator;

/**
 * Test class for the CareerResource REST controller.
 *
 * @see CareerResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JojoaddisonApp.class)
public class CareerResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_DEPARTMENT = "AAAAAAAAAA";
    private static final String UPDATED_DEPARTMENT = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_CREATED_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_CREATED_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_MODIFIED_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_MODIFIED_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_LAST_MODIFIED_BY = "AAAAAAAAAA";
    private static final String UPDATED_LAST_MODIFIED_BY = "BBBBBBBBBB";

    @Autowired
    private CareerRepository careerRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restCareerMockMvc;

    private Career career;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CareerResource careerResource = new CareerResource(careerRepository);
        this.restCareerMockMvc = MockMvcBuilders.standaloneSetup(careerResource)
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
    public static Career createEntity() {
        Career career = new Career()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION)
            .department(DEFAULT_DEPARTMENT)
            .createdDate(DEFAULT_CREATED_DATE)
            .modifiedDate(DEFAULT_MODIFIED_DATE)
            .lastModifiedBy(DEFAULT_LAST_MODIFIED_BY);
        return career;
    }

    @Before
    public void initTest() {
        careerRepository.deleteAll();
        career = createEntity();
    }

    @Test
    public void createCareer() throws Exception {
        int databaseSizeBeforeCreate = careerRepository.findAll().size();

        // Create the Career
        restCareerMockMvc.perform(post("/api/careers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(career)))
            .andExpect(status().isCreated());

        // Validate the Career in the database
        List<Career> careerList = careerRepository.findAll();
        assertThat(careerList).hasSize(databaseSizeBeforeCreate + 1);
        Career testCareer = careerList.get(careerList.size() - 1);
        assertThat(testCareer.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testCareer.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testCareer.getDepartment()).isEqualTo(DEFAULT_DEPARTMENT);
        assertThat(testCareer.getCreatedDate()).isEqualTo(DEFAULT_CREATED_DATE);
        assertThat(testCareer.getModifiedDate()).isEqualTo(DEFAULT_MODIFIED_DATE);
        assertThat(testCareer.getLastModifiedBy()).isEqualTo(DEFAULT_LAST_MODIFIED_BY);
    }

    @Test
    public void createCareerWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = careerRepository.findAll().size();

        // Create the Career with an existing ID
        career.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restCareerMockMvc.perform(post("/api/careers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(career)))
            .andExpect(status().isBadRequest());

        // Validate the Career in the database
        List<Career> careerList = careerRepository.findAll();
        assertThat(careerList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void getAllCareers() throws Exception {
        // Initialize the database
        careerRepository.save(career);

        // Get all the careerList
        restCareerMockMvc.perform(get("/api/careers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(career.getId())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].department").value(hasItem(DEFAULT_DEPARTMENT.toString())))
            .andExpect(jsonPath("$.[*].createdDate").value(hasItem(sameInstant(DEFAULT_CREATED_DATE))))
            .andExpect(jsonPath("$.[*].modifiedDate").value(hasItem(sameInstant(DEFAULT_MODIFIED_DATE))))
            .andExpect(jsonPath("$.[*].lastModifiedBy").value(hasItem(DEFAULT_LAST_MODIFIED_BY.toString())));
    }
    
    @Test
    public void getCareer() throws Exception {
        // Initialize the database
        careerRepository.save(career);

        // Get the career
        restCareerMockMvc.perform(get("/api/careers/{id}", career.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(career.getId()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.department").value(DEFAULT_DEPARTMENT.toString()))
            .andExpect(jsonPath("$.createdDate").value(sameInstant(DEFAULT_CREATED_DATE)))
            .andExpect(jsonPath("$.modifiedDate").value(sameInstant(DEFAULT_MODIFIED_DATE)))
            .andExpect(jsonPath("$.lastModifiedBy").value(DEFAULT_LAST_MODIFIED_BY.toString()));
    }

    @Test
    public void getNonExistingCareer() throws Exception {
        // Get the career
        restCareerMockMvc.perform(get("/api/careers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateCareer() throws Exception {
        // Initialize the database
        careerRepository.save(career);

        int databaseSizeBeforeUpdate = careerRepository.findAll().size();

        // Update the career
        Career updatedCareer = careerRepository.findById(career.getId()).get();
        updatedCareer
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .department(UPDATED_DEPARTMENT)
            .createdDate(UPDATED_CREATED_DATE)
            .modifiedDate(UPDATED_MODIFIED_DATE)
            .lastModifiedBy(UPDATED_LAST_MODIFIED_BY);

        restCareerMockMvc.perform(put("/api/careers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCareer)))
            .andExpect(status().isOk());

        // Validate the Career in the database
        List<Career> careerList = careerRepository.findAll();
        assertThat(careerList).hasSize(databaseSizeBeforeUpdate);
        Career testCareer = careerList.get(careerList.size() - 1);
        assertThat(testCareer.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testCareer.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testCareer.getDepartment()).isEqualTo(UPDATED_DEPARTMENT);
        assertThat(testCareer.getCreatedDate()).isEqualTo(UPDATED_CREATED_DATE);
        assertThat(testCareer.getModifiedDate()).isEqualTo(UPDATED_MODIFIED_DATE);
        assertThat(testCareer.getLastModifiedBy()).isEqualTo(UPDATED_LAST_MODIFIED_BY);
    }

    @Test
    public void updateNonExistingCareer() throws Exception {
        int databaseSizeBeforeUpdate = careerRepository.findAll().size();

        // Create the Career

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCareerMockMvc.perform(put("/api/careers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(career)))
            .andExpect(status().isBadRequest());

        // Validate the Career in the database
        List<Career> careerList = careerRepository.findAll();
        assertThat(careerList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteCareer() throws Exception {
        // Initialize the database
        careerRepository.save(career);

        int databaseSizeBeforeDelete = careerRepository.findAll().size();

        // Delete the career
        restCareerMockMvc.perform(delete("/api/careers/{id}", career.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Career> careerList = careerRepository.findAll();
        assertThat(careerList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Career.class);
        Career career1 = new Career();
        career1.setId("id1");
        Career career2 = new Career();
        career2.setId(career1.getId());
        assertThat(career1).isEqualTo(career2);
        career2.setId("id2");
        assertThat(career1).isNotEqualTo(career2);
        career1.setId(null);
        assertThat(career1).isNotEqualTo(career2);
    }
}

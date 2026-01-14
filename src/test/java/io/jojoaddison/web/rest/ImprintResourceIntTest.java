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
import java.time.temporal.ChronoUnit;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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
import io.jojoaddison.domain.Imprint;
import io.jojoaddison.domain.Slide;
import io.jojoaddison.repository.ImprintRepository;
import io.jojoaddison.web.rest.errors.ExceptionTranslator;

/**
 * Test class for the ImprintResource REST controller.
 *
 * @see ImprintResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JojoaddisonApp.class)
public class ImprintResourceIntTest {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_CONTENT = "AAAAAAAAAA";
    private static final String UPDATED_CONTENT = "BBBBBBBBBB";

    private static final Set<Slide> DEFAULT_SLIDES = new HashSet<>();
    private static final Set<Slide> UPDATED_SLIDES = new HashSet<>();

    private static final ZonedDateTime DEFAULT_CREATED_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_CREATED_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_MODIFIED_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_MODIFIED_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_LAST_MODIFIED_BY = "AAAAAAAAAA";
    private static final String UPDATED_LAST_MODIFIED_BY = "BBBBBBBBBB";


    private static final byte[] DEFAULT_PHOTO = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_PHOTO = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_PHOTO_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_PHOTO_CONTENT_TYPE = "image/png";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_URL = "AAAAAAAAAA";
    private static final String UPDATED_URL = "BBBBBBBBBB";

    private static final Instant SLIDE_DEFAULT_CREATED_DATE = Instant.ofEpochMilli(0L);
    private static final Instant SLIDE_UPDATED_CREATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant SLIDE_DEFAULT_MODIFIED_DATE = Instant.ofEpochMilli(0L);
    private static final Instant SLIDE_UPDATED_MODIFIED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_CREATED_BY = "AAAAAAAAAA";
    private static final String UPDATED_CREATED_BY = "BBBBBBBBBB";

    private static final String DEFAULT_MODIFIED_BY = "AAAAAAAAAA";
    private static final String UPDATED_MODIFIED_BY = "BBBBBBBBBB";

    @Autowired
    private ImprintRepository imprintRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restImprintMockMvc;

    private Imprint imprint;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ImprintResource imprintResource = new ImprintResource(imprintRepository);
        this.restImprintMockMvc = MockMvcBuilders.standaloneSetup(imprintResource)
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
    public static Imprint createEntity() {
        Slide slide = new Slide()
            .title(DEFAULT_TITLE)
            .description(DEFAULT_DESCRIPTION)
            .url(DEFAULT_URL)
            .photo(DEFAULT_PHOTO)
            .photoContentType(DEFAULT_PHOTO_CONTENT_TYPE)
            .createdDate(SLIDE_DEFAULT_CREATED_DATE)
            .modifiedDate(SLIDE_DEFAULT_MODIFIED_DATE)
            .createdBy(DEFAULT_CREATED_BY)
            .modifiedBy(DEFAULT_MODIFIED_BY);
        DEFAULT_SLIDES.add(slide);
        Imprint imprint = new Imprint()
            .title(DEFAULT_TITLE)
            .content(DEFAULT_CONTENT)
            .slides(DEFAULT_SLIDES)
            .createdDate(DEFAULT_CREATED_DATE)
            .modifiedDate(DEFAULT_MODIFIED_DATE)
            .lastModifiedBy(DEFAULT_LAST_MODIFIED_BY);
        return imprint;
    }

    @Before
    public void initTest() {
        imprintRepository.deleteAll();
        imprint = createEntity();
    }

    @Test
    public void createImprint() throws Exception {
        int databaseSizeBeforeCreate = imprintRepository.findAll().size();

        // Create the Imprint
        restImprintMockMvc.perform(post("/api/imprints")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(imprint)))
            .andExpect(status().isCreated());

        // Validate the Imprint in the database
        List<Imprint> imprintList = imprintRepository.findAll();
        assertThat(imprintList).hasSize(databaseSizeBeforeCreate + 1);
        Imprint testImprint = imprintList.get(imprintList.size() - 1);
        assertThat(testImprint.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testImprint.getContent()).isEqualTo(DEFAULT_CONTENT);
        assertThat(testImprint.getSlides()).isEqualTo(DEFAULT_SLIDES);
        assertThat(testImprint.getCreatedDate()).isEqualTo(DEFAULT_CREATED_DATE);
        assertThat(testImprint.getModifiedDate()).isEqualTo(DEFAULT_MODIFIED_DATE);
        assertThat(testImprint.getLastModifiedBy()).isEqualTo(DEFAULT_LAST_MODIFIED_BY);

    }

    @Test
    public void createImprintWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = imprintRepository.findAll().size();

        // Create the Imprint with an existing ID
        imprint.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restImprintMockMvc.perform(post("/api/imprints")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(imprint)))
            .andExpect(status().isBadRequest());

        // Validate the Imprint in the database
        List<Imprint> imprintList = imprintRepository.findAll();
        assertThat(imprintList).hasSize(databaseSizeBeforeCreate);

    }

    @Test
    public void getAllImprints() throws Exception {
        // Initialize the database
        imprintRepository.save(imprint);

        // Get all the imprintList
        restImprintMockMvc.perform(get("/api/imprints?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(imprint.getId())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
            .andExpect(jsonPath("$.[*].content").value(hasItem(DEFAULT_CONTENT.toString())))
            .andExpect(jsonPath("$.[*].slides").value(hasItem(DEFAULT_SLIDES.toString())))
            .andExpect(jsonPath("$.[*].createdDate").value(hasItem(sameInstant(DEFAULT_CREATED_DATE))))
            .andExpect(jsonPath("$.[*].modifiedDate").value(hasItem(sameInstant(DEFAULT_MODIFIED_DATE))))
            .andExpect(jsonPath("$.[*].lastModifiedBy").value(hasItem(DEFAULT_LAST_MODIFIED_BY.toString())));
    }

    @Test
    public void getImprint() throws Exception {
        // Initialize the database
        imprintRepository.save(imprint);

        // Get the imprint
        restImprintMockMvc.perform(get("/api/imprints/{id}", imprint.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(imprint.getId()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE.toString()))
            .andExpect(jsonPath("$.content").value(DEFAULT_CONTENT.toString()))
            .andExpect(jsonPath("$.slides").value(DEFAULT_SLIDES.toString()))
            .andExpect(jsonPath("$.createdDate").value(sameInstant(DEFAULT_CREATED_DATE)))
            .andExpect(jsonPath("$.modifiedDate").value(sameInstant(DEFAULT_MODIFIED_DATE)))
            .andExpect(jsonPath("$.lastModifiedBy").value(DEFAULT_LAST_MODIFIED_BY.toString()));
    }

    @Test
    public void getNonExistingImprint() throws Exception {
        // Get the imprint
        restImprintMockMvc.perform(get("/api/imprints/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateImprint() throws Exception {
        // Initialize the database
        imprintRepository.save(imprint);

        int databaseSizeBeforeUpdate = imprintRepository.findAll().size();

        Slide slide = new Slide()
            .title(UPDATED_TITLE)
            .description(UPDATED_DESCRIPTION)
            .url(UPDATED_URL)
            .photo(UPDATED_PHOTO)
            .photoContentType(UPDATED_PHOTO_CONTENT_TYPE)
            .createdDate(SLIDE_UPDATED_CREATED_DATE)
            .modifiedDate(SLIDE_UPDATED_MODIFIED_DATE)
            .createdBy(UPDATED_CREATED_BY)
            .modifiedBy(UPDATED_MODIFIED_BY);
        UPDATED_SLIDES.add(slide);

        // Update the imprint
        Imprint updatedImprint = imprintRepository.findById(imprint.getId()).orElseThrow();
        updatedImprint
            .title(UPDATED_TITLE)
            .content(UPDATED_CONTENT)
            .slides(UPDATED_SLIDES)
            .createdDate(UPDATED_CREATED_DATE)
            .modifiedDate(UPDATED_MODIFIED_DATE)
            .lastModifiedBy(UPDATED_LAST_MODIFIED_BY);

        restImprintMockMvc.perform(put("/api/imprints")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedImprint)))
            .andExpect(status().isOk());

        // Validate the Imprint in the database
        List<Imprint> imprintList = imprintRepository.findAll();
        assertThat(imprintList).hasSize(databaseSizeBeforeUpdate);
        Imprint testImprint = imprintList.get(imprintList.size() - 1);
        assertThat(testImprint.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testImprint.getContent()).isEqualTo(UPDATED_CONTENT);
        assertThat(testImprint.getSlides()).isEqualTo(UPDATED_SLIDES);
        assertThat(testImprint.getCreatedDate()).isEqualTo(UPDATED_CREATED_DATE);
        assertThat(testImprint.getModifiedDate()).isEqualTo(UPDATED_MODIFIED_DATE);
        assertThat(testImprint.getLastModifiedBy()).isEqualTo(UPDATED_LAST_MODIFIED_BY);

    }

    @Test
    public void updateNonExistingImprint() throws Exception {
        int databaseSizeBeforeUpdate = imprintRepository.findAll().size();

        // Create the Imprint

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restImprintMockMvc.perform(put("/api/imprints")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(imprint)))
            .andExpect(status().isBadRequest());

        // Validate the Imprint in the database
        List<Imprint> imprintList = imprintRepository.findAll();
        assertThat(imprintList).hasSize(databaseSizeBeforeUpdate);

    }

    @Test
    public void deleteImprint() throws Exception {
        // Initialize the database
        imprintRepository.save(imprint);

        int databaseSizeBeforeDelete = imprintRepository.findAll().size();

        // Delete the imprint
        restImprintMockMvc.perform(delete("/api/imprints/{id}", imprint.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Imprint> imprintList = imprintRepository.findAll();
        assertThat(imprintList).hasSize(databaseSizeBeforeDelete - 1);

    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Imprint.class);
        Imprint imprint1 = new Imprint();
        imprint1.setId("id1");
        Imprint imprint2 = new Imprint();
        imprint2.setId(imprint1.getId());
        assertThat(imprint1).isEqualTo(imprint2);
        imprint2.setId("id2");
        assertThat(imprint1).isNotEqualTo(imprint2);
        imprint1.setId(null);
        assertThat(imprint1).isNotEqualTo(imprint2);
    }
}

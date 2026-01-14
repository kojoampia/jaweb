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
import io.jojoaddison.domain.ContactMessage;
import io.jojoaddison.repository.ContactMessageRepository;
import io.jojoaddison.web.rest.errors.ExceptionTranslator;

/**
 * Test class for the ContactMessageResource REST controller.
 *
 * @see ContactMessageResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JojoaddisonApp.class)
public class ContactMessageResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_MESSAGE = "AAAAAAAAAA";
    private static final String UPDATED_MESSAGE = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_CREATED_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_CREATED_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    @Autowired
    private ContactMessageRepository contactMessageRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restContactMessageMockMvc;

    private ContactMessage contactMessage;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ContactMessageResource contactMessageResource = new ContactMessageResource(contactMessageRepository);
        this.restContactMessageMockMvc = MockMvcBuilders.standaloneSetup(contactMessageResource)
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
    public static ContactMessage createEntity() {
        ContactMessage contactMessage = new ContactMessage()
            .name(DEFAULT_NAME)
            .email(DEFAULT_EMAIL)
            .title(DEFAULT_TITLE)
            .message(DEFAULT_MESSAGE)
            .createdDate(DEFAULT_CREATED_DATE);
        return contactMessage;
    }

    @Before
    public void initTest() {
        contactMessageRepository.deleteAll();
        contactMessage = createEntity();
    }

    @Test
    public void createContactMessage() throws Exception {
        int databaseSizeBeforeCreate = contactMessageRepository.findAll().size();

        // Create the ContactMessage
        restContactMessageMockMvc.perform(post("/api/contact-messages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contactMessage)))
            .andExpect(status().isCreated());

        // Validate the ContactMessage in the database
        List<ContactMessage> contactMessageList = contactMessageRepository.findAll();
        assertThat(contactMessageList).hasSize(databaseSizeBeforeCreate + 1);
        ContactMessage testContactMessage = contactMessageList.get(contactMessageList.size() - 1);
        assertThat(testContactMessage.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testContactMessage.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testContactMessage.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testContactMessage.getMessage()).isEqualTo(DEFAULT_MESSAGE);
        assertThat(testContactMessage.getCreatedDate()).isEqualTo(DEFAULT_CREATED_DATE);

    }

    @Test
    public void createContactMessageWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = contactMessageRepository.findAll().size();

        // Create the ContactMessage with an existing ID
        contactMessage.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restContactMessageMockMvc.perform(post("/api/contact-messages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contactMessage)))
            .andExpect(status().isBadRequest());

        // Validate the ContactMessage in the database
        List<ContactMessage> contactMessageList = contactMessageRepository.findAll();
        assertThat(contactMessageList).hasSize(databaseSizeBeforeCreate);

    }

    @Test
    public void checkEmailIsRequired() throws Exception {
        int databaseSizeBeforeTest = contactMessageRepository.findAll().size();
        // set the field null
        contactMessage.setEmail(null);

        // Create the ContactMessage, which fails.

        restContactMessageMockMvc.perform(post("/api/contact-messages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contactMessage)))
            .andExpect(status().isBadRequest());

        List<ContactMessage> contactMessageList = contactMessageRepository.findAll();
        assertThat(contactMessageList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkTitleIsRequired() throws Exception {
        int databaseSizeBeforeTest = contactMessageRepository.findAll().size();
        // set the field null
        contactMessage.setTitle(null);

        // Create the ContactMessage, which fails.

        restContactMessageMockMvc.perform(post("/api/contact-messages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contactMessage)))
            .andExpect(status().isBadRequest());

        List<ContactMessage> contactMessageList = contactMessageRepository.findAll();
        assertThat(contactMessageList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkMessageIsRequired() throws Exception {
        int databaseSizeBeforeTest = contactMessageRepository.findAll().size();
        // set the field null
        contactMessage.setMessage(null);

        // Create the ContactMessage, which fails.

        restContactMessageMockMvc.perform(post("/api/contact-messages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contactMessage)))
            .andExpect(status().isBadRequest());

        List<ContactMessage> contactMessageList = contactMessageRepository.findAll();
        assertThat(contactMessageList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void getAllContactMessages() throws Exception {
        // Initialize the database
        contactMessageRepository.save(contactMessage);

        // Get all the contactMessageList
        restContactMessageMockMvc.perform(get("/api/contact-messages?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(contactMessage.getId())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
            .andExpect(jsonPath("$.[*].message").value(hasItem(DEFAULT_MESSAGE.toString())))
            .andExpect(jsonPath("$.[*].createdDate").value(hasItem(sameInstant(DEFAULT_CREATED_DATE))));
    }

    @Test
    public void getContactMessage() throws Exception {
        // Initialize the database
        contactMessageRepository.save(contactMessage);

        // Get the contactMessage
        restContactMessageMockMvc.perform(get("/api/contact-messages/{id}", contactMessage.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(contactMessage.getId()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE.toString()))
            .andExpect(jsonPath("$.message").value(DEFAULT_MESSAGE.toString()))
            .andExpect(jsonPath("$.createdDate").value(sameInstant(DEFAULT_CREATED_DATE)));
    }

    @Test
    public void getNonExistingContactMessage() throws Exception {
        // Get the contactMessage
        restContactMessageMockMvc.perform(get("/api/contact-messages/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateContactMessage() throws Exception {
        // Initialize the database
        contactMessageRepository.save(contactMessage);

        int databaseSizeBeforeUpdate = contactMessageRepository.findAll().size();

        // Update the contactMessage
        ContactMessage updatedContactMessage = contactMessageRepository.findById(contactMessage.getId()).orElseThrow();
        updatedContactMessage
            .name(UPDATED_NAME)
            .email(UPDATED_EMAIL)
            .title(UPDATED_TITLE)
            .message(UPDATED_MESSAGE)
            .createdDate(UPDATED_CREATED_DATE);

        restContactMessageMockMvc.perform(put("/api/contact-messages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedContactMessage)))
            .andExpect(status().isOk());

        // Validate the ContactMessage in the database
        List<ContactMessage> contactMessageList = contactMessageRepository.findAll();
        assertThat(contactMessageList).hasSize(databaseSizeBeforeUpdate);
        ContactMessage testContactMessage = contactMessageList.get(contactMessageList.size() - 1);
        assertThat(testContactMessage.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testContactMessage.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testContactMessage.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testContactMessage.getMessage()).isEqualTo(UPDATED_MESSAGE);
        assertThat(testContactMessage.getCreatedDate()).isEqualTo(UPDATED_CREATED_DATE);

    }

    @Test
    public void updateNonExistingContactMessage() throws Exception {
        int databaseSizeBeforeUpdate = contactMessageRepository.findAll().size();

        // Create the ContactMessage

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restContactMessageMockMvc.perform(put("/api/contact-messages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contactMessage)))
            .andExpect(status().isBadRequest());

        // Validate the ContactMessage in the database
        List<ContactMessage> contactMessageList = contactMessageRepository.findAll();
        assertThat(contactMessageList).hasSize(databaseSizeBeforeUpdate);

    }

    @Test
    public void deleteContactMessage() throws Exception {
        // Initialize the database
        contactMessageRepository.save(contactMessage);

        int databaseSizeBeforeDelete = contactMessageRepository.findAll().size();

        // Delete the contactMessage
        restContactMessageMockMvc.perform(delete("/api/contact-messages/{id}", contactMessage.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ContactMessage> contactMessageList = contactMessageRepository.findAll();
        assertThat(contactMessageList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void searchContactMessage() throws Exception {
        // Initialize the database
        contactMessageRepository.save(contactMessage);
        // Search the contactMessage
        restContactMessageMockMvc.perform(get("/api/_search/contact-messages?query=id:" + contactMessage.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(contactMessage.getId())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL)))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE)))
            .andExpect(jsonPath("$.[*].message").value(hasItem(DEFAULT_MESSAGE)))
            .andExpect(jsonPath("$.[*].createdDate").value(hasItem(sameInstant(DEFAULT_CREATED_DATE))));
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ContactMessage.class);
        ContactMessage contactMessage1 = new ContactMessage();
        contactMessage1.setId("id1");
        ContactMessage contactMessage2 = new ContactMessage();
        contactMessage2.setId(contactMessage1.getId());
        assertThat(contactMessage1).isEqualTo(contactMessage2);
        contactMessage2.setId("id2");
        assertThat(contactMessage1).isNotEqualTo(contactMessage2);
        contactMessage1.setId(null);
        assertThat(contactMessage1).isNotEqualTo(contactMessage2);
    }
}

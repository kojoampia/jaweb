package io.jojoaddison.web.rest;

import io.jojoaddison.JojoaddisonApp;

import io.jojoaddison.domain.Partner;
import io.jojoaddison.repository.PartnerRepository;
import io.jojoaddison.service.PhotoService;
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
import org.springframework.util.Base64Utils;
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
 * Test class for the PartnerResource REST controller.
 *
 * @see PartnerResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JojoaddisonApp.class)
public class PartnerResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_LINK = "AAAAAAAAAA";
    private static final String UPDATED_LINK = "BBBBBBBBBB";

    private static final byte[] DEFAULT_LOGO = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_LOGO = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_LOGO_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_LOGO_CONTENT_TYPE = "image/png";

    private static final String DEFAULT_COUNTRY = "AAAAAAAAAA";
    private static final String UPDATED_COUNTRY = "BBBBBBBBBB";

    private static final String DEFAULT_LOCATION = "AAAAAAAAAA";
    private static final String UPDATED_LOCATION = "BBBBBBBBBB";

    private static final String DEFAULT_POST_CODE = "AAAAAAAAAA";
    private static final String UPDATED_POST_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_STREET_ADDRESS = "AAAAAAAAAA";
    private static final String UPDATED_STREET_ADDRESS = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "//@[177.9.32.15]/";
    private static final String UPDATED_EMAIL = "/J.q6@[03.1.07.01]/";

    private static final String DEFAULT_CONTACT_PERSON = "AAAAAAAAAA";
    private static final String UPDATED_CONTACT_PERSON = "BBBBBBBBBB";

    @Autowired
    private PartnerRepository partnerRepository;

    @Autowired
    private PhotoService photoService;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restPartnerMockMvc;

    private Partner partner;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PartnerResource partnerResource = new PartnerResource(partnerRepository, photoService);
        this.restPartnerMockMvc = MockMvcBuilders.standaloneSetup(partnerResource)
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
    public static Partner createEntity() {
        Partner partner = new Partner()
            .name(DEFAULT_NAME)
            .link(DEFAULT_LINK)
            .logo(DEFAULT_LOGO)
            .logoContentType(DEFAULT_LOGO_CONTENT_TYPE)
            .country(DEFAULT_COUNTRY)
            .location(DEFAULT_LOCATION)
            .postCode(DEFAULT_POST_CODE)
            .streetAddress(DEFAULT_STREET_ADDRESS)
            .email(DEFAULT_EMAIL)
            .contactPerson(DEFAULT_CONTACT_PERSON);
        return partner;
    }

    @Before
    public void initTest() {
        partnerRepository.deleteAll();
        partner = createEntity();
    }

    @Test
    public void createPartner() throws Exception {
        int databaseSizeBeforeCreate = partnerRepository.findAll().size();

        // Create the Partner
        restPartnerMockMvc.perform(post("/api/partners")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(partner)))
            .andExpect(status().isCreated());

        // Validate the Partner in the database
        List<Partner> partnerList = partnerRepository.findAll();
        assertThat(partnerList).hasSize(databaseSizeBeforeCreate + 1);
        Partner testPartner = partnerList.get(partnerList.size() - 1);
        assertThat(testPartner.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testPartner.getLink()).isEqualTo(DEFAULT_LINK);
        assertThat(testPartner.getLogo()).isEqualTo(DEFAULT_LOGO);
        assertThat(testPartner.getLogoContentType()).isEqualTo(DEFAULT_LOGO_CONTENT_TYPE);
        assertThat(testPartner.getCountry()).isEqualTo(DEFAULT_COUNTRY);
        assertThat(testPartner.getLocation()).isEqualTo(DEFAULT_LOCATION);
        assertThat(testPartner.getPostCode()).isEqualTo(DEFAULT_POST_CODE);
        assertThat(testPartner.getStreetAddress()).isEqualTo(DEFAULT_STREET_ADDRESS);
        assertThat(testPartner.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testPartner.getContactPerson()).isEqualTo(DEFAULT_CONTACT_PERSON);

    }

    @Test
    public void createPartnerWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = partnerRepository.findAll().size();

        // Create the Partner with an existing ID
        partner.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restPartnerMockMvc.perform(post("/api/partners")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(partner)))
            .andExpect(status().isBadRequest());

        // Validate the Partner in the database
        List<Partner> partnerList = partnerRepository.findAll();
        assertThat(partnerList).hasSize(databaseSizeBeforeCreate);

    }

    @Test
    public void checkEmailIsRequired() throws Exception {
        int databaseSizeBeforeTest = partnerRepository.findAll().size();
        // set the field null
        partner.setEmail(null);

        // Create the Partner, which fails.

        restPartnerMockMvc.perform(post("/api/partners")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(partner)))
            .andExpect(status().isBadRequest());

        List<Partner> partnerList = partnerRepository.findAll();
        assertThat(partnerList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkContactPersonIsRequired() throws Exception {
        int databaseSizeBeforeTest = partnerRepository.findAll().size();
        // set the field null
        partner.setContactPerson(null);

        // Create the Partner, which fails.

        restPartnerMockMvc.perform(post("/api/partners")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(partner)))
            .andExpect(status().isBadRequest());

        List<Partner> partnerList = partnerRepository.findAll();
        assertThat(partnerList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void getAllPartners() throws Exception {
        // Initialize the database
        partnerRepository.save(partner);

        // Get all the partnerList
        restPartnerMockMvc.perform(get("/api/partners?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(partner.getId())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].link").value(hasItem(DEFAULT_LINK.toString())))
            .andExpect(jsonPath("$.[*].logoContentType").value(hasItem(DEFAULT_LOGO_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].logo").value(hasItem(Base64Utils.encodeToString(DEFAULT_LOGO))))
            .andExpect(jsonPath("$.[*].country").value(hasItem(DEFAULT_COUNTRY.toString())))
            .andExpect(jsonPath("$.[*].location").value(hasItem(DEFAULT_LOCATION.toString())))
            .andExpect(jsonPath("$.[*].postCode").value(hasItem(DEFAULT_POST_CODE.toString())))
            .andExpect(jsonPath("$.[*].streetAddress").value(hasItem(DEFAULT_STREET_ADDRESS.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].contactPerson").value(hasItem(DEFAULT_CONTACT_PERSON.toString())));
    }

    @Test
    public void getPartner() throws Exception {
        // Initialize the database
        partnerRepository.save(partner);

        // Get the partner
        restPartnerMockMvc.perform(get("/api/partners/{id}", partner.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(partner.getId()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.link").value(DEFAULT_LINK.toString()))
            .andExpect(jsonPath("$.logoContentType").value(DEFAULT_LOGO_CONTENT_TYPE))
            .andExpect(jsonPath("$.logo").value(Base64Utils.encodeToString(DEFAULT_LOGO)))
            .andExpect(jsonPath("$.country").value(DEFAULT_COUNTRY.toString()))
            .andExpect(jsonPath("$.location").value(DEFAULT_LOCATION.toString()))
            .andExpect(jsonPath("$.postCode").value(DEFAULT_POST_CODE.toString()))
            .andExpect(jsonPath("$.streetAddress").value(DEFAULT_STREET_ADDRESS.toString()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()))
            .andExpect(jsonPath("$.contactPerson").value(DEFAULT_CONTACT_PERSON.toString()));
    }

    @Test
    public void getNonExistingPartner() throws Exception {
        // Get the partner
        restPartnerMockMvc.perform(get("/api/partners/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updatePartner() throws Exception {
        // Initialize the database
        partnerRepository.save(partner);

        int databaseSizeBeforeUpdate = partnerRepository.findAll().size();

        // Update the partner
        Partner updatedPartner = partnerRepository.findById(partner.getId()).get();
        updatedPartner
            .name(UPDATED_NAME)
            .link(UPDATED_LINK)
            .logo(UPDATED_LOGO)
            .logoContentType(UPDATED_LOGO_CONTENT_TYPE)
            .country(UPDATED_COUNTRY)
            .location(UPDATED_LOCATION)
            .postCode(UPDATED_POST_CODE)
            .streetAddress(UPDATED_STREET_ADDRESS)
            .email(UPDATED_EMAIL)
            .contactPerson(UPDATED_CONTACT_PERSON);

        restPartnerMockMvc.perform(put("/api/partners")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPartner)))
            .andExpect(status().isOk());

        // Validate the Partner in the database
        List<Partner> partnerList = partnerRepository.findAll();
        assertThat(partnerList).hasSize(databaseSizeBeforeUpdate);
        Partner testPartner = partnerList.get(partnerList.size() - 1);
        assertThat(testPartner.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testPartner.getLink()).isEqualTo(UPDATED_LINK);
        assertThat(testPartner.getLogo()).isEqualTo(UPDATED_LOGO);
        assertThat(testPartner.getLogoContentType()).isEqualTo(UPDATED_LOGO_CONTENT_TYPE);
        assertThat(testPartner.getCountry()).isEqualTo(UPDATED_COUNTRY);
        assertThat(testPartner.getLocation()).isEqualTo(UPDATED_LOCATION);
        assertThat(testPartner.getPostCode()).isEqualTo(UPDATED_POST_CODE);
        assertThat(testPartner.getStreetAddress()).isEqualTo(UPDATED_STREET_ADDRESS);
        assertThat(testPartner.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testPartner.getContactPerson()).isEqualTo(UPDATED_CONTACT_PERSON);

    }

    @Test
    public void updateNonExistingPartner() throws Exception {
        int databaseSizeBeforeUpdate = partnerRepository.findAll().size();

        // Create the Partner

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPartnerMockMvc.perform(put("/api/partners")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(partner)))
            .andExpect(status().isBadRequest());

        // Validate the Partner in the database
        List<Partner> partnerList = partnerRepository.findAll();
        assertThat(partnerList).hasSize(databaseSizeBeforeUpdate);

    }

    @Test
    public void deletePartner() throws Exception {
        // Initialize the database
        partnerRepository.save(partner);

        int databaseSizeBeforeDelete = partnerRepository.findAll().size();

        // Delete the partner
        restPartnerMockMvc.perform(delete("/api/partners/{id}", partner.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Partner> partnerList = partnerRepository.findAll();
        assertThat(partnerList).hasSize(databaseSizeBeforeDelete - 1);

    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Partner.class);
        Partner partner1 = new Partner();
        partner1.setId("id1");
        Partner partner2 = new Partner();
        partner2.setId(partner1.getId());
        assertThat(partner1).isEqualTo(partner2);
        partner2.setId("id2");
        assertThat(partner1).isNotEqualTo(partner2);
        partner1.setId(null);
        assertThat(partner1).isNotEqualTo(partner2);
    }
}

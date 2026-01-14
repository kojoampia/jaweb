package io.jojoaddison.web.rest;

import static io.jojoaddison.web.rest.TestUtil.createFormattingConversionService;
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
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
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
import org.springframework.util.Base64Utils;
import org.springframework.validation.Validator;

import io.jojoaddison.JojoaddisonApp;
import io.jojoaddison.domain.Staff;
import io.jojoaddison.domain.enumeration.DocumentType;
import io.jojoaddison.service.StaffService;
import io.jojoaddison.web.rest.errors.ExceptionTranslator;
/**
 * Test class for the StaffResource REST controller.
 *
 * @see StaffResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JojoaddisonApp.class)
public class StaffResourceIntTest {

    private static final String DEFAULT_FIRST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_FIRST_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_LAST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_LAST_NAME = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE_OF_BIRTH = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_OF_BIRTH = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_DIGITAL_ADDRESS = "AAAAAAAAAA";
    private static final String UPDATED_DIGITAL_ADDRESS = "BBBBBBBBBB";

    private static final String DEFAULT_STREET_ADDRESS = "AAAAAAAAAA";
    private static final String UPDATED_STREET_ADDRESS = "BBBBBBBBBB";

    private static final String DEFAULT_POSTAL_ADDRESS = "AAAAAAAAAA";
    private static final String UPDATED_POSTAL_ADDRESS = "BBBBBBBBBB";

    private static final String DEFAULT_TOWN = "AAAAAAAAAA";
    private static final String UPDATED_TOWN = "BBBBBBBBBB";

    private static final String DEFAULT_DISTRICT = "AAAAAAAAAA";
    private static final String UPDATED_DISTRICT = "BBBBBBBBBB";

    private static final String DEFAULT_CITY = "AAAAAAAAAA";
    private static final String UPDATED_CITY = "BBBBBBBBBB";

    private static final String DEFAULT_REGION = "AAAAAAAAAA";
    private static final String UPDATED_REGION = "BBBBBBBBBB";

    private static final String DEFAULT_COUNTRY = "AAAAAAAAAA";
    private static final String UPDATED_COUNTRY = "BBBBBBBBBB";

    private static final byte[] DEFAULT_DIGITAL_PROFILE = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_DIGITAL_PROFILE = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_DIGITAL_PROFILE_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_DIGITAL_PROFILE_CONTENT_TYPE = "image/png";

    private static final String DEFAULT_ACCOUNT_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_ACCOUNT_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_ACCOUNT_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_ACCOUNT_TYPE = "BBBBBBBBBB";

    private static final byte[] DEFAULT_DOCUMENTS = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_DOCUMENTS = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_DOCUMENTS_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_DOCUMENTS_CONTENT_TYPE = "image/png";

    private static final Instant DEFAULT_CREATED_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_MODIFIED_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_MODIFIED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_LAST_MODIFIED_BY = "AAAAAAAAAA";
    private static final String UPDATED_LAST_MODIFIED_BY = "BBBBBBBBBB";

    private static final DocumentType DEFAULT_DOCUMENT_TYPE = DocumentType.NATIONAL_ID;
    private static final DocumentType UPDATED_DOCUMENT_TYPE = DocumentType.PASSPORT;

    @Autowired
    private StaffService staffService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restStaffMockMvc;

    private Staff staff;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final StaffResource staffResource = new StaffResource(staffService);
        this.restStaffMockMvc = MockMvcBuilders.standaloneSetup(staffResource)
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
    public static Staff createEntity() {
        Staff staff = new Staff()
            .firstName(DEFAULT_FIRST_NAME)
            .lastName(DEFAULT_LAST_NAME)
            .dateOfBirth(DEFAULT_DATE_OF_BIRTH)
            .email(DEFAULT_EMAIL)
            .digitalAddress(DEFAULT_DIGITAL_ADDRESS)
            .streetAddress(DEFAULT_STREET_ADDRESS)
            .postalAddress(DEFAULT_POSTAL_ADDRESS)
            .town(DEFAULT_TOWN)
            .district(DEFAULT_DISTRICT)
            .city(DEFAULT_CITY)
            .region(DEFAULT_REGION)
            .country(DEFAULT_COUNTRY)
            .digitalProfile(DEFAULT_DIGITAL_PROFILE)
            .digitalProfileContentType(DEFAULT_DIGITAL_PROFILE_CONTENT_TYPE)
            .accountNumber(DEFAULT_ACCOUNT_NUMBER)
            .accountType(DEFAULT_ACCOUNT_TYPE)
            .documents(DEFAULT_DOCUMENTS)
            .documentsContentType(DEFAULT_DOCUMENTS_CONTENT_TYPE)
            .createdDate(DEFAULT_CREATED_DATE)
            .modifiedDate(DEFAULT_MODIFIED_DATE)
            .lastModifiedBy(DEFAULT_LAST_MODIFIED_BY)
            .documentType(DEFAULT_DOCUMENT_TYPE);
        return staff;
    }

    @Before
    public void initTest() {
        staffService.deleteAll();
        staff = createEntity();
    }

    @Test
    public void createStaff() throws Exception {
        int databaseSizeBeforeCreate = staffService.findAll().size();

        // Create the Staff
        restStaffMockMvc.perform(post("/api/staff")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(staff)))
            .andExpect(status().isCreated());

        // Validate the Staff in the database
        List<Staff> staffList = staffService.findAll();
        assertThat(staffList).hasSize(databaseSizeBeforeCreate + 1);
        Staff testStaff = staffList.get(staffList.size() - 1);
        assertThat(testStaff.getFirstName()).isEqualTo(DEFAULT_FIRST_NAME);
        assertThat(testStaff.getLastName()).isEqualTo(DEFAULT_LAST_NAME);
        assertThat(testStaff.getDateOfBirth()).isEqualTo(DEFAULT_DATE_OF_BIRTH);
        assertThat(testStaff.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testStaff.getDigitalAddress()).isEqualTo(DEFAULT_DIGITAL_ADDRESS);
        assertThat(testStaff.getStreetAddress()).isEqualTo(DEFAULT_STREET_ADDRESS);
        assertThat(testStaff.getPostalAddress()).isEqualTo(DEFAULT_POSTAL_ADDRESS);
        assertThat(testStaff.getTown()).isEqualTo(DEFAULT_TOWN);
        assertThat(testStaff.getDistrict()).isEqualTo(DEFAULT_DISTRICT);
        assertThat(testStaff.getCity()).isEqualTo(DEFAULT_CITY);
        assertThat(testStaff.getRegion()).isEqualTo(DEFAULT_REGION);
        assertThat(testStaff.getCountry()).isEqualTo(DEFAULT_COUNTRY);
        assertThat(testStaff.getDigitalProfile()).isEqualTo(DEFAULT_DIGITAL_PROFILE);
        assertThat(testStaff.getDigitalProfileContentType()).isEqualTo(DEFAULT_DIGITAL_PROFILE_CONTENT_TYPE);
        assertThat(testStaff.getAccountNumber()).isEqualTo(DEFAULT_ACCOUNT_NUMBER);
        assertThat(testStaff.getAccountType()).isEqualTo(DEFAULT_ACCOUNT_TYPE);
        assertThat(testStaff.getDocuments()).isEqualTo(DEFAULT_DOCUMENTS);
        assertThat(testStaff.getDocumentsContentType()).isEqualTo(DEFAULT_DOCUMENTS_CONTENT_TYPE);
        assertThat(testStaff.getCreatedDate()).isEqualTo(DEFAULT_CREATED_DATE);
        assertThat(testStaff.getModifiedDate()).isEqualTo(DEFAULT_MODIFIED_DATE);
        assertThat(testStaff.getLastModifiedBy()).isEqualTo(DEFAULT_LAST_MODIFIED_BY);
        assertThat(testStaff.getDocumentType()).isEqualTo(DEFAULT_DOCUMENT_TYPE);
    }

    @Test
    public void createStaffWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = staffService.findAll().size();

        // Create the Staff with an existing ID
        staff.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restStaffMockMvc.perform(post("/api/staff")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(staff)))
            .andExpect(status().isBadRequest());

        // Validate the Staff in the database
        List<Staff> staffList = staffService.findAll();
        assertThat(staffList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void checkEmailIsRequired() throws Exception {
        int databaseSizeBeforeTest = staffService.findAll().size();
        // set the field null
        staff.setEmail(null);

        // Create the Staff, which fails.

        restStaffMockMvc.perform(post("/api/staff")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(staff)))
            .andExpect(status().isBadRequest());

        List<Staff> staffList = staffService.findAll();
        assertThat(staffList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkDocumentTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = staffService.findAll().size();
        // set the field null
        staff.setDocumentType(null);

        // Create the Staff, which fails.

        restStaffMockMvc.perform(post("/api/staff")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(staff)))
            .andExpect(status().isBadRequest());

        List<Staff> staffList = staffService.findAll();
        assertThat(staffList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void getAllStaff() throws Exception {
        // Initialize the database
        staffService.save(staff);

        // Get all the staffList
        restStaffMockMvc.perform(get("/api/staff?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(staff.getId())))
            .andExpect(jsonPath("$.[*].firstName").value(hasItem(DEFAULT_FIRST_NAME.toString())))
            .andExpect(jsonPath("$.[*].lastName").value(hasItem(DEFAULT_LAST_NAME.toString())))
            .andExpect(jsonPath("$.[*].dateOfBirth").value(hasItem(DEFAULT_DATE_OF_BIRTH.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].digitalAddress").value(hasItem(DEFAULT_DIGITAL_ADDRESS.toString())))
            .andExpect(jsonPath("$.[*].streetAddress").value(hasItem(DEFAULT_STREET_ADDRESS.toString())))
            .andExpect(jsonPath("$.[*].postalAddress").value(hasItem(DEFAULT_POSTAL_ADDRESS.toString())))
            .andExpect(jsonPath("$.[*].town").value(hasItem(DEFAULT_TOWN.toString())))
            .andExpect(jsonPath("$.[*].district").value(hasItem(DEFAULT_DISTRICT.toString())))
            .andExpect(jsonPath("$.[*].city").value(hasItem(DEFAULT_CITY.toString())))
            .andExpect(jsonPath("$.[*].region").value(hasItem(DEFAULT_REGION.toString())))
            .andExpect(jsonPath("$.[*].country").value(hasItem(DEFAULT_COUNTRY.toString())))
            .andExpect(jsonPath("$.[*].digitalProfileContentType").value(hasItem(DEFAULT_DIGITAL_PROFILE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].digitalProfile").value(hasItem(Base64Utils.encodeToString(DEFAULT_DIGITAL_PROFILE))))
            .andExpect(jsonPath("$.[*].accountNumber").value(hasItem(DEFAULT_ACCOUNT_NUMBER.toString())))
            .andExpect(jsonPath("$.[*].accountType").value(hasItem(DEFAULT_ACCOUNT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].documentsContentType").value(hasItem(DEFAULT_DOCUMENTS_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].documents").value(hasItem(Base64Utils.encodeToString(DEFAULT_DOCUMENTS))))
            .andExpect(jsonPath("$.[*].createdDate").value(hasItem(DEFAULT_CREATED_DATE.toString())))
            .andExpect(jsonPath("$.[*].modifiedDate").value(hasItem(DEFAULT_MODIFIED_DATE.toString())))
            .andExpect(jsonPath("$.[*].lastModifiedBy").value(hasItem(DEFAULT_LAST_MODIFIED_BY.toString())))
            .andExpect(jsonPath("$.[*].documentType").value(hasItem(DEFAULT_DOCUMENT_TYPE.toString())));
    }
    
    @Test
    public void getStaff() throws Exception {
        // Initialize the database
        staffService.save(staff);

        // Get the staff
        restStaffMockMvc.perform(get("/api/staff/{id}", staff.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(staff.getId()))
            .andExpect(jsonPath("$.firstName").value(DEFAULT_FIRST_NAME.toString()))
            .andExpect(jsonPath("$.lastName").value(DEFAULT_LAST_NAME.toString()))
            .andExpect(jsonPath("$.dateOfBirth").value(DEFAULT_DATE_OF_BIRTH.toString()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()))
            .andExpect(jsonPath("$.digitalAddress").value(DEFAULT_DIGITAL_ADDRESS.toString()))
            .andExpect(jsonPath("$.streetAddress").value(DEFAULT_STREET_ADDRESS.toString()))
            .andExpect(jsonPath("$.postalAddress").value(DEFAULT_POSTAL_ADDRESS.toString()))
            .andExpect(jsonPath("$.town").value(DEFAULT_TOWN.toString()))
            .andExpect(jsonPath("$.district").value(DEFAULT_DISTRICT.toString()))
            .andExpect(jsonPath("$.city").value(DEFAULT_CITY.toString()))
            .andExpect(jsonPath("$.region").value(DEFAULT_REGION.toString()))
            .andExpect(jsonPath("$.country").value(DEFAULT_COUNTRY.toString()))
            .andExpect(jsonPath("$.digitalProfileContentType").value(DEFAULT_DIGITAL_PROFILE_CONTENT_TYPE))
            .andExpect(jsonPath("$.digitalProfile").value(Base64Utils.encodeToString(DEFAULT_DIGITAL_PROFILE)))
            .andExpect(jsonPath("$.accountNumber").value(DEFAULT_ACCOUNT_NUMBER.toString()))
            .andExpect(jsonPath("$.accountType").value(DEFAULT_ACCOUNT_TYPE.toString()))
            .andExpect(jsonPath("$.documentsContentType").value(DEFAULT_DOCUMENTS_CONTENT_TYPE))
            .andExpect(jsonPath("$.documents").value(Base64Utils.encodeToString(DEFAULT_DOCUMENTS)))
            .andExpect(jsonPath("$.createdDate").value(DEFAULT_CREATED_DATE.toString()))
            .andExpect(jsonPath("$.modifiedDate").value(DEFAULT_MODIFIED_DATE.toString()))
            .andExpect(jsonPath("$.lastModifiedBy").value(DEFAULT_LAST_MODIFIED_BY.toString()))
            .andExpect(jsonPath("$.documentType").value(DEFAULT_DOCUMENT_TYPE.toString()));
    }

    @Test
    public void getNonExistingStaff() throws Exception {
        // Get the staff
        restStaffMockMvc.perform(get("/api/staff/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateStaff() throws Exception {
        // Initialize the database
        staffService.save(staff);

        int databaseSizeBeforeUpdate = staffService.findAll().size();

        // Update the staff
        Staff updatedStaff = staffService.findOne(staff.getId()).orElseThrow();
        updatedStaff
            .firstName(UPDATED_FIRST_NAME)
            .lastName(UPDATED_LAST_NAME)
            .dateOfBirth(UPDATED_DATE_OF_BIRTH)
            .email(UPDATED_EMAIL)
            .digitalAddress(UPDATED_DIGITAL_ADDRESS)
            .streetAddress(UPDATED_STREET_ADDRESS)
            .postalAddress(UPDATED_POSTAL_ADDRESS)
            .town(UPDATED_TOWN)
            .district(UPDATED_DISTRICT)
            .city(UPDATED_CITY)
            .region(UPDATED_REGION)
            .country(UPDATED_COUNTRY)
            .digitalProfile(UPDATED_DIGITAL_PROFILE)
            .digitalProfileContentType(UPDATED_DIGITAL_PROFILE_CONTENT_TYPE)
            .accountNumber(UPDATED_ACCOUNT_NUMBER)
            .accountType(UPDATED_ACCOUNT_TYPE)
            .documents(UPDATED_DOCUMENTS)
            .documentsContentType(UPDATED_DOCUMENTS_CONTENT_TYPE)
            .createdDate(UPDATED_CREATED_DATE)
            .modifiedDate(UPDATED_MODIFIED_DATE)
            .lastModifiedBy(UPDATED_LAST_MODIFIED_BY)
            .documentType(UPDATED_DOCUMENT_TYPE);

        restStaffMockMvc.perform(put("/api/staff")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedStaff)))
            .andExpect(status().isOk());

        // Validate the Staff in the database
        List<Staff> staffList = staffService.findAll();
        assertThat(staffList).hasSize(databaseSizeBeforeUpdate);
        Staff testStaff = staffList.get(staffList.size() - 1);
        assertThat(testStaff.getFirstName()).isEqualTo(UPDATED_FIRST_NAME);
        assertThat(testStaff.getLastName()).isEqualTo(UPDATED_LAST_NAME);
        assertThat(testStaff.getDateOfBirth()).isEqualTo(UPDATED_DATE_OF_BIRTH);
        assertThat(testStaff.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testStaff.getDigitalAddress()).isEqualTo(UPDATED_DIGITAL_ADDRESS);
        assertThat(testStaff.getStreetAddress()).isEqualTo(UPDATED_STREET_ADDRESS);
        assertThat(testStaff.getPostalAddress()).isEqualTo(UPDATED_POSTAL_ADDRESS);
        assertThat(testStaff.getTown()).isEqualTo(UPDATED_TOWN);
        assertThat(testStaff.getDistrict()).isEqualTo(UPDATED_DISTRICT);
        assertThat(testStaff.getCity()).isEqualTo(UPDATED_CITY);
        assertThat(testStaff.getRegion()).isEqualTo(UPDATED_REGION);
        assertThat(testStaff.getCountry()).isEqualTo(UPDATED_COUNTRY);
        assertThat(testStaff.getDigitalProfile()).isEqualTo(UPDATED_DIGITAL_PROFILE);
        assertThat(testStaff.getDigitalProfileContentType()).isEqualTo(UPDATED_DIGITAL_PROFILE_CONTENT_TYPE);
        assertThat(testStaff.getAccountNumber()).isEqualTo(UPDATED_ACCOUNT_NUMBER);
        assertThat(testStaff.getAccountType()).isEqualTo(UPDATED_ACCOUNT_TYPE);
        assertThat(testStaff.getDocuments()).isEqualTo(UPDATED_DOCUMENTS);
        assertThat(testStaff.getDocumentsContentType()).isEqualTo(UPDATED_DOCUMENTS_CONTENT_TYPE);
        assertThat(testStaff.getCreatedDate()).isEqualTo(UPDATED_CREATED_DATE);
        assertThat(testStaff.getModifiedDate()).isEqualTo(UPDATED_MODIFIED_DATE);
        assertThat(testStaff.getLastModifiedBy()).isEqualTo(UPDATED_LAST_MODIFIED_BY);
        assertThat(testStaff.getDocumentType()).isEqualTo(UPDATED_DOCUMENT_TYPE);
    }

    @Test
    public void updateNonExistingStaff() throws Exception {
        int databaseSizeBeforeUpdate = staffService.findAll().size();

        // Create the Staff

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restStaffMockMvc.perform(put("/api/staff")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(staff)))
            .andExpect(status().isBadRequest());

        // Validate the Staff in the database
        List<Staff> staffList = staffService.findAll();
        assertThat(staffList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteStaff() throws Exception {
        // Initialize the database
        staffService.save(staff);

        int databaseSizeBeforeDelete = staffService.findAll().size();

        // Delete the staff
        restStaffMockMvc.perform(delete("/api/staff/{id}", staff.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Staff> staffList = staffService.findAll();
        assertThat(staffList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Staff.class);
        Staff staff1 = new Staff();
        staff1.setId("id1");
        Staff staff2 = new Staff();
        staff2.setId(staff1.getId());
        assertThat(staff1).isEqualTo(staff2);
        staff2.setId("id2");
        assertThat(staff1).isNotEqualTo(staff2);
        staff1.setId(null);
        assertThat(staff1).isNotEqualTo(staff2);
    }
}

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
import io.jojoaddison.domain.Authority;
import io.jojoaddison.repository.AuthorityRepository;
import io.jojoaddison.web.rest.errors.ExceptionTranslator;

/**
 * Test class for the AuthorityResource REST controller.
 *
 * @see AuthorityResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JojoaddisonApp.class)
public class AuthorityResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private AuthorityRepository authorityRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restAuthorityMockMvc;

    private Authority authority;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AuthorityResource authorityResource = new AuthorityResource(authorityRepository);
        this.restAuthorityMockMvc = MockMvcBuilders.standaloneSetup(authorityResource)
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
    public static Authority createEntity() {
        Authority authority = new Authority()
            .name(DEFAULT_NAME);
        return authority;
    }

    @Before
    public void initTest() {
        authorityRepository.deleteAll();
        authority = createEntity();
    }

    @Test
    public void createAuthority() throws Exception {
        int databaseSizeBeforeCreate = authorityRepository.findAll().size();

        // Create the Authority
        restAuthorityMockMvc.perform(post("/api/authorities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(authority)))
            .andExpect(status().isCreated());

        // Validate the Authority in the database
        List<Authority> authorityList = authorityRepository.findAll();
        assertThat(authorityList).hasSize(databaseSizeBeforeCreate + 1);
        Authority testAuthority = authorityList.get(authorityList.size() - 1);
        assertThat(testAuthority.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    public void createAuthorityWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = authorityRepository.findAll().size();

        // Create the Authority with an existing ID
        authority.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restAuthorityMockMvc.perform(post("/api/authorities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(authority)))
            .andExpect(status().isBadRequest());

        // Validate the Authority in the database
        List<Authority> authorityList = authorityRepository.findAll();
        assertThat(authorityList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void getAllAuthorities() throws Exception {
        // Initialize the database
        authorityRepository.save(authority);

        // Get all the authorityList
        restAuthorityMockMvc.perform(get("/api/authorities?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(authority.getId())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }
    
    @Test
    public void getAuthority() throws Exception {
        // Initialize the database
        authorityRepository.save(authority);

        // Get the authority
        restAuthorityMockMvc.perform(get("/api/authorities/{id}", authority.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(authority.getId()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    public void getNonExistingAuthority() throws Exception {
        // Get the authority
        restAuthorityMockMvc.perform(get("/api/authorities/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateAuthority() throws Exception {
        // Initialize the database
        authorityRepository.save(authority);

        int databaseSizeBeforeUpdate = authorityRepository.findAll().size();

        // Update the authority
        Authority updatedAuthority = authorityRepository.findById(authority.getId()).orElseThrow();
        updatedAuthority
            .name(UPDATED_NAME);

        restAuthorityMockMvc.perform(put("/api/authorities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAuthority)))
            .andExpect(status().isOk());

        // Validate the Authority in the database
        List<Authority> authorityList = authorityRepository.findAll();
        assertThat(authorityList).hasSize(databaseSizeBeforeUpdate);
        Authority testAuthority = authorityList.get(authorityList.size() - 1);
        assertThat(testAuthority.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    public void updateNonExistingAuthority() throws Exception {
        int databaseSizeBeforeUpdate = authorityRepository.findAll().size();

        // Create the Authority

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAuthorityMockMvc.perform(put("/api/authorities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(authority)))
            .andExpect(status().isBadRequest());

        // Validate the Authority in the database
        List<Authority> authorityList = authorityRepository.findAll();
        assertThat(authorityList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteAuthority() throws Exception {
        // Initialize the database
        authorityRepository.save(authority);

        int databaseSizeBeforeDelete = authorityRepository.findAll().size();

        // Delete the authority
        restAuthorityMockMvc.perform(delete("/api/authorities/{id}", authority.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Authority> authorityList = authorityRepository.findAll();
        assertThat(authorityList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Authority.class);
        Authority authority1 = new Authority();
        authority1.setId("id1");
        Authority authority2 = new Authority();
        authority2.setId(authority1.getId());
        assertThat(authority1).isEqualTo(authority2);
        authority2.setId("id2");
        assertThat(authority1).isNotEqualTo(authority2);
        authority1.setId(null);
        assertThat(authority1).isNotEqualTo(authority2);
    }
}

package io.jojoaddison.web.rest;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.jojoaddison.domain.Privilege;
import io.jojoaddison.repository.PrivilegeRepository;
import io.jojoaddison.web.rest.errors.BadRequestAlertException;
import io.jojoaddison.web.rest.util.HeaderUtil;

/**
 * REST controller for managing Privilege.
 */
@RestController
@RequestMapping("/api")
public class PrivilegeResource {

    private final Logger log = LoggerFactory.getLogger(PrivilegeResource.class);

    private static final String ENTITY_NAME = "privilege";

    private final PrivilegeRepository privilegeRepository;

    public PrivilegeResource(PrivilegeRepository privilegeRepository) {
        this.privilegeRepository = privilegeRepository;
    }

    /**
     * POST  /privileges : Create a new privilege.
     *
     * @param privilege the privilege to create
     * @return the ResponseEntity with status 201 (Created) and with body the new privilege, or with status 400 (Bad Request) if the privilege has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/privileges")
    public ResponseEntity<Privilege> createPrivilege(@RequestBody Privilege privilege) throws URISyntaxException {
        log.debug("REST request to save Privilege : {}", privilege);
        if (privilege.getId() != null) {
            throw new BadRequestAlertException("A new privilege cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Privilege result = privilegeRepository.save(privilege);
        return ResponseEntity.created(new URI("/api/privileges/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /privileges : Updates an existing privilege.
     *
     * @param privilege the privilege to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated privilege,
     * or with status 400 (Bad Request) if the privilege is not valid,
     * or with status 500 (Internal Server Error) if the privilege couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/privileges")
    public ResponseEntity<Privilege> updatePrivilege(@RequestBody Privilege privilege) throws URISyntaxException {
        log.debug("REST request to update Privilege : {}", privilege);
        if (privilege.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Privilege result = privilegeRepository.save(privilege);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, privilege.getId().toString()))
            .body(result);
    }

    /**
     * GET  /privileges : get all the privileges.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of privileges in body
     */
    @GetMapping("/privileges")
    public List<Privilege> getAllPrivileges() {
        log.debug("REST request to get all Privileges");
        return privilegeRepository.findAll();
    }

    /**
     * GET  /privileges/:id : get the "id" privilege.
     *
     * @param id the id of the privilege to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the privilege, or with status 404 (Not Found)
     */
    @GetMapping("/privileges/{id}")
    public ResponseEntity<Privilege> getPrivilege(@PathVariable String id) {
        log.debug("REST request to get Privilege : {}", id);
        Optional<Privilege> privilege = privilegeRepository.findById(id);
        return privilege.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    /**
     * DELETE  /privileges/:id : delete the "id" privilege.
     *
     * @param id the id of the privilege to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/privileges/{id}")
    public ResponseEntity<Void> deletePrivilege(@PathVariable String id) {
        log.debug("REST request to delete Privilege : {}", id);
        privilegeRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}

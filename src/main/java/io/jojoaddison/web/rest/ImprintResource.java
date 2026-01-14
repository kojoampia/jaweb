package io.jojoaddison.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.time.ZonedDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.jojoaddison.domain.Imprint;
import io.jojoaddison.repository.ImprintRepository;
import io.jojoaddison.security.SecurityUtils;
import io.jojoaddison.web.rest.errors.BadRequestAlertException;
import io.jojoaddison.web.rest.util.HeaderUtil;
import io.jojoaddison.web.rest.util.PaginationUtil;

/**
 * REST controller for managing Imprint.
 */
@RestController
@RequestMapping("/api")
public class ImprintResource {

    private final Logger log = LoggerFactory.getLogger(ImprintResource.class);

    private static final String ENTITY_NAME = "imprint";

    private final ImprintRepository imprintRepository;

    public ImprintResource(ImprintRepository imprintRepository) {
        this.imprintRepository = imprintRepository;
    }

    /**
     * POST  /imprints : Create a new imprint.
     *
     * @param imprint the imprint to create
     * @return the ResponseEntity with status 201 (Created) and with body the new imprint, or with status 400 (Bad Request) if the imprint has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/imprints")
    public ResponseEntity<Imprint> createImprint(@RequestBody Imprint imprint) throws URISyntaxException {
        log.debug("REST request to save Imprint : {}", imprint);
        if (imprint.getId() != null) {
            throw new BadRequestAlertException("A new imprint cannot already have an ID", ENTITY_NAME, "idexists");
        }
        imprint.setCreatedDate(ZonedDateTime.now());
        imprint.setModifiedDate(ZonedDateTime.now());
        imprint.setLastModifiedBy(SecurityUtils.getCurrentUserLogin().get());
        Imprint result = imprintRepository.save(imprint);
        return ResponseEntity.created(new URI("/api/imprints/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /imprints : Updates an existing imprint.
     *
     * @param imprint the imprint to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated imprint,
     * or with status 400 (Bad Request) if the imprint is not valid,
     * or with status 500 (Internal Server Error) if the imprint couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/imprints")
    public ResponseEntity<Imprint> updateImprint(@RequestBody Imprint imprint) throws URISyntaxException {
        log.debug("REST request to update Imprint : {}", imprint);
        if (imprint.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        imprint.setModifiedDate(ZonedDateTime.now());
        imprint.setLastModifiedBy(SecurityUtils.getCurrentUserLogin().get());
        Imprint result = imprintRepository.save(imprint);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, imprint.getId().toString()))
            .body(result);
    }

    /**
     * GET  /imprints : get all the imprints.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of imprints in body
     */
    @GetMapping("/imprints")
    public ResponseEntity<List<Imprint>> getAllImprints(Pageable pageable) {
        log.debug("REST request to get a page of Imprints");
        Page<Imprint> page = imprintRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/imprints");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /imprints/:id : get the "id" imprint.
     *
     * @param id the id of the imprint to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the imprint, or with status 404 (Not Found)
     */
    @GetMapping("/imprints/current")
    public Imprint getCurrentImprint() {
        log.debug("REST request to get current Imprint ");
        List<Imprint> imprints = imprintRepository.findAll().stream()
                                                            .sorted(Comparator.comparing(Imprint::getModifiedDate, Comparator.reverseOrder()))
                                                            .collect(Collectors.toList());
        return imprints.get(0);
    }


    /**
     * GET  /imprints/:id : get the "id" imprint.
     *
     * @param id the id of the imprint to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the imprint, or with status 404 (Not Found)
     */
    @GetMapping("/imprints/{id}")
    public ResponseEntity<Imprint> getImprint(@PathVariable String id) {
        log.debug("REST request to get Imprint : {}", id);
        Optional<Imprint> imprint = imprintRepository.findById(id);
        return imprint.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    /**
     * DELETE  /imprints/:id : delete the "id" imprint.
     *
     * @param id the id of the imprint to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/imprints/{id}")
    public ResponseEntity<Void> deleteImprint(@PathVariable String id) {
        log.debug("REST request to delete Imprint : {}", id);
        imprintRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }

}

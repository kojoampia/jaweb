package io.jojoaddison.web.rest;
import io.jojoaddison.domain.Imprint;
import io.jojoaddison.repository.ImprintRepository;
import io.jojoaddison.repository.search.ImprintSearchRepository;
import io.jojoaddison.web.rest.errors.BadRequestAlertException;
import io.jojoaddison.web.rest.util.HeaderUtil;
import io.jojoaddison.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing Imprint.
 */
@RestController
@RequestMapping("/api")
public class ImprintResource {

    private final Logger log = LoggerFactory.getLogger(ImprintResource.class);

    private static final String ENTITY_NAME = "imprint";

    private final ImprintRepository imprintRepository;

    private final ImprintSearchRepository imprintSearchRepository;

    public ImprintResource(ImprintRepository imprintRepository, ImprintSearchRepository imprintSearchRepository) {
        this.imprintRepository = imprintRepository;
        this.imprintSearchRepository = imprintSearchRepository;
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
        Imprint result = imprintRepository.save(imprint);
        imprintSearchRepository.save(result);
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
        Imprint result = imprintRepository.save(imprint);
        imprintSearchRepository.save(result);
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
    @GetMapping("/imprints/{id}")
    public ResponseEntity<Imprint> getImprint(@PathVariable String id) {
        log.debug("REST request to get Imprint : {}", id);
        Optional<Imprint> imprint = imprintRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(imprint);
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
        imprintSearchRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }

    /**
     * SEARCH  /_search/imprints?query=:query : search for the imprint corresponding
     * to the query.
     *
     * @param query the query of the imprint search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/imprints")
    public ResponseEntity<List<Imprint>> searchImprints(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Imprints for query {}", query);
        Page<Imprint> page = imprintSearchRepository.search(queryStringQuery(query), pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/imprints");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

}

package io.jojoaddison.web.rest;
import io.jojoaddison.domain.Information;
import io.jojoaddison.repository.InformationRepository;
import io.jojoaddison.repository.search.InformationSearchRepository;
import io.jojoaddison.web.rest.errors.BadRequestAlertException;
import io.jojoaddison.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
 * REST controller for managing Information.
 */
@RestController
@RequestMapping("/api")
public class InformationResource {

    private final Logger log = LoggerFactory.getLogger(InformationResource.class);

    private static final String ENTITY_NAME = "information";

    private final InformationRepository informationRepository;

    private final InformationSearchRepository informationSearchRepository;

    public InformationResource(InformationRepository informationRepository, InformationSearchRepository informationSearchRepository) {
        this.informationRepository = informationRepository;
        this.informationSearchRepository = informationSearchRepository;
    }

    /**
     * POST  /information : Create a new information.
     *
     * @param information the information to create
     * @return the ResponseEntity with status 201 (Created) and with body the new information, or with status 400 (Bad Request) if the information has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/information")
    public ResponseEntity<Information> createInformation(@RequestBody Information information) throws URISyntaxException {
        log.debug("REST request to save Information : {}", information);
        if (information.getId() != null) {
            throw new BadRequestAlertException("A new information cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Information result = informationRepository.save(information);
        informationSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/information/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /information : Updates an existing information.
     *
     * @param information the information to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated information,
     * or with status 400 (Bad Request) if the information is not valid,
     * or with status 500 (Internal Server Error) if the information couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/information")
    public ResponseEntity<Information> updateInformation(@RequestBody Information information) throws URISyntaxException {
        log.debug("REST request to update Information : {}", information);
        if (information.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Information result = informationRepository.save(information);
        informationSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, information.getId().toString()))
            .body(result);
    }

    /**
     * GET  /information : get all the information.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of information in body
     */
    @GetMapping("/information")
    public List<Information> getAllInformation() {
        log.debug("REST request to get all Information");
        return informationRepository.findAll();
    }

    /**
     * GET  /information/:id : get the "id" information.
     *
     * @param id the id of the information to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the information, or with status 404 (Not Found)
     */
    @GetMapping("/information/{id}")
    public ResponseEntity<Information> getInformation(@PathVariable String id) {
        log.debug("REST request to get Information : {}", id);
        Optional<Information> information = informationRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(information);
    }

    /**
     * DELETE  /information/:id : delete the "id" information.
     *
     * @param id the id of the information to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/information/{id}")
    public ResponseEntity<Void> deleteInformation(@PathVariable String id) {
        log.debug("REST request to delete Information : {}", id);
        informationRepository.deleteById(id);
        informationSearchRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }

    /**
     * SEARCH  /_search/information?query=:query : search for the information corresponding
     * to the query.
     *
     * @param query the query of the information search
     * @return the result of the search
     */
    @GetMapping("/_search/information")
    public List<Information> searchInformation(@RequestParam String query) {
        log.debug("REST request to search Information for query {}", query);
        return StreamSupport
            .stream(informationSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}

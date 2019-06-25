package io.jojoaddison.web.rest;
import io.jojoaddison.domain.Service;
import io.jojoaddison.repository.ServiceRepository;
import io.jojoaddison.repository.search.ServiceSearchRepository;
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
 * REST controller for managing Service.
 */
@RestController
@RequestMapping("/api")
public class ServiceResource {

    private final Logger log = LoggerFactory.getLogger(ServiceResource.class);

    private static final String ENTITY_NAME = "service";

    private final ServiceRepository serviceRepository;

    private final ServiceSearchRepository serviceSearchRepository;

    public ServiceResource(ServiceRepository serviceRepository, ServiceSearchRepository serviceSearchRepository) {
        this.serviceRepository = serviceRepository;
        this.serviceSearchRepository = serviceSearchRepository;
    }

    /**
     * POST  /services : Create a new service.
     *
     * @param service the service to create
     * @return the ResponseEntity with status 201 (Created) and with body the new service, or with status 400 (Bad Request) if the service has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/services")
    public ResponseEntity<Service> createService(@RequestBody Service service) throws URISyntaxException {
        log.debug("REST request to save Service : {}", service);
        if (service.getId() != null) {
            throw new BadRequestAlertException("A new service cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Service result = serviceRepository.save(service);
        serviceSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/services/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /services : Updates an existing service.
     *
     * @param service the service to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated service,
     * or with status 400 (Bad Request) if the service is not valid,
     * or with status 500 (Internal Server Error) if the service couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/services")
    public ResponseEntity<Service> updateService(@RequestBody Service service) throws URISyntaxException {
        log.debug("REST request to update Service : {}", service);
        if (service.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Service result = serviceRepository.save(service);
        serviceSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, service.getId().toString()))
            .body(result);
    }

    /**
     * GET  /services : get all the services.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of services in body
     */
    @GetMapping("/services")
    public ResponseEntity<List<Service>> getAllServices(Pageable pageable) {
        log.debug("REST request to get a page of Services");
        Page<Service> page = serviceRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/services");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /services/:id : get the "id" service.
     *
     * @param id the id of the service to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the service, or with status 404 (Not Found)
     */
    @GetMapping("/services/{id}")
    public ResponseEntity<Service> getService(@PathVariable String id) {
        log.debug("REST request to get Service : {}", id);
        Optional<Service> service = serviceRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(service);
    }

    /**
     * DELETE  /services/:id : delete the "id" service.
     *
     * @param id the id of the service to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/services/{id}")
    public ResponseEntity<Void> deleteService(@PathVariable String id) {
        log.debug("REST request to delete Service : {}", id);
        serviceRepository.deleteById(id);
        serviceSearchRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }

    /**
     * SEARCH  /_search/services?query=:query : search for the service corresponding
     * to the query.
     *
     * @param query the query of the service search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/services")
    public ResponseEntity<List<Service>> searchServices(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Services for query {}", query);
        Page<Service> page = serviceSearchRepository.search(queryStringQuery(query), pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/services");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

}

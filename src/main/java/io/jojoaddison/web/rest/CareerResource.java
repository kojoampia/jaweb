package io.jojoaddison.web.rest;
import java.net.URI;
import java.net.URISyntaxException;
import java.time.ZonedDateTime;
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

import io.jojoaddison.domain.Career;
import io.jojoaddison.repository.CareerRepository;
import io.jojoaddison.security.SecurityUtils;
import io.jojoaddison.web.rest.errors.BadRequestAlertException;
import io.jojoaddison.web.rest.util.HeaderUtil;

/**
 * REST controller for managing Career.
 */
@RestController
@RequestMapping("/api")
public class CareerResource {

    private final Logger log = LoggerFactory.getLogger(CareerResource.class);

    private static final String ENTITY_NAME = "career";

    private final CareerRepository careerRepository;

    public CareerResource(CareerRepository careerRepository) {
        this.careerRepository = careerRepository;
    }

    /**
     * POST  /careers : Create a new career.
     *
     * @param career the career to create
     * @return the ResponseEntity with status 201 (Created) and with body the new career, or with status 400 (Bad Request) if the career has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/careers")
    public ResponseEntity<Career> createCareer(@RequestBody Career career) throws URISyntaxException {
        log.debug("REST request to save Career : {}", career);
        if (career.getId() != null) {
            throw new BadRequestAlertException("A new career cannot already have an ID", ENTITY_NAME, "idexists");
        }
        career.setCreatedDate(ZonedDateTime.now());
        career.setModifiedDate(ZonedDateTime.now());
        career.setLastModifiedBy(SecurityUtils.getCurrentUserLogin().get());
        Career result = careerRepository.save(career);
        return ResponseEntity.created(new URI("/api/careers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /careers : Updates an existing career.
     *
     * @param career the career to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated career,
     * or with status 400 (Bad Request) if the career is not valid,
     * or with status 500 (Internal Server Error) if the career couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/careers")
    public ResponseEntity<Career> updateCareer(@RequestBody Career career) throws URISyntaxException {
        log.debug("REST request to update Career : {}", career);
        if (career.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        career.setModifiedDate(ZonedDateTime.now());
        career.setLastModifiedBy(SecurityUtils.getCurrentUserLogin().get());
        Career result = careerRepository.save(career);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, career.getId().toString()))
            .body(result);
    }

    /**
     * GET  /careers : get all the careers.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of careers in body
     */
    @GetMapping("/careers")
    public List<Career> getAllCareers() {
        log.debug("REST request to get all Careers");
        return careerRepository.findAll();
    }

    /**
     * GET  /careers/:id : get the "id" career.
     *
     * @param id the id of the career to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the career, or with status 404 (Not Found)
     */
    @GetMapping("/careers/{id}")
    public ResponseEntity<Career> getCareer(@PathVariable String id) {
        log.debug("REST request to get Career : {}", id);
        Optional<Career> career = careerRepository.findById(id);
        return career.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    /**
     * DELETE  /careers/:id : delete the "id" career.
     *
     * @param id the id of the career to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/careers/{id}")
    public ResponseEntity<Void> deleteCareer(@PathVariable String id) {
        log.debug("REST request to delete Career : {}", id);
        careerRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}

package io.jojoaddison.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;

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

import io.github.jhipster.web.util.ResponseUtil;
import io.jojoaddison.domain.About;
import io.jojoaddison.repository.AboutRepository;
import io.jojoaddison.security.SecurityUtils;
import io.jojoaddison.web.rest.errors.BadRequestAlertException;
import io.jojoaddison.web.rest.util.HeaderUtil;
import io.jojoaddison.web.rest.util.PaginationUtil;

/**
 * REST controller for managing About.
 */
@RestController
@RequestMapping("/api")
public class AboutResource {

    private final Logger log = LoggerFactory.getLogger(AboutResource.class);

    private static final String ENTITY_NAME = "about";

    private final AboutRepository aboutRepository;

    public AboutResource(AboutRepository aboutRepository) {
        this.aboutRepository = aboutRepository;
    }

    /**
     * POST  /abouts : Create a new about.
     *
     * @param about the about to create
     * @return the ResponseEntity with status 201 (Created) and with body the new about, or with status 400 (Bad Request) if the about has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/abouts")
    public ResponseEntity<About> createAbout(@RequestBody About about) throws URISyntaxException {
        log.debug("REST request to save About : {}", about);
        if (about.getId() != null) {
            throw new BadRequestAlertException("A new about cannot already have an ID", ENTITY_NAME, "idexists");
        }
        about.setCreatedDate(ZonedDateTime.now());
        about.setModifiedDate(ZonedDateTime.now());
        about.setLastModifiedBy(SecurityUtils.getCurrentUserLogin().get());
        About result = aboutRepository.save(about);
        return ResponseEntity.created(new URI("/api/abouts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /abouts : Updates an existing about.
     *
     * @param about the about to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated about,
     * or with status 400 (Bad Request) if the about is not valid,
     * or with status 500 (Internal Server Error) if the about couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/abouts")
    public ResponseEntity<About> updateAbout(@RequestBody About about) throws URISyntaxException {
        log.debug("REST request to update About : {}", about);
        if (about.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        about.setModifiedDate(ZonedDateTime.now());
        about.setLastModifiedBy(SecurityUtils.getCurrentUserLogin().get());
        About result = aboutRepository.save(about);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, about.getId().toString()))
            .body(result);
    }

    /**
     * GET  /abouts : get all the abouts.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of abouts in body
     */
    @GetMapping("/abouts")
    public ResponseEntity<List<About>> getAllAbouts(Pageable pageable) {
        log.debug("REST request to get a page of Abouts");
        Page<About> page = aboutRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/abouts");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /abouts/:id : get the "id" about.
     *
     * @param id the id of the about to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the about, or with status 404 (Not Found)
     */
    @GetMapping("/abouts/{id}")
    public ResponseEntity<About> getAbout(@PathVariable String id) {
        log.debug("REST request to get About : {}", id);
        Optional<About> about = aboutRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(about);
    }

    /**
     * DELETE  /abouts/:id : delete the "id" about.
     *
     * @param id the id of the about to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/abouts/{id}")
    public ResponseEntity<Void> deleteAbout(@PathVariable String id) {
        log.debug("REST request to delete About : {}", id);
        aboutRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }

}

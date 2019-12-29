package io.jojoaddison.web.rest;
import io.jojoaddison.domain.Slide;
import io.jojoaddison.repository.SlideRepository;
import io.jojoaddison.repository.search.SlideSearchRepository;
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
 * REST controller for managing Slide.
 */
@RestController
@RequestMapping("/api")
public class SlideResource {

    private final Logger log = LoggerFactory.getLogger(SlideResource.class);

    private static final String ENTITY_NAME = "slide";

    private final SlideRepository slideRepository;

    private final SlideSearchRepository slideSearchRepository;

    public SlideResource(SlideRepository slideRepository, SlideSearchRepository slideSearchRepository) {
        this.slideRepository = slideRepository;
        this.slideSearchRepository = slideSearchRepository;
    }

    /**
     * POST  /slides : Create a new slide.
     *
     * @param slide the slide to create
     * @return the ResponseEntity with status 201 (Created) and with body the new slide, or with status 400 (Bad Request) if the slide has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/slides")
    public ResponseEntity<Slide> createSlide(@RequestBody Slide slide) throws URISyntaxException {
        log.debug("REST request to save Slide : {}", slide);
        if (slide.getId() != null) {
            throw new BadRequestAlertException("A new slide cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Slide result = slideRepository.save(slide);
        slideSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/slides/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /slides : Updates an existing slide.
     *
     * @param slide the slide to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated slide,
     * or with status 400 (Bad Request) if the slide is not valid,
     * or with status 500 (Internal Server Error) if the slide couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/slides")
    public ResponseEntity<Slide> updateSlide(@RequestBody Slide slide) throws URISyntaxException {
        log.debug("REST request to update Slide : {}", slide);
        if (slide.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Slide result = slideRepository.save(slide);
        slideSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, slide.getId().toString()))
            .body(result);
    }

    /**
     * GET  /slides : get all the slides.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of slides in body
     */
    @GetMapping("/slides")
    public ResponseEntity<List<Slide>> getAllSlides(Pageable pageable) {
        log.debug("REST request to get a page of Slides");
        Page<Slide> page = slideRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/slides");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /slides/:id : get the "id" slide.
     *
     * @param id the id of the slide to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the slide, or with status 404 (Not Found)
     */
    @GetMapping("/slides/{id}")
    public ResponseEntity<Slide> getSlide(@PathVariable String id) {
        log.debug("REST request to get Slide : {}", id);
        Optional<Slide> slide = slideRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(slide);
    }

    /**
     * DELETE  /slides/:id : delete the "id" slide.
     *
     * @param id the id of the slide to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/slides/{id}")
    public ResponseEntity<Void> deleteSlide(@PathVariable String id) {
        log.debug("REST request to delete Slide : {}", id);
        slideRepository.deleteById(id);
        slideSearchRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }

    /**
     * SEARCH  /_search/slides?query=:query : search for the slide corresponding
     * to the query.
     *
     * @param query the query of the slide search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/slides")
    public ResponseEntity<List<Slide>> searchSlides(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Slides for query {}", query);
        Page<Slide> page = slideSearchRepository.search(queryStringQuery(query), pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/slides");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

}

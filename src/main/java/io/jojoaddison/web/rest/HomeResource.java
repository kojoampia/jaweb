package io.jojoaddison.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.time.Instant;
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

import io.jojoaddison.domain.Home;
import io.jojoaddison.security.SecurityUtils;
import io.jojoaddison.service.HomeService;
import io.jojoaddison.web.rest.errors.BadRequestAlertException;
import io.jojoaddison.web.rest.util.HeaderUtil;

/**
 * REST controller for managing Home.
 */
@RestController
@RequestMapping("/api")
public class HomeResource {

    private final Logger log = LoggerFactory.getLogger(HomeResource.class);

    private static final String ENTITY_NAME = "home";

    private final HomeService homeService;

    public HomeResource(HomeService homeService) {
        this.homeService = homeService;
    }

    /**
     * POST  /homes : Create a new home.
     *
     * @param home the home to create
     * @return the ResponseEntity with status 201 (Created) and with body the new home, or with status 400 (Bad Request) if the home has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/homes")
    public ResponseEntity<Home> createHome(@RequestBody Home home) throws URISyntaxException {
        log.debug("REST request to save Home : {}", home);
        if (home.getId() != null) {
            throw new BadRequestAlertException("A new home cannot already have an ID", ENTITY_NAME, "idexists");
        }
        home.setCreatedBy(SecurityUtils.getCurrentUserLogin().orElseThrow());
        home.setCreatedDate(Instant.now());
        home.setModifiedBy(SecurityUtils.getCurrentUserLogin().orElseThrow());
        home.setModifiedDate(Instant.now());
        Home result = homeService.save(home);
        return ResponseEntity.created(new URI("/api/homes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /homes : Updates an existing home.
     *
     * @param home the home to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated home,
     * or with status 400 (Bad Request) if the home is not valid,
     * or with status 500 (Internal Server Error) if the home couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/homes")
    public ResponseEntity<Home> updateHome(@RequestBody Home home) throws URISyntaxException {
        log.debug("REST request to update Home : {}", home);
        if (home.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        home.setModifiedBy(SecurityUtils.getCurrentUserLogin().orElseThrow());
        home.setModifiedDate(Instant.now());
        Home result = homeService.save(home);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, home.getId().toString()))
            .body(result);
    }

    /**
     * GET  /homes : get all the homes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of homes in body
     */
    @GetMapping("/homes")
    public List<Home> getAllHomes() {
        log.debug("REST request to get all Homes");
        return homeService.findAll();
    }

    /**
     * GET  /homes/:id : get the "id" home.
     *
     * @param id the id of the home to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the home, or with status 404 (Not Found)
     */
    @GetMapping("/homes/{id}")
    public ResponseEntity<Home> getHome(@PathVariable String id) {
        log.debug("REST request to get Home : {}", id);
        Optional<Home> home = homeService.findOne(id);
        return home.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    /**
     * DELETE  /homes/:id : delete the "id" home.
     *
     * @param id the id of the home to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/homes/{id}")
    public ResponseEntity<Void> deleteHome(@PathVariable String id) {
        log.debug("REST request to delete Home : {}", id);
        homeService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
 
    /**
     * PUT  /homes/current : set the current home.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of homes in body
     */
    @PutMapping("/homes/current")
    public Home setCurrentHome(@RequestBody Home home) {
        log.debug("REST request to set the current home");
        Home current = homeService.findCurrent();
        current.setCurrent(false);
        homeService.save(current);
        home.setCurrent(true);
        homeService.save(home);
        return homeService.findCurrent();
    }

    @GetMapping("/homes/current")
    public Home getCurrentHome() {
        return homeService.findCurrent();
    }

}

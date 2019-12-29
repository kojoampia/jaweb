package io.jojoaddison.service;

import io.jojoaddison.domain.Home;
import io.jojoaddison.repository.HomeRepository;
import io.jojoaddison.repository.search.HomeSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Home.
 */
@Service
public class HomeService {

    private final Logger log = LoggerFactory.getLogger(HomeService.class);

    private final HomeRepository homeRepository;

    private final HomeSearchRepository homeSearchRepository;

    public HomeService(HomeRepository homeRepository, HomeSearchRepository homeSearchRepository) {
        this.homeRepository = homeRepository;
        this.homeSearchRepository = homeSearchRepository;
    }

    /**
     * Save a home.
     *
     * @param home the entity to save
     * @return the persisted entity
     */
    public Home save(Home home) {
        log.debug("Request to save Home : {}", home);
        Home result = homeRepository.save(home);
        homeSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the homes.
     *
     * @return the list of entities
     */
    public List<Home> findAll() {
        log.debug("Request to get all Homes");
        return homeRepository.findAll();
    }


    /**
     * Get one home by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    public Optional<Home> findOne(String id) {
        log.debug("Request to get Home : {}", id);
        return homeRepository.findById(id);
    }

    /**
     * Delete the home by id.
     *
     * @param id the id of the entity
     */
    public void delete(String id) {
        log.debug("Request to delete Home : {}", id);        homeRepository.deleteById(id);
        homeSearchRepository.deleteById(id);
    }

    /**
     * Search for the home corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    public List<Home> search(String query) {
        log.debug("Request to search Homes for query {}", query);
        return StreamSupport
            .stream(homeSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}

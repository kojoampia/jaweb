package io.jojoaddison.service;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import io.jojoaddison.domain.Home;
import io.jojoaddison.domain.Version;
import io.jojoaddison.repository.HomeRepository;


/**
 * Service Implementation for managing Home.
 */
@Service
public class HomeService {

    private final Logger log = LoggerFactory.getLogger(HomeService.class);

    private final HomeRepository homeRepository;
    private final VersionService versionService;

    public HomeService(HomeRepository homeRepository, VersionService versionService) {
        this.homeRepository = homeRepository;
        this.versionService = versionService;
    }

    /**
     * Save a home.
     *
     * @param home the entity to save
     * @return the persisted entity
     */
    public Home save(Home home) {
        log.debug("Request to save Home : {}", home);        
        Home result = homeRepository.save(saveVersion(home));
        saveVersion(result);
        return result;
    }

    private Home saveVersion(Home home){
        Version version = null;
        Optional<Version> opVersion = this.versionService.findByType("Home");
        if(opVersion.isPresent()){
            version = opVersion.get();
        }else{
            version = new Version();
            version.setType("Home");
        }
        int key = home.getVersion() + 1;
        home.setVersion(key);
        home.setCurrent(false);
        version.add(key, home);
        this.versionService.save(version);
        home.setCurrent(true);
        return home;
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
        log.debug("Request to delete Home : {}", id);        
        homeRepository.deleteById(id);
    }

	public Home findCurrent() {
		return homeRepository.findByCurrent(true);
	}
}

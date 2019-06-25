package io.jojoaddison.service;

import io.jojoaddison.domain.Version;
import io.jojoaddison.repository.VersionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * Service Implementation for managing Version.
 */
@Service
public class VersionService {

    private final Logger log = LoggerFactory.getLogger(VersionService.class);

    private final VersionRepository versionRepository;

    public VersionService(VersionRepository versionRepository) {
        this.versionRepository = versionRepository;
    }

    /**
     * Save a version.
     *
     * @param version the entity to save
     * @return the persisted entity
     */
    public Version save(Version version) {
        log.debug("Request to save Version : {}", version);
        Version result = versionRepository.save(version);
        return result;
    }

    /**
     * Get all the versions.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    public Page<Version> findAll(Pageable pageable) {
        log.debug("Request to get all Versions");
        return versionRepository.findAll(pageable);
    }


    /**
     * Get one version by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    public Optional<Version> findOne(String id) {
        log.debug("Request to get Version : {}", id);
        return versionRepository.findById(id);
    }
    

    /**
     * Get one version by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    public Optional<Version> findByType(String type) {
        log.debug("Request to get Version by type : {}", type);
        return versionRepository.findByType(type);
    }

    /**
     * Delete the version by id.
     *
     * @param id the id of the entity
     */
    public void delete(String id) {
        log.debug("Request to delete Version : {}", id);        
        versionRepository.deleteById(id);
    }
    
}

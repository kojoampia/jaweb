package io.jojoaddison.service;

import io.jojoaddison.domain.Staff;
import io.jojoaddison.repository.StaffRepository;
import io.jojoaddison.service.dto.UserDTO;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing Staff.
 */
@Service
public class StaffService {

    private final Logger log = LoggerFactory.getLogger(StaffService.class);

    private final StaffRepository staffRepository;
    private final UserService userService;

    public StaffService(StaffRepository staffRepository, UserService userService) {
        this.staffRepository = staffRepository;
        this.userService = userService;
    }

    /**
     * Save a staff.
     *
     * @param staff the entity to save
     * @return the persisted entity
     */
    public Staff save(Staff staff) {
        log.debug("Request to save Staff : {}", staff);
        if(staff.getCredential() == null) {
            UserDTO userDTO = new UserDTO();
            userDTO.setEmail(staff.getEmail().toLowerCase().trim());
            userDTO.setLogin(userDTO.getEmail().split("@")[0]);
            staff.setCredential(userService.createUser(userDTO));
        }
        return staffRepository.save(staff);
    }

    /**
     * Get all the staff.
     *
     * @return the list of entities
     */
    public List<Staff> findAll() {
        log.debug("Request to get all Staff");
        return staffRepository.findAll();
    }


    /**
     * Get one staff by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    public Optional<Staff> findOne(String id) {
        log.debug("Request to get Staff : {}", id);
        return staffRepository.findById(id);
    }

    /**
     * Delete the staff by id.
     *
     * @param id the id of the entity
     */
    public void delete(String id) {
        log.debug("Request to delete Staff : {}", id);        staffRepository.deleteById(id);
    }
}

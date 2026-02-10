package io.jojoaddison.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.time.ZonedDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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

import io.jojoaddison.domain.ContactMessage;
import io.jojoaddison.repository.ContactMessageRepository;
import io.jojoaddison.web.rest.errors.BadRequestAlertException;
import io.jojoaddison.web.rest.util.HeaderUtil;
import io.jojoaddison.web.rest.util.PaginationUtil;
import io.micrometer.core.annotation.Timed;
import jakarta.validation.Valid;

/**
 * REST controller for managing ContactMessage.
 */
@RestController
@RequestMapping("/api")
@Timed
public class ContactMessageResource {

    private final Logger log = LoggerFactory.getLogger(ContactMessageResource.class);


    private static final String ENTITY_NAME = "contactMessage";

    private final ContactMessageRepository contactMessageRepository;

    public ContactMessageResource(ContactMessageRepository contactMessageRepository) {
        this.contactMessageRepository = contactMessageRepository;
    }

    /**
     * POST /contact-messages : Create a new contactMessage.
     *
     * @param contactMessage the contactMessage to create
     * @return the ResponseEntity with status 201 (Created) and with body the new
     *         contactMessage, or with status 400 (Bad Request) if the
     *         contactMessage has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/contact-messages")
    public ResponseEntity<ContactMessage> createContactMessage(@Valid @RequestBody ContactMessage contactMessage)
            throws URISyntaxException {
        log.debug("REST request to save ContactMessage : {}", contactMessage);
        if (contactMessage.getId() != null) {
            throw new BadRequestAlertException("A new contactMessage cannot already have an ID", ENTITY_NAME,
                    "idexists");
        }
        contactMessage.createdDate(ZonedDateTime.now());
        ContactMessage result = contactMessageRepository.save(contactMessage);
        return ResponseEntity.created(new URI("/api/contact-messages/" + result.getId()))
                .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString())).body(result);
    }

    /**
     * PUT /contact-messages : Updates an existing contactMessage.
     *
     * @param contactMessage the contactMessage to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated
     *         contactMessage, or with status 400 (Bad Request) if the
     *         contactMessage is not valid, or with status 500 (Internal Server
     *         Error) if the contactMessage couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/contact-messages")
    public ResponseEntity<ContactMessage> updateContactMessage(@Valid @RequestBody ContactMessage contactMessage)
            throws URISyntaxException {
        log.debug("REST request to update ContactMessage : {}", contactMessage);
        if (contactMessage.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ContactMessage result = contactMessageRepository.save(contactMessage);
        return ResponseEntity.ok()
                .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, contactMessage.getId().toString()))
                .body(result);
    }

    /**
     * GET /contact-messages : get all the contactMessages.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of
     *         contactMessages in body
     */
    @GetMapping("/contact-messages")
    public ResponseEntity<List<ContactMessage>> getAllContactMessages(Pageable pageable) {
        log.debug("REST request to get a page of ContactMessages");
        Page<ContactMessage> page = contactMessageRepository.findAll(pageable);
        List<ContactMessage> messages = page.getContent().stream()
                .sorted(Comparator.comparing(ContactMessage::getCreatedDate, Comparator.reverseOrder()))
                .collect(Collectors.toList());
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/contact-messages");
        return ResponseEntity.ok().headers(headers).body(messages);
    }

    /**
     * GET /contact-messages/:id : get the "id" contactMessage.
     *
     * @param id the id of the contactMessage to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the
     *         contactMessage, or with status 404 (Not Found)
     */
    @GetMapping("/contact-messages/{id}")
    public ResponseEntity<ContactMessage> getContactMessage(@PathVariable String id) {
        log.debug("REST request to get ContactMessage : {}", id);
        Optional<ContactMessage> contactMessage = contactMessageRepository.findById(id);
        return contactMessage.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    /**
     * APPROVE /contact-messages/approve/:id : approve the message by "id".
     *
     * @param id the id of the contactMessage to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the
     *         contactMessage, or with status 404 (Not Found)
     */
    @PutMapping("/contact-messages/approve/{id}")
    public ResponseEntity<ContactMessage> approveContactMessage(@PathVariable String id) {
        log.debug("REST request to get ContactMessage : {}", id);
        Optional<ContactMessage> contactMessage = contactMessageRepository.findById(id).map(message -> {
            message.setApproved(true);
            contactMessageRepository.save(message);
            log.debug("Approved message: {}", message);
            return message;
        });

        return contactMessage.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    /**
     * DELETE /contact-messages/:id : delete the "id" contactMessage.
     *
     * @param id the id of the contactMessage to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/contact-messages/{id}")
    public ResponseEntity<Void> deleteContactMessage(@PathVariable String id) {
        log.debug("REST request to delete ContactMessage : {}", id);
        contactMessageRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }

}

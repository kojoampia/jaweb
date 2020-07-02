package io.jojoaddison.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A ContactMessage.
 */
@Document(collection = "contact_message")
@org.springframework.data.elasticsearch.annotations.Document(indexName = "contactmessage")
public class ContactMessage implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    private String id;

    @Field("name")
    private String name;

    @NotNull
    @Pattern(regexp = "^[a-zA-Z0-9]*$")
    @Field("email")
    private String email;

    @NotNull
    @Field("title")
    private String title;

    @NotNull
    @Field("message")
    private String message;

    @Field("created_date")
    private ZonedDateTime createdDate;

    @DBRef
    @Field("messages")
    private Set<ContactMessage> messages = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public ContactMessage name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public ContactMessage email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTitle() {
        return title;
    }

    public ContactMessage title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getMessage() {
        return message;
    }

    public ContactMessage message(String message) {
        this.message = message;
        return this;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public ZonedDateTime getCreatedDate() {
        return createdDate;
    }

    public ContactMessage createdDate(ZonedDateTime createdDate) {
        this.createdDate = createdDate;
        return this;
    }

    public void setCreatedDate(ZonedDateTime createdDate) {
        this.createdDate = createdDate;
    }

    public Set<ContactMessage> getMessages() {
        return messages;
    }

    public ContactMessage messages(Set<ContactMessage> contactMessages) {
        this.messages = contactMessages;
        return this;
    }

    public ContactMessage addMessages(ContactMessage contactMessage) {
        this.messages.add(contactMessage);
        contactMessage.setId(this);
        return this;
    }

    public ContactMessage removeMessages(ContactMessage contactMessage) {
        this.messages.remove(contactMessage);
        contactMessage.setId(null);
        return this;
    }

    public void setMessages(Set<ContactMessage> contactMessages) {
        this.messages = contactMessages;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        ContactMessage contactMessage = (ContactMessage) o;
        if (contactMessage.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), contactMessage.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ContactMessage{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", email='" + getEmail() + "'" +
            ", title='" + getTitle() + "'" +
            ", message='" + getMessage() + "'" +
            ", createdDate='" + getCreatedDate() + "'" +
            "}";
    }
}

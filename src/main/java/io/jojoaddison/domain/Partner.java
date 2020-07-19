package io.jojoaddison.domain;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import io.jojoaddison.config.Constants;

/**
 * A Partner.
 */
@Document(collection = "partner")
public class Partner implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("name")
    private String name;

    @Field("link")
    private String link;

    @Field("logourl")
    private String logoUrl;

    @Field("logo")
    private byte[] logo;

    @Field("logo_content_type")
    private String logoContentType;

    @Field("country")
    private String country;

    @Field("location")
    private String location;

    @Field("post_code")
    private String postCode;

    @Field("street_address")
    private String streetAddress;

    @Field("created-date")
    private ZonedDateTime createdDate;

    @NotNull
   // @Pattern(regexp = "/^(([^<>()\\[\\]\\\\.,;:\\s@\"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$/")
    @Pattern(regexp = Constants.EMAIL_REGEX)
    @Field("email")
    private String email;

    @NotNull
    @Field("contact_person")
    private String contactPerson;

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

    public Partner name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLink() {
        return link;
    }

    public Partner link(String link) {
        this.link = link;
        return this;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public byte[] getLogo() {
        return logo;
    }

    public Partner logo(byte[] logo) {
        this.logo = logo;
        return this;
    }

    public void setLogo(byte[] logo) {
        this.logo = logo;
    }

    public String getLogoContentType() {
        return logoContentType;
    }

    public Partner logoContentType(String logoContentType) {
        this.logoContentType = logoContentType;
        return this;
    }

    public void setLogoContentType(String logoContentType) {
        this.logoContentType = logoContentType;
    }

    public String getCountry() {
        return country;
    }

    public Partner country(String country) {
        this.country = country;
        return this;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getLocation() {
        return location;
    }

    public Partner location(String location) {
        this.location = location;
        return this;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getPostCode() {
        return postCode;
    }

    public Partner postCode(String postCode) {
        this.postCode = postCode;
        return this;
    }

    public void setPostCode(String postCode) {
        this.postCode = postCode;
    }

    public String getStreetAddress() {
        return streetAddress;
    }

    public Partner streetAddress(String streetAddress) {
        this.streetAddress = streetAddress;
        return this;
    }

    public void setStreetAddress(String streetAddress) {
        this.streetAddress = streetAddress;
    }

    public String getEmail() {
        return email;
    }

    public Partner email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getContactPerson() {
        return contactPerson;
    }

    public Partner contactPerson(String contactPerson) {
        this.contactPerson = contactPerson;
        return this;
    }

    public void setContactPerson(String contactPerson) {
        this.contactPerson = contactPerson;
    }


    public String getLogoUrl() {
        return logoUrl;
    }

    public Partner logoUrl(String logoUrl) {
        this.logoUrl = logoUrl;
        return this;
    }

    public void setLogoUrl(String logoUrl) {
        this.logoUrl = logoUrl;
    }

    public ZonedDateTime getCreatedDate(){
        return createdDate;
    }

    public Partner createdDate(ZonedDateTime createdDate){
        this.createdDate = createdDate;
        return this;
    }

    public void setCreatedDate(ZonedDateTime createdDate){
        this.createdDate = createdDate;
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
        Partner partner = (Partner) o;
        if (partner.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), partner.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Partner{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", link='" + getLink() + "'" +
            ", logo='" + getLogo() + "'" +
            ", logoContentType='" + getLogoContentType() + "'" +
            ", country='" + getCountry() + "'" +
            ", location='" + getLocation() + "'" +
            ", postCode='" + getPostCode() + "'" +
            ", streetAddress='" + getStreetAddress() + "'" +
            ", email='" + getEmail() + "'" +
            ", contactPerson='" + getContactPerson() + "'" +
            "}";
    }
}

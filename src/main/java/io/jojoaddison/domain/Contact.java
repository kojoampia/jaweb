package io.jojoaddison.domain;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A Contact.
 */
@Document(collection = "contact")
@org.springframework.data.elasticsearch.annotations.Document(indexName = "contact")
public class Contact implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    private String id;

    @Field("title")
    private String title;

    @Field("address")
    private String address;

    @Field("street")
    private String street;

    @Field("code")
    private String code;

    @Field("city")
    private String city;

    @Field("state")
    private String state;

    @Field("region")
    private String region;

    @Field("country")
    private String country;

    @Field("telephone")
    private String telephone;

    @NotNull
    @Pattern(regexp = "")
    @Field("email")
    private String email;

    @Field("whatsapp")
    private String whatsapp;

    @Field("facebook")
    private String facebook;

    @Field("twitter")
    private String twitter;

    @Field("google")
    private String google;

    @Field("youtube")
    private String youtube;

    @Field("last_modified")
    private ZonedDateTime lastModified;

    @Field("last_modified_by")
    private String lastModifiedBy;

    @Field("language")
    private String language;

    @Field("appointment")
    private String appointment;

    @Field("latitude")
    private BigDecimal latitude;

    @Field("longitude")
    private BigDecimal longitude;

    @Field("image")
    private byte[] image;

    @Field("image_content_type")
    private String imageContentType;

    @Field("url")
    private String url;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public Contact title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAddress() {
        return address;
    }

    public Contact address(String address) {
        this.address = address;
        return this;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getStreet() {
        return street;
    }

    public Contact street(String street) {
        this.street = street;
        return this;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getCode() {
        return code;
    }

    public Contact code(String code) {
        this.code = code;
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getCity() {
        return city;
    }

    public Contact city(String city) {
        this.city = city;
        return this;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public Contact state(String state) {
        this.state = state;
        return this;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getRegion() {
        return region;
    }

    public Contact region(String region) {
        this.region = region;
        return this;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public String getCountry() {
        return country;
    }

    public Contact country(String country) {
        this.country = country;
        return this;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getTelephone() {
        return telephone;
    }

    public Contact telephone(String telephone) {
        this.telephone = telephone;
        return this;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getEmail() {
        return email;
    }

    public Contact email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getWhatsapp() {
        return whatsapp;
    }

    public Contact whatsapp(String whatsapp) {
        this.whatsapp = whatsapp;
        return this;
    }

    public void setWhatsapp(String whatsapp) {
        this.whatsapp = whatsapp;
    }

    public String getFacebook() {
        return facebook;
    }

    public Contact facebook(String facebook) {
        this.facebook = facebook;
        return this;
    }

    public void setFacebook(String facebook) {
        this.facebook = facebook;
    }

    public String getTwitter() {
        return twitter;
    }

    public Contact twitter(String twitter) {
        this.twitter = twitter;
        return this;
    }

    public void setTwitter(String twitter) {
        this.twitter = twitter;
    }

    public String getGoogle() {
        return google;
    }

    public Contact google(String google) {
        this.google = google;
        return this;
    }

    public void setGoogle(String google) {
        this.google = google;
    }

    public String getYoutube() {
        return youtube;
    }

    public Contact youtube(String youtube) {
        this.youtube = youtube;
        return this;
    }

    public void setYoutube(String youtube) {
        this.youtube = youtube;
    }

    public ZonedDateTime getLastModified() {
        return lastModified;
    }

    public Contact lastModified(ZonedDateTime lastModified) {
        this.lastModified = lastModified;
        return this;
    }

    public void setLastModified(ZonedDateTime lastModified) {
        this.lastModified = lastModified;
    }

    public String getLastModifiedBy() {
        return lastModifiedBy;
    }

    public Contact lastModifiedBy(String lastModifiedBy) {
        this.lastModifiedBy = lastModifiedBy;
        return this;
    }

    public void setLastModifiedBy(String lastModifiedBy) {
        this.lastModifiedBy = lastModifiedBy;
    }

    public String getLanguage() {
        return language;
    }

    public Contact language(String language) {
        this.language = language;
        return this;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getAppointment() {
        return appointment;
    }

    public Contact appointment(String appointment) {
        this.appointment = appointment;
        return this;
    }

    public void setAppointment(String appointment) {
        this.appointment = appointment;
    }

    public BigDecimal getLatitude() {
        return latitude;
    }

    public Contact latitude(BigDecimal latitude) {
        this.latitude = latitude;
        return this;
    }

    public void setLatitude(BigDecimal latitude) {
        this.latitude = latitude;
    }

    public BigDecimal getLongitude() {
        return longitude;
    }

    public Contact longitude(BigDecimal longitude) {
        this.longitude = longitude;
        return this;
    }

    public void setLongitude(BigDecimal longitude) {
        this.longitude = longitude;
    }

    public byte[] getImage() {
        return image;
    }

    public Contact image(byte[] image) {
        this.image = image;
        return this;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public String getImageContentType() {
        return imageContentType;
    }

    public Contact imageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
        return this;
    }

    public void setImageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
    }

    public String getUrl() {
        return url;
    }

    public Contact url(String url) {
        this.url = url;
        return this;
    }

    public void setUrl(String url) {
        this.url = url;
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
        Contact contact = (Contact) o;
        if (contact.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), contact.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Contact{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", address='" + getAddress() + "'" +
            ", street='" + getStreet() + "'" +
            ", code='" + getCode() + "'" +
            ", city='" + getCity() + "'" +
            ", state='" + getState() + "'" +
            ", region='" + getRegion() + "'" +
            ", country='" + getCountry() + "'" +
            ", telephone='" + getTelephone() + "'" +
            ", email='" + getEmail() + "'" +
            ", whatsapp='" + getWhatsapp() + "'" +
            ", facebook='" + getFacebook() + "'" +
            ", twitter='" + getTwitter() + "'" +
            ", google='" + getGoogle() + "'" +
            ", youtube='" + getYoutube() + "'" +
            ", lastModified='" + getLastModified() + "'" +
            ", lastModifiedBy='" + getLastModifiedBy() + "'" +
            ", language='" + getLanguage() + "'" +
            ", appointment='" + getAppointment() + "'" +
            ", latitude=" + getLatitude() +
            ", longitude=" + getLongitude() +
            ", image='" + getImage() + "'" +
            ", imageContentType='" + getImageContentType() + "'" +
            ", url='" + getUrl() + "'" +
            "}";
    }
}

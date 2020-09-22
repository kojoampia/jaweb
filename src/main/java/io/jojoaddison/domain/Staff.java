package io.jojoaddison.domain;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.time.LocalDate;
import java.util.Objects;

import io.jojoaddison.domain.enumeration.DocumentType;

/**
 * A Staff.
 */
@Document(collection = "staff")
public class Staff implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("first_name")
    private String firstName;

    @Field("last_name")
    private String lastName;

    @Field("date_of_birth")
    private LocalDate dateOfBirth;

    @Email
    @Size(min = 5, max = 254)
    @Field("email")
    private String email;

    @Field("digital_address")
    private String digitalAddress;

    @Field("street_address")
    private String streetAddress;

    @Field("postal_address")
    private String postalAddress;

    @Field("town")
    private String town;

    @Field("district")
    private String district;

    @Field("city")
    private String city;

    @Field("region")
    private String region;

    @Field("country")
    private String country;

    @Field("digital_profile")
    private byte[] digitalProfile;

    @Field("digital_profile_content_type")
    private String digitalProfileContentType;

    @Field("account_number")
    private String accountNumber;

    @Field("account_type")
    private String accountType;

    @Field("documents")
    private byte[] documents;

    @Field("documents_content_type")
    private String documentsContentType;

    @Field("created_date")
    private Instant createdDate;

    @Field("modified_date")
    private Instant modifiedDate;

    @Field("last_modified_by")
    private String lastModifiedBy;

    @NotNull
    @Field("document_type")
    private DocumentType documentType;

    @DBRef
    @Field("credential")
    private User credential;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public Staff firstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public Staff lastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public Staff dateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
        return this;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getEmail() {
        return email;
    }

    public Staff email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getDigitalAddress() {
        return digitalAddress;
    }

    public Staff digitalAddress(String digitalAddress) {
        this.digitalAddress = digitalAddress;
        return this;
    }

    public void setDigitalAddress(String digitalAddress) {
        this.digitalAddress = digitalAddress;
    }

    public String getStreetAddress() {
        return streetAddress;
    }

    public Staff streetAddress(String streetAddress) {
        this.streetAddress = streetAddress;
        return this;
    }

    public void setStreetAddress(String streetAddress) {
        this.streetAddress = streetAddress;
    }

    public String getPostalAddress() {
        return postalAddress;
    }

    public Staff postalAddress(String postalAddress) {
        this.postalAddress = postalAddress;
        return this;
    }

    public void setPostalAddress(String postalAddress) {
        this.postalAddress = postalAddress;
    }

    public String getTown() {
        return town;
    }

    public Staff town(String town) {
        this.town = town;
        return this;
    }

    public void setTown(String town) {
        this.town = town;
    }

    public String getDistrict() {
        return district;
    }

    public Staff district(String district) {
        this.district = district;
        return this;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

    public String getCity() {
        return city;
    }

    public Staff city(String city) {
        this.city = city;
        return this;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getRegion() {
        return region;
    }

    public Staff region(String region) {
        this.region = region;
        return this;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public String getCountry() {
        return country;
    }

    public Staff country(String country) {
        this.country = country;
        return this;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public byte[] getDigitalProfile() {
        return digitalProfile;
    }

    public Staff digitalProfile(byte[] digitalProfile) {
        this.digitalProfile = digitalProfile;
        return this;
    }

    public void setDigitalProfile(byte[] digitalProfile) {
        this.digitalProfile = digitalProfile;
    }

    public String getDigitalProfileContentType() {
        return digitalProfileContentType;
    }

    public Staff digitalProfileContentType(String digitalProfileContentType) {
        this.digitalProfileContentType = digitalProfileContentType;
        return this;
    }

    public void setDigitalProfileContentType(String digitalProfileContentType) {
        this.digitalProfileContentType = digitalProfileContentType;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public Staff accountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
        return this;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

    public String getAccountType() {
        return accountType;
    }

    public Staff accountType(String accountType) {
        this.accountType = accountType;
        return this;
    }

    public void setAccountType(String accountType) {
        this.accountType = accountType;
    }

    public byte[] getDocuments() {
        return documents;
    }

    public Staff documents(byte[] documents) {
        this.documents = documents;
        return this;
    }

    public void setDocuments(byte[] documents) {
        this.documents = documents;
    }

    public String getDocumentsContentType() {
        return documentsContentType;
    }

    public Staff documentsContentType(String documentsContentType) {
        this.documentsContentType = documentsContentType;
        return this;
    }

    public void setDocumentsContentType(String documentsContentType) {
        this.documentsContentType = documentsContentType;
    }

    public Instant getCreatedDate() {
        return createdDate;
    }

    public Staff createdDate(Instant createdDate) {
        this.createdDate = createdDate;
        return this;
    }

    public void setCreatedDate(Instant createdDate) {
        this.createdDate = createdDate;
    }

    public Instant getModifiedDate() {
        return modifiedDate;
    }

    public Staff modifiedDate(Instant modifiedDate) {
        this.modifiedDate = modifiedDate;
        return this;
    }

    public void setModifiedDate(Instant modifiedDate) {
        this.modifiedDate = modifiedDate;
    }

    public String getLastModifiedBy() {
        return lastModifiedBy;
    }

    public Staff lastModifiedBy(String lastModifiedBy) {
        this.lastModifiedBy = lastModifiedBy;
        return this;
    }

    public void setLastModifiedBy(String lastModifiedBy) {
        this.lastModifiedBy = lastModifiedBy;
    }

    public DocumentType getDocumentType() {
        return documentType;
    }

    public Staff documentType(DocumentType documentType) {
        this.documentType = documentType;
        return this;
    }

    public void setDocumentType(DocumentType documentType) {
        this.documentType = documentType;
    }

    public User getCredential() {
        return credential;
    }

    public Staff credential(User user) {
        this.credential = user;
        return this;
    }

    public void setCredential(User user) {
        this.credential = user;
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
        Staff staff = (Staff) o;
        if (staff.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), staff.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Staff{" +
            "id=" + getId() +
            ", firstName='" + getFirstName() + "'" +
            ", lastName='" + getLastName() + "'" +
            ", dateOfBirth='" + getDateOfBirth() + "'" +
            ", email='" + getEmail() + "'" +
            ", digitalAddress='" + getDigitalAddress() + "'" +
            ", streetAddress='" + getStreetAddress() + "'" +
            ", postalAddress='" + getPostalAddress() + "'" +
            ", town='" + getTown() + "'" +
            ", district='" + getDistrict() + "'" +
            ", city='" + getCity() + "'" +
            ", region='" + getRegion() + "'" +
            ", country='" + getCountry() + "'" +
            ", digitalProfile='" + getDigitalProfile() + "'" +
            ", digitalProfileContentType='" + getDigitalProfileContentType() + "'" +
            ", accountNumber='" + getAccountNumber() + "'" +
            ", accountType='" + getAccountType() + "'" +
            ", documents='" + getDocuments() + "'" +
            ", documentsContentType='" + getDocumentsContentType() + "'" +
            ", createdDate='" + getCreatedDate() + "'" +
            ", modifiedDate='" + getModifiedDate() + "'" +
            ", lastModifiedBy='" + getLastModifiedBy() + "'" +
            ", documentType='" + getDocumentType() + "'" +
            "}";
    }
}

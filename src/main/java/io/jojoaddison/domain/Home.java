package io.jojoaddison.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Home.
 */
@Document(collection = "home")
public class Home implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("header")
    private String header;

    @Field("created_date")
    private Instant createdDate;

    @Field("modified_date")
    private Instant modifiedDate;

    @Field("created_by")
    private String createdBy;

    @Field("modified_by")
    private String modifiedBy;

    @Field("current")
    private Boolean current;

    @Field("version")
    private Integer version = 0;

    @DBRef
    @Field("slides")
    private Set<Slide> slides = new HashSet<>();
    @DBRef
    @Field("portfolios")
    private Set<Portfolio> portfolios = new HashSet<>();
    @DBRef
    @Field("services")
    private Set<Service> services = new HashSet<>();
    @DBRef
    @Field("blogs")
    private Set<Blog> blogs = new HashSet<>();
    @DBRef
    @Field("information")
    private Information information;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getHeader() {
        return header;
    }

    public Home header(String header) {
        this.header = header;
        return this;
    }

    public void setHeader(String header) {
        this.header = header;
    }

    public Instant getCreatedDate() {
        return createdDate;
    }

    public Home createdDate(Instant createdDate) {
        this.createdDate = createdDate;
        return this;
    }

    public void setCreatedDate(Instant createdDate) {
        this.createdDate = createdDate;
    }

    public Instant getModifiedDate() {
        return modifiedDate;
    }

    public Home modifiedDate(Instant modifiedDate) {
        this.modifiedDate = modifiedDate;
        return this;
    }

    public void setModifiedDate(Instant modifiedDate) {
        this.modifiedDate = modifiedDate;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public Home createdBy(String createdBy) {
        this.createdBy = createdBy;
        return this;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public String getModifiedBy() {
        return modifiedBy;
    }

    public Home modifiedBy(String modifiedBy) {
        this.modifiedBy = modifiedBy;
        return this;
    }

    public void setModifiedBy(String modifiedBy) {
        this.modifiedBy = modifiedBy;
    }

    public Boolean isCurrent() {
        return current;
    }

    public Home current(Boolean current) {
        this.current = current;
        return this;
    }

    public void setCurrent(Boolean current) {
        this.current = current;
    }

    public Integer getVersion() {
        return version;
    }

    public Home version(Integer version) {
        this.version = version;
        return this;
    }

    public void setVersion(Integer version) {
        this.version = version;
    }

    public Set<Slide> getSlides() {
        return slides;
    }

    public Home slides(Set<Slide> slides) {
        this.slides = slides;
        return this;
    }

    public Home addSlides(Slide slide) {
        this.slides.add(slide);
        return this;
    }

    public Home removeSlides(Slide slide) {
        this.slides.remove(slide);
        return this;
    }

    public void setSlides(Set<Slide> slides) {
        this.slides = slides;
    }

    public Set<Portfolio> getPortfolios() {
        return portfolios;
    }

    public Home portfolios(Set<Portfolio> portfolios) {
        this.portfolios = portfolios;
        return this;
    }

    public Home addPortfolios(Portfolio portfolio) {
        this.portfolios.add(portfolio);
        return this;
    }

    public Home removePortfolios(Portfolio portfolio) {
        this.portfolios.remove(portfolio);
        return this;
    }

    public void setPortfolios(Set<Portfolio> portfolios) {
        this.portfolios = portfolios;
    }

    public Set<Service> getServices() {
        return services;
    }

    public Home services(Set<Service> services) {
        this.services = services;
        return this;
    }

    public Home addServices(Service service) {
        this.services.add(service);
        return this;
    }

    public Home removeServices(Service service) {
        this.services.remove(service);
        return this;
    }

    public void setServices(Set<Service> services) {
        this.services = services;
    }

    public Set<Blog> getBlogs() {
        return blogs;
    }

    public Home blogs(Set<Blog> blogs) {
        this.blogs = blogs;
        return this;
    }

    public Home addBlogs(Blog blog) {
        this.blogs.add(blog);
        return this;
    }

    public Home removeBlogs(Blog blog) {
        this.blogs.remove(blog);
        return this;
    }

    public void setBlogs(Set<Blog> blogs) {
        this.blogs = blogs;
    }

    public Information getInformation() {
        return information;
    }

    public Home information(Information information) {
        this.information = information;
        return this;
    }

    public void setInformation(Information information) {
        this.information = information;
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
        Home home = (Home) o;
        if (home.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), home.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Home{" +
            "id=" + getId() +
            ", header='" + getHeader() + "'" +
            ", createdDate='" + getCreatedDate() + "'" +
            ", modifiedDate='" + getModifiedDate() + "'" +
            ", createdBy='" + getCreatedBy() + "'" +
            ", modifiedBy='" + getModifiedBy() + "'" +
            ", current='" + isCurrent() + "'" +
            ", version=" + getVersion() +
            "}";
    }
}

package io.jojoaddison.domain;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Information.
 */
@Document(collection = "information")
public class Information implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("content")
    private String content;

    @Field("title")
    private String title;

    @Field("brief")
    private String brief;

    @Field("link_text")
    private String linkText;

    @Field("link")
    private String link;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public Information content(String content) {
        this.content = content;
        return this;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getTitle() {
        return title;
    }

    public Information title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getBrief() {
        return brief;
    }

    public Information brief(String brief) {
        this.brief = brief;
        return this;
    }

    public void setBrief(String brief) {
        this.brief = brief;
    }

    public String getLinkText() {
        return linkText;
    }

    public Information linkText(String linkText) {
        this.linkText = linkText;
        return this;
    }

    public void setLinkText(String linkText) {
        this.linkText = linkText;
    }

    public String getLink() {
        return link;
    }

    public Information link(String link) {
        this.link = link;
        return this;
    }

    public void setLink(String link) {
        this.link = link;
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
        Information information = (Information) o;
        if (information.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), information.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Information{" +
            "id=" + getId() +
            ", content='" + getContent() + "'" +
            ", title='" + getTitle() + "'" +
            ", brief='" + getBrief() + "'" +
            ", linkText='" + getLinkText() + "'" +
            ", link='" + getLink() + "'" +
            "}";
    }
}

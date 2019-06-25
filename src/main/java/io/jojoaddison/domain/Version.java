package io.jojoaddison.domain;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * Generic Version Object.
 */
@Document(collection = "version")
public class Version implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;
    
    @Field("type")
    private String type;
    
    @Field("history")
    private Map<Integer, Object> history = new HashMap<>();

    public String getId(){
        return this.id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Map<Integer, Object> getHistory(){
        return history;
    }

    public Version history(Map<Integer, Object> history){
        this.history = history;
        return this;
    }
    public void setHistory(Map<Integer, Object> history){
        this.history = history;
    }
    public Version add(Integer key, Object history){
        this.history.put(key, history);
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Version version = (Version) o;
        if (version.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), version.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }
}

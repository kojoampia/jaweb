package io.jojoaddison.service;

import io.jojoaddison.domain.Slide;
import io.jojoaddison.repository.SlideRepository;
import io.jojoaddison.repository.search.SlideSearchRepository;
import io.jojoaddison.service.util.Tools;

import com.mongodb.client.gridfs.model.GridFSFile;
import com.mongodb.gridfs.GridFSDBFile;

import org.elasticsearch.index.query.QueryStringQueryBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.core.env.Environment;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsCriteria;
import org.springframework.data.mongodb.gridfs.GridFsResource;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Slide.
 */
@Service
public class SlideService {

    private final Logger log = LoggerFactory.getLogger(SlideService.class);

    private final SlideRepository slideRepository;

    private final SlideSearchRepository slideSearchRepository;
    private static final String ENTITY_NAME = "slide";
    private final String ROOT_DIR = "content-directory";
    private final Environment environment;
    private final GridFsTemplate gridFsTemplate;

    public SlideService(SlideRepository slideRepository,
                        SlideSearchRepository slideSearchRepository,
                        Environment environment,
                        GridFsTemplate gridFsTemplate) {
        this.slideRepository = slideRepository;
        this.slideSearchRepository = slideSearchRepository;
        this.environment = environment;
        this.gridFsTemplate = gridFsTemplate;
    }


    /**
     * Get all the slides.
     *
     * @return the list of entities
     */
    public List<Slide> findAll() {
        log.debug("Request to get all Slides");
        return slideRepository.findAll();
    }


    /**
     * Get one slide by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    public Optional<Slide> findOne(String id) {
        log.debug("Request to get Slide : {}", id);
        Optional<Slide> slide = slideRepository.findById(id);
        if(slide.isPresent()) {
            try {
                Optional<GridFSFile> slideFile = findFileByMetadata("slideId", slide.get().getId());
                if (slideFile.isPresent()) {
                    GridFSFile fs = slideFile.get();
                    GridFsResource resource = gridFsTemplate.getResource(fs.getFilename());
                    InputStream is = resource.getInputStream();
                    ByteArrayOutputStream buffer = new ByteArrayOutputStream();
                    int nRead;
                    byte[] data = new byte[1024];
                    while ((nRead = is.read(data, 0, data.length)) != -1) {
                        buffer.write(data, 0, nRead);
                    }
                    buffer.flush();
                    byte[] buff = buffer.toByteArray();
                    slide.get().setPhoto(buff);
                }
            } catch (IOException e) {
                log.error(e.getMessage(), e.getCause());
            }
        }
        return slide;
    }

    /**
     * Delete the slide by id.
     *
     * @param id the id of the entity
     */
    public void delete(String id) {
        log.debug("Request to delete Slide : {}", id);
        slideRepository.deleteById(id);
        slideSearchRepository.deleteById(id);
    }

    /**
     * Search for the slide corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    public List<Slide> search(String query) {
        log.debug("Request to search Slides for query {}", query);
        return StreamSupport
            .stream(slideSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

    /**
     * Save a slide.
     *
     * @param slide the entity to save
     * @return the persisted entity
     */
    public Slide save(Slide slide) {
        log.debug("Request to save Service : {}", slide);
        try {
            ByteArrayInputStream is = new ByteArrayInputStream(slide.getPhoto());
            slide = slideRepository.save(slide);
            slide = createFile(slide);
            Optional<GridFSFile> slideFile = findFileByMetadata("slideId", slide.getId());
            if (!slideFile.isPresent()) {
                Map<String, String> data = new HashMap<>();
                data.put("name", slide.getTitle());
                data.put("slideId", slide.getId());
                gridFsTemplate.store(is, slide.getUrl(), slide.getPhotoContentType(), data);
            }
            is.close();
        }catch(Exception ioe) {
            ioe.printStackTrace();
        }
        return slide;
    }

    /**
     * Update a slide.
     *
     * @param slide the entity to update
     * @return the persisted entity
     */
    public Slide update(Slide slide) {
        log.debug("Request to update Service : {}", slide);
        try {
            byte [] photo = slide.getPhoto();
            ByteArrayInputStream is = new ByteArrayInputStream(photo);
            slide = slideRepository.save(slide);
            slide = createFile(slide);
            Map<String, String> data = new HashMap<>();
            data.put("name", slide.getTitle());
            data.put("slideId", slide.getId());
            gridFsTemplate.store(is, slide.getUrl(), slide.getPhotoContentType(), data);
            is.close();
        }catch(Exception ioe) {
            ioe.printStackTrace();
        }
        return slide;
    }

    private Slide createFile(Slide slide){
        try{
            String fileExt = slide.getPhotoContentType().split("/")[1];
            String root = Tools.getContentRoot().concat(environment.getProperty(ROOT_DIR));
            String directory = root.concat(Tools.getSeparator()).concat(ENTITY_NAME);
            Tools.createDirectory(directory);
            String filename = ("slide_").concat(slide.getId()).concat(".").concat(fileExt);
            String path = directory.concat(Tools.getSeparator()).concat(filename);
            log.debug("Creating file: {}", path);
            Tools.createFile(path, slide.getPhoto());
            String url = ("content").concat(Tools.getSeparator()).concat(ENTITY_NAME).concat(Tools.getSeparator()).concat(filename);
            slide.setUrl(url);
            slide.setPhoto(null);
            slide = slideRepository.save(slide);
        }catch(Exception ioe) {
            log.debug("Failed: {}", ioe.getCause());
            ioe.printStackTrace();
        }
        return slide;
    }


    private Optional<GridFSFile> findFileByMetadata(String key, String value) {
        GridFSFile file = gridFsTemplate.findOne(getQueryByMetadata(key, value));
        return Optional.ofNullable(file);
    }

    private static Query getQueryByMetadata(String key, String value) {
        return Query.query(GridFsCriteria.whereMetaData(key).is(value));
    }

    private static Query getFilenameQuery(String fileName) {
        return Query.query(GridFsCriteria.whereMetaData("slideId").is(fileName));
    }


	public void deleteById(String id) {
	}



	public Optional<Slide> findById(String id) {
		return slideRepository.findById(id);
	}


	public void deleteAll() {
        slideRepository.deleteAll();
	}



	public List<Slide> search(String query, PageRequest of) {
		return StreamSupport
            .stream(slideSearchRepository.search(queryStringQuery(query), of).spliterator(), false)
            .collect(Collectors.toList());
    }
    
	public List<Slide> search(QueryStringQueryBuilder queryStringQuery, PageRequest of) {
		return StreamSupport
            .stream(slideSearchRepository.search(queryStringQuery, of).spliterator(), false)
            .collect(Collectors.toList());
	}
}

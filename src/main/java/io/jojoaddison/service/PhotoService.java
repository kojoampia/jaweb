package io.jojoaddison.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import io.jojoaddison.service.util.Tools;

/**
 * Service Implementation for managing a photo.
 */
@Service
public class PhotoService {

    private final Logger log = LoggerFactory.getLogger(SlideService.class);
    private final String ROOT_DIR = "content-root";
    private final String CONTENT_DIR = "content-directory";
    private final Environment environment;

    public PhotoService(Environment environment) {
        this.environment = environment;
    }


    public String createFile(byte[] photo, String fileType, String _filename, String _directory) {
        try {
            String fileExt = fileType.split("/")[1];
            String contentDirectory = environment.getProperty(CONTENT_DIR);
            String rootDirectory = environment.getProperty(ROOT_DIR).concat(Tools.getSeparator()).concat(contentDirectory);
            String serverDirectory = Tools.getContentRoot().concat(rootDirectory);
            String fileDirectory = _directory != null ? serverDirectory.concat(Tools.getSeparator()).concat(_directory) : serverDirectory;
            String urlDirectory = _directory != null? contentDirectory.concat(Tools.getSeparator()).concat(_directory) : contentDirectory;
            Tools.createDirectory(fileDirectory);
            String filename = _filename.concat(".").concat(fileExt);
            String filePath = fileDirectory.concat(Tools.getSeparator()).concat(filename);
            log.debug("Creating file: {}", filePath);
            Tools.createFile(filePath, photo);
            String url = urlDirectory.concat(Tools.getSeparator()).concat(filename);
            return url;
        } catch (Exception ioe) {
            log.debug("Failed: {}", ioe.getCause());
            ioe.printStackTrace();
        }
        return null;
    }


}

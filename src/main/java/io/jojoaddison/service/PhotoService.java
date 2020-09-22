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

    private final Logger log = LoggerFactory.getLogger(PhotoService.class);
    private final String ROOT_DIR = "content-root";
    private final String CONTENT_DIR = "content-directory";
    private final Environment environment;

    public PhotoService(Environment environment) {
        this.environment = environment;
    }


    public String createFile(byte[] photo, String fileType, String _filename, String _directory) {
        if(photo != null && fileType != null && _filename != null){
            try {
                String fileExt = fileType.split("/")[1];
                String contentDirectory = environment.getProperty(CONTENT_DIR);
                log.info("Content Directory: {}", contentDirectory);
                String rootDirectory = environment.getProperty(ROOT_DIR).concat(Tools.getSeparator()).concat(contentDirectory);
                log.info("Root Directory: {}", rootDirectory);
                String baseRootDirectory = Tools.getContentRoot();
                log.info("BaseRootDirectory: {}", baseRootDirectory);
                String serverDirectory = baseRootDirectory.concat(rootDirectory);
                log.info("Server  Directory: {}", serverDirectory);
                String fileDirectory = _directory != null ? serverDirectory.concat(Tools.getSeparator()).concat(_directory) : serverDirectory;
                log.info("File Directory: {}", fileDirectory);
                String urlDirectory = _directory != null? "content".concat(Tools.getSeparator()).concat(_directory) : "content";
                log.info("URLDirectory: {}", urlDirectory);
                Tools.createDirectory(fileDirectory);
                String filename = _filename.concat(".").concat(fileExt);
                String filePath = fileDirectory.concat(Tools.getSeparator()).concat(filename);
                log.info("Creating file: {}", filePath);
                Tools.createFile(filePath, photo);
                String url = urlDirectory.concat(Tools.getSeparator()).concat(filename);
                log.info("FILE URL: {}", url);
                return url;
            } catch (Exception ioe) {
                log.debug("Failed: {}", ioe.getCause());
                ioe.printStackTrace();
            }
        }
        return null;
    }


}

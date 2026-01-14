package io.jojoaddison.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.time.ZonedDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.jojoaddison.domain.Blog;
import io.jojoaddison.repository.BlogRepository;
import io.jojoaddison.service.UserService;
import io.jojoaddison.web.rest.errors.BadRequestAlertException;
import io.jojoaddison.web.rest.util.HeaderUtil;
import io.jojoaddison.web.rest.util.PaginationUtil;

/**
 * REST controller for managing Blog.
 */
@RestController
@RequestMapping("/api")
public class BlogResource {

    private final Logger log = LoggerFactory.getLogger(BlogResource.class);

    private static final String ENTITY_NAME = "blog";

    private final BlogRepository blogRepository;
    private final UserService userService;

    public BlogResource(BlogRepository blogRepository, UserService userService) {
        this.blogRepository = blogRepository;
        this.userService = userService;
    }

    /**
     * POST  /blogs : Create a new blog.
     *
     * @param blog the blog to create
     * @return the ResponseEntity with status 201 (Created) and with body the new blog, or with status 400 (Bad Request) if the blog has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/blogs")
    public ResponseEntity<Blog> createBlog(@RequestBody Blog blog) throws URISyntaxException {
        log.debug("REST request to save Blog : {}", blog);
        if (blog.getId() != null) {
            throw new BadRequestAlertException("A new blog cannot already have an ID", ENTITY_NAME, "idexists");
        }
        blog.setCreatedDate(ZonedDateTime.now());
        blog.setLastModifiedBy(userService.getUserWithAuthorities().get().getEmail());
        blog.setModifiedDate(ZonedDateTime.now());
        Blog result = blogRepository.save(blog);
        return ResponseEntity.created(new URI("/api/blogs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /blogs : Updates an existing blog.
     *
     * @param blog the blog to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated blog,
     * or with status 400 (Bad Request) if the blog is not valid,
     * or with status 500 (Internal Server Error) if the blog couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/blogs")
    public ResponseEntity<Blog> updateBlog(@RequestBody Blog blog) throws URISyntaxException {
        log.debug("REST request to update Blog : {}", blog);
        if (blog.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        blog.setLastModifiedBy(userService.getUserWithAuthorities().get().getEmail());
        blog.setModifiedDate(ZonedDateTime.now());
        Blog result = blogRepository.save(blog);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, blog.getId().toString()))
            .body(result);
    }

    /**
     * GET  /blogs : get all the blogs.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of blogs in body
     */
    @GetMapping("/blogs")
    public ResponseEntity<List<Blog>> getAllBlogs(Pageable pageable) {
        log.debug("REST request to get a page of Blogs");
        Page<Blog> page = blogRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/blogs");
        List<Blog> blogs = page.getContent().stream()
        .sorted(Comparator.comparing(Blog::getModifiedDate, Comparator.reverseOrder()))
        .collect(Collectors.toList());
        return ResponseEntity.ok().headers(headers).body(blogs);
    }

    /**
     * GET  /blogs : get all the blogs.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of blogs in body
     */
    @GetMapping("/blogs/recent")
    public ResponseEntity<List<Blog>> getRecentBlogs(Pageable pageable) {
        log.debug("REST request to get a page of Blogs");
        ZonedDateTime recent = ZonedDateTime.now().minusDays(365);
        Page<Blog> page = blogRepository.findByModifiedDateAfter(recent, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/blogs/recent");
        List<Blog> blogs = page.getContent().stream()
        .sorted(Comparator.comparing(Blog::getModifiedDate, Comparator.reverseOrder()))
        .collect(Collectors.toList());
        return ResponseEntity.ok().headers(headers).body(blogs);
    }

    /**
     * GET  /blogs : get all the blogs.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of blogs in body
     */
    @GetMapping("/blogs/archive")
    public Map<Integer,List<Blog>> getArchiveBlogs() {
        log.debug("REST request to get a page of Blogs");
        Map<Integer, List<Blog>> blogs = blogRepository.findAll().stream()
        .sorted(Comparator.comparing(Blog::getCreatedDate, Comparator.reverseOrder()))
        .collect(Collectors.groupingBy(Blog::getCreatedYear, Collectors.toList()));
        return blogs;
    }

    /**
     * GET  /blogs : get all the blogs.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of blogs in body
     */
    @GetMapping("/blogs/archive/{year}")
    public Map<Integer,List<Blog>> getArchiveByYearBlogs(@PathVariable int year) {
        log.debug("REST request to get a page of Blogs");
        Map<Integer,List<Blog>> blogs = blogRepository.findAll().stream()
        .filter(b -> b.getCreatedYear() == year)
        .sorted(Comparator.comparing(Blog::getCreatedDate, Comparator.reverseOrder()))
        .collect(Collectors.groupingBy(Blog::getCreatedMonth, Collectors.toList()));
        return blogs;
    }
    /**
     * GET  /blogs : get all the blogs.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of blogs in body
     */
    @GetMapping("/blogs/archive/{year}/{month}")
    public Map<Integer,List<Blog>> getArchiveByYearAndMonthBlogs(@PathVariable int year, @PathVariable int month) {
        log.debug("REST request to get a page of Blogs");
        Map<Integer,List<Blog>> blogs = blogRepository.findAll().stream()
        .filter(b -> b.getCreatedYear() == year && b.getCreatedMonth() == month)
        .sorted(Comparator.comparing(Blog::getCreatedDate, Comparator.reverseOrder()))
        .collect(Collectors.groupingBy(Blog::getCreatedDay, Collectors.toList()));
        return blogs;
    }


    /**
     * GET  /blogs/:id : get the "id" blog.
     *
     * @param id the id of the blog to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the blog, or with status 404 (Not Found)
     */
    @GetMapping("/blogs/{id}")
    public ResponseEntity<Blog> getBlog(@PathVariable String id) {
        log.debug("REST request to get Blog : {}", id);
        Optional<Blog> blog = blogRepository.findById(id);
        return blog.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    /**
     * DELETE  /blogs/:id : delete the "id" blog.
     *
     * @param id the id of the blog to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/blogs/{id}")
    public ResponseEntity<Void> deleteBlog(@PathVariable String id) {
        log.debug("REST request to delete Blog : {}", id);
        blogRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }


}

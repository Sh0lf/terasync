package isep.webapp.terasync.controller;

import isep.webapp.terasync.model.Entity;
import isep.webapp.terasync.model.query.update.ValueByField;
import isep.webapp.terasync.service.EntityService;
import isep.webapp.terasync.service.misc.FileService;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

import static java.nio.file.Paths.get;

public abstract class EntityController<T extends Entity, S extends EntityService<T, ?>> {
    protected final S entityService;
    protected final Class<T> entityClass;
    protected final FileService fileService = new FileService();

    protected EntityController(S entityService, Class<T> entityClass) {
        this.entityService = entityService;
        this.entityClass = entityClass;
    }

    // this is just for testing, otherwise anyone can read all the entities,
    // will need to set up perms so only admins can use this method
    @GetMapping("/all")
    public ResponseEntity<List<T>> getAllEntities() {
        return ResponseEntity.ok(entityService.findAllEntities());
    }

    // also testing
    @GetMapping("/find-by-id/{id}")
    public ResponseEntity<T> findEntityById(@PathVariable("id") Integer id) {
        return ResponseEntity.ok(entityService.findEntityById(id));
    }

    @PostMapping("/add")
    public ResponseEntity<T> addEntity(@RequestBody T entity) {
        System.out.println("EntityController.addEntity: " + entity);
        return new ResponseEntity<>(entityService.addEntity(entity), HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<T> updateEntity(@RequestBody T entity) {
        return ResponseEntity.ok(entityService.updateEntity(entity));
    }

    @GetMapping("/delete/{id}")
    public ResponseEntity<Integer> deleteEntity(@PathVariable("id") Integer id) {
        entityService.deleteEntityById(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/upload-files")
    public ResponseEntity<List<String>> uploadFiles(@RequestParam("files") List<MultipartFile> multipartFiles)
            throws IOException {
        return ResponseEntity.ok(fileService.uploadFiles(multipartFiles, entityClass.getSimpleName().toLowerCase()));
    }

    @GetMapping("/download-file/{fileName}")
    public ResponseEntity<Resource> downloadFile(@PathVariable("fileName") String fileName) throws IOException {
        Resource resource = fileService.downloadFile(fileName, entityClass.getSimpleName().toLowerCase());
        Path filePath = fileService.getFilePath(fileName, entityClass.getSimpleName().toLowerCase());
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(Files.probeContentType(filePath)))
                .headers(fileService.getFileHeaders(fileName)).body(resource);
    }

    @GetMapping("/delete-file/{fileName}")
    public ResponseEntity<Boolean> deleteFile(@PathVariable("fileName") String fileName) throws IOException {
        return ResponseEntity.ok(fileService.deleteFile(fileName, entityClass.getSimpleName().toLowerCase()));
    }

}

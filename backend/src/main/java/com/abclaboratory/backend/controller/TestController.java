package com.abclaboratory.backend.controller;

import com.abclaboratory.backend.entity.Test;
import com.abclaboratory.backend.service.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/tests")
@CrossOrigin
public class TestController {
    @Autowired
    private TestService testService;

    @GetMapping("/all")
    public ResponseEntity<List<Test>> getAllTests() {
        try {
            List<Test> tests = testService.getAllTests();
            return new ResponseEntity<>(tests, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/create")
    public ResponseEntity<?> addTest(@RequestBody @Valid Test test) {
        try {
            Test savedTest = testService.saveTest(test);
            return new ResponseEntity<>("Test created successfully with ID: " + savedTest.getId(), HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to create test. Reason: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Test> getTestById(@PathVariable Long id) {
        try {
            Test test = testService.getTestById(id);
            if (test != null) {
                return new ResponseEntity<>(test, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<?> editTest(@PathVariable Long id, @RequestBody Test updatedTest) {
        try {
            Test editedTest = testService.editTest(id, updatedTest);
            if (editedTest != null) {
                return new ResponseEntity<>("Test edited successfully", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Test not found", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteTest(@PathVariable Long id) {
        try {
            boolean deleted = testService.deleteTest(id);
            if (deleted) {
                return new ResponseEntity<>("Test deleted successfully", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Test not found", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
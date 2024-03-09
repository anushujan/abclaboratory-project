package com.abclaboratory.backend.controller;


import com.abclaboratory.backend.entity.Technician;
import com.abclaboratory.backend.service.TechnicianService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/technicians")
@CrossOrigin
public class TechnicianController {
    @Autowired
    private TechnicianService technicianService;

    @PostMapping("/create")
    public ResponseEntity<?> addTechnician(@RequestBody @Valid Technician technician, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            List<String> errors = bindingResult.getFieldErrors().stream()
                    .map(FieldError::getDefaultMessage)
                    .collect(Collectors.toList());
            return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }

        try {
            Technician savedTechnician = technicianService.saveTechnician(technician);
            return new ResponseEntity<>("Technician created successfully with Name: " + savedTechnician.getName(), HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to create technician. Reason: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<Technician>> getAllTechnicians() {
        try {
            List<Technician> technicians = technicianService.getAllTechnicians();
            return new ResponseEntity<>(technicians, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Technician> getTechnicianById(@PathVariable Long id) {
        try {
            Technician technician = technicianService.getTechnicianById(id);
            if (technician != null) {
                return new ResponseEntity<>(technician, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<?> editTechnician(@PathVariable Long id, @RequestBody Technician updatedTechnician) {
        try {
            Technician editedTechnician = technicianService.editTechnician(id, updatedTechnician);
            if (editedTechnician != null) {
                return new ResponseEntity<>("Technician edited successfully", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Technician not found", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteTechnician(@PathVariable Long id) {
        try {
            boolean deleted = technicianService.deleteTechnician(id);
            if (deleted) {
                return new ResponseEntity<>("Technician deleted successfully", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Technician not found", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
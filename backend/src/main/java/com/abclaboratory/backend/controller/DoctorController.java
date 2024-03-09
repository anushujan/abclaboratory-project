package com.abclaboratory.backend.controller;

import com.abclaboratory.backend.entity.Doctor;
import com.abclaboratory.backend.service.DoctorService;
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
@RequestMapping("/api/doctors")
@CrossOrigin
public class DoctorController {
    @Autowired
    private DoctorService doctorService;
    //=======================================
    //=============Create doctor============
    //=======================================
    @PostMapping("/create")
    public ResponseEntity<?> addDoctor(@RequestBody @Valid Doctor doctor, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            // Collect validation error messages
            List<String> errors = bindingResult.getFieldErrors().stream()
                    .map(FieldError::getDefaultMessage)
                    .collect(Collectors.toList());
            return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }

        try {
            Doctor savedDoctor = doctorService.saveDoctor(doctor);
            return new ResponseEntity<>("Doctor created successfully with Name: " + savedDoctor.getName(), HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to create doctor. Reason: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    //=======================================
    //===========Get all doctors=============
    //=======================================
    @GetMapping("/all")
    public ResponseEntity<List<Doctor>> getAllDoctors() {
        try {
            List<Doctor> doctors = doctorService.getAllDoctors();
            return new ResponseEntity<>(doctors, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    //=======================================
    //======= Get a doctor by ID=============
    //=======================================
    @GetMapping("/{id}")
    public ResponseEntity<Doctor> getDoctorById(@PathVariable Long id) {
        try {
            Doctor doctor = doctorService.getDoctorById(id);
            if (doctor != null) {
                return new ResponseEntity<>(doctor, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    //=======================================
    //============Edit doctor================
    //=======================================
    @PutMapping("/edit/{id}")
    public ResponseEntity<?> editDoctor(@PathVariable Long id, @RequestBody Doctor updatedDoctor) {
        try {
            Doctor editedDoctor = doctorService.editDoctor(id, updatedDoctor);
            if (editedDoctor != null) {
                return new ResponseEntity<>("Doctor edited successfully", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Doctor not found", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    //=======================================
    //=============Delete doctor=============
    //=======================================
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteDoctor(@PathVariable Long id) {
        try {
            boolean deleted = doctorService.deleteDoctor(id);
            if (deleted) {
                return new ResponseEntity<>("Doctor deleted successfully", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Doctor not found", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

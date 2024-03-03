package com.abclaboratory.backend.controller;

import com.abclaboratory.backend.entity.Patient;
import com.abclaboratory.backend.service.PatientService;
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
@RequestMapping("/api/patients")
@CrossOrigin
public class PatientController {
    @Autowired
    private PatientService patientService;
    //=======================================
    //=============create patient============
    //=======================================
    //==test=====
    @PostMapping("/create")
    public ResponseEntity<?> addPatient(@RequestBody @Valid Patient patient, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            // Collect validation error messages
            List<String> errors = bindingResult.getFieldErrors().stream()
                    .map(FieldError::getDefaultMessage)
                    .collect(Collectors.toList());
            return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }

        try {
            Patient savedPatient = patientService.savePatient(patient);
            return new ResponseEntity<>("Patient created successfully with Name: " + savedPatient.getName(), HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to create patient. Reason: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    //=======================================
    //=============all patients==============
    //=======================================
    @GetMapping("/all")
    public ResponseEntity<List<Patient>> getAllPatients() {
        try {
            List<Patient> patients = patientService.getAllPatients();
            return new ResponseEntity<>(patients, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    //=======================================
    //=============view by id================
    //=======================================
    @GetMapping("/{id}")
    public ResponseEntity<Patient> getPatientById(@PathVariable Long id) {
        try {
            Patient patient = patientService.getPatientById(id);
            if (patient != null) {
                return new ResponseEntity<>(patient, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //=======================================
    //============edit patients==============
    //=======================================
    @PutMapping("/edit/{id}")
    public ResponseEntity<?> editPatient(@PathVariable Long id, @RequestBody Patient updatedPatient) {
        try {
            Patient editedPatient = patientService.editPatient(id, updatedPatient);
            if (editedPatient != null) {
                return new ResponseEntity<>("Patient edited successfully", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Patient not found", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    //=======================================
    //=============delete patient============
    //=======================================
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deletePatient(@PathVariable Long id) {
        try {
            boolean deleted = patientService.deletePatient(id);
            if (deleted) {
                return new ResponseEntity<>("Patient deleted successfully", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Patient not found", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}

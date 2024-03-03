package com.abclaboratory.backend.service;

import com.abclaboratory.backend.entity.Patient;
import com.abclaboratory.backend.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatientService {
    @Autowired
    private PatientRepository patientRepository;

    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    public Patient savePatient(Patient patient) {
        return patientRepository.save(patient);
    }
    public Patient getPatientById(Long id) {
        return patientRepository.findById(id).orElse(null);
    }

    public Patient editPatient(Long id, Patient updatedPatient) {
        Patient existingPatient = patientRepository.findById(id).orElse(null);
        if (existingPatient != null) {

            existingPatient.setName(updatedPatient.getName());
            existingPatient.setPhone(updatedPatient.getPhone());
            existingPatient.setEmail(updatedPatient.getEmail());
            existingPatient.setAddress(updatedPatient.getAddress());
            return patientRepository.save(existingPatient);
        } else {
            return null;
        }
    }

    public boolean deletePatient(Long id) {
        if (patientRepository.existsById(id)) {
            patientRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }
}

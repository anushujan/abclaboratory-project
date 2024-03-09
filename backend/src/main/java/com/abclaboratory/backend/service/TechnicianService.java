package com.abclaboratory.backend.service;

import com.abclaboratory.backend.entity.Technician;
import com.abclaboratory.backend.repository.TechnicianRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TechnicianService {
    @Autowired
    private TechnicianRepository technicianRepository;

    public List<Technician> getAllTechnicians() {
        return technicianRepository.findAll();
    }

    public Technician saveTechnician(Technician technician) {
        return technicianRepository.save(technician);
    }

    public Technician getTechnicianById(Long id) {
        return technicianRepository.findById(id).orElse(null);
    }

    public Technician editTechnician(Long id, Technician updatedTechnician) {
        Technician existingTechnician = technicianRepository.findById(id).orElse(null);
        if (existingTechnician != null) {
            existingTechnician.setName(updatedTechnician.getName());
            existingTechnician.setEmail(updatedTechnician.getEmail());
            existingTechnician.setPhone(updatedTechnician.getPhone());
            existingTechnician.setSpecialization(updatedTechnician.getSpecialization());
            return technicianRepository.save(existingTechnician);
        } else {
            return null;
        }
    }

    public boolean deleteTechnician(Long id) {
        if (technicianRepository.existsById(id)) {
            technicianRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }
}
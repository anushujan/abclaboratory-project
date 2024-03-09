package com.abclaboratory.backend.repository;

import com.abclaboratory.backend.entity.Doctor;
import com.abclaboratory.backend.service.DoctorService;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DoctorRepository extends JpaRepository<Doctor,Long> {

}

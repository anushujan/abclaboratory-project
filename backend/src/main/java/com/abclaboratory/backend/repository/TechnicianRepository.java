package com.abclaboratory.backend.repository;

import com.abclaboratory.backend.entity.Technician;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TechnicianRepository extends JpaRepository<Technician, Long> {
}

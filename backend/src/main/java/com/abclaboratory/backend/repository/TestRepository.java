package com.abclaboratory.backend.repository;

import com.abclaboratory.backend.entity.Test;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TestRepository extends JpaRepository<Test, Long> {
}

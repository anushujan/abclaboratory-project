package com.abclaboratory.backend.service;


import com.abclaboratory.backend.entity.Test;
import com.abclaboratory.backend.repository.TestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TestService {
    @Autowired
    private TestRepository testRepository;

    public List<Test> getAllTests() {
        return testRepository.findAll();
    }

    public Test saveTest(Test test) {
        return testRepository.save(test);
    }

    public Test getTestById(Long id) {
        return testRepository.findById(id).orElse(null);
    }

    public Test editTest(Long id, Test updatedTest) {
        Test existingTest = testRepository.findById(id).orElse(null);
        if (existingTest != null) {
            // Update the attributes based on your requirements
            existingTest.setTestName(updatedTest.getTestName());
            existingTest.setTestType(updatedTest.getTestType());
            existingTest.setTestDescription(updatedTest.getTestDescription());
            existingTest.setTestResult(updatedTest.getTestResult());
            existingTest.setTestDate(updatedTest.getTestDate());
            existingTest.setPatient(updatedTest.getPatient());
            existingTest.setDoctor(updatedTest.getDoctor());
            existingTest.setTechnician(updatedTest.getTechnician());
            existingTest.setRecommender(updatedTest.getRecommender());

            return testRepository.save(existingTest);
        } else {
            return null;
        }
    }

    public boolean deleteTest(Long id) {
        if (testRepository.existsById(id)) {
            testRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }
}
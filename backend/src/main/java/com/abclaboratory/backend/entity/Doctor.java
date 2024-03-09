package com.abclaboratory.backend.entity;

import jakarta.persistence.*;

import javax.validation.constraints.NotBlank;

@Entity
@Table(name = "doctors")
public class Doctor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "doctor_id")
    private Long id;

    @NotBlank(message = "Name is required")
    @Column(name = "doctor_name")
    private String name;

    @NotBlank(message = "Email is required")
    @Column(name = "doctor_email")
    private String email;

    @NotBlank(message = "Phone is required")
    @Column(name = "doctor_phone")
    private String phone;

    @NotBlank(message = "Specialization is required")
    @Column(name = "specialization")
    private String specialization;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getSpecialization() {
        return specialization;
    }

    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }
}

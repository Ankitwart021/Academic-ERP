package com.ESD.erp.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name ="domains")
public class Domains {
    @Id
    @Column(name ="domain_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int domain_id;

    @Column(name="program",nullable = false )
    private String program;

    @Column(name="batch",nullable = false)
    private String batch;

    @Column(name="capacity",nullable = false)
    private int capacity;

    @Column(name="qualification")
    private String qualification;

    @JsonIgnore
    @OneToMany(mappedBy = "domain", fetch = FetchType.EAGER,cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<Students> students = new ArrayList<>();

    public Domains() {
    }

    public Domains(int domain_id, String program, String batch, int capacity, String qualification) {
        this.domain_id = domain_id;
        this.program = program;
        this.batch = batch;
        this.setCapacity(capacity);
        this.qualification = qualification;
    }

    public int getDomain_id() {
        return domain_id;
    }

    public void setDomain_id(int domain_id) {
        this.domain_id = domain_id;
    }

    public String getProgram() {
        return program;
    }

    public void setProgram(String program) {
        this.program = program;
    }

    public String getBatch() {
        return batch;
    }

    public void setBatch(String batch) {
        this.batch = batch;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        if (capacity > 300) {
            throw new IllegalArgumentException("Capacity cannot exceed 300.");
        }
        this.capacity = capacity;
    }

    public String getQualification() {
        return qualification;
    }

    public void setQualification(String qualification) {
        this.qualification = qualification;
    }
}
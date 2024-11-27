package com.ESD.erp.Repository;

import com.ESD.erp.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdminRepository  extends JpaRepository<Admin, Integer> {
    Admin findByEmailAndPassword(String email, String password);
    Optional<Admin> findByEmail(String email);
}

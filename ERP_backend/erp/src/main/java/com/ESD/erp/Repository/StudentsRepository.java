package com.ESD.erp.Repository;

import com.ESD.erp.model.Domains;
import com.ESD.erp.model.Students;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentsRepository extends JpaRepository<Students, Integer> {

}

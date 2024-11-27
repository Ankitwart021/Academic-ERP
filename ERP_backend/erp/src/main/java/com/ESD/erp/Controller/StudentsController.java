package com.ESD.erp.Controller;

import com.ESD.erp.Repository.StudentsRepository;
import com.ESD.erp.model.Domains;
import com.ESD.erp.model.Students;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class StudentsController {
    @Autowired
    private StudentsRepository studentsRepository;

    @PostMapping("/students")
    Students newStudent(@RequestBody Students newStudent) {
        return studentsRepository.save(newStudent);
    }

    //@GetMapping("/students")
    //List<Students> getAllUsers(){
      // return studentsRepository.findAll();
    //}

}

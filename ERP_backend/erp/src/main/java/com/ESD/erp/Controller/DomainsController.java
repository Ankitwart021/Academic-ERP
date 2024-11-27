package com.ESD.erp.Controller;

import com.ESD.erp.Repository.DomainRepository;
import com.ESD.erp.exceptions.DomainNotFoundException;
import com.ESD.erp.model.Domains;
import com.ESD.erp.model.Students;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class DomainsController {

    private final DomainRepository domainRepository;

    public DomainsController(DomainRepository domainRepository) {
        this.domainRepository = domainRepository;
    }

    @PostMapping("/domains-post")
    public ResponseEntity<?> newDomain(@RequestBody Domains newDomain) {
        try {
            return ResponseEntity.ok(domainRepository.save(newDomain));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/domains")
    public List<Domains> getAllUsers(){
        return domainRepository.findAll();
    }

    @GetMapping("/domains/{id}")
    public Domains getDomainById(@PathVariable("id") Integer id) {
        return domainRepository.findById(id)
                .orElseThrow(() -> new DomainNotFoundException(id));
    }

    @PutMapping("/domains/{id}")
    public ResponseEntity<?> updateDomain(@RequestBody Domains newDomain, @PathVariable("id") Integer id) {
        try {
            return domainRepository.findById(id)
                    .map(user -> {
                        user.setProgram(newDomain.getProgram());
                        user.setBatch(newDomain.getBatch());
                        user.setCapacity(newDomain.getCapacity());
                        user.setQualification(newDomain.getQualification());
                        return ResponseEntity.ok(domainRepository.save(user));
                    }).orElseThrow(() -> new DomainNotFoundException(id));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @DeleteMapping("/domains/{id}")
    public String deleteUser(@PathVariable Integer id){
        if(!domainRepository.existsById(id)){
            throw new DomainNotFoundException(id);
        }
        domainRepository.deleteById(id);
        return  "Domain with id "+id+" has been deleted success.";
    }

    @GetMapping("students/{domainId}")
    public List<Students> getStudentsByDomain(@PathVariable int domainId){
        return domainRepository.findStudentsByDomain(domainId);
    }
}
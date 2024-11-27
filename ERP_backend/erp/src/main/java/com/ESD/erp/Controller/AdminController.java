package com.ESD.erp.Controller;

import com.ESD.erp.Repository.AdminRepository;
import com.ESD.erp.model.Admin;
import com.ESD.erp.response.LoginResponse;
import com.ESD.erp.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/auth")
@RestController
@CrossOrigin("http://localhost:3000")
public class AdminController {
    @Autowired
    private AdminRepository adminRepository;
    private final JwtService jwtService;

    public AdminController(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @PostMapping("/admin")
    Admin newAdmin(@RequestBody Admin newAdmin){
        return adminRepository.save(newAdmin);
    }

        @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody Admin admin) {
            Admin authenticatedUser = adminRepository.findByEmailAndPassword(admin.getEmail(), admin.getPassword());

            String jwtToken = jwtService.generateToken(authenticatedUser);

            LoginResponse loginResponse = new LoginResponse()
                    .setToken(jwtToken)
                    .setExpiresIn(jwtService.getExpirationTime());

            return ResponseEntity.ok(loginResponse);
    }

}



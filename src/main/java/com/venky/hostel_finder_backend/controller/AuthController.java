package com.venky.hostel_finder_backend.controller;

import com.venky.hostel_finder_backend.dto.LoginRequestDto;
import com.venky.hostel_finder_backend.dto.RegisterRequestDto;
import com.venky.hostel_finder_backend.dto.RegisterRequestDto;
import com.venky.hostel_finder_backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    // 🔥 REGISTER API
    @PostMapping("/register")
    public String register(@RequestBody RegisterRequestDto dto) {
        return authService.register(dto);
    }

    // 🔥 LOGIN API
    @PostMapping("/login")
    public String login(@RequestBody LoginRequestDto dto) {
        return authService.login(dto);
    }
}
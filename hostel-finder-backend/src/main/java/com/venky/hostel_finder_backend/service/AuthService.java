package com.venky.hostel_finder_backend.service;

import com.venky.hostel_finder_backend.dto.LoginRequestDto;
import com.venky.hostel_finder_backend.dto.RegisterRequestDto;
import com.venky.hostel_finder_backend.entity.User;
import com.venky.hostel_finder_backend.repository.UserRepo;
import com.venky.hostel_finder_backend.security.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    // 🔥 REGISTER USER
    public String register(RegisterRequestDto dto) {

        // 1. check duplicate email
        Optional<User> existingUser = userRepo.findByEmail(dto.getEmail());
        if (existingUser.isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        // 2. create user entity
        User user = new User();
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());

        // 3. encrypt password
        user.setPassword(passwordEncoder.encode(dto.getPassword()));

        // 4. force role = USER
        user.setRole(User.Role.USER);

        // 5. save to DB
        userRepo.save(user);

        return "User registered successfully";
    }

    // 🔥 LOGIN USER
    public String login(LoginRequestDto dto) {

        // 1. find user by email
        User user = userRepo.findByEmail(dto.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 2. check password
        if (!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        // 3. generate JWT token
        return jwtService.generateToken(user.getEmail());
    }
}
package com.venky.hostel_finder_backend.entity;

import jakarta.persistence.*;

@Entity
public class User {

    public enum Role {
        USER,
        ADMIN
    }

    @Id
    @GeneratedValue
    private Long userId;

    private String name;

    @Column(unique = true, nullable = false)

    private String email;

    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;


    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public User(String name, String email, String password, Role role) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    public User() {
    }
}

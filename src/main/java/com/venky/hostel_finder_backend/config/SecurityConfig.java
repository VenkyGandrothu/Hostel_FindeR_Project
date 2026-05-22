package com.venky.hostel_finder_backend.config;

import com.venky.hostel_finder_backend.security.JwtFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    @Autowired
    private JwtFilter jwtFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                .csrf(csrf -> csrf.disable())

                .sessionManagement(sm -> sm.sessionCreationPolicy(
                        SessionCreationPolicy.STATELESS
                ))

                .authorizeHttpRequests(auth -> auth

                        // AUTH APIs
                        .requestMatchers("/api/auth/**").permitAll()

                        // PUBLIC APIs (Guest + User + Admin)
                        .requestMatchers(
                                "/api/hostels/all",
                                "/api/hostels/*"
                        ).permitAll()

                        // ADMIN ONLY
                        .requestMatchers("/api/hostels/add").hasRole("ADMIN")
                        .requestMatchers("/api/hostels/update/**").hasRole("ADMIN")
                        .requestMatchers("/api/hostels/delete/**").hasRole("ADMIN")

                        // everything else protected
                        .anyRequest().authenticated()
                )

                // JWT FILTER
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
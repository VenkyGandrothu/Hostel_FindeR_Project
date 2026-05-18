package com.venky.hostel_finder_backend.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        // DEBUG
        System.out.println("JWT FILTER HIT: " + request.getRequestURI());

        // 1. Get Authorization header
        String authHeader = request.getHeader("Authorization");
        System.out.println("AUTH HEADER = " + authHeader);

        String token = null;
        String email = null;

        // 2. Extract token
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7);
            email = jwtService.extractUsername(token);
        }

        // 3. If token exists and user is not already authenticated
        if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {

            UserDetails userDetails = userDetailsService.loadUserByUsername(email);

            // 4. Validate token
            if (jwtService.isTokenValid(token, userDetails.getUsername())) {

                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null,
                                userDetails.getAuthorities()
                        );

                // 5. IMPORTANT: Set authentication into context
                SecurityContextHolder.getContext().setAuthentication(authToken);

                // DEBUG
                System.out.println("AUTH SET SUCCESS");
                System.out.println("USER = " + userDetails.getUsername());
                System.out.println("AUTHORITIES = " + userDetails.getAuthorities());
            }
        }

        // 6. Continue filter chain
        filterChain.doFilter(request, response);
    }
}
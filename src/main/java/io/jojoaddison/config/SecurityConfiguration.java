package io.jojoaddison.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.filter.CorsFilter;
import org.zalando.problem.spring.web.advice.security.SecurityProblemSupport;

import io.jojoaddison.security.AuthoritiesConstants;
import io.jojoaddison.security.jwt.JWTFilter;
import io.jojoaddison.security.jwt.TokenProvider;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(securedEnabled = true)
@Import(SecurityProblemSupport.class)
public class SecurityConfiguration {

    private final UserDetailsService userDetailsService;

    private final TokenProvider tokenProvider;

    private final CorsFilter corsFilter;

    private final SecurityProblemSupport problemSupport;

    public SecurityConfiguration(UserDetailsService userDetailsService, TokenProvider tokenProvider, CorsFilter corsFilter, SecurityProblemSupport problemSupport) {
        this.userDetailsService = userDetailsService;
        this.tokenProvider = tokenProvider;
        this.corsFilter = corsFilter;
        this.problemSupport = problemSupport;
    }

    @Bean
    public AuthenticationManager authenticationManager(UserDetailsService userDetailsService, PasswordEncoder passwordEncoder) {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService);
        provider.setPasswordEncoder(passwordEncoder);
        return new ProviderManager(provider);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(AbstractHttpConfigurer::disable)
            .addFilterBefore(corsFilter, UsernamePasswordAuthenticationFilter.class)
            .exceptionHandling(exceptionHandling ->
                exceptionHandling
                    .authenticationEntryPoint(problemSupport)
                    .accessDeniedHandler(problemSupport)
            )
            .headers(headers ->
                headers.frameOptions(HeadersConfigurer.FrameOptionsConfig::disable)
            )
            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )
            .authorizeHttpRequests(authz ->
                authz
                    .requestMatchers("/api/register").permitAll()
                    .requestMatchers("/api/activate").permitAll()
                    .requestMatchers("/api/authenticate").permitAll()
                    .requestMatchers("/api/account/reset-password/init").permitAll()
                    .requestMatchers("/api/account/reset-password/finish").permitAll()
                    .requestMatchers(HttpMethod.GET, "/api/homes/**").permitAll()
                    .requestMatchers(HttpMethod.GET, "/api/blogs/**").permitAll()
                    .requestMatchers(HttpMethod.GET, "/api/abouts/**").permitAll()
                    .requestMatchers(HttpMethod.GET, "/api/contacts/**").permitAll()
                    .requestMatchers(HttpMethod.POST, "/api/contact-messages/**").permitAll()
                    .requestMatchers(HttpMethod.GET, "/api/imprints/**").permitAll()
                    .requestMatchers(HttpMethod.GET, "/api/slides/**").permitAll()
                    .requestMatchers(HttpMethod.GET, "/api/services/**").permitAll()
                    .requestMatchers(HttpMethod.GET, "/api/partners/**").permitAll()
                    .requestMatchers(HttpMethod.GET, "/api/portfolios/**").permitAll()
                    .requestMatchers(HttpMethod.GET, "/api/careers/**").permitAll()
                    .requestMatchers(HttpMethod.GET, "/api/staff/**").permitAll()
                    .requestMatchers(HttpMethod.PUT, "/api/staff/**").hasAuthority(AuthoritiesConstants.STAFF)
                    .requestMatchers("/api/**").authenticated()
                    .requestMatchers("/websocket/**").permitAll()
                    .requestMatchers(HttpMethod.GET, "/websocket/info/**").permitAll()
                    .requestMatchers("/websocket/tracker").hasAuthority(AuthoritiesConstants.ADMIN)
                    .requestMatchers(HttpMethod.GET, "/management/info").permitAll()
                    .requestMatchers("/management/health").hasAuthority(AuthoritiesConstants.ADMIN)
                    .requestMatchers("/management/**").hasAuthority(AuthoritiesConstants.ADMIN)
            )
            .addFilterBefore(new JWTFilter(tokenProvider), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}

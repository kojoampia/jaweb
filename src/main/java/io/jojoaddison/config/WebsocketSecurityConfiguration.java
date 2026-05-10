package io.jojoaddison.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.Message;
import org.springframework.messaging.simp.SimpMessageType;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.security.authorization.AuthorizationManager;
import org.springframework.security.config.annotation.web.socket.EnableWebSocketSecurity;
import org.springframework.security.messaging.access.intercept.MessageMatcherDelegatingAuthorizationManager;

import io.jojoaddison.security.AuthoritiesConstants;

@Configuration
@EnableWebSocketSecurity
public class WebsocketSecurityConfiguration {

    @Bean
    AuthorizationManager<Message<?>> messageAuthorizationManager(MessageMatcherDelegatingAuthorizationManager.Builder messages) {
        messages
            .nullDestMatcher().authenticated()
            .simpDestMatchers("/topic/tracker").hasAuthority(AuthoritiesConstants.ADMIN)
            // matches any destination that starts with /topic/
            // (i.e. cannot send messages directly to /topic/)
            // (i.e. cannot subscribe to /topic/messages/* to get messages sent to
            // /topic/messages-user<id>)
            .simpDestMatchers("/topic/**").authenticated()
            // message types other than MESSAGE and SUBSCRIBE
            .simpTypeMatchers(SimpMessageType.MESSAGE, SimpMessageType.SUBSCRIBE).denyAll()
            // catch all
            .anyMessage().denyAll();

        return messages.build();
    }

    /**
     * Disables CSRF for WebSocket connections. JWT-based authentication does not use
     * HTTP sessions or cookies, so CSRF tokens are not applicable.
     */
    @Bean
    ChannelInterceptor csrfChannelInterceptor() {
        return new ChannelInterceptor() {};
    }
}

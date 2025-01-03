package se.lexicon.meetingapi.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import se.lexicon.meetingapi.entity.Invitation;
import se.lexicon.meetingapi.repository.InvitationRepository;

import java.time.LocalDate;
import java.time.LocalTime;

@Configuration
public class InvitationDatabaseInitializer {

    @Bean
    CommandLineRunner initDatabase(InvitationRepository repository) {
        return args -> {
            repository.save(new Invitation("Meeting", LocalDate.now(), LocalTime.of(10, 0), LocalTime.of(12, 0), "Office", "pending"));
            repository.save(new Invitation("Conference", LocalDate.now().plusDays(1), LocalTime.of(9, 0), LocalTime.of(17, 0), "Conference Hall", "accepted"));
            repository.save(new Invitation("Meeting", LocalDate.now(), LocalTime.of(10, 0), LocalTime.of(12, 0), "Office", "pending"));
            repository.save(new Invitation("Conference", LocalDate.now().plusDays(1), LocalTime.of(9, 0), LocalTime.of(17, 0), "Conference Hall", "accepted"));
            repository.save(new Invitation("Meeting", LocalDate.now(), LocalTime.of(10, 0), LocalTime.of(12, 0), "Office", "pending"));
            repository.save(new Invitation("Conference", LocalDate.now().plusDays(1), LocalTime.of(9, 0), LocalTime.of(17, 0), "Conference Hall", "accepted"));
        };
    }
}

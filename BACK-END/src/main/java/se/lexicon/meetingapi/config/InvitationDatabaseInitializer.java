package se.lexicon.meetingapi.config;


import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;
import se.lexicon.meetingapi.entity.Invitation;
import se.lexicon.meetingapi.repository.InvitationRepository;

import java.util.Arrays;
import java.util.List;

@Component
public class InvitationDatabaseInitializer {

    private final InvitationRepository invitationRepository;


    public InvitationDatabaseInitializer(InvitationRepository invitationRepository) {
        this.invitationRepository = invitationRepository;
    }

    @PostConstruct
    public void initializeDatabase() {
        List<Invitation> invitations = Arrays.asList(
                new Invitation("Morning Meeting", "2024-12-25", "10:00 AM", "12:30 PM", "Zoom", "pending"),
                new Invitation("Lecture", "2024-12-26", "2:00 PM", "4:00 PM", "Class room", "accepted"),
                new Invitation("Class Meeting", "2024-12-28", "1:00 PM", "4:00 PM", "Main hall", "declined"),
                new Invitation("Weekly Meeting", "2024-12-28", "1:00 PM", "3:00 PM", "Main Office", "pending"),
                new Invitation("Evening Meeting", "2024-12-30", "11:00 AM", "11:45 AM", "Meeting room", "pending"),
                new Invitation("Monthly Meeting", "2024-12-16", "10:00 AM", "11:30 AM", "Main hall", "pending")
        );

        // Save all invitations to the database
        invitationRepository.saveAll(invitations);
        System.out.println("Database initialized with invitation data.");
    }
}


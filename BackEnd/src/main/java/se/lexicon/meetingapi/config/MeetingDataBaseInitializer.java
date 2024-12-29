package se.lexicon.meetingapi.config;

import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;
import se.lexicon.meetingapi.entity.Invitation;
import se.lexicon.meetingapi.entity.Meeting;
import se.lexicon.meetingapi.repository.MeetingRepository;

import java.util.Arrays;
import java.util.List;

@Component
public class MeetingDataBaseInitializer {

    private final MeetingRepository meetingRepository;

    public MeetingDataBaseInitializer(MeetingRepository meetingRepository) {
        this.meetingRepository = meetingRepository;

    }

    @PostConstruct
    public void initializeDatabase() {
        List<Meeting> meetings = Arrays.asList(
                new Meeting("Morning Meeting", "2024-12-25", "10:00 AM", "12:30 PM" , "Zoom", "Team"),
                new Meeting("Lecture", "2024-12-26", "2:00 PM", "4:00 PM", "Class room","department"),
                new Meeting("Class Meeting", "2024-12-28", "1:00 PM", "4:00 PM", "Main hall", "company"),
                new Meeting("Weekly Meeting", "2024-12-28", "1:00 PM", "3:00 PM", "Main Office", "company"),
                new Meeting("Evening Meeting", "2024-12-30", "11:00 AM", "11:45 AM", "Meeting room","Team"),
                new Meeting("Monthly Meeting", "2024-12-16", "10:00 AM", "11:30 AM", "Main hall", "department")
        );

        // Save all meetings to the database
        meetingRepository.saveAll(meetings);
        System.out.println("Database initialized with meeting data.");
    }
}

package se.lexicon.meetingapi.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Invitation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private LocalDate date;         // Changed from String to LocalDate
    private LocalTime startTime;   // Changed from String to LocalTime
    private LocalTime endTime;     // Changed from String to LocalTime
    private String location;

    @NotBlank(message = "Status is required")
    @Pattern(regexp = "pending|accepted|declined", message = "Status must be 'pending', 'accepted', or 'declined'")
    private String status;

    public Invitation(String title, LocalDate date, LocalTime startTime, LocalTime endTime, String location, String status) {
        this.title = title;
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;
        this.location = location;
        this.status = status;
    }
}
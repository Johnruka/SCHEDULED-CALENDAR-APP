package se.lexicon.meetingapi.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record MeetingDto(

        Long id, @NotBlank(message = "Meeting is required")
        @Size(max = 100, message = "Title must not exceed 100 characters")
        String title,

        @NotBlank(message = "Date is required")
        @Pattern(
                regexp = "\\d{4}-\\d{2}-\\d{2}",
                message = "Date must be in the format YYYY-MM-DD"
        )
        String date,

        @NotBlank(message = "Time is required")
        @Pattern(
                regexp = "(?:[01]\\d|2[0-3]):[0-5]\\d (?:AM|PM)",
                message = "Time must be in the format HH:MM AM/PM"
        )
        String startTime,

        @NotBlank(message = "Time is required")
        @Pattern(
                regexp = "(?:[01]\\d|2[0-3]):[0-5]\\d (?:AM|PM)",
                message = "Time must be in the format HH:MM AM/PM"
        )
        String endTime,

        @Size(max = 50, message = "Location must not exceed 100 characters")
        String location,


           @NotBlank(message = "Level is required")
        @Pattern(
                regexp = "team|company|department",
                message = "Level must be 'team','company', 'department'"
        )
                String level




) {
}

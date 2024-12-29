package se.lexicon.meetingapi.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record LabelDto(


@Size(max = 100, message = "Title must not exceed 100 characters")
String title,

        @NotBlank(message = "Date is required")
        @Pattern(
                regexp = "\\d{4}-\\d{2}-\\d{2}",
                message = "Date must be in the format YYYY-MM-DD"
        )
        String date,

        @NotBlank(message = "startTime is required")
        @Pattern(
                regexp = "(?:[01]\\d|2[0-3]):[0-5]\\d (?:AM|PM)",
                message = "startTime must be in the format HH:MM AM/PM"
        )
        String startTime,

        @NotBlank(message = "endTime is required")
        @Pattern(
                regexp = "(?:[01]\\d|2[0-3]):[0-5]\\d (?:AM|PM)",
                message = "endTime must be in the format HH:MM AM/PM"
        )
        String endTime,

        @Size(max = 50, message = "Location must not exceed 100 characters")
        String location,

        @NotBlank(message = "Level is required")
        @Size(max = 50, message = "Level must not exceed 50 characters")
        String level,

        @NotBlank(message = "participant is required")
        @Size(max = 450, message = "participants must not exceed 150 characters")
        String participants,

        @NotBlank(message = "Description is required")
        @Size(max = 150, message = "description must not exceed 150 characters")
        String description

        ) {
}

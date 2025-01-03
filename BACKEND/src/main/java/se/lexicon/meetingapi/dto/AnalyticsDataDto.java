package se.lexicon.meetingapi.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public record AnalyticsDataDto(

        Long id, @NotBlank(message = "Analytics are required")

@NotBlank(message = "metricName is required")
@Size(max = 50, message = "metricName must not exceed 50 characters")
String metricName,

        @NotBlank(message = "metricValue is required")
        @Size(max = 80, message = "metricValue must not exceed 50 characters")
        Double metricValue,

        @NotBlank(message = "Date is required")
        @Pattern(
                regexp = "\\d{4}-\\d{2}-\\d{2}",
                message = "Date must be in the format YYYY-MM-DD"
        )
        LocalDate date


        ) {
}

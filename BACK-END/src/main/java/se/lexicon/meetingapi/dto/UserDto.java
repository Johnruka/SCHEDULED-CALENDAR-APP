package se.lexicon.meetingapi.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record UserDto(

Long id, @NotBlank(message = "User is required")

@NotBlank(message = "firstName is required")
@Size(max = 50, message = "firstName must not exceed 50 characters")
String firstName,

@NotBlank(message = "lastName is required")
@Size(max = 50, message = "lastName must not exceed 50 characters")
String lastName,

@NotBlank(message = "email is required")
@Size(max = 50, message = "email must not exceed 50 characters")
String email,

@NotBlank(message = "role is required")
@Pattern(
        regexp = "admin|user|guest",
        message = "role must be 'admin','user', 'guest'")
String role


        ) {
}

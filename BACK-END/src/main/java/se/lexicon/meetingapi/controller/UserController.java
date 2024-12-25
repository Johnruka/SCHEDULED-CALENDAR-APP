package se.lexicon.meetingapi.controller;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import se.lexicon.meetingapi.dto.UserDto;
import se.lexicon.meetingapi.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/api/Users")
@CrossOrigin("*")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<UserDto> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public UserDto getMeetingById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    @PostMapping("/{id}")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<UserDto> createUser(@RequestBody UserDto dto) {
        UserDto savedDto = userService.saveUser(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedDto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<Void> updateUser(@PathVariable Long id, @RequestParam @NotBlank(message = "User is required")
    @Pattern(
            regexp = "pending|registered |rejected",
            message = "Status must be 'pending', 'registered', 'rejected'"
    )
    String status) {
        System.out.println("id = " + id);
        System.out.println("status = " + status);
        userService.updateUser(id, status);
        return ResponseEntity.noContent().build();

    }
}


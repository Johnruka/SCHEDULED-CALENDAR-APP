package se.lexicon.meetingapi.controller;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import se.lexicon.meetingapi.dto.InvitationDto;
import se.lexicon.meetingapi.service.InvitationService;

import java.util.List;

@RestController
@RequestMapping("/api/invitations")
@CrossOrigin("*")
public class InvitationController {

    private final InvitationService invitationService;

    public InvitationController(InvitationService invitationService) {
        this.invitationService = invitationService;
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<InvitationDto> getAllInvitations() {
        return invitationService.getAllInvitations();
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public InvitationDto getInvitationById(@PathVariable Long id) {
        return invitationService.getInvitationById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<InvitationDto> createInvitation(@RequestBody InvitationDto dto) {
        InvitationDto savedDto = invitationService.saveInvitation(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedDto);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<Void> updateInvitation(@PathVariable Long id, @RequestParam @NotBlank(message = "Status is required")
    @Pattern(
            regexp = "pending|accepted|declined",
            message = "Status must be 'pending', 'accepted', or 'declined'"
    )
    String status) {
        System.out.println("id = " + id);
        System.out.println("status = " + status);
        invitationService.updateInvitation(id, status);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<Void> deleteInvitation(@PathVariable Long id) {
        invitationService.deleteInvitation(id);
        return ResponseEntity.noContent().build();
    }
}

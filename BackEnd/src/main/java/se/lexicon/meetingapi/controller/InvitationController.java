package se.lexicon.meetingapi.controller;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import se.lexicon.meetingapi.dto.InvitationDto;
import se.lexicon.meetingapi.repository.InvitationRepository;
import se.lexicon.meetingapi.service.InvitationService;

import java.util.List;

@RestController
@RequestMapping("/api/invitations")
@CrossOrigin(origins = "http://localhost:5173")
public class InvitationController {

    private static final Logger logger = LoggerFactory.getLogger(InvitationController.class);

    private final InvitationService invitationService;
    private final InvitationRepository invitationRepository;

    public InvitationController(InvitationService invitationService, InvitationRepository invitationRepository) {
        this.invitationService = invitationService;
        this.invitationRepository = invitationRepository;
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<InvitationDto> getAllInvitations() {
        return invitationService.getAllInvitations();
    }


    public Long getInvitationById(@PathVariable Long id) {
        return invitationService.getInvitationById();




    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<InvitationDto> createInvitation(@RequestBody InvitationDto dto) {
        InvitationDto savedDto = invitationService.saveInvitation(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedDto);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<Void> updateInvitation(
            @PathVariable Long id,
            @RequestParam @NotBlank(message = "Status is required")
            @Pattern(regexp = "pending|accepted|declined", message = "Status must be 'pending', 'accepted', or 'declined'")
            String status) {

        logger.info("Updating invitation id = {}, status = {}", id, status);

        if (!invitationService.updateInvitation(id, status)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<Void> deleteInvitation(@PathVariable Long id) {
        if (!invitationService.deleteInvitation(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        return ResponseEntity.noContent().build();
    }
}


package se.lexicon.meetingapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import se.lexicon.meetingapi.entity.Invitation;
import se.lexicon.meetingapi.service.InvitationService;

import java.util.List;

@RestController
@RequestMapping("/api/invitations")
@CrossOrigin(origins = "http://localhost:5173")
public class InvitationController {

    private final InvitationService invitationService;

    @Autowired
    public InvitationController(InvitationService invitationService) {
        this.invitationService = invitationService;
    }

    @GetMapping
    public List<Invitation> getAllInvitations() {
        return invitationService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Invitation> getInvitationById(@PathVariable Long id) {
        return invitationService.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Invitation createInvitation(@Valid @RequestBody Invitation invitation) {
        return invitationService.save(invitation);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Invitation> updateInvitation(@PathVariable Long id, @Valid @RequestBody Invitation updatedInvitation) {
        return invitationService.findById(id)
                .map(invitation -> {
                    invitation.setTitle(updatedInvitation.getTitle());
                    invitation.setDate(updatedInvitation.getDate());
                    invitation.setStartTime(updatedInvitation.getStartTime());
                    invitation.setEndTime(updatedInvitation.getEndTime());
                    invitation.setLocation(updatedInvitation.getLocation());
                    invitation.setStatus(updatedInvitation.getStatus());
                    return ResponseEntity.ok(invitationService.save(invitation));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Invitation> updateInvitationStatus(@PathVariable Long id, @RequestParam String status) {
        return invitationService.findById(id)
                .map(invitation -> {
                    invitation.setStatus(status);
                    return ResponseEntity.ok(invitationService.save(invitation));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInvitation(@PathVariable Long id) {
        if (invitationService.findById(id).isPresent()) {
            invitationService.deleteById(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}


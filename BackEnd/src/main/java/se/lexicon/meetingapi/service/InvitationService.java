package se.lexicon.meetingapi.service;

import org.springframework.stereotype.Service;
import se.lexicon.meetingapi.dto.InvitationDto;
import se.lexicon.meetingapi.entity.Invitation;
import se.lexicon.meetingapi.repository.InvitationRepository;

import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.data.jpa.domain.AbstractPersistable_.id;

@Service
public class InvitationService {

    private final InvitationRepository invitationRepository;

    public InvitationService(InvitationRepository invitationRepository) {
        this.invitationRepository = invitationRepository;
    }

    // Convert Entity to DTO
    private InvitationDto toDto(Invitation invitation) {
        return new InvitationDto(
                invitation.getId(),
                invitation.getTitle(),
                invitation.getDate(),
                invitation.getStartTime(),
                invitation.getEndTime(),
                invitation.getLocation(),
                invitation.getStatus()
        );
    }

    // Convert DTO to Entity
    private Invitation toEntity(InvitationDto dto) {
        Invitation invitation = new Invitation();
        invitation.setId(dto.id());
        invitation.setTitle(dto.title());
        invitation.setDate(dto.date());
        invitation.setStartTime(dto.startTime());
        invitation.setEndTime(dto.endTime());
        invitation.setLocation(dto.location());
        invitation.setStatus(dto.status());
        return invitation;
    }

    public List<InvitationDto> getAllInvitations() {
        return invitationRepository.findAll()
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public Long getInvitationById() {
        Invitation invitation = invitationRepository.findById(getInvitationById())
                .orElseThrow(() -> new RuntimeException("Invitation not found with ID: " + id));
        return toDto(invitation).id();
    }

    public InvitationDto saveInvitation(InvitationDto dto) {
        Invitation invitation = toEntity(dto);
        Invitation savedInvitation = invitationRepository.save(invitation);
        return toDto(savedInvitation);
    }

    public boolean updateInvitation(Long id, String status) {
        Invitation invitation = invitationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Invitation not found with ID: " + id));

        invitation.setTitle(invitation.getTitle());
        invitation.setDate(invitation.getDate());
        invitation.setStartTime(invitation.getStartTime());
        invitation.setEndTime(invitation.getEndTime());
        invitation.setLocation(invitation.getLocation());
        invitation.setStatus(status);
        invitationRepository.save(invitation);
        return false;
    }

    public boolean deleteInvitation(Long id) {
        if (!invitationRepository.existsById(id)) {
            throw new RuntimeException("Invitation not found with ID: " + id);
        }
        invitationRepository.deleteById(id);
        return false;
    }


}

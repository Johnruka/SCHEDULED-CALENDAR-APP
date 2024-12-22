package se.lexicon.meetingapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import se.lexicon.meetingapi.entity.Invitation;

public interface InvitationRepository extends JpaRepository<Invitation, Long> {
}

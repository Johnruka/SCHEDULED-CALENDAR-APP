package se.lexicon.meetingapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import se.lexicon.meetingapi.entity.Invitation;

@Repository
public interface InvitationRepository extends JpaRepository<Invitation, Long> {
}

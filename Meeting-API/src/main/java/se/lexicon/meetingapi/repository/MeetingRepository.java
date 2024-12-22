package se.lexicon.meetingapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import se.lexicon.meetingapi.entity.Meeting;


public interface MeetingRepository extends JpaRepository<Meeting, Long> {
}

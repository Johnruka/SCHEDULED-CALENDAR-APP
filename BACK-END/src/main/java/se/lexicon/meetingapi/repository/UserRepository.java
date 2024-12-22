package se.lexicon.meetingapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import se.lexicon.meetingapi.entity.User;


public interface UserRepository extends JpaRepository<User, Long> {
}

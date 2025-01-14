package se.lexicon.meetingapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import se.lexicon.meetingapi.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
}
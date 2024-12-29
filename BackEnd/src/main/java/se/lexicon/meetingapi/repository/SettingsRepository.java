package se.lexicon.meetingapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import se.lexicon.meetingapi.entity.Settings;

@Repository
public interface SettingsRepository extends JpaRepository<Settings, Long> {
}

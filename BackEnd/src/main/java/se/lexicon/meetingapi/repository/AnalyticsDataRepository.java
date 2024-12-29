package se.lexicon.meetingapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import se.lexicon.meetingapi.entity.AnalyticsData;

@Repository
public interface AnalyticsDataRepository extends JpaRepository<AnalyticsData, Long> {
}

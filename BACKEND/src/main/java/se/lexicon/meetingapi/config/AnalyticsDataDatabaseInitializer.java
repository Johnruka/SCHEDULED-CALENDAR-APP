package se.lexicon.meetingapi.config;

import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;
import se.lexicon.meetingapi.entity.AnalyticsData;
import se.lexicon.meetingapi.repository.AnalyticsDataRepository;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

@Component
public class AnalyticsDataDatabaseInitializer {

    private final AnalyticsDataRepository analyticsDataRepository;

    public AnalyticsDataDatabaseInitializer(AnalyticsDataRepository analyticsDataRepository) {
        this.analyticsDataRepository = analyticsDataRepository;
    }

    @PostConstruct
    public void initializeDatabase() {

        List<AnalyticsData> analyticsDataList = Arrays.asList(
                new AnalyticsData("Users", 150.0, LocalDate.now().minusDays(0)),
                new AnalyticsData("Page Views", 2000.0, LocalDate.now().minusDays(0)),
                new AnalyticsData("Conversion Rate", 5.0, LocalDate.now().minusDays(0))
        );

        // Save the list of sample data into the repository
        analyticsDataRepository.saveAll(analyticsDataList);

        System.out.println("Database initialized with sample data.");
    }
}


package se.lexicon.meetingapi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import se.lexicon.meetingapi.dto.AnalyticsDataDto;
import se.lexicon.meetingapi.entity.AnalyticsData;
import se.lexicon.meetingapi.repository.AnalyticsDataRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AnalyticsDataService {

    private final AnalyticsDataRepository analyticsDataRepository;

    @Autowired
    public AnalyticsDataService(AnalyticsDataRepository analyticsDataRepository) {
        this.analyticsDataRepository = analyticsDataRepository;
    }

    private AnalyticsDataDto toDto(AnalyticsData analyticsData) {
        return new AnalyticsDataDto(
                analyticsData.getId(),
                analyticsData.getMetricName(),
                analyticsData.getMetricValue(),
                analyticsData.getDate()
        );
    }

    private AnalyticsData toEntity(AnalyticsData dto) {

        AnalyticsData analyticsData = new AnalyticsData();
        analyticsData.setId(dto.getId());
        analyticsData.setMetricName(dto.getMetricName());
        analyticsData.setMetricValue(dto.getMetricValue());
        analyticsData.setDate(dto.getDate());
        return analyticsData;
    }

    public List<AnalyticsDataDto> findAll() {
        return analyticsDataRepository.findAll()
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public Optional<AnalyticsDataDto> findById(Long id) {
        return analyticsDataRepository.findById(id)
                .map(this::toDto);
    }

    public AnalyticsDataDto save(AnalyticsData dto) {
        AnalyticsData entity = toEntity(dto);
        AnalyticsData savedEntity = analyticsDataRepository.save(entity);
        return toDto(savedEntity);
    }

    public void deleteById(Long id) {
        analyticsDataRepository.deleteById(id);
    }
}

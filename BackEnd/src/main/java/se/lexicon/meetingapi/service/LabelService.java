package se.lexicon.meetingapi.service;

import org.springframework.stereotype.Service;
import se.lexicon.meetingapi.dto.LabelDto;
import se.lexicon.meetingapi.entity.Label;
import se.lexicon.meetingapi.repository.LabelRepository;

import java.util.Set;
import java.util.stream.Collectors;

@Service
public class LabelService {
private final LabelRepository labelRepository;

    public LabelService(LabelRepository labelRepository) {
        this.labelRepository = labelRepository;
    }
    private LabelDto toDto(Label label) {
        return new LabelDto(

                label.getTitle(),
                label.getDate(),
                label.getStartTime(),
                label.getEndTime(),
                label.getLocation(),
                label.getLevel(),
                label.getParticipants(),
                label.getDescription()
        );
    }
    private Label toEntity(LabelDto dto) {
        Label label = new Label();

        label.setTitle(dto.title());
        label.setDate(dto.date());
        label.setStartTime(dto.startTime());
        label.setEndTime(dto.endTime());
        label.setLocation(dto.location());
        label.setLevel(dto.level());
        label.setParticipants(dto.participants());
        label.setDescription(dto.description());
        return label;

    }

    public Set<LabelDto> getAllLabels() {
        return  labelRepository.findAll()
                .stream()
                .map(this::toDto)
                .collect(Collectors.toSet());

    }


}

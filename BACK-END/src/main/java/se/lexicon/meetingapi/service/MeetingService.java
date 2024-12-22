package se.lexicon.meetingapi.service;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import org.springframework.stereotype.Service;
import se.lexicon.meetingapi.dto.MeetingDto;
import se.lexicon.meetingapi.entity.Meeting;
import se.lexicon.meetingapi.repository.LabelRepository;
import se.lexicon.meetingapi.repository.MeetingRepository;

import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;


@Service
public class MeetingService {
    private final MeetingRepository meetingRepository;



    public MeetingService(MeetingRepository meetingRepository, LabelRepository labelRepository) {
        this.meetingRepository = meetingRepository;


    }

    private MeetingDto toDto(Meeting meeting) {
        // Convert Entity to DTO
        return new MeetingDto(
                meeting.getId(),
                meeting.getTitle(),
                meeting.getDate(),
                meeting.getStartTime(),
                meeting.getEndTime(),
                meeting.getLocation(),
                meeting.getLevel()
        );
    }

    // Convert DTO to Entity
    private Meeting toEntity(MeetingDto dto) {
        Meeting meeting = new Meeting();
        meeting.setId(dto.id());
        meeting.setTitle(dto.title());
        meeting.setDate(dto.date());
        meeting.setStartTime(dto.startTime());
        meeting.setEndTime(dto.endTime());
        meeting.setLocation(dto.location());
        meeting.setLevel(dto.level());

        return meeting;
    }

    public List<MeetingDto> getAllMeetings() {
        return meetingRepository.findAll()
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());


    }

    private void collect(Collector<Object, ?, List<Object>> list) {
    }


    public MeetingDto getMeetingById(Long id) {
        Meeting meeting = meetingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Meeting not found with ID: " + id));
        return toDto(meeting);
    }

    public MeetingDto saveMeeting(MeetingDto dto) {
        Meeting meeting = toEntity(dto);
        Meeting savedMeeting = meetingRepository.save(meeting);
        return toDto(savedMeeting);
    }

    public void deleteMeeting(Long id) {
        if (!meetingRepository.existsById(id)) {
            throw new RuntimeException("Meeting not found with ID: " + id);
        }
        meetingRepository.deleteById(id);
    }

    public void updateMeeting(Long id, @NotBlank(message = "Level is required") @Pattern(
            regexp = "team|department",
            message = "Level must be 'team', 'department'"
    ) String level) {
        Meeting meeting = meetingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Meeting not found with ID: " + id));

        meeting.setTitle(meeting.getTitle());
        meeting.setDate(meeting.getDate());
        meeting.setStartTime(meeting.getStartTime());
        meeting.setEndTime(meeting.getEndTime());
        meeting.setLevel(meeting.getLevel());
        meeting.setLocation(meeting.getLocation());
        meetingRepository.save(meeting);
    }


}


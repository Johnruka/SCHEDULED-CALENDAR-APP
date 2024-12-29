package se.lexicon.meetingapi.controller;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import se.lexicon.meetingapi.dto.LabelDto;
import se.lexicon.meetingapi.dto.MeetingDto;
import se.lexicon.meetingapi.service.LabelService;
import se.lexicon.meetingapi.service.MeetingService;

import java.util.Set;

@RestController
@RequestMapping("/api/labels")
@CrossOrigin(origins = "http://localhost:5173")
public class LabelController {

    private final LabelService labelService;
    private final MeetingService meetingService;

    public LabelController(LabelService labelService, MeetingService meetingService) {
        this.labelService = labelService;
        this.meetingService = meetingService;
    }


    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public Set<LabelDto> getAllLabels() {
        return labelService.getAllLabels();
    }

    @PostMapping("/{id}")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<MeetingDto> createMeeting(@RequestBody MeetingDto dto) {
        MeetingDto savedDto = meetingService.saveMeeting(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedDto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<Void> deleteMeeting(@PathVariable Long id) {
        meetingService.deleteMeeting(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<Void> updateMeeting(@PathVariable Long id, @NotBlank(message = "Level is required")
    @Pattern(
            regexp = "team|department",
            message = "Level must be 'team', 'department'"
    )
    String level) {
        System.out.println("id = " + id);
        System.out.println("level = " + level);
        meetingService.updateMeeting(id, level);
        return ResponseEntity.noContent().build();

    }
}

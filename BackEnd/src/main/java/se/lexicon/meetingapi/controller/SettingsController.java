package se.lexicon.meetingapi.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import se.lexicon.meetingapi.dto.SettingsDto;
import se.lexicon.meetingapi.service.MeetingService;
import se.lexicon.meetingapi.service.SettingsService;

@RestController
@RequestMapping("/api/settings")
@CrossOrigin(origins = "http://localhost:5173")
public class SettingsController {

    private final SettingsService settingsService;
    private final MeetingService meetingService;

    public SettingsController(SettingsService settingsService, MeetingService meetingService) {
        this.settingsService = settingsService;
        this.meetingService = meetingService;

    }

        @PostMapping("/{id}")
        @ResponseStatus(HttpStatus.CREATED)
        public ResponseEntity<SettingsDto> saveSettings(@RequestBody SettingsDto dto) {
            SettingsDto savedDto = settingsService.saveSettings(dto);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedDto);

    }
}

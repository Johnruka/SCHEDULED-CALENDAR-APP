package se.lexicon.meetingapi.service;

import org.springframework.stereotype.Service;
import se.lexicon.meetingapi.dto.SettingsDto;
import se.lexicon.meetingapi.entity.Settings;
import se.lexicon.meetingapi.repository.SettingsRepository;

@Service
public class SettingsService {

    private final SettingsRepository settingsRepository;

    public SettingsService(SettingsRepository settingsRepository) {
        this.settingsRepository = settingsRepository;
    }

    private SettingsDto toDto(Settings settings) {

        return new SettingsDto(
                settings.getId(),
                settings.getDefaultView(),
                settings.getTimeZone(),
                settings.getStartOfTheWeek(),
                settings.getLanguage(),
                settings.getTimeFormat()
        );

    }

    private Settings toEntity(SettingsDto dto) {

        Settings settings = new Settings();
        settings.setId(dto.id());
        settings.setDefaultView(dto.defaultView());
        settings.setTimeZone(dto.timeZone());
        settings.setStartOfTheWeek(dto.startOfTheWeek());
        settings.setLanguage(dto.language());
        settings.setTimeFormat(dto.timeFormat());
        return settings;
    }

    public SettingsDto saveSettings(SettingsDto dto) {
        Settings settings = toEntity(dto);
        Settings savedSettings = settingsRepository.save(settings);
        return toDto(savedSettings);
    }
}
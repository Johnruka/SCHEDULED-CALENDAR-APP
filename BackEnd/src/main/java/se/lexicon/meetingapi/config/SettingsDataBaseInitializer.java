package se.lexicon.meetingapi.config;

import org.springframework.stereotype.Component;
import se.lexicon.meetingapi.entity.Settings;
import se.lexicon.meetingapi.repository.SettingsRepository;

@Component
public class SettingsDataBaseInitializer {

    private  final SettingsRepository settingsRepository;

    public SettingsDataBaseInitializer(SettingsRepository settingsRepository) {
        this.settingsRepository = settingsRepository;
    }

    public void initializeDatabase() {
        Settings settings1 = new Settings("", "","","", "");

        settingsRepository.save(settings1);
        System.out.println("Database initialized with meeting data.");
    }
}

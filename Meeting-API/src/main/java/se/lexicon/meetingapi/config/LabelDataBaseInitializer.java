package se.lexicon.meetingapi.config;

import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;
import se.lexicon.meetingapi.entity.Label;
import se.lexicon.meetingapi.repository.LabelRepository;

@Component
public class LabelDataBaseInitializer {

    private final LabelRepository labelRepository;


    public LabelDataBaseInitializer(LabelRepository labelRepository) {
        this.labelRepository = labelRepository;
    }

    @PostConstruct
    public void initializeDatabase() {
        Label label1 = new Label("", "", "", "", "", "", "", "");

        labelRepository.save(label1);
        System.out.println("Database initialized with meeting data.");

    }
}

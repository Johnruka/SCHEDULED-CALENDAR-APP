package se.lexicon.meetingapi.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Settings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String defaultView;

    private String TimeZone;

    private String StartOfTheWeek;

    private String language;

    private String timeFormat;

    public Settings(String defaultView, String timeZone, String startOfTheWeek, String language, String timeFormat) {
        this.defaultView = defaultView;
        TimeZone = timeZone;
        StartOfTheWeek = startOfTheWeek;
        this.language = language;
        this.timeFormat = timeFormat;
    }
}


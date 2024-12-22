package se.lexicon.meetingapi.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Getter
@Setter
public class Label {


    @Id
    private String title;
    private String Date;
    private String startTime;
    private String endTime;
    private String location;
    private String level;
    private String participants;
    private String description;



}
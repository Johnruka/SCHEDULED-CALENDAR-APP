package se.lexicon.meetingapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import se.lexicon.meetingapi.entity.Label;


public interface LabelRepository extends JpaRepository<Label, Long> {


    }


package se.lexicon.meetingapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import se.lexicon.meetingapi.entity.Label;

@Repository
public interface LabelRepository extends JpaRepository<Label, Long> {


    }


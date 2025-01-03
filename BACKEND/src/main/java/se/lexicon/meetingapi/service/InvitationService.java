package se.lexicon.meetingapi.service;


import se.lexicon.meetingapi.entity.Invitation;

import java.util.List;
import java.util.Optional;

public interface InvitationService {

    List<Invitation> findAll();

    Optional<Invitation> findById(Long id);

    Invitation save(Invitation invitation);

    void deleteById(Long id);

}

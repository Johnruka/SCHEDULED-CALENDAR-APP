package se.lexicon.meetingapi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import se.lexicon.meetingapi.entity.Invitation;
import se.lexicon.meetingapi.repository.InvitationRepository;

import java.util.List;
import java.util.Optional;

@Service
public class InvitationServiceImpl implements InvitationService {

    private final InvitationRepository invitationRepository;

    @Autowired
    public InvitationServiceImpl(InvitationRepository invitationRepository) {
        this.invitationRepository = invitationRepository;
    }

    @Override
    public List<Invitation> findAll() {
        return invitationRepository.findAll();
    }

    @Override
    public Optional<Invitation> findById(Long id) {
        return invitationRepository.findById(id);
    }

    @Override
    public Invitation save(Invitation invitation) {
        return invitationRepository.save(invitation);
    }

    @Override
    public void deleteById(Long id) {
        invitationRepository.deleteById(id);

    }
}

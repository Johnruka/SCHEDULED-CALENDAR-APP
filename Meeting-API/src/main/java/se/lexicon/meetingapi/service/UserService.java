package se.lexicon.meetingapi.service;

import org.springframework.stereotype.Service;
import se.lexicon.meetingapi.dto.UserDto;
import se.lexicon.meetingapi.entity.User;
import se.lexicon.meetingapi.repository.UserRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {
    private UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    private UserDto toDto(User user) {
        // Convert Entity to DTO
        return new UserDto(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getRole()


        );
    }

    // Convert DTO to Entity
    private User toEntity(UserDto dto) {
        User user = new User();
        user.setId(dto.id());
        user.setFirstName(dto.firstName());
        user.setLastName(dto.lastName());
        user.setEmail(dto.email());
        user.setRole(dto.role());
        return user;
    }

    public List<UserDto> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public UserDto getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + id));
        return toDto(user);

    }

    public UserDto saveUser(UserDto dto) {
        User user = toEntity(dto);
        User savedUser = userRepository.save(user);
        return toDto(savedUser);

    }

    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new RuntimeException("User not found with ID: " + id);
        }
        userRepository.deleteById(id);
    }



    public void updateUser(Long id, String status) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + id));

        user.setFirstName(user.getFirstName());
        user.setLastName(user.getLastName());
        user.setEmail(user.getEmail());
        user.setRole(user.getRole());
        userRepository.save(user);
    }
}




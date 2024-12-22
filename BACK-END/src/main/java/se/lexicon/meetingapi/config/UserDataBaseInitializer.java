package se.lexicon.meetingapi.config;

import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;
import se.lexicon.meetingapi.entity.User;
import se.lexicon.meetingapi.repository.UserRepository;

import java.util.Arrays;
import java.util.List;

@Component
public class UserDataBaseInitializer {

    private final UserRepository userRepository;

    public UserDataBaseInitializer(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostConstruct
    public void initializeDatabase() {
       List<User> users = Arrays.asList(
               new User("John", "Land", "john@test.com","Admin"),
               new User("David", "Moe", "david@test.com","Guest"),
               new User("Mats", "Mars", "mats@test.com", "User"),
               new User("Maja", "Edson", "mats@test.com", "Admin"),
               new User("Martin", "Mars", "martin@test.com", "User"),
               new User("Carlsson", "Karl", "carlsson@test.com", "Guest")


        );

        userRepository.saveAll(users);
        System.out.println("Database initialized with user data.");
    }
}

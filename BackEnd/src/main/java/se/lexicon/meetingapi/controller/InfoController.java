package se.lexicon.meetingapi.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/infoController")
@CrossOrigin(origins = "http://localhost:5173")
public class InfoController {



    private String contextPath;

    @GetMapping("/context-path")
    public String getContextPath() {
        return "Context path is: " + (contextPath != null ? contextPath : "root ('/')");
    }
}

package se.lexicon.meetingapi.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import se.lexicon.meetingapi.dto.AnalyticsDataDto;
import se.lexicon.meetingapi.entity.AnalyticsData;
import se.lexicon.meetingapi.service.AnalyticsDataService;

import java.util.List;

@RestController
@RequestMapping("/api/analytics")
@CrossOrigin(origins = "http://localhost:5173")
public class AnalyticsDataController {

    private final AnalyticsDataService analyticsDataService;

    public AnalyticsDataController(AnalyticsDataService analyticsDataService) {
        this.analyticsDataService = analyticsDataService;
    }

    @GetMapping
    public ResponseEntity<List<AnalyticsDataDto>> getAllAnalyticsData() {
        List<AnalyticsDataDto> analyticsDataList = analyticsDataService.findAll();
        return new ResponseEntity<>(analyticsDataList, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AnalyticsDataDto> getAnalyticsDataById(@PathVariable Long id) {
        return analyticsDataService.findById(id)
                .map(data -> new ResponseEntity<>(data, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<AnalyticsDataDto> createAnalyticsData(@se.lexicon.meetingapi.controller.Valid @RequestBody AnalyticsData analyticsData) {
        AnalyticsDataDto savedData = analyticsDataService.save(analyticsData);
        return new ResponseEntity<>(savedData, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAnalyticsData(@PathVariable Long id) {
        if (analyticsDataService.findById(id).isPresent()) {
            analyticsDataService.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}

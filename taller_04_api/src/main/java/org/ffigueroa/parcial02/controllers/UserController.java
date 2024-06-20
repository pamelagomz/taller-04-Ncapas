package org.ffigueroa.parcial02.controllers;

import jakarta.validation.Valid;
import lombok.extern.log4j.Log4j2;
import org.ffigueroa.parcial02.domain.dtos.GeneralResponse;
import org.ffigueroa.parcial02.domain.dtos.history.GetRecordDTO;
import org.ffigueroa.parcial02.domain.dtos.history.RegisterHistoryDTO;
import org.ffigueroa.parcial02.domain.entities.History;
import org.ffigueroa.parcial02.domain.entities.Role;
import org.ffigueroa.parcial02.domain.entities.Token;
import org.ffigueroa.parcial02.domain.entities.User;
import org.ffigueroa.parcial02.services.HistoryService;
import org.ffigueroa.parcial02.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.util.Comparator;
import java.util.Date;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@Log4j2
@RequestMapping("/user")
public class UserController {

    private final UserService userService;
    private final HistoryService historyService;

    public UserController(UserService userService, HistoryService historyService) {
        this.userService = userService;
        this.historyService = historyService;
    }

    @PreAuthorize("hasAnyAuthority('Patient','Admin')")
    @GetMapping("/record")
    public ResponseEntity<GeneralResponse> getRecord(
            @RequestHeader("Authorization") String token,
            @RequestParam("startDate") String isoStartDate,
            @RequestParam("endDate") String isoEndDate
    ){

        Token tokenFound = userService.getTokenByContent(token);

        User user = userService.findUserByToken(tokenFound);

        if (user == null) {
            return new ResponseEntity<>(
                    new GeneralResponse.Builder()
                            .message("User not found")
                            .build(),
                    HttpStatus.NOT_FOUND
            );
        }

        // Convertir la fecha ISO a Date
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
        Date startDate;
        Date endDate;
        try {
            startDate = format.parse(isoStartDate);
            endDate = format.parse(isoEndDate);
        } catch (ParseException e) {
            return new ResponseEntity<>(
                    new GeneralResponse.Builder()
                            .message("Invalid date format")
                            .build(),
                    HttpStatus.BAD_REQUEST
            );
        }

        List<History> history = historyService.getHistoryByDatesAndUser(user, startDate, endDate);

        if(history.isEmpty()){
            return new ResponseEntity<>(
                    new GeneralResponse.Builder()
                            .message("Record is empty")
                            .build(),
                    HttpStatus.NOT_FOUND
            );
        }

        /*

        List<History> history = historyService.getHistoryByDatesAndUser(user, data.getStart(), data.getEnd());
           history.sort(Comparator.comparing(History::getDate));
         */
        // se supone q esto filtra por fecha de mas reciente a mas antiguo
        history.sort(Comparator.comparing(History::getDate)); // .reversed()

        return new ResponseEntity<>(
                new GeneralResponse.Builder()
                        .message("Record obtained")
                        .data(history)
                        .build(),
                HttpStatus.OK
        );
    }

    @PreAuthorize("hasAnyAuthority('Doctor', 'Assistant')")
    @PostMapping("/record")
    public ResponseEntity<GeneralResponse> addHistory(@RequestBody @Valid RegisterHistoryDTO data){

        User user = userService.findByIdentifier(data.getIdentifier());

        if(user == null){
            return new ResponseEntity<>(
                    new GeneralResponse.Builder()
                            .message("User not found")
                            .build(),
                    HttpStatus.NOT_FOUND
            );
        }

        historyService.createHistory(user, Date.from(Instant.now()), data.getReason());

        return new ResponseEntity<>(
                new GeneralResponse.Builder()
                        .message("Record added")
                        .build(),
                HttpStatus.OK
        );
    }

    @PreAuthorize("hasAnyAuthority('Admin')")
    @GetMapping("/all")
    public ResponseEntity<GeneralResponse> getAllUsers(){

        List<User> doctors = userService.getAllUsers();

        return new ResponseEntity<>(
                new GeneralResponse.Builder()
                        .message("Users obtained")
                        .data(doctors)
                        .build(),
                HttpStatus.OK
        );
    }
}

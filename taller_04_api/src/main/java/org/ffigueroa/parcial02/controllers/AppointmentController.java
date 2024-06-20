package org.ffigueroa.parcial02.controllers;


import jakarta.validation.Valid;
import lombok.extern.log4j.Log4j2;
import org.ffigueroa.parcial02.domain.dtos.GeneralResponse;
import org.ffigueroa.parcial02.domain.dtos.appoimnt.*;
import org.ffigueroa.parcial02.domain.entities.Attends;
import org.ffigueroa.parcial02.domain.entities.MedicalAppointment;
import org.ffigueroa.parcial02.domain.entities.Token;
import org.ffigueroa.parcial02.domain.entities.User;
import org.ffigueroa.parcial02.services.AttendsService;
import org.ffigueroa.parcial02.services.MedicalAppointmentService;
import org.ffigueroa.parcial02.services.RoleService;
import org.ffigueroa.parcial02.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*")
@RestController
@Log4j2
@RequestMapping("/appointment")
public class AppointmentController {

    private final MedicalAppointmentService  medicalAppointmentService;
    private final UserService userService;
    private final AttendsService attendsService;
    private final RoleService roleService;

    public AppointmentController(MedicalAppointmentService medicalAppointmentService, UserService userService, AttendsService attendsService, RoleService roleService) {
        this.medicalAppointmentService = medicalAppointmentService;
        this.userService = userService;
        this.attendsService = attendsService;
        this.roleService = roleService;
    }

    @PreAuthorize("hasAnyAuthority('Doctor')")
    @GetMapping("/{id}")
    public ResponseEntity<GeneralResponse> getAllDoctorAppointments(@PathVariable UUID id){

        List<MedicalAppointment> medicalAppointments = medicalAppointmentService.getMedicalAppointments();

        List<MedicalAppointment> doctorMedicalAppointments = medicalAppointments.stream()
                .filter(medicalAppointment -> {
                    Attends attends = medicalAppointment.getAttend();
                    return attends != null && attends.getMedics().stream()
                            .anyMatch(user -> user.getId().equals(id));
                })
                .toList();

        if (doctorMedicalAppointments.isEmpty()) {
            return new ResponseEntity<>(
                    new GeneralResponse.Builder()
                            .message("No appointments found")
                            .build(),
                    HttpStatus.NOT_FOUND
            );
        }

        return new ResponseEntity<>(
                new GeneralResponse.Builder()
                        .message("Appointments obtained")
                        .data(doctorMedicalAppointments)
                        .build(),
                HttpStatus.OK
        );
    }

    @PreAuthorize("hasAnyAuthority('Assistant')")
    @GetMapping("/")
    public ResponseEntity<GeneralResponse> getAllAppointments(){

        List<MedicalAppointment> medicalAppointments = medicalAppointmentService.getMedicalAppointments();

        if (medicalAppointments.isEmpty()) {
            return new ResponseEntity<>(
                    new GeneralResponse.Builder()
                            .message("No appointments found")
                            .build(),
                    HttpStatus.NOT_FOUND
            );
        }

        return new ResponseEntity<>(
                new GeneralResponse.Builder()
                        .message("Appointments obtained")
                        .data(medicalAppointments)
                        .build(),
                HttpStatus.OK
        );
    }

    @PreAuthorize("hasAnyAuthority('Assistant')")
    @GetMapping("/{id}/{state}")
    public ResponseEntity<GeneralResponse> updateAppointmentState(
            @PathVariable UUID id,
            @PathVariable String state
    ){
        MedicalAppointment medicalAppointment = medicalAppointmentService.getMedicalAppointment(id);

        if (medicalAppointment == null) {
            return new ResponseEntity<>(
                    new GeneralResponse.Builder()
                            .message("Medical appointment not found")
                            .build(),
                    HttpStatus.NOT_FOUND
            );
        }

        medicalAppointmentService.updateMedicalAppointment(medicalAppointment, state);

        return new ResponseEntity<>(
                new GeneralResponse.Builder()
                        .message("Medical appointment updated")
                        .build(),
                HttpStatus.OK
        );
    }

    @PostMapping("/request")
    public ResponseEntity<GeneralResponse> requestAppointment(@RequestHeader("Authorization") String bearerToken, @RequestBody @Valid RequestAppoinmentDTO info){

        Token token = userService.getTokenByContent(bearerToken);

        if (token == null) {
            return new ResponseEntity<>(
                    new GeneralResponse.Builder()
                            .message("Token not found" + bearerToken)
                            .build(),
                    HttpStatus.NOT_FOUND
            );
        }

        User user = userService.findUserByToken(token);

        if (user == null) {
            return new ResponseEntity<>(
                    new GeneralResponse.Builder()
                            .message("User not found")
                            .build(),
                    HttpStatus.NOT_FOUND
            );
        }

        // crear medical appointment
        CreateMedicalAppoinmentDTO medicalAppoinmentDTO = new CreateMedicalAppoinmentDTO();
        medicalAppoinmentDTO.setRealizacionDate(null);
        medicalAppoinmentDTO.setSolicitadaDate(info.getDate());
        medicalAppoinmentDTO.setEstimadaFelinzationDate(null);
        medicalAppoinmentDTO.setFinalizationDate(null);
        medicalAppoinmentDTO.setReason(info.getReason());
        medicalAppoinmentDTO.setState("Requested"); // TODO: ver si esta bien el estado

        MedicalAppointment medicalAppointment = medicalAppointmentService.createMedicalAppointment(medicalAppoinmentDTO);

        // crear attends
        attendsService.createAttends(medicalAppointment, new ArrayList<>(), user);

        return new ResponseEntity<>(
                new GeneralResponse.Builder()
                        .message("Appointments requested")
                        .build(),
                HttpStatus.OK
        );
    }

    @PreAuthorize("hasAnyAuthority('Patient')")
    @GetMapping("/own")
    public ResponseEntity<GeneralResponse> getListOfAppointments(@RequestHeader("Authorization") String tokenB, @RequestParam String status){

        Token token = userService.getTokenByContent(tokenB);

        if (token == null) {
            return new ResponseEntity<>(
                    new GeneralResponse.Builder()
                            .message("Token not found" + tokenB)
                            .build(),
                    HttpStatus.NOT_FOUND
            );
        }

        User user = userService.findUserByToken(token);

        if (user == null) {
            return new ResponseEntity<>(
                    new GeneralResponse.Builder()
                            .message("User not found")
                            .build(),
                    HttpStatus.NOT_FOUND
            );
        }

        List<Attends> listOfAttends = attendsService.getAttendsByUser(user);

        if (listOfAttends.isEmpty()) {
            return new ResponseEntity<>(
                    new GeneralResponse.Builder()
                            .message("User has no medical appointments yet")
                            .build(),
                    HttpStatus.NOT_FOUND
            );
        }

        if(status.isEmpty()){
            List<MedicalAppointment> medicalAppointments = listOfAttends.stream()
                    .map(Attends::getMedicalAppointments)
                    .collect(Collectors.toList());

            return new ResponseEntity<>(
                    new GeneralResponse.Builder()
                            .message("Appointments obtained")
                            .data(medicalAppointments)
                            .build(),
                    HttpStatus.OK
            );
        }

        // si el estado no es vacio, filtrar
        // en base a la lista de attends del usuario, obtener la lista de medical appointments con el estado recibido
        List<MedicalAppointment> appointmentsFromAttends = listOfAttends.stream()
                .map(Attends::getMedicalAppointments)
                .filter(medicalAppointment -> medicalAppointment.getState().equals(status))
                .collect(Collectors.toList());

        return new ResponseEntity<>(
                new GeneralResponse.Builder()
                        .message("Appointments obtained")
                        .data(appointmentsFromAttends)
                        .build(),
                HttpStatus.OK
        );

    }

    @PreAuthorize("hasAnyAuthority('Assistant')")
    @PostMapping("/approve")
    public ResponseEntity<GeneralResponse> approveMedicalAppoinment(@RequestBody @Valid ApproveAppointmentDTO info){

        MedicalAppointment medicalAppointment = medicalAppointmentService.getMedicalAppointment(info.getMedicalAppointmentId());

        if (medicalAppointment == null) {
            return new ResponseEntity<>(
                    new GeneralResponse.Builder()
                            .message("Medical appointment not found")
                            .build(),
                    HttpStatus.NOT_FOUND
            );
        }

        Attends attend = attendsService.getAttendsByMedicalAppointment(medicalAppointment);

        if (attend == null) {
            return new ResponseEntity<>(
                    new GeneralResponse.Builder()
                            .message("Medical appointment not found")
                            .build(),
                    HttpStatus.NOT_FOUND
            );
        }

        List<User> doctors = info.getDoctorsIds().stream()
                .map(user -> userService.getUser(user))
                .toList();

        // guardo los doctores en la solicitud de cita
        attendsService.saveDoctorsInAttends(attend, doctors);

        // agregar los minutos estimados a la fecha de realizacion
        // Convierte la variable 'date' a Instant
        Instant instant = info.getF_realizacion().toInstant();

        // Agrega los minutos al Instant
        Instant newInstant = instant.plus(info.getEstimated_minutes(), ChronoUnit.MINUTES);

        // Convierte el Instant de nuevo a Date
        Date newDate = Date.from(newInstant);

        // cambio el estado de la cita a aprobado y agrego los nuevos parametros
        medicalAppointmentService.setRealizationDateAndEstimatedFinalizationDate(medicalAppointment, info.getF_realizacion(), newDate);
        medicalAppointmentService.setStateToMedicalAppointment(medicalAppointment, "Approved"); // TODO: ver si esta bien el estado

        // cambiar el rol del usuario a paciente

        userService.addRoleToUser(attend.getUser(), roleService.getRoleByCode("PATN"));

        return new ResponseEntity<>(
                new GeneralResponse.Builder()
                        .message("Medical appointment approved")
                        .build(),
                HttpStatus.OK
        );

    }

    @PreAuthorize("hasAnyAuthority('Doctor')")
    @PostMapping("/finish")
    public ResponseEntity<GeneralResponse> finishMedicalAppoinment(@RequestHeader("Authorization") String token, @RequestBody FinishAppointmentDTO info){

        //obtener el token
        Token tokenFound = userService.getTokenByContent(token);

        User doc = userService.findUserByToken(tokenFound);

        if (doc == null) {
            return new ResponseEntity<>(
                    new GeneralResponse.Builder()
                            .message("Doctor not found")
                            .build(),
                    HttpStatus.NOT_FOUND
            );
        }

        MedicalAppointment medicalAppointment = medicalAppointmentService.getMedicalAppointment(info.getMedicalAppointmentId());

        if (medicalAppointment == null) {
            return new ResponseEntity<>(
                    new GeneralResponse.Builder()
                            .message("Medical appointment not found")
                            .build(),
                    HttpStatus.NOT_FOUND
            );
        }

        Attends attend = attendsService.getAttendsByMedicalAppointment(medicalAppointment);

        if (attend == null) {
            return new ResponseEntity<>(
                    new GeneralResponse.Builder()
                            .message("Medical appointment not found")
                            .build(),
                    HttpStatus.NOT_FOUND
            );
        }
        // verificar si el doctor se encuentra en la lista de doctores del attend
        if (!attend.getMedics().contains(doc)) {
            return new ResponseEntity<>(
                    new GeneralResponse.Builder()
                            .message("Doctor not found in the list of doctors")
                            .build(),
                    HttpStatus.NOT_FOUND
            );
        }

        // verificar si la fecha de finalizacion es mayor a la fecha de realizacion
        if (Date.from(Instant.now()).before(medicalAppointment.getF_realizacion())) {
            return new ResponseEntity<>(
                    new GeneralResponse.Builder()
                            .message("The finalization date is before the realization date")
                            .build(),
                    HttpStatus.BAD_REQUEST
            );
        }

        // cambiar el estado de la cita a finalizado
        medicalAppointmentService.finalizeMedicalAppointment(medicalAppointment, Date.from(Instant.now()), "Finished");


        return new ResponseEntity<>(
                new GeneralResponse.Builder()
                        .message("Medical appointment finished")
                        .build(),
                HttpStatus.OK
        );

    }
}

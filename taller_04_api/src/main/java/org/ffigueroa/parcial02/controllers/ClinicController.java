package org.ffigueroa.parcial02.controllers;

import lombok.extern.log4j.Log4j2;
import org.ffigueroa.parcial02.domain.dtos.GeneralResponse;
import org.ffigueroa.parcial02.domain.dtos.PrescriptionDataDTO;
import org.ffigueroa.parcial02.domain.dtos.ScheduleGetDTO;
import org.ffigueroa.parcial02.domain.dtos.SchedulePresentationDTO;
import org.ffigueroa.parcial02.domain.entities.*;
import org.ffigueroa.parcial02.services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*")
@RestController
@Log4j2
@RequestMapping("/clinic")
public class ClinicController {

    private final UserService userService;
    private final PrescriptionService prescriptionService;
    private final AttendsService attendsService;
    private final MedicalAppointmentService medicalAppointmentService;
    private final HistoryService historyService;
    private final RoleService roleService;
    private final SpecializationService specializationService;

    public ClinicController(UserService userService, PrescriptionService prescriptionService, AttendsService attendsService, MedicalAppointmentService medicalAppointmentService, HistoryService historyService, RoleService roleService, SpecializationService specializationService) {
        this.userService = userService;
        this.prescriptionService = prescriptionService;
        this.attendsService = attendsService;
        this.medicalAppointmentService = medicalAppointmentService;
        this.historyService = historyService;
        this.roleService = roleService;
        this.specializationService = specializationService;
    }

    @PreAuthorize("hasAnyAuthority('Doctor')")
    @GetMapping("/prescriptions/{user_id}")
    public ResponseEntity<GeneralResponse> getPrescriptions(@PathVariable UUID user_id) {

        User user = userService.getUser(user_id);

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

        List<Prescription> listOfPrescriptions = listOfAttends.stream()
                .map(Attends::getMedicalAppointments) // Get the MedicalAppointment from each Attends
                .flatMap(medicalAppointment -> medicalAppointment.getPrescriptions().stream()) // Get the prescriptions from each MedicalAppointment
                .collect(Collectors.toList()); // Collect all prescriptions into a single list

        if (listOfPrescriptions.isEmpty()) {
            return new ResponseEntity<>(
                    new GeneralResponse.Builder()
                            .message("User has no prescriptions")
                            .build(),
                    HttpStatus.NOT_FOUND
            );
        }

        return new ResponseEntity<>(
                new GeneralResponse.Builder()
                        .data(listOfPrescriptions)
                        .build(),
                HttpStatus.OK
        );
    }

    @GetMapping("/prescriptions/attends/{user_id}")
    public ResponseEntity<GeneralResponse> getAttends(@PathVariable UUID user_id) {

        User user = userService.getUser(user_id);

        if (user == null) {
            return new ResponseEntity<>(
                    new GeneralResponse.Builder()
                            .message("User not found")
                            .build(),
                    HttpStatus.NOT_FOUND
            );
        }

        List<Attends> listOfAttends = attendsService.getAttendsByUser(user);

        return new ResponseEntity<>(
                new GeneralResponse.Builder()
                        .data(listOfAttends)
                        .build(),
                HttpStatus.OK
        );
    }


    @PreAuthorize("hasAnyAuthority('Doctor')")
    @PostMapping("/prescriptions")
    public ResponseEntity<GeneralResponse> Prescriptions(@RequestBody PrescriptionDataDTO info) {

        MedicalAppointment medicalAppointment = medicalAppointmentService.getMedicalAppointment(info.getMedicalAppointmentId());

        if(medicalAppointment == null) {
            return new ResponseEntity<>(
                    new GeneralResponse.Builder()
                            .message("Medical appointment not found")
                            .build(),
                    HttpStatus.NOT_FOUND
            );
        }

        // crear las prescripciones en base a la informacion recibida
        List<Prescription> prescriptions = info.getPrescriptions().stream()
                .map(data -> {
                    Prescription prescription = new Prescription();
                    prescription.setMedicine(data.getMedicine());
                    prescription.setDosis(data.getDosis());
                    prescription.setFinalDate(data.getFinalDate());
                    //prescription.setMedicalAppointment(medicalAppointment);

                    prescriptionService.savePrescription(prescription);

                    return prescription;
                })
                .toList();

        // guardar las prescripciones
        medicalAppointmentService.savePrescriptionsInMedicalAppointment(medicalAppointment, prescriptions);
        log.info("Prescriptions saved");
        return new ResponseEntity<>(
                new GeneralResponse.Builder()
                        .message("Prescriptions saved")
                        .build(),
                HttpStatus.OK
        );
    }

    @PreAuthorize("hasAnyAuthority('Doctor')")
    @GetMapping("/schedule")
    public ResponseEntity<GeneralResponse> getDoctorSchedule(@RequestHeader("Authorization") String token, @RequestParam("date") String isoDate){

        //obtener el token
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
        // obtener los attends del doctor para sacar despues las medicalAppointments
        List<Attends> listOfAttends = attendsService.getAttendsByUser(user);


        // Convertir la fecha ISO a Date
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
        Date date;
        try {
            date = format.parse(isoDate);
        } catch (ParseException e) {
            return new ResponseEntity<>(
                    new GeneralResponse.Builder()
                            .message("Invalid date format")
                            .build(),
                    HttpStatus.BAD_REQUEST
            );
        }

        // obtener las medicalAppointments de la lista de attends y filtrados por la fecha
        List<MedicalAppointment> listOfMedicalAppointments = listOfAttends.stream()
            .map(Attends::getMedicalAppointments)
            .filter(medicalAppointment -> {
                if (medicalAppointment.getF_realizacion() != null) {
                    LocalDate date1 = medicalAppointment.getF_realizacion().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
                    LocalDate date2 = date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
                    return date1.getYear() == date2.getYear() && date1.getDayOfYear() == date2.getDayOfYear();
                }
                return false;
            })
            .toList();
        // obtener la lista de SchedulePresentation a partir de la lista de attends donde se encuentre el doctor
        List<SchedulePresentationDTO> listOfSchedulePresentation = listOfMedicalAppointments.stream()
                .map(medicalAppointment -> {
                    Attends attends = attendsService.getAttendsByMedicalAppointment(medicalAppointment);
                    List<User> medics = attends.getMedics();

                    List<History> histories = historyService.getHistoryByUser(attends.getUser());

                    SchedulePresentationDTO schedulePresentationDTO = new SchedulePresentationDTO();
                    schedulePresentationDTO.setMedics(medics);
                    schedulePresentationDTO.setMedicalHistories(histories);

                    return schedulePresentationDTO;
                })
                .toList();

        return new ResponseEntity<>(
                new GeneralResponse.Builder()
                        .message("Schedule obtained")
                        .data(listOfSchedulePresentation)
                        .build(),
                HttpStatus.OK
        );
    }

    @PreAuthorize("hasAnyAuthority('Assistant')")
    @GetMapping("/doctors")
    public ResponseEntity<GeneralResponse> getAllDocs(){

        Role rol = roleService.getRoleByCode("DOCT");

        List<User> doctors = userService.getAllByRole(List.of(rol));

        return new ResponseEntity<>(
                new GeneralResponse.Builder()
                        .message("Docs obtained")
                        .data(doctors)
                        .build(),
                HttpStatus.OK
        );
    }

    @PreAuthorize("hasAnyAuthority('Assistant')")
    @GetMapping("/specializations")
    public ResponseEntity<GeneralResponse> getAllSpeciazations(){

        List<Specialization> especializaciones = specializationService.getAll();

        return new ResponseEntity<>(
                new GeneralResponse.Builder()
                        .message("specializations obtained")
                        .data(especializaciones)
                        .build(),
                HttpStatus.OK
        );
    }
}

package org.ffigueroa.parcial02.services.implementations;

import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.ffigueroa.parcial02.domain.dtos.appoimnt.CreateMedicalAppoinmentDTO;
import org.ffigueroa.parcial02.domain.entities.Attends;
import org.ffigueroa.parcial02.domain.entities.MedicalAppointment;

import org.ffigueroa.parcial02.domain.entities.Prescription;
import org.ffigueroa.parcial02.repositories.MedicalAppointmentRepository;
import org.ffigueroa.parcial02.repositories.UserRepository;
import org.ffigueroa.parcial02.services.MedicalAppointmentService;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
@Slf4j
public class MedicalAppointmentServiceImpl implements MedicalAppointmentService {

    private final UserRepository userRepository;

    private final MedicalAppointmentRepository medicalAppointmentRepository;

    public MedicalAppointmentServiceImpl(UserRepository userRepository, MedicalAppointmentRepository medicalAppointmentServiceRepository) {
        this.userRepository = userRepository;
        this.medicalAppointmentRepository = medicalAppointmentServiceRepository;
    }


    @Override
    @Transactional(rollbackOn = Exception.class)
    public void finalizeMedicalAppointment(MedicalAppointment medicalAppointment, Date finalizationDate, String state) {
        medicalAppointment.setF_finalizacion(finalizationDate);
        medicalAppointment.setState(state);
        medicalAppointmentRepository.save(medicalAppointment);
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public MedicalAppointment createMedicalAppointment(CreateMedicalAppoinmentDTO data) {
        MedicalAppointment medicalAppointment = new MedicalAppointment();

        medicalAppointment.setF_realizacion(data.getRealizacionDate());
        medicalAppointment.setF_finalizacion(data.getFinalizationDate());
        medicalAppointment.setF_solicitada(data.getSolicitadaDate());
        medicalAppointment.setF_estimada_finalizacion(data.getEstimadaFelinzationDate());
        medicalAppointment.setState(data.getState());
        medicalAppointment.setReason(data.getReason());
        medicalAppointment.setPrescriptions(data.getPrescriptions());

        medicalAppointmentRepository.save(medicalAppointment);

        return medicalAppointment;
    }

    @Override
    public List<MedicalAppointment> getMedicalAppointments() {
        return medicalAppointmentRepository.findAll();
    }

    @Override
    public MedicalAppointment getMedicalAppointment(UUID id) {
        return medicalAppointmentRepository.findById(id).orElse(null);
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public void saveMedicalAppointment(MedicalAppointment medicalAppointment) {
        medicalAppointmentRepository.save(medicalAppointment);
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public void savePrescriptionsInMedicalAppointment(MedicalAppointment medicalAppointment, List<Prescription> prescriptions) {

        for(Prescription prescription : prescriptions){
            medicalAppointment.getPrescriptions().add(prescription);
        }
        log.info("Prescriptions added to medical appointment ");
        medicalAppointmentRepository.save(medicalAppointment);
        log.info("Prescriptions DESPUES DE SAVE ");
    }

    @Override
    public List<MedicalAppointment> getMedicalAppointmentsByDate(Date date) {
        return List.of();
    }

    @Override
    public void updateMedicalAppointment(MedicalAppointment medicalAppointment, String state) {
        medicalAppointment.setState(state);
        medicalAppointmentRepository.save(medicalAppointment);
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public void setRealizationDateAndEstimatedFinalizationDate(MedicalAppointment medicalAppointment, Date realizationDate, Date estimatedFinalizationDate) {
        medicalAppointment.setF_realizacion(realizationDate);
        medicalAppointment.setF_estimada_finalizacion(estimatedFinalizationDate);
        medicalAppointmentRepository.save(medicalAppointment);
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public void setStateToMedicalAppointment(MedicalAppointment medicalAppointment, String state) {
        medicalAppointment.setState(state);
        medicalAppointmentRepository.save(medicalAppointment);
    }
}

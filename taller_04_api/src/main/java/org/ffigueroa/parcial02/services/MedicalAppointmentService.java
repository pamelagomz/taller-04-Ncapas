package org.ffigueroa.parcial02.services;

import jakarta.persistence.OneToMany;
import org.ffigueroa.parcial02.domain.dtos.appoimnt.CreateMedicalAppoinmentDTO;
import org.ffigueroa.parcial02.domain.entities.Attends;
import org.ffigueroa.parcial02.domain.entities.MedicalAppointment;
import org.ffigueroa.parcial02.domain.entities.Prescription;
import org.ffigueroa.parcial02.domain.entities.User;

import java.util.Date;
import java.util.List;
import java.util.UUID;

public interface MedicalAppointmentService {

    //Finalizar un usuario
    public void finalizeMedicalAppointment(MedicalAppointment medicalAppointment,Date finalizationDate, String state);
    public MedicalAppointment createMedicalAppointment(CreateMedicalAppoinmentDTO data);
    public List<MedicalAppointment> getMedicalAppointments();
    public MedicalAppointment getMedicalAppointment(UUID id);

    public void saveMedicalAppointment(MedicalAppointment medicalAppointment);

    public void savePrescriptionsInMedicalAppointment(MedicalAppointment medicalAppointment, List<Prescription> prescriptions);

    public List<MedicalAppointment> getMedicalAppointmentsByDate(Date date);

    public void updateMedicalAppointment(MedicalAppointment medicalAppointment, String state);

    public void setRealizationDateAndEstimatedFinalizationDate(MedicalAppointment medicalAppointment, Date realizationDate, Date estimatedFinalizationDate);

    public void setStateToMedicalAppointment(MedicalAppointment medicalAppointment, String state);
}

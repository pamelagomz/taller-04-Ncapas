package org.ffigueroa.parcial02.services;

import org.ffigueroa.parcial02.domain.entities.MedicalAppointment;
import org.ffigueroa.parcial02.domain.entities.Prescription;
import org.ffigueroa.parcial02.domain.entities.User;

import java.util.List;
import java.util.UUID;

public interface PrescriptionService {


    List<Prescription> getPrescriptionByMedicalAppointment(MedicalAppointment medicalAppointment);

    public void savePrescription(Prescription prescription);
}

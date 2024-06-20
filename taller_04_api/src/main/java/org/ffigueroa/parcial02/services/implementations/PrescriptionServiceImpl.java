package org.ffigueroa.parcial02.services.implementations;

import org.ffigueroa.parcial02.domain.entities.MedicalAppointment;
import org.ffigueroa.parcial02.domain.entities.Prescription;
import org.ffigueroa.parcial02.repositories.PrescriptionRepository;
import org.ffigueroa.parcial02.services.PrescriptionService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class PrescriptionServiceImpl implements PrescriptionService {

    private final PrescriptionRepository prescriptionRepository;

    public PrescriptionServiceImpl(PrescriptionRepository prescriptionRepository) {
        this.prescriptionRepository = prescriptionRepository;
    }

    @Override
    public List<Prescription> getPrescriptionByMedicalAppointment(MedicalAppointment medicalAppointment) {
        return prescriptionRepository.findAllByMedicalAppointment(medicalAppointment);
    }

    @Override
    public void savePrescription(Prescription prescription) {
        prescriptionRepository.save(prescription);
    }
}

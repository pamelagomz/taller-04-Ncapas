package org.ffigueroa.parcial02.services.implementations;

import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.ffigueroa.parcial02.domain.entities.Attends;
import org.ffigueroa.parcial02.domain.entities.MedicalAppointment;
import org.ffigueroa.parcial02.domain.entities.User;
import org.ffigueroa.parcial02.repositories.AttendsRespository;
import org.ffigueroa.parcial02.services.AttendsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@Slf4j
public class AttendsServiceImpl implements AttendsService {

    private final AttendsRespository attendsRespository;

    public AttendsServiceImpl(AttendsRespository attendsRespository) {
        this.attendsRespository = attendsRespository;
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public void createAttends(MedicalAppointment medicalAppointment, List<User> medics, User user) {

        Attends attends = new Attends();
        attends.setMedicalAppointments(medicalAppointment);
        attends.setMedics(medics);
        attends.setUser(user);

        attendsRespository.save(attends);
    }

    @Override
    public List<Attends> getAttendsByUser(User user) {
        return attendsRespository.findAllByUser(user).orElse(null);
    }

    @Override
    public Attends getAttendsById(UUID id) {
        return attendsRespository.findById(id).orElse(null);
    }

    @Override
    public Attends getAttendsByMedicalAppointment(MedicalAppointment medicalAppointment) {
        return attendsRespository.findByMedicalAppointments(medicalAppointment).orElse(null);
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public void saveDoctorsInAttends(Attends attends, List<User> doctors) {

        for(User doctor : doctors) {
            attends.getMedics().add(doctor);
        }
        //attends.setMedics(doctors);

        attendsRespository.save(attends);

    }
}

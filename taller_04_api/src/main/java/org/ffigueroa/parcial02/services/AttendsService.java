package org.ffigueroa.parcial02.services;

import org.ffigueroa.parcial02.domain.entities.Attends;
import org.ffigueroa.parcial02.domain.entities.MedicalAppointment;
import org.ffigueroa.parcial02.domain.entities.User;

import java.util.Date;
import java.util.List;
import java.util.UUID;

public interface AttendsService {

    //Crear una solicitud de cita
    public void createAttends(MedicalAppointment medicalAppointment, List<User> medics, User user);

    //Obtener todas las solicitudes de citas por ususario o en razon del estado
    public List<Attends> getAttendsByUser(User user);

    Attends getAttendsById(UUID id);

    public Attends getAttendsByMedicalAppointment(MedicalAppointment medicalAppointment);

    public void saveDoctorsInAttends(Attends attends, List<User> doctors);
}

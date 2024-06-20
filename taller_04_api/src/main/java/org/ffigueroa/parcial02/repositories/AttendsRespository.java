package org.ffigueroa.parcial02.repositories;

import org.ffigueroa.parcial02.domain.entities.Attends;
import org.ffigueroa.parcial02.domain.entities.MedicalAppointment;
import org.ffigueroa.parcial02.domain.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface AttendsRespository extends JpaRepository<Attends, UUID> {
    //Buscar todas las citas por el id del usuario
    Optional<List<Attends>> findAllByUser(User user);
    Optional<Attends> findByMedicalAppointments(MedicalAppointment medicalAppointments);
}

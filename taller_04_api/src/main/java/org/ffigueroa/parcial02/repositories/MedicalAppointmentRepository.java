package org.ffigueroa.parcial02.repositories;

import org.ffigueroa.parcial02.domain.entities.MedicalAppointment;
import org.ffigueroa.parcial02.domain.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;


public interface MedicalAppointmentRepository extends JpaRepository<MedicalAppointment, UUID> {

}

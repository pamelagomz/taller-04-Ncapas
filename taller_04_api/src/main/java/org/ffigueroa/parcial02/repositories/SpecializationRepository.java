package org.ffigueroa.parcial02.repositories;

import org.ffigueroa.parcial02.domain.entities.Specialization;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface SpecializationRepository extends JpaRepository<Specialization, UUID> {
}

package org.ffigueroa.parcial02.services.implementations;

import org.ffigueroa.parcial02.domain.entities.Specialization;
import org.ffigueroa.parcial02.repositories.SpecializationRepository;
import org.ffigueroa.parcial02.services.SpecializationService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SpecializationImpl implements SpecializationService {

    private final SpecializationRepository specializationRepository;

    public SpecializationImpl(SpecializationRepository specializationRepository) {
        this.specializationRepository = specializationRepository;
    }

    @Override
    public List<Specialization> getAll() {
        return specializationRepository.findAll();
    }
}

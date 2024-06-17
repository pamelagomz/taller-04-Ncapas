package org.ffigueroa.parcial02.domain.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.ffigueroa.parcial02.domain.entities.Prescription;

import java.util.List;
import java.util.UUID;

@Data
public class PrescriptionDataDTO {

    @NotNull
    private UUID medicalAppointmentId;

    @NotBlank
    List<RegisterPrescriptionDTO> prescriptions;
}

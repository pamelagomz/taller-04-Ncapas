package org.ffigueroa.parcial02.domain.dtos.appoimnt;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Data
public class FinishAppointmentDTO {
    @NotNull
    private UUID medicalAppointmentId;
}

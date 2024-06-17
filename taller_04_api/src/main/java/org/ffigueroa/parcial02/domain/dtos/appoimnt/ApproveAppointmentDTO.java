package org.ffigueroa.parcial02.domain.dtos.appoimnt;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Data
public class ApproveAppointmentDTO {

    @NotNull
    private UUID medicalAppointmentId;

    @NotNull
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private Date F_realizacion;

    private Integer estimated_minutes;

    @NotNull
    private List<UUID> doctorsIds;

    private String specialityCode;
}

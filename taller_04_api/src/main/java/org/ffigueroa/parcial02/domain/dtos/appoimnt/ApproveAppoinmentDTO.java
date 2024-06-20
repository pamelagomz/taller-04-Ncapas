package org.ffigueroa.parcial02.domain.dtos.appoimnt;


import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import org.ffigueroa.parcial02.domain.entities.Attends;
import org.ffigueroa.parcial02.domain.entities.User;

import java.time.LocalTime;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Data
public class ApproveAppoinmentDTO {

    @NotBlank
    private Integer minutes;

    @NotBlank
    private LocalTime attentionTime;

    @NotBlank
    private UUID attend;

    @NotBlank
    private List<User> medics;



}

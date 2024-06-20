package org.ffigueroa.parcial02.domain.dtos.appoimnt;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Data
public class RequestAppoinmentDTO {

    @NotNull
    Date date;

    @NotBlank
    String reason;

}

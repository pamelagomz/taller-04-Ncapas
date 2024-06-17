package org.ffigueroa.parcial02.domain.dtos;


import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.util.Date;

@Data
public class RegisterPrescriptionDTO {

    @NotBlank
    private String dosis;

    @NotBlank
    private Date finalDate;

    @NotBlank
    private  String medicine;

}

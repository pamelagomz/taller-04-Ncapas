package org.ffigueroa.parcial02.domain.dtos.appoimnt;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class GetAppoinmetDTO {

    @NotBlank
    private String userId;
    @NotBlank
    private String state;
}

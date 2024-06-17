package org.ffigueroa.parcial02.domain.dtos.history;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class RegisterHistoryDTO {
    @NotBlank
    private String identifier;

    @NotBlank
    private String reason;
}

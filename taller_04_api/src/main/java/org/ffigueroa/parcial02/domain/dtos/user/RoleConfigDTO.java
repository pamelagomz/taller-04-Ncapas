package org.ffigueroa.parcial02.domain.dtos.user;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.UUID;

@Data
public class RoleConfigDTO {

    @NotBlank
    private String identifier;

    @NotBlank
    private String roleCode;
}

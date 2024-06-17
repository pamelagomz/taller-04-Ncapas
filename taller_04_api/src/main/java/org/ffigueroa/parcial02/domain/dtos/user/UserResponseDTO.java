package org.ffigueroa.parcial02.domain.dtos.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.util.UUID;

@Data
public class UserResponseDTO {
    @NotBlank
    private UUID id;
    @NotBlank
    private String name;
    @NotBlank
    @Email
    private String email;
    @NotBlank
    private String phone;
    @NotBlank
    private String dui;

    private Integer homeNumber;
}

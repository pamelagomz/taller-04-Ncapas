package org.ffigueroa.parcial02.domain.dtos.user;

import lombok.Data;

@Data
public class LoginUserDTO {
    private String email;
    private String password;
}

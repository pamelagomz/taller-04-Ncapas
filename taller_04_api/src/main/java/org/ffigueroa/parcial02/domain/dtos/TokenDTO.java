package org.ffigueroa.parcial02.domain.dtos;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.ffigueroa.parcial02.domain.entities.Token;

@Data
@NoArgsConstructor
public class TokenDTO {

    private String token;

    public TokenDTO(Token token) {
        this.token = token.getContent();
    }
}

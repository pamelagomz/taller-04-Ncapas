package org.ffigueroa.parcial02.services;

import org.ffigueroa.parcial02.domain.entities.Token;

public interface TokenService {
    public Token findTokenBycontent(String content);
}

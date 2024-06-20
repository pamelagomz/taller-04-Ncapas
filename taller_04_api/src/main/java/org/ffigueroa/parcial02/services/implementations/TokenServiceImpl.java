package org.ffigueroa.parcial02.services.implementations;

import org.ffigueroa.parcial02.domain.entities.Token;
import org.ffigueroa.parcial02.repositories.TokenRepository;
import org.ffigueroa.parcial02.services.TokenService;
import org.springframework.stereotype.Service;

@Service
public class TokenServiceImpl implements TokenService {
    private final TokenRepository tokenRepository;

    public TokenServiceImpl(TokenRepository tokenRepository) {
        this.tokenRepository = tokenRepository;
    }

    @Override
    public Token findTokenBycontent(String content) {
        return tokenRepository.findByContent(content).orElse(null);
    }
}

package org.ffigueroa.parcial02.services.implementations;
import jakarta.transaction.Transactional;
import org.ffigueroa.parcial02.domain.dtos.user.RegisterUserDTO;
import org.ffigueroa.parcial02.domain.entities.Role;
import org.ffigueroa.parcial02.domain.entities.Token;
import org.ffigueroa.parcial02.domain.entities.User;
import org.ffigueroa.parcial02.repositories.TokenRepository;
import org.ffigueroa.parcial02.repositories.UserRepository;
import org.ffigueroa.parcial02.services.UserService;
import org.ffigueroa.parcial02.utils.jwt.JWTTools;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final JWTTools jwtTools;
    private final TokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, JWTTools jwtTools, TokenRepository tokenRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.jwtTools = jwtTools;
        this.tokenRepository = tokenRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public void saveUser(RegisterUserDTO info, Role rol) {
        User user = new User();

        user.setName(info.getName());
        user.setEmail(info.getEmail());
        user.setPassword(info.getPassword());
        user.setRoles(List.of(rol));
        user.setActive(true);

        userRepository.save(user);
    }

    @Override
    public void deleteUser(User user) {
        user.setActive(false);
        userRepository.save(user);
    }

    @Override
    public void updateUser(String username, String password) {
        User user = userRepository.findUserByNameAndActiveIsTrue(username).orElse(null);

        if(user != null) {
            user.setPassword(passwordEncoder.encode(password));
            userRepository.save(user);
        }
    }

    @Override
    public User getUser(UUID id) {
        return userRepository.findById(id).orElse(null);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAllByActiveIsTrue();
    }

    @Override
    public List<User> getAllByRole(List<Role> roles) {
        return userRepository.findAllByActiveIsTrueAndRoles(roles);
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public void addRoleToUser(User user, Role role) {
        user.getRoles().add(role);
        userRepository.save(user);
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public void updateRoleToUser(User user, Role role) {

        // setea el rol como una lista de un nuevo rol
        user.setRoles(new ArrayList<>());

        // agrega el elemento a la lista
        user.getRoles().add(role);
        userRepository.save(user);
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public void deleteRoleToUser(User user, Role role) {
        List<Role> roles = user.getRoles();

        roles.removeIf(r -> r.getName().equals(role.getName()));

        userRepository.save(user);
    }

    @Override
    public User findUserByEmail(String email) {
        return userRepository.findByEmailAndActiveIsTrue(email).orElse(null);
    }

    @Override
    public User findUserByName(String name) {
        return userRepository.findUserByNameAndActiveIsTrue(name).orElse(null);
    }

    @Override
    public User findByIdentifier(String identifier) {
        return userRepository.findByEmailOrNameAndActiveIsTrue(identifier, identifier).orElse(null);
    }

    // TOKEN -----------------------------------------------------------------------

    @Override
    @Transactional(rollbackOn = Exception.class)
    public Token registerToken(User user) throws Exception {
        cleanTokens(user);

        String tokenString = jwtTools.generateToken(user);
        Token token = new Token(tokenString, user);

        tokenRepository.save(token);

        return token;
    }

    @Override
    public Boolean isTokenValid(User user, String token) {
        try {
            cleanTokens(user);
            List<Token> tokens = tokenRepository.findByUserAndActive(user, true);

            tokens.stream()
                    .filter(tk -> tk.getContent().equals(token))
                    .findAny()
                    .orElseThrow(() -> new Exception());

            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public void cleanTokens(User user) throws Exception {
        List<Token> tokens = tokenRepository.findByUserAndActive(user, true);

        tokens.forEach(token -> {
            if(!jwtTools.verifyToken(token.getContent())) {
                token.setActive(false);
                tokenRepository.save(token);
            }
        });
    }

    @Override
    public User findUserAuthenticated() {
        String username = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        return userRepository.findUserByNameAndActiveIsTrue(username).orElse(null);
    }

    @Override
    public User findUserByToken(Token token) {
        return userRepository.findByTokens(List.of(token)).orElse(null);
    }

    @Override
    public Token getTokenByContent(String content) {

        return tokenRepository.findByContent(content.substring(7)).orElse(null);
    }
}

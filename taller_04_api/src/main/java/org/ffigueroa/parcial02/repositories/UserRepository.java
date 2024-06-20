package org.ffigueroa.parcial02.repositories;
import org.ffigueroa.parcial02.domain.entities.Role;
import org.ffigueroa.parcial02.domain.entities.Token;
import org.ffigueroa.parcial02.domain.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
    Optional<User> findByEmailAndActiveIsTrue(String email);
    List<User> findAllByActiveIsTrue();
    Optional<User> findUserByNameAndActiveIsTrue(String name);
    Optional<User> findByEmailOrNameAndActiveIsTrue(String email, String name);
    Optional<User> findByTokens(List<Token> tokens);

    List<User> findAllByActiveIsTrueAndRoles(List<Role> roles);
}

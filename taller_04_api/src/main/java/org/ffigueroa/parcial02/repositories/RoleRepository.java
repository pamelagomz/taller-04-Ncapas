package org.ffigueroa.parcial02.repositories;
import org.ffigueroa.parcial02.domain.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface RoleRepository extends JpaRepository<Role, String> {
    Role findRoleByName(String rol);
    Optional<Role> findRoleByCode(String code);
}

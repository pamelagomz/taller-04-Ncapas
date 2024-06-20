package org.ffigueroa.parcial02.services.implementations;

import org.ffigueroa.parcial02.domain.entities.Role;
import org.ffigueroa.parcial02.repositories.RoleRepository;
import org.ffigueroa.parcial02.services.RoleService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;

    public RoleServiceImpl(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public Role getRole(String roleId) {
        return roleRepository.findById(roleId).orElse(null);
    }

    @Override
    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }

    @Override
    public Role getRoleByName(String roleName) {
        return roleRepository.findRoleByName(roleName);
    }

    @Override
    public Role getRoleByCode(String code) {
        return roleRepository.findRoleByCode(code).orElse(null);
    }
}

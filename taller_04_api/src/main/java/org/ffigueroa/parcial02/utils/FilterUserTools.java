package org.ffigueroa.parcial02.utils;
import org.ffigueroa.parcial02.domain.dtos.user.UserResponseDTO;
import org.ffigueroa.parcial02.domain.entities.Role;
import org.ffigueroa.parcial02.domain.entities.User;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class FilterUserTools {

    public List<UserResponseDTO> filterUsersByRole(List<User> users, Role roleFilter){
        List<UserResponseDTO> filteredUsers = new ArrayList<>();

        for (User user : users) {
            for (Role role : user.getRoles()) {
                if (role.equals(roleFilter)) {
                    UserResponseDTO userResponseDTO = new UserResponseDTO();
                    userResponseDTO.setId(user.getId());
                    userResponseDTO.setName(user.getName());
                    userResponseDTO.setEmail(user.getEmail());
                    filteredUsers.add(userResponseDTO);
                    break;
                }
            }
        }

        return filteredUsers;
    }
}

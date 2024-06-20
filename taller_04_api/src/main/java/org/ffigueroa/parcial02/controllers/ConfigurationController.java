package org.ffigueroa.parcial02.controllers;


import jakarta.validation.Valid;
import org.apache.coyote.Response;
import org.ffigueroa.parcial02.domain.dtos.GeneralResponse;
import org.ffigueroa.parcial02.domain.dtos.user.RoleConfigDTO;
import org.ffigueroa.parcial02.domain.entities.Role;
import org.ffigueroa.parcial02.domain.entities.User;
import org.ffigueroa.parcial02.services.RoleService;
import org.ffigueroa.parcial02.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/config")
public class ConfigurationController {

    private final UserService userService;
    private final RoleService userRole;

    public ConfigurationController(UserService userService, RoleService userRole) {
        this.userService = userService;
        this.userRole = userRole;
    }

    @PreAuthorize("hasAnyAuthority('Admin')")
    @PostMapping("user-role")
    public ResponseEntity<GeneralResponse> changeRole(@RequestBody @Valid RoleConfigDTO data){

        User user = userService.findByIdentifier(data.getIdentifier());

        if(user == null){
            return new ResponseEntity<>(
                    new GeneralResponse.Builder()
                            .message("user not found")
                            .build(),
                    HttpStatus.NOT_FOUND
            );
        }

        Role rol = userRole.getRoleByCode(data.getRoleCode());

        if(rol== null){
            return new ResponseEntity<>(
                    new GeneralResponse.Builder()
                            .message("role not found")
                            .build(),
                    HttpStatus.NOT_FOUND
            );
        }

        if(user.getRoles().contains(rol)){
            // si lya tiene ese rol, se le quita el rol
            userService.deleteRoleToUser(user, rol);

            return new ResponseEntity<>(
                    new GeneralResponse.Builder()
                            .message("role deleted")
                            .build(),
                    HttpStatus.OK
            );
        }

        // si no lo tiene
        userService.addRoleToUser(user, rol);

        return new ResponseEntity<>(
                new GeneralResponse.Builder()
                        .message("role added")
                        .build(),
                HttpStatus.OK
        );
    }

    @PreAuthorize("hasAnyAuthority('Admin')")
    @GetMapping("/all-roles")
    public ResponseEntity<GeneralResponse> getAllRoles(){
        return new ResponseEntity<>(
                new GeneralResponse.Builder()
                        .data(userRole.getAllRoles())
                        .message("roles obtained")
                        .build(),
                HttpStatus.OK
        );
    }
}

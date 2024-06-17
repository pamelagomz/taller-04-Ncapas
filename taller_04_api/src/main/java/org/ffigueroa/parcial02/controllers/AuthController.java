package org.ffigueroa.parcial02.controllers;
import jakarta.validation.Valid;
import lombok.extern.log4j.Log4j2;
import org.ffigueroa.parcial02.domain.dtos.GeneralResponse;
import org.ffigueroa.parcial02.domain.dtos.TokenDTO;
import org.ffigueroa.parcial02.domain.dtos.user.LoginUserDTO;
import org.ffigueroa.parcial02.domain.dtos.user.RegisterUserDTO;
import org.ffigueroa.parcial02.domain.entities.Role;
import org.ffigueroa.parcial02.domain.entities.Token;
import org.ffigueroa.parcial02.domain.entities.User;
import org.ffigueroa.parcial02.services.RoleService;
import org.ffigueroa.parcial02.services.TokenService;
import org.ffigueroa.parcial02.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@Log4j2
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;
    private final RoleService roleService;
    private final TokenService tokenService;

    public AuthController(UserService userService, RoleService roleService, TokenService tokenService) {
        this.userService = userService;
        this.roleService = roleService;
        this.tokenService = tokenService;
    }

    @PostMapping("/register")
    public ResponseEntity<GeneralResponse> register(@RequestBody @Valid RegisterUserDTO registerUserDTO) {

        User user = userService.findUserByEmail(registerUserDTO.getEmail());

        if (user != null) {
            return new ResponseEntity<>(
                    new GeneralResponse.Builder()
                            .message("El usuario ya existe")
                            .build(),
                    HttpStatus.CONFLICT
            );
        }

        Role rol = roleService.getRoleByName("User");

        userService.saveUser(registerUserDTO, rol);

        return new ResponseEntity<>(
                new GeneralResponse.Builder()
                        .message("Usuario registrado con exito")
                        .build(),
                HttpStatus.CREATED
        );
    }

    // @PreAuthorize("hasAnyAuthority('')")  -  Entre comillas el nombre del rol
    @PostMapping("/login")
    public ResponseEntity<GeneralResponse> login(@RequestBody @Valid LoginUserDTO loginUserDTO) {

        User user = userService.findUserByEmail(loginUserDTO.getEmail());

        if (user == null) {
            return new ResponseEntity<>(
                    new GeneralResponse.Builder()
                            .message("Usuario no encontrado")
                            .build(),
                    HttpStatus.NOT_FOUND
            );
        }

        try {
            Token token = userService.registerToken(user);
            return new ResponseEntity<>(
                    new GeneralResponse.Builder()
                            .message("Usuario encontrado")
                            .data(new TokenDTO(token))
                            .build(),
                    HttpStatus.OK
            );
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //
    @GetMapping("/whoami")
    public ResponseEntity<GeneralResponse> whoAmI(@RequestHeader("Authorization") String bearerToken) {

        if (bearerToken == null || bearerToken.isEmpty()) {
            return new ResponseEntity<>(
                    new GeneralResponse.Builder()
                            .build(),
                    HttpStatus.UNAUTHORIZED
            );
        }

        String token = bearerToken.substring(7);
        Token tokenEntity = tokenService.findTokenBycontent(token);

        User user = userService.findUserByToken(tokenEntity);

        if (user == null) {
            return new ResponseEntity<>(
                    new GeneralResponse.Builder()
                            .message("Usuario no encontrado")
                            .build(),
                    HttpStatus.NOT_FOUND
            );
        }

        return new ResponseEntity<>(
                new GeneralResponse.Builder()
                        .message("Usuario encontrado")
                        .data(user)
                        .build(),
                HttpStatus.OK
        );
    }
}
